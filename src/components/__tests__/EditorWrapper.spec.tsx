import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ActionValue, EditableValue, ValueStatus } from "mendix";

import { ReactEmailEditorContainerProps } from "../../../typings/ReactEmailEditorProps";
import { EditorWrapper } from "../EditorWrapper";
import { TemplateActionArgs } from "../Toolbar";

/** Stands in for Unlayer: records what the widget asks of it. */
class FakeUnlayer {
    design: object = { body: { rows: [] } };
    loadDesign = jest.fn((design: object) => {
        this.design = design;
    });
    showPreview = jest.fn();
    hidePreview = jest.fn();
    setLocale = jest.fn();
    setMergeTags = jest.fn();
    registerCallback = jest.fn();
    private listeners: Record<string, Array<() => void>> = {};

    addEventListener(type: string, listener: () => void): void {
        (this.listeners[type] ??= []).push(listener);
    }

    exportHtml(callback: (data: { html: string; design: object }) => void): void {
        callback({ html: "<p>on screen</p>", design: this.design });
    }

    /** What Unlayer does when the user changes the design. */
    edit(design: object): void {
        this.design = design;
        (this.listeners["design:updated"] ?? []).forEach(listener => listener());
    }
}

let unlayer: FakeUnlayer;

jest.mock("react-email-editor", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useEffect } = require("react");
    return {
        __esModule: true,
        // Unlayer loads its script before it is ready, so onReady is never
        // called during the mount.
        default: function EmailEditor(props: { onReady: (editor: unknown) => void }) {
            useEffect(() => {
                const timer = setTimeout(() => props.onReady(unlayer));
                return () => clearTimeout(timer);
                // Like Unlayer, ready once per mount, whatever the props do.
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);
            return null;
        }
    };
});

type Attribute = EditableValue<string> & { setValue: jest.Mock };

function attribute(value: string | undefined, status = ValueStatus.Available, readOnly = false): Attribute {
    return {
        status,
        value,
        readOnly,
        setValue: jest.fn(),
        displayValue: value ?? "",
        validation: undefined,
        setValidator: jest.fn(),
        setTextValue: jest.fn(),
        setFormatter: jest.fn(),
        formatter: {} as never,
        universe: undefined
    } as unknown as Attribute;
}

function saveAction(): ActionValue<TemplateActionArgs> & { execute: jest.Mock } {
    return { canExecute: true, isExecuting: false, isAuthorized: true, execute: jest.fn() } as never;
}

function props(overrides: Partial<ReactEmailEditorContainerProps> = {}): ReactEmailEditorContainerProps {
    return {
        name: "editor",
        class: "",
        JSONTemplate: attribute(""),
        saveOnChange: false,
        projectId: 0,
        editorHeight: "",
        theme: "modern_light",
        advancedOptions: "",
        isShowExportHtml: false,
        isShowSaveTemplate: true,
        saveTemplateAction: saveAction(),
        imageUploadMode: "unlayer",
        imageUploadUrl: "",
        ...overrides
    };
}

const STORED = JSON.stringify({ body: { rows: ["stored"] } });
const EDITED = { body: { rows: ["edited"] } };

function saveButton(): HTMLButtonElement {
    return screen.getByRole("button", { name: "Save Template" }) as HTMLButtonElement;
}

/** Render the widget and let the editor become ready. */
function mount(element: React.ReactElement): ReturnType<typeof render> {
    const result = render(element);
    act(() => {
        jest.runOnlyPendingTimers();
    });
    return result;
}

/** Click Save and let the export promise and the action run. */
async function clickSave(): Promise<void> {
    await act(async () => {
        fireEvent.click(saveButton());
    });
}

