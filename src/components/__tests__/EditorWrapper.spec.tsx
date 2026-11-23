import { ReactElement } from "react";
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
    unregisterCallback = jest.fn();
    private listeners: Record<string, Array<() => void>> = {};

    addEventListener(type: string, listener: () => void): void {
        (this.listeners[type] ??= []).push(listener);
    }

    /** What Unlayer does once it has loaded a design. */
    loaded(): void {
        (this.listeners["design:loaded"] ?? []).forEach(listener => listener());
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
/** The options the widget last gave react-email-editor. */
let mockOptions: Record<string, any> | undefined;

jest.mock("react-email-editor", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useEffect } = require("react");
    return {
        __esModule: true,
        // Unlayer loads its script before it is ready, so onReady is never
        // called during the mount.
        default: function EmailEditor(props: { onReady: (editor: unknown) => void; options: Record<string, any> }) {
            mockOptions = props.options;
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
        displayMode: "email",
        editorVersion: "",
        scriptUrl: "",
        advancedOptions: "",
        isShowPreview: false,
        previewDevice: "desktop",
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
function mount(element: ReactElement): ReturnType<typeof render> {
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

    it.each([
        ["another template", JSON.stringify({ body: { rows: ["other object"] } })],
        ["an empty template", ""]
    ])(
        "drops a pending save when the data view switches to an object with %s before the delay ends",
        async (_, otherValue) => {
            const onDesignChangeAction = saveAction();
            const p = props({ JSONTemplate: attribute(STORED), saveOnChange: true, onDesignChangeAction });
            const { rerender } = mount(<EditorWrapper {...p} />);

            act(() => unlayer.edit(EDITED));
            const other = attribute(otherValue);
            rerender(<EditorWrapper {...p} JSONTemplate={other} />);
            await act(async () => {
                jest.runAllTimers();
            });

            expect(other.setValue).not.toHaveBeenCalled();
            expect(p.JSONTemplate.setValue).not.toHaveBeenCalled();
            expect(onDesignChangeAction.execute).not.toHaveBeenCalled();
        }
    );

    it("keeps a pending save across re-renders of the same value", async () => {
        const p = props({ JSONTemplate: attribute(STORED), saveOnChange: true });
        const { rerender } = mount(<EditorWrapper {...p} />);

        act(() => unlayer.edit(EDITED));
        const same = attribute(STORED);
        rerender(<EditorWrapper {...p} JSONTemplate={same} />);
        await act(async () => {
            jest.runAllTimers();
        });

        expect(same.setValue).toHaveBeenCalledWith(JSON.stringify(EDITED));
    });
});

describe("Save on change when leaving the editor", () => {
    const leaving: Array<[string, (widget: HTMLElement) => void]> = [
        ["the pointer leaves the widget", widget => fireEvent.pointerLeave(widget)],
        ["focus leaves the widget", widget => fireEvent.focusOut(widget)],
        ["the pointer is pressed elsewhere on the page", () => fireEvent.pointerDown(document.body)],
        [
            "the page is hidden",
            () => {
                Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
                try {
                    fireEvent(document, new Event("visibilitychange"));
                } finally {
                    delete (document as { visibilityState?: unknown }).visibilityState;
                }
            }
        ]
    ];

    it.each(leaving)("writes the last edit at once when %s", async (_, leave) => {
        const JSONTemplate = attribute(STORED);
        const onDesignChangeAction = saveAction();
        const { container } = mount(
            <EditorWrapper {...props({ JSONTemplate, saveOnChange: true, onDesignChangeAction })} />
        );

        act(() => unlayer.edit(EDITED));
        await act(async () => leave(container.firstChild as HTMLElement));

        expect(JSONTemplate.setValue).toHaveBeenCalledWith(JSON.stringify(EDITED));
        expect(onDesignChangeAction.execute).toHaveBeenCalledTimes(1);

        // The delay that follows saves nothing twice.
        await act(async () => {
            jest.runAllTimers();
        });
        expect(JSONTemplate.setValue).toHaveBeenCalledTimes(1);
        expect(onDesignChangeAction.execute).toHaveBeenCalledTimes(1);
    });

    it("does nothing when no edit is pending", async () => {
        const JSONTemplate = attribute(STORED);
        const { container } = mount(<EditorWrapper {...props({ JSONTemplate, saveOnChange: true })} />);

        await act(async () => {
            fireEvent.pointerLeave(container.firstChild as HTMLElement);
        });

        expect(JSONTemplate.setValue).not.toHaveBeenCalled();
    });

    it("does not write into another object after the data view switched", async () => {
        const p = props({ JSONTemplate: attribute(STORED), saveOnChange: true });
        const { container, rerender } = mount(<EditorWrapper {...p} />);

        act(() => unlayer.edit(EDITED));
        const other = attribute(JSON.stringify({ body: { rows: ["other object"] } }));
        rerender(<EditorWrapper {...p} JSONTemplate={other} />);
        await act(async () => {
            fireEvent.pointerLeave(container.firstChild as HTMLElement);
        });

        expect(other.setValue).not.toHaveBeenCalled();
        expect(p.JSONTemplate.setValue).not.toHaveBeenCalled();
    });

    it("does not write into another object that arrives while the export is under way", async () => {
        const p = props({ JSONTemplate: attribute(STORED), saveOnChange: true });
        const { container, rerender } = mount(<EditorWrapper {...p} />);
        let finishExport: (() => void) | undefined;
        unlayer.exportHtml = callback => {
            finishExport = () => callback({ html: "<p>on screen</p>", design: EDITED });
        };

        act(() => unlayer.edit(EDITED));
        act(() => {
            fireEvent.pointerLeave(container.firstChild as HTMLElement);
        });
        expect(finishExport).toBeDefined();

        const other = attribute(JSON.stringify({ body: { rows: ["other object"] } }));
        rerender(<EditorWrapper {...p} JSONTemplate={other} />);
        await act(async () => finishExport!());

        expect(other.setValue).not.toHaveBeenCalled();
        expect(p.JSONTemplate.setValue).not.toHaveBeenCalled();
    });
});

describe("Toolbar actions", () => {
    it("runs Save once on a double click", async () => {
        const JSONTemplate = attribute(STORED);
        const p = props({ JSONTemplate });
        mount(<EditorWrapper {...p} />);

        await act(async () => {
            fireEvent.click(saveButton());
            fireEvent.click(saveButton());
        });

        expect(JSONTemplate.setValue).toHaveBeenCalledTimes(1);
        expect(p.saveTemplateAction!.execute).toHaveBeenCalledTimes(1);

        await clickSave();
        expect(p.saveTemplateAction!.execute).toHaveBeenCalledTimes(2);
    });
});

describe("Embed script URL", () => {
    it("does not load the editor from a URL that is not https or a path in the app", () => {
        mockOptions = undefined;
        mount(<EditorWrapper {...props({ scriptUrl: "http://cdn.example.com/embed.js" })} />);

        expect(screen.getByRole("alert").textContent).toMatch(/must start with https:\/\//);
        expect(mockOptions).toBeUndefined();
    });

    it("loads the editor from an https URL", () => {
        mockOptions = undefined;
        mount(<EditorWrapper {...props({ scriptUrl: "https://cdn.example.com/embed.js" })} />);

        expect(screen.queryByRole("alert")).toBeNull();
        expect(mockOptions).toBeDefined();
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

describe("Preview", () => {
    function previewButton(): HTMLButtonElement | null {
        return screen.queryByRole("button", { name: /Preview$/ }) as HTMLButtonElement | null;
    }

    it("switches between editing and previewing on the chosen device", () => {
        mount(<EditorWrapper {...props({ isShowPreview: true, previewDevice: "mobile" })} />);

        act(() => {
            fireEvent.click(previewButton()!);
        });
        expect(unlayer.showPreview).toHaveBeenCalledWith("mobile");
        expect(previewButton()!.textContent).toBe("Hide Preview");
        expect(previewButton()!.getAttribute("aria-pressed")).toBe("true");

        act(() => {
            fireEvent.click(previewButton()!);
        });
        expect(unlayer.hidePreview).toHaveBeenCalledTimes(1);
        expect(previewButton()!.textContent).toBe("Show Preview");
    });

    it("always previews a read-only editor, and offers no button to leave it", () => {
        const JSONTemplate = attribute(STORED, ValueStatus.Available, true);
        mount(<EditorWrapper {...props({ JSONTemplate, isShowPreview: true, previewDevice: "tablet" })} />);

        expect(unlayer.showPreview).toHaveBeenCalledWith("tablet");
        expect(previewButton()).toBeNull();
    });

    it("leaves the preview when the editor stops being read-only", () => {
        const p = props({ JSONTemplate: attribute(STORED, ValueStatus.Available, true), isShowPreview: true });
        const { rerender } = mount(<EditorWrapper {...p} />);

        rerender(<EditorWrapper {...p} JSONTemplate={attribute(STORED)} />);

        expect(unlayer.hidePreview).toHaveBeenCalledTimes(1);
        expect(previewButton()!.textContent).toBe("Show Preview");
    });
});

describe("Events", () => {
    it("runs On ready once the editor is ready, and On design loaded after a load", () => {
        const onReadyAction = saveAction();
        const onDesignLoadAction = saveAction();
        mount(<EditorWrapper {...props({ JSONTemplate: attribute(STORED), onReadyAction, onDesignLoadAction })} />);

        expect(onReadyAction.execute).toHaveBeenCalledTimes(1);
        expect(onDesignLoadAction.execute).not.toHaveBeenCalled();

        act(() => unlayer.loaded());
        expect(onDesignLoadAction.execute).toHaveBeenCalledTimes(1);
    });

    it("runs On change with the HTML and JSON shortly after an edit, without writing the attributes", async () => {
        const JSONTemplate = attribute(STORED);
        const onDesignChangeAction = saveAction();
        mount(<EditorWrapper {...props({ JSONTemplate, onDesignChangeAction })} />);

        await act(async () => {
            unlayer.edit(EDITED);
            jest.runAllTimers();
        });

        expect(onDesignChangeAction.execute).toHaveBeenCalledWith({
            html__: "<p>on screen</p>",
            json__: JSON.stringify(EDITED)
        });
        expect(JSONTemplate.setValue).not.toHaveBeenCalled();
    });
});

describe("Behaviour", () => {
    it("disables Export HTML while the stored template cannot be read", () => {
        mount(
            <EditorWrapper
                {...props({
                    JSONTemplate: attribute("{not json"),
                    isShowExportHtml: true,
                    exportHTMLAction: saveAction()
                })}
            />
        );
        expect((screen.getByRole("button", { name: "Export HTML" }) as HTMLButtonElement).disabled).toBe(true);
    });

    it("turns off Unlayer's own preview button only while the widget drives the preview", () => {
        const { rerender } = mount(<EditorWrapper {...props({ isShowPreview: true })} />);
        expect(mockOptions?.features?.preview).toBe(false);

        rerender(<EditorWrapper {...props({ isShowPreview: false })} />);
        expect(mockOptions?.features?.preview).toBeUndefined();
    });

    it("follows the app's language when no Locale is set", () => {
        document.documentElement.lang = "nl-NL";
        try {
            mount(<EditorWrapper {...props()} />);
            expect(unlayer.setLocale).toHaveBeenCalledWith("nl-NL");
        } finally {
            document.documentElement.lang = "";
        }
    });

    it("keeps English when the app runs in English", () => {
        document.documentElement.lang = "en-GB";
        try {
            mount(<EditorWrapper {...props()} />);
            expect(unlayer.setLocale).toHaveBeenCalledWith(null);
        } finally {
            document.documentElement.lang = "";
        }
    });

    it("registers and removes own-endpoint uploads as the properties change", () => {
        const p = props({ imageUploadMode: "endpoint", imageUploadUrl: "rest/images" });
        const { rerender } = mount(<EditorWrapper {...p} />);
        expect(unlayer.registerCallback).toHaveBeenCalledWith("image", expect.any(Function));

        rerender(<EditorWrapper {...p} imageUploadUrl="" />);
        expect(unlayer.unregisterCallback).toHaveBeenCalledWith("image");
    });
});
