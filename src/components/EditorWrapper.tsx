import { ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ActionValue, ValueStatus } from "mendix";
import EmailEditor, { EditorRef } from "react-email-editor";
import classNames from "classnames";

import { DisplayModeEnum, ReactEmailEditorContainerProps } from "../../typings/ReactEmailEditorProps";
import { buildOptions, Editor, parseAdvancedOptions, parseDesign } from "../utils/editorOptions";
import { registerImageUpload } from "../utils/imageUpload";
import { buildMergeTags } from "../utils/mergeTags";
import { canWriteTemplate } from "../utils/templateAttribute";
import { TemplateActionArgs, Toolbar } from "./Toolbar";

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;

type Exported = { html: string; json: string };

/** Run a Mendix action if it is set and may run now. */
function execute(action: ActionValue | undefined): void;
function execute(action: ActionValue<TemplateActionArgs> | undefined, args: TemplateActionArgs): void;
function execute(action: ActionValue<any> | undefined, args?: TemplateActionArgs): void {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute(args);
    }
}

/**
 * The language the Mendix client renders the page in (<html lang>, eg. nl-NL),
 * or "" for English, which is the editor's default.
 */
function appLocale(): string {
    const lang = document.documentElement.lang;
    return !lang || lang.toLowerCase().startsWith("en") ? "" : lang;
}

