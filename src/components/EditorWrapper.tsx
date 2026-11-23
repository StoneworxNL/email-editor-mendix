import { ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ActionValue, ValueStatus } from "mendix";
import EmailEditor, { EditorRef } from "react-email-editor";
import classNames from "classnames";

import { DisplayModeEnum, ReactEmailEditorContainerProps } from "../../typings/ReactEmailEditorProps";
import { buildOptions, checkScriptUrl, Editor, parseAdvancedOptions, parseDesign } from "../utils/editorOptions";
import { registerImageUpload } from "../utils/imageUpload";
import { buildMergeTags } from "../utils/mergeTags";
import { canWriteTemplate } from "../utils/templateAttribute";
import { TemplateActionArgs, Toolbar } from "./Toolbar";

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;

/**
 * How long a click on the page waits for the last edit to be written. Unlayer
 * answers within milliseconds; this only keeps the page usable if it never does.
 */
const HOLD_CLICK_MAX_MS = 2000;

/** Unlayer's desktop preview width, and the room its preview frame takes around it. */
const DESKTOP_PREVIEW_WIDTH = 1280;
const PREVIEW_FRAME_PX = 100;

/**
 * Unlayer previews desktop at 1280px wide, so in a narrower editor its preview
 * scrolls sideways as well as the email scrolling down: two scrollbars. Show it
 * at the width that fits instead; Unlayer's own width menu still offers 1280px.
 */
export function desktopPreviewResolution(editorWidth: number | undefined): number | undefined {
    if (!editorWidth) {
        return undefined;
    }
    const fits = Math.floor(editorWidth - PREVIEW_FRAME_PX);
    return fits < DESKTOP_PREVIEW_WIDTH ? Math.max(fits, 320) : undefined;
}

/** Elements that Enter or Space activate. */
const ACTIVATORS =
    'button, a[href], input[type="button"], input[type="submit"], input[type="reset"], [role="button"], [role="link"], [role="menuitem"], [role="tab"]';

