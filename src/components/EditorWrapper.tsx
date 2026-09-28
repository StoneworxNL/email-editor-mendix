import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActionValue, ValueStatus } from "mendix";
import EmailEditor, { EditorRef } from "react-email-editor";
import classNames from "classnames";

import { ReactEmailEditorContainerProps } from "../../typings/ReactEmailEditorProps";
import { buildOptions, Editor, parseAdvancedOptions, parseDesign } from "../utils/editorOptions";
import { registerImageUpload } from "../utils/imageUpload";
import { buildMergeTags } from "../utils/mergeTags";
import { canWriteTemplate } from "../utils/templateAttribute";
import { TemplateActionArgs, Toolbar } from "./Toolbar";

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;

type Exported = { html: string; json: string };

export function EditorWrapper(props: ReactEmailEditorContainerProps): ReactElement {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions } = props;
    const emailEditorRef = useRef<EditorRef>(null);
    const [editor, setEditor] = useState<Editor | null>(null);
    const [loadError, setLoadError] = useState<string>();
    // Read by the save-on-change timer, which can fire before the render that
    // follows setLoadError.
    const loadErrorRef = useRef<string>();
    const reportLoadError = useCallback((message: string | undefined) => {
        loadErrorRef.current = message;
        setLoadError(message);
    }, []);

    // Unlayer calls handlers registered once per editor; they read the latest
    // props through this ref instead of the render they were created in.
    const propsRef = useRef(props);
    propsRef.current = props;

    // The last design string the editor loaded or produced. When the attribute
    // changes to this value (because we wrote it) there is nothing to reload, and
    // reloading would throw away the user's undo history and selection.
    const syncedJson = useRef<string>();

    const saveTimer = useRef<ReturnType<typeof setTimeout>>();
    // The editor is destroyed on unmount; a pending save would call into it.
    useEffect(() => () => clearTimeout(saveTimer.current), []);

    const readOnly = JSONTemplate.readOnly;

    const { options: advanced, error: optionsError } = useMemo(
        () => parseAdvancedOptions(advancedOptions),
        [advancedOptions]
    );
    const options = useMemo(
        () => buildOptions(advanced, projectId, theme, imageUploadMode),
        [advanced, projectId, theme, imageUploadMode]
    );

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
            const { imageUploadUrl } = propsRef.current;
            if (propsRef.current.imageUploadMode === "endpoint" && imageUploadUrl) {
                registerImageUpload(unlayer, imageUploadUrl);
            }

            unlayer.addEventListener("design:updated", () => {
                const current = propsRef.current;
                if (!current.saveOnChange || !canWriteTemplate(current.JSONTemplate, loadErrorRef.current)) {
                    return;
                }
                clearTimeout(saveTimer.current);
                saveTimer.current = setTimeout(() => {
                    exportDesign(unlayer).then(writeAttributes);
                }, SAVE_ON_CHANGE_DELAY_MS);
            });

            // A new editor starts blank, so whatever it had loaded is gone.
            syncedJson.current = undefined;
            setEditor(unlayer);
        },
        [exportDesign, writeAttributes]
    );

    // The editor is recreated when its options change; forget the old one.
    useEffect(() => setEditor(null), [options]);

    // Load the design from the attribute, once the editor and the value are ready.
    const jsonStatus = JSONTemplate.status;
    const jsonValue = JSONTemplate.value ?? "";
    useEffect(() => {
        if (!editor || jsonStatus !== ValueStatus.Available) {
            return;
        }
        // An empty value never clears the editor. It is what a rollback of a new
        // object produces, for instance when a pop-up opened by the save action is
        // closed, and clearing would throw away everything the user made.
        if (jsonValue === "") {
            reportLoadError(undefined);
            return;
        }
        if (jsonValue === syncedJson.current) {
            return;
        }
        syncedJson.current = jsonValue;
        const { design, error } = parseDesign(jsonValue);
        reportLoadError(error);
        if (design) {
            editor.loadDesign(design as Parameters<Editor["loadDesign"]>[0]);
        } else {
            console.error(`ReactEmailEditor: ${error}`);
        }
    }, [editor, jsonStatus, jsonValue, reportLoadError]);

    // Read-only: show the design as a preview rather than an editor.
    const previewShown = useRef(false);
    useEffect(() => {
        if (!editor) {
            previewShown.current = false;
            return;
        }
        if (readOnly && !previewShown.current) {
            editor.showPreview("desktop");
            previewShown.current = true;
        } else if (!readOnly && previewShown.current) {
            editor.hidePreview();
            previewShown.current = false;
        }
    }, [editor, readOnly]);

    const locale = props.locale?.value;
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
            if (action.canExecute && !action.isExecuting) {
                action.execute({ html__: exported.html, json__: exported.json });
            }
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
            />
        </div>
    );
}