export function EditorWrapper(props: ReactEmailEditorContainerProps): ReactElement {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions, displayMode, editorVersion } = props;
    const emailEditorRef = useRef<EditorRef<DisplayModeEnum>>(null);

    const { options: advanced, error: optionsError } = useMemo(
        () => parseAdvancedOptions(advancedOptions),
        [advancedOptions]
    );
    // When the widget shows the preview (its button, or a read-only editor),
    // Unlayer's own preview controls are hidden, so only the widget opens and
    // closes it and the button never shows the wrong state.
    const controlsPreview = props.isShowPreview || JSONTemplate.readOnly;
    const options = useMemo(
        () => buildOptions(advanced, projectId, theme, imageUploadMode, displayMode, editorVersion, controlsPreview),
        [advanced, projectId, theme, imageUploadMode, displayMode, editorVersion, controlsPreview]
    );

    // The editor is recreated when its options change. Remember which options
    // the ready editor was made with, so the old one is forgotten at once.
    const [ready, setReady] = useState<{ editor: Editor; options: typeof options } | null>(null);
    const editor = ready?.options === options ? ready.editor : null;

    // An empty value never clears the editor (see below), so it is no error either.
    const jsonStatus = JSONTemplate.status;
    const jsonValue = JSONTemplate.value ?? "";
    const parsed = useMemo(
        () => (jsonStatus === ValueStatus.Available && jsonValue !== "" ? parseDesign(jsonValue) : {}),
        [jsonStatus, jsonValue]
    );
    const loadError = parsed.error;

    // Unlayer calls handlers registered once per editor, and the save-on-change
    // timer can fire before the next render; both read the latest values
    // through these refs instead of the render they were created in.
    const propsRef = useRef(props);
    const optionsRef = useRef(options);
    const loadErrorRef = useRef(loadError);
    useLayoutEffect(() => {
        propsRef.current = props;
        optionsRef.current = options;
        loadErrorRef.current = loadError;
    });

    // The last design string the editor loaded or produced. When the attribute
    // changes to this value (because we wrote it) there is nothing to reload, and
    // reloading would throw away the user's undo history and selection.
    const syncedJson = useRef<string | undefined>(undefined);

    const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    // The editor is destroyed on unmount; a pending save would call into it.
    useEffect(() => () => clearTimeout(saveTimer.current), []);

    const readOnly = JSONTemplate.readOnly;

    const exportDesign = useCallback((unlayer: Editor): Promise<Exported> => {
        return new Promise(resolve => {
            unlayer.exportHtml(data => {
                resolve({ html: data.html, json: JSON.stringify(data.design) });
            });
        });
    }, []);

    /** Write the design to the attributes, if they can be written. Returns whether it did. */
    const writeAttributes = useCallback(({ html, json }: Exported): boolean => {
        const { JSONTemplate: jsonAttr, HTMLBody: htmlAttr } = propsRef.current;
        if (!canWriteTemplate(jsonAttr, loadErrorRef.current)) {
            return false;
        }
        syncedJson.current = json;
        jsonAttr.setValue(json);
        if (htmlAttr && htmlAttr.status === ValueStatus.Available && !htmlAttr.readOnly) {
            htmlAttr.setValue(html);
        }
        return true;
    }, []);

    const onReady = useCallback(
        (unlayer: Editor) => {
            unlayer.addEventListener("design:updated", () => {
                const current = propsRef.current;
                const write = current.saveOnChange && canWriteTemplate(current.JSONTemplate, loadErrorRef.current);
                if (!write && !current.onDesignChangeAction) {
                    return;
                }
                clearTimeout(saveTimer.current);
                saveTimer.current = setTimeout(() => {
                    exportDesign(unlayer).then(exported => {
                        const latest = propsRef.current;
                        if (latest.saveOnChange) {
                            writeAttributes(exported);
                        }
                        execute(latest.onDesignChangeAction, { html__: exported.html, json__: exported.json });
                    });
                }, SAVE_ON_CHANGE_DELAY_MS);
            });

            unlayer.addEventListener("design:loaded", () => execute(propsRef.current.onDesignLoadAction));

            // A new editor starts blank, so whatever it had loaded is gone.
            syncedJson.current = undefined;
            setReady({ editor: unlayer, options: optionsRef.current });
            execute(propsRef.current.onReadyAction);
        },
        [exportDesign, writeAttributes]
    );

    // Load the design from the attribute, once the editor and the value are ready.
    useEffect(() => {
        // An empty value never clears the editor. It is what a rollback of a new
        // object produces, for instance when a pop-up opened by the save action is
        // closed, and clearing would throw away everything the user made.
        if (!editor || jsonStatus !== ValueStatus.Available || jsonValue === "") {
            return;
        }
        if (jsonValue === syncedJson.current) {
            return;
        }
        syncedJson.current = jsonValue;
        if (parsed.design) {
            editor.loadDesign(parsed.design as Parameters<Editor["loadDesign"]>[0]);
        } else {
            console.error(`ReactEmailEditor: ${parsed.error}`);
        }
    }, [editor, jsonStatus, jsonValue, parsed]);

    // Whether the preview is showing: always when the editor is read-only,
    // otherwise when the user switched it on for this editor.
    const [previewToggledFor, setPreviewToggledFor] = useState<Editor | null>(null);
    const previewing = editor !== null && (readOnly || previewToggledFor === editor);
    const previewDevice = props.previewDevice ?? "desktop";

    // Show or hide Unlayer's preview to match. A new editor starts without one.
    const previewShownIn = useRef<Editor | null>(null);
    useEffect(() => {
        if (!editor) {
            return;
        }
        if (previewing) {
            editor.showPreview(previewDevice);
            previewShownIn.current = editor;
        } else if (previewShownIn.current === editor) {
            editor.hidePreview();
            previewShownIn.current = null;
        }
    }, [editor, previewing, previewDevice]);

    const togglePreview = useCallback(() => {
        setPreviewToggledFor(previewing ? null : editor);
    }, [editor, previewing]);

    // Own-endpoint uploads follow the properties, also when they change later.
    const uploadUrl = imageUploadMode === "endpoint" ? props.imageUploadUrl.trim() : "";
    useEffect(() => {
        if (!editor || !uploadUrl) {
            return;
        }
        registerImageUpload(editor, uploadUrl);
        return () => editor.unregisterCallback("image");
    }, [editor, uploadUrl]);

    // Without a Locale property the editor follows the app's language.
    const locale = props.locale ? props.locale.value : appLocale();
    useEffect(() => {
        if (editor && locale !== undefined) {
            editor.setLocale(locale || null);
        }
    }, [editor, locale]);

    // Mendix hands out new list objects on re-renders; compare by content so the
    // editor is only told when the tags really change.
    const mergeTags = JSON.stringify(
        buildMergeTags(props.mergeTags, props.mergeTagName, props.mergeTagValue, props.mergeTagSample) ?? null
    );
    useEffect(() => {
        if (editor && mergeTags !== "null") {
            editor.setMergeTags(JSON.parse(mergeTags));
        }
    }, [editor, mergeTags]);

    const runAction = useCallback(
        async (action: ActionValue<TemplateActionArgs>, write: boolean): Promise<void> => {
            if (!editor) {
                return;
            }
            const exported = await exportDesign(editor);
            // Running the save action after a refused write would commit the
            // object as if the template had been stored.
            if (write && !writeAttributes(exported)) {
                return;
            }
            execute(action, { html__: exported.html, json__: exported.json });
        },
        [editor, exportDesign, writeAttributes]
    );

    const error = optionsError ?? loadError;

    return (
        <div className={classNames("react-email-editor-div", props.class)} style={props.style}>
            <Toolbar
                ready={editor !== null}
                readOnly={readOnly}
                canSave={canWriteTemplate(JSONTemplate, loadError)}
                canExport={!loadError}
                preview={
                    props.isShowPreview
                        ? {
                              caption: previewing
                                  ? props.hidePreviewCaption?.value || "Hide Preview"
                                  : props.showPreviewCaption?.value || "Show Preview",
                              previewing,
                              onClick: togglePreview
                          }
                        : undefined
                }
                exportHtml={
                    props.isShowExportHtml && props.exportHTMLAction
                        ? {
                              caption: props.exportHtmlCaption?.value || "Export HTML",
                              action: props.exportHTMLAction,
                              onClick: () => runAction(props.exportHTMLAction!, false)
                          }
                        : undefined
                }
                saveTemplate={
                    props.isShowSaveTemplate && props.saveTemplateAction
                        ? {
                              caption: props.saveTemplateCaption?.value || "Save Template",
                              action: props.saveTemplateAction,
                              onClick: () => runAction(props.saveTemplateAction!, true)
                          }
                        : undefined
                }
            />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <EmailEditor
                ref={emailEditorRef}
                onReady={onReady}
                minHeight={props.editorHeight || "700px"}
                options={options}
                scriptUrl={props.scriptUrl?.trim() || undefined}
            />
        </div>
    );
}