/** Clicks and keys the widget repeats after holding them back; they pass straight through. */
const replayed = new WeakSet<Event>();

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

    // Save-on-change waits for a pause in editing (saveTimer), then saves. Leaving
    // the editor saves at once (see saveNow). Cancelling bumps the generation, so
    // a save whose export is still under way when the object changes writes
    // nothing either.
    const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    /** Unlayer reported an edit that has not been saved yet. */
    const editPending = useRef(false);
    /**
     * The user may have edited without Unlayer reporting it yet: it reports an
     * edit about 300 ms after typing stops. True while focus is in the editor,
     * and until the next save after it left.
     */
    const maybeEdited = useRef(false);
    const saveGeneration = useRef(0);
    /** A save-on-change whose export is under way and will write the attributes. */
    const writing = useRef<Promise<void> | undefined>(undefined);
    /** The editor that is on screen, for saves started from outside it. */
    const liveEditor = useRef<Editor | null>(null);
    useLayoutEffect(() => {
        liveEditor.current = editor;
    }, [editor]);
    const containerRef = useRef<HTMLDivElement>(null);

    const cancelSave = useCallback(() => {
        clearTimeout(saveTimer.current);
        saveTimer.current = undefined;
        editPending.current = false;
        saveGeneration.current++;
    }, []);

    /**
     * Export the design, write it and run On change, unless it is the design the
     * widget last loaded or wrote: Unlayer reports some edits only after they
     * were saved, and the user may have changed nothing at all.
     */
    const startSave = useCallback(
        (unlayer: Editor): void => {
            const generation = saveGeneration.current;
            const saving = exportDesign(unlayer).then(exported => {
                if (generation !== saveGeneration.current) {
                    return;
                }
                const latest = propsRef.current;
                if (exported.json === syncedJson.current) {
                    return;
                }
                if (latest.saveOnChange) {
                    writeAttributes(exported);
                }
                execute(latest.onDesignChangeAction, { html__: exported.html, json__: exported.json });
            });
            if (propsRef.current.saveOnChange) {
                writing.current = saving;
                saving.finally(() => {
                    if (writing.current === saving) {
                        writing.current = undefined;
                    }
                });
            }
        },
        [exportDesign, writeAttributes]
    );

    /**
     * Save now: a reported edit, or anything the user may have edited. While
     * focus is on the widget's own buttons nothing happens (their actions export
     * the design themselves), unless the save-on-change delay has ended.
     */
    const saveNow = useCallback(
        (delayEnded?: unknown): void => {
            const active = document.activeElement;
            const inWidget = !!active && !!containerRef.current?.contains(active);
            const focusInEditor = inWidget && active?.tagName === "IFRAME";
            if (inWidget && !focusInEditor && delayEnded !== true) {
                return;
            }
            clearTimeout(saveTimer.current);
            saveTimer.current = undefined;
            const unlayer = liveEditor.current;
            const reported = editPending.current;
            const unreported = (maybeEdited.current || focusInEditor) && propsRef.current.saveOnChange;
            editPending.current = false;
            maybeEdited.current = focusInEditor;
            if (unlayer && (reported || unreported)) {
                startSave(unlayer);
            }
        },
        [startSave]
    );
    // The editor is destroyed on unmount; a pending save would call into it.
    useEffect(() => cancelSave, [cancelSave]);

    const onReady = useCallback(
        (unlayer: Editor) => {
            unlayer.addEventListener("design:updated", () => {
                const current = propsRef.current;
                const write = current.saveOnChange && canWriteTemplate(current.JSONTemplate, loadErrorRef.current);
                if (!write && !current.onDesignChangeAction) {
                    return;
                }
                clearTimeout(saveTimer.current);
                editPending.current = true;
                saveTimer.current = setTimeout(() => saveNow(true), SAVE_ON_CHANGE_DELAY_MS);
            });

            unlayer.addEventListener("design:loaded", () => execute(propsRef.current.onDesignLoadAction));

            // A new editor starts blank, so whatever it had loaded is gone.
            syncedJson.current = undefined;
            setReady({ editor: unlayer, options: optionsRef.current });
            execute(propsRef.current.onReadyAction);
        },
        [saveNow]
    );

    // Leaving the editor saves at once, so a Save button on the page commits the
    // last edit: the pointer leaving the widget, focus leaving it (keyboard, or
    // the page getting focus back from Unlayer's iframe), a press anywhere else
    // on the page (edits inside the iframe never reach this document), or the
    // page being hidden.
    useEffect(() => {
        const container = containerRef.current;
        const onVisibilityChange = (): void => {
            if (document.visibilityState === "hidden") {
                saveNow();
            }
        };
        // The page gets focus back before the element that takes it is known, so
        // look once focus has settled: on the widget's own buttons it saves nothing.
        let focusTimer: ReturnType<typeof setTimeout> | undefined;
        const onWindowFocus = (): void => {
            clearTimeout(focusTimer);
            focusTimer = setTimeout(saveNow);
        };
        // Focus moving to the widget's own buttons is not leaving it.
        const onFocusOut = (event: FocusEvent): void => {
            if (!(event.relatedTarget instanceof Node && container?.contains(event.relatedTarget))) {
                saveNow();
            }
        };
        // A press on the widget's own buttons is theirs to handle.
        const onPointerDown = (event: PointerEvent): void => {
            if (!(event.target instanceof Node && container?.contains(event.target))) {
                saveNow();
            }
        };
        // Clicking into Unlayer's iframe fires no focus event on this page, only
        // blur on its window.
        const onWindowBlur = (): void => {
            if (container?.contains(document.activeElement)) {
                maybeEdited.current = true;
            }
        };
        // Unlayer exports asynchronously, so a click on the page (a Save button)
        // can arrive before the last edit is written. Such a click is held back
        // until the write is done and then repeated once on the same element, so
        // the page's action always sees the last edit. Mendix buttons act on
        // Enter and Space themselves, without a click event, so those keys are
        // held the same way when they activate something outside the widget.
        const holdUntilWritten = (event: Event, replay: Event, then?: (handled: boolean) => void): void => {
            if (replayed.has(event) || !(event.target instanceof Element) || container?.contains(event.target)) {
                return;
            }
            saveNow();
            const saving = writing.current;
            if (!saving) {
                return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            const target = event.target;
            replayed.add(replay);
            let timer: ReturnType<typeof setTimeout> | undefined;
            const giveUp = new Promise<void>(resolve => {
                timer = setTimeout(() => {
                    console.warn("ReactEmailEditor: the last edit was not written in time; the page goes ahead.");
                    resolve();
                }, HOLD_CLICK_MAX_MS);
            });
            Promise.race([saving, giveUp]).then(() => {
                clearTimeout(timer);
                if (target.isConnected) {
                    const handled = !target.dispatchEvent(replay);
                    then?.(handled);
                }
            });
        };
        const onClick = (event: MouseEvent): void => holdUntilWritten(event, new MouseEvent("click", event));
        const onKeyDown = (event: KeyboardEvent): void => {
            const target = event.target;
            if ((event.key !== "Enter" && event.key !== " ") || !(target instanceof Element)) {
                return;
            }
            const activator = target.closest(ACTIVATORS);
            if (!activator) {
                return;
            }
            // A repeated keydown has no default action, so when no handler on the
            // page used it, do what the browser would have done: click.
            holdUntilWritten(event, new KeyboardEvent("keydown", event), handled => {
                if (!handled && activator instanceof HTMLElement) {
                    activator.click();
                }
            });
        };
        container?.addEventListener("pointerleave", saveNow);
        container?.addEventListener("focusout", onFocusOut);
        window.addEventListener("blur", onWindowBlur);
        window.addEventListener("focus", onWindowFocus);
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("click", onClick, true);
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => {
            container?.removeEventListener("pointerleave", saveNow);
            container?.removeEventListener("focusout", onFocusOut);
            window.removeEventListener("blur", onWindowBlur);
            clearTimeout(focusTimer);
            window.removeEventListener("focus", onWindowFocus);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("click", onClick, true);
            document.removeEventListener("keydown", onKeyDown, true);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [saveNow]);

    // Load the design from the attribute, once the editor and the value are ready.
    useEffect(() => {
        // A value the widget did not write means another object, or a change made
        // elsewhere. A pending save-on-change belongs to what was there before and
        // must not be written into this one.
        if (jsonStatus !== ValueStatus.Available || jsonValue !== syncedJson.current) {
            cancelSave();
        }
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
    }, [editor, jsonStatus, jsonValue, parsed, cancelSave]);

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
            const resolution =
                previewDevice === "desktop"
                    ? desktopPreviewResolution(
                          (containerRef.current?.querySelector("iframe") ?? containerRef.current)?.clientWidth
                      )
                    : undefined;
            editor.showPreview(resolution ? { device: previewDevice, resolution } : previewDevice);
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

    // A toolbar action is running from the click until its Mendix action starts
    // (isExecuting only flips after that), so a double click runs it once.
    const actionRunning = useRef(false);
    const runAction = useCallback(
        async (action: ActionValue<TemplateActionArgs>, write: boolean): Promise<void> => {
            if (!editor || actionRunning.current) {
                return;
            }
            actionRunning.current = true;
            try {
                const exported = await exportDesign(editor);
                // Running the save action after a refused write would commit the
                // object as if the template had been stored.
                if (write && !writeAttributes(exported)) {
                    return;
                }
                execute(action, { html__: exported.html, json__: exported.json });
            } finally {
                actionRunning.current = false;
            }
        },
        [editor, exportDesign, writeAttributes]
    );

    // A script from anywhere else would run with the user's session; refuse to
    // load the editor rather than quietly fall back to Unlayer's own script.
    const scriptUrlError = checkScriptUrl(props.scriptUrl);
    const error = optionsError ?? scriptUrlError ?? loadError;

    return (
        <div ref={containerRef} className={classNames("react-email-editor-div", props.class)} style={props.style}>
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
            {!scriptUrlError && (
                <EmailEditor
                    ref={emailEditorRef}
                    onReady={onReady}
                    minHeight={props.editorHeight || "700px"}
                    options={options}
                    scriptUrl={props.scriptUrl?.trim() || undefined}
                />
            )}
        </div>
    );
}