beforeEach(() => {
    unlayer = new FakeUnlayer();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe("Save", () => {
    it("writes the design and runs the action when the template was loaded", async () => {
        const JSONTemplate = attribute(STORED);
        const HTMLBody = attribute("");
        const p = props({ JSONTemplate, HTMLBody });
        mount(<EditorWrapper {...p} />);

        expect(unlayer.loadDesign).toHaveBeenCalledWith(JSON.parse(STORED));
        expect(saveButton().disabled).toBe(false);

        unlayer.design = EDITED;
        await clickSave();

        expect(JSONTemplate.setValue).toHaveBeenCalledWith(JSON.stringify(EDITED));
        expect(HTMLBody.setValue).toHaveBeenCalledWith("<p>on screen</p>");
        expect(p.saveTemplateAction!.execute).toHaveBeenCalledTimes(1);
    });

    it("does not overwrite a stored template that could not be read", async () => {
        const JSONTemplate = attribute("{not json");
        const HTMLBody = attribute("");
        const p = props({ JSONTemplate, HTMLBody });
        mount(<EditorWrapper {...p} />);

        expect(screen.getByRole("alert").textContent).toMatch(/could not be read/);
        expect(saveButton().disabled).toBe(true);

        await clickSave();

        expect(JSONTemplate.setValue).not.toHaveBeenCalled();
        expect(HTMLBody.setValue).not.toHaveBeenCalled();
        expect(p.saveTemplateAction!.execute).not.toHaveBeenCalled();
    });

    it.each([ValueStatus.Loading, ValueStatus.Unavailable])(
        "does not write while the attribute is %s",
        async status => {
            const JSONTemplate = attribute(undefined, status);
            const p = props({ JSONTemplate });
            mount(<EditorWrapper {...p} />);

            expect(saveButton().disabled).toBe(true);

            await clickSave();

            expect(JSONTemplate.setValue).not.toHaveBeenCalled();
            expect(p.saveTemplateAction!.execute).not.toHaveBeenCalled();
        }
    );

    it("is enabled again once the attribute becomes available", async () => {
        const p = props({ JSONTemplate: attribute(undefined, ValueStatus.Loading) });
        const { rerender } = mount(<EditorWrapper {...p} />);
        expect(saveButton().disabled).toBe(true);

        const JSONTemplate = attribute(STORED);
        rerender(<EditorWrapper {...p} JSONTemplate={JSONTemplate} />);
        expect(saveButton().disabled).toBe(false);

        await clickSave();
        expect(JSONTemplate.setValue).toHaveBeenCalledTimes(1);
    });

    it("is enabled again once the attribute holds a readable template", () => {
        const p = props({ JSONTemplate: attribute("{not json") });
        const { rerender } = mount(<EditorWrapper {...p} />);
        expect(saveButton().disabled).toBe(true);

        rerender(<EditorWrapper {...p} JSONTemplate={attribute(STORED)} />);
        expect(screen.queryByRole("alert")).toBeNull();
        expect(saveButton().disabled).toBe(false);
    });
});

describe("Save on change", () => {
    /** Edit, let the delay pass, and let the export promise settle. */
    async function editAndWait(): Promise<void> {
        await act(async () => {
            unlayer.edit(EDITED);
            jest.runAllTimers();
        });
    }

    it("writes the design after an edit", async () => {
        const JSONTemplate = attribute(STORED);
        mount(<EditorWrapper {...props({ JSONTemplate, saveOnChange: true })} />);

        await editAndWait();

        expect(JSONTemplate.setValue).toHaveBeenCalledWith(JSON.stringify(EDITED));
    });

    it("does not overwrite a stored template that could not be read", async () => {
        const JSONTemplate = attribute("{not json");
        const HTMLBody = attribute("");
        mount(<EditorWrapper {...props({ JSONTemplate, HTMLBody, saveOnChange: true })} />);

        await editAndWait();

        expect(JSONTemplate.setValue).not.toHaveBeenCalled();
        expect(HTMLBody.setValue).not.toHaveBeenCalled();
    });

    it.each([ValueStatus.Loading, ValueStatus.Unavailable])(
        "does not write while the attribute is %s",
        async status => {
            const JSONTemplate = attribute(undefined, status);
            mount(<EditorWrapper {...props({ JSONTemplate, saveOnChange: true })} />);

            await editAndWait();

            expect(JSONTemplate.setValue).not.toHaveBeenCalled();
        }
    );

    it("does not write if the attribute stops being available before the delay ends", async () => {
        const p = props({ JSONTemplate: attribute(STORED), saveOnChange: true });
        const { rerender } = mount(<EditorWrapper {...p} />);

        act(() => unlayer.edit(EDITED));
        const JSONTemplate = attribute(undefined, ValueStatus.Loading);
        rerender(<EditorWrapper {...p} JSONTemplate={JSONTemplate} />);
        await act(async () => {
            jest.runAllTimers();
        });

        expect(JSONTemplate.setValue).not.toHaveBeenCalled();
        expect(p.JSONTemplate.setValue).not.toHaveBeenCalled();
    });
});

describe("Loading", () => {
    it("keeps the editor's content when the attribute becomes empty", () => {
        const p = props({ JSONTemplate: attribute(STORED) });
        const { rerender } = mount(<EditorWrapper {...p} />);
        expect(unlayer.loadDesign).toHaveBeenCalledTimes(1);

        const emptied = attribute("");
        rerender(<EditorWrapper {...p} JSONTemplate={emptied} />);

        expect(unlayer.loadDesign).toHaveBeenCalledTimes(1);
        expect(emptied.setValue).not.toHaveBeenCalled();
        expect(screen.queryByRole("alert")).toBeNull();
    });

    it("does not reload a design the widget wrote itself", async () => {
        const p = props({ JSONTemplate: attribute(STORED) });
        const { rerender } = mount(<EditorWrapper {...p} />);

        unlayer.design = EDITED;
        await clickSave();
        rerender(<EditorWrapper {...p} JSONTemplate={attribute(JSON.stringify(EDITED))} />);

        expect(unlayer.loadDesign).toHaveBeenCalledTimes(1);
    });
});
