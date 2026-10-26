import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState, useImperativeHandle, useRef, useEffect, useMemo, useLayoutEffect, useCallback } from 'react';

// package.json
var name = "react-email-editor";
var version = "2.1.3";

// src/loadScript.ts
var defaultScriptUrl = "https://editor.unlayer.com/embed.js?2";
var callbacks = [];
var loaded = false;
var findScript = scriptUrl => {
  const scripts = document.querySelectorAll("script");
  let found = null;
  scripts.forEach(script => {
    if (script.src.includes(scriptUrl)) {
      found = script;
    }
  });
  return found;
};
var isEmbedReady = () => loaded || typeof unlayer !== "undefined";
var addCallback = callback => {
  callbacks.push(callback);
};
var runCallbacks = () => {
  if (isEmbedReady()) {
    loaded = true;
    let callback;
    while (callback = callbacks.shift()) {
      callback();
    }
  }
};
var loadScript = (callback, scriptUrl = defaultScriptUrl) => {
  addCallback(callback);
  const existingScript = findScript(scriptUrl);
  if (!existingScript) {
    const embedScript = document.createElement("script");
    embedScript.setAttribute("src", scriptUrl);
    embedScript.onload = () => {
      loaded = true;
      runCallbacks();
    };
    document.head.appendChild(embedScript);
    return;
  }
  if (isEmbedReady()) {
    runCallbacks();
  } else {
    existingScript.addEventListener("load", () => {
      loaded = true;
      runCallbacks();
    });
  }
};

// src/EmailEditor.tsx
var win = typeof window === "undefined" ? {
  __unlayer_lastEditorId: 0
} : window;
win.__unlayer_lastEditorId = win.__unlayer_lastEditorId || 0;
var useCounterEditorId = () => useMemo(() => `editor-${++win.__unlayer_lastEditorId}`, []);
var useGeneratedEditorId = typeof React.useId === "function" ?
// Strip ':' so the id is a valid CSS selector for unlayer.createEditor.
() => `editor-${React.useId().replace(/:/g, "")}` : useCounterEditorId;
function EmailEditorInner(props, ref) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const {
    onLoad,
    onReady,
    scriptUrl,
    minHeight = 500,
    style = {}
  } = props;
  const [editor, setEditor] = useState(null);
  const [hasLoadedEmbedScript, setHasLoadedEmbedScript] = useState(false);
  const generatedId = useGeneratedEditorId();
  const editorId = props.editorId || generatedId;
  const options = {
    ...(props.options || {}),
    appearance: (_b = props.appearance) != null ? _b : (_a = props.options) == null ? void 0 : _a.appearance,
    displayMode: (props == null ? void 0 : props.displayMode) || ((_c = props.options) == null ? void 0 : _c.displayMode) || "email",
    locale: (_e = props.locale) != null ? _e : (_d = props.options) == null ? void 0 : _d.locale,
    projectId: (_g = props.projectId) != null ? _g : (_f = props.options) == null ? void 0 : _f.projectId,
    tools: (_i = props.tools) != null ? _i : (_h = props.options) == null ? void 0 : _h.tools,
    id: editorId,
    source: {
      name,
      version
    }
  };
  useImperativeHandle(ref, () => ({
    editor
  }), [editor]);
  const editorRef = useRef(editor);
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);
  useEffect(() => {
    return () => {
      var _a2;
      (_a2 = editorRef.current) == null ? void 0 : _a2.destroy();
    };
  }, []);
  useEffect(() => {
    setHasLoadedEmbedScript(false);
    loadScript(() => setHasLoadedEmbedScript(true), scriptUrl);
  }, [scriptUrl]);
  useEffect(() => {
    if (!hasLoadedEmbedScript) return;
    editor == null ? void 0 : editor.destroy();
    setEditor(unlayer.createEditor(options));
  }, [JSON.stringify(options), hasLoadedEmbedScript]);
  const methodProps = Object.keys(props).filter(propName => /^on/.test(propName));
  useEffect(() => {
    if (!editor) return;
    onLoad == null ? void 0 : onLoad(editor);
    methodProps.forEach(methodProp => {
      if (/^on/.test(methodProp) && methodProp !== "onLoad" && methodProp !== "onReady" && typeof props[methodProp] === "function") {
        editor.addEventListener(methodProp, props[methodProp]);
      }
    });
    if (onReady) {
      editor.addEventListener("editor:ready", () => {
        onReady(editor);
      });
    }
  }, [editor, methodProps.join(",")]);
  return /* @__PURE__ */React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      minHeight
    }
  }, /* @__PURE__ */React.createElement("div", {
    id: editorId,
    style: {
      ...style,
      flex: 1
    }
  }));
}
var EmailEditor = React.forwardRef(EmailEditorInner);

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames.exports;
	hasRequiredClassnames = 1;
	(function (module) {
		/* global define */

		(function () {

		  var hasOwn = {}.hasOwnProperty;
		  function classNames() {
		    var classes = '';
		    for (var i = 0; i < arguments.length; i++) {
		      var arg = arguments[i];
		      if (arg) {
		        classes = appendClass(classes, parseValue(arg));
		      }
		    }
		    return classes;
		  }
		  function parseValue(arg) {
		    if (typeof arg === 'string' || typeof arg === 'number') {
		      return arg;
		    }
		    if (typeof arg !== 'object') {
		      return '';
		    }
		    if (Array.isArray(arg)) {
		      return classNames.apply(null, arg);
		    }
		    if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
		      return arg.toString();
		    }
		    var classes = '';
		    for (var key in arg) {
		      if (hasOwn.call(arg, key) && arg[key]) {
		        classes = appendClass(classes, key);
		      }
		    }
		    return classes;
		  }
		  function appendClass(value, newClass) {
		    if (!newClass) {
		      return value;
		    }
		    if (value) {
		      return value + ' ' + newClass;
		    }
		    return value + newClass;
		  }
		  if (module.exports) {
		    classNames.default = classNames;
		    module.exports = classNames;
		  } else {
		    window.classNames = classNames;
		  }
		})(); 
	} (classnames));
	return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

/**
 * Parse the "Advanced options (JSON)" property. Returns an error message instead
 * of throwing, so a typo in Studio Pro shows up as a message, not a dead page.
 */
function parseAdvancedOptions(json) {
    if (!json || !json.trim()) {
        return { options: {} };
    }
    try {
        const parsed = JSON.parse(json);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return { options: {}, error: "Advanced options must be a JSON object." };
        }
        return { options: parsed };
    }
    catch (e) {
        return { options: {}, error: `Advanced options are not valid JSON: ${e.message}` };
    }
}
/**
 * Everything in here must be stable: react-email-editor destroys and recreates
 * the editor, losing unsaved work, whenever the serialized options change. Values
 * that can change at runtime (locale, merge tags) go through the editor API.
 */
function buildOptions(advanced, projectId, theme, imageUploadMode, displayMode = "email", version = "") {
    // Display mode and version come before the advanced options, so apps that
    // already set them there keep what they had.
    const options = {
        displayMode,
        ...(version.trim() ? { version: version.trim() } : {}),
        ...advanced,
        appearance: { ...advanced.appearance, theme }
    };
    if (projectId > 0) {
        options.projectId = projectId;
    }
    if (imageUploadMode === "disabled") {
        options.features = { ...advanced.features, userUploads: false };
    }
    return options;
}
function parseDesign(json) {
    try {
        const design = JSON.parse(json);
        if (!design || typeof design !== "object") {
            return { error: "The saved template is not a JSON object." };
        }
        return { design };
    }
    catch (e) {
        return { error: `The saved template could not be read: ${e.message}` };
    }
}

/**
 * Mendix published REST services that use the active session for authentication
 * reject requests without the session's CSRF token.
 */
function csrfHeaders() {
    const token = window.mx?.session?.getConfig?.("csrftoken");
    return typeof token === "string" ? { "X-Csrf-Token": token } : {};
}
/**
 * Upload images to the app's own endpoint instead of Unlayer's storage. The
 * endpoint receives multipart/form-data with the image in a part named "file"
 * and must answer with JSON containing the public "url" of the stored image.
 */
function registerImageUpload(editor, uploadUrl) {
    const upload = (file, done) => {
        const image = file.attachments[0];
        if (!image) {
            done({ abort: true });
            return;
        }
        const body = new FormData();
        body.append("file", image);
        done({ progress: 10 });
        fetch(uploadUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: { Accept: "application/json", ...csrfHeaders() },
            body
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(`Upload failed with HTTP ${response.status}`);
            }
            return response.json();
        })
            .then((data) => {
            if (typeof data?.url !== "string" || !data.url) {
                throw new Error('Upload response has no "url"');
            }
            done({ progress: 100, url: data.url });
        })
            .catch((e) => {
            console.error("ReactEmailEditor: image upload failed.", e);
            done({ error: e.message });
        });
    };
    editor.registerCallback("image", upload);
}

/**
 * Turn the merge tag datasource into Unlayer's merge tag map. Returns undefined
 * while the list is loading, so the editor keeps what it has until then.
 */
function buildMergeTags(source, name, value, sample) {
    if (!source || !name || !value) {
        return undefined;
    }
    if (source.status !== "available" /* ValueStatus.Available */ || !source.items) {
        return undefined;
    }
    const tags = {};
    source.items.forEach((item, index) => {
        const tagName = name.get(item).value;
        const tagValue = value.get(item).value;
        if (!tagName || !tagValue) {
            return;
        }
        const tagSample = sample?.get(item).value;
        tags[`tag_${index}`] = tagSample
            ? { name: tagName, value: tagValue, sample: tagSample }
            : { name: tagName, value: tagValue };
    });
    return tags;
}

/**
 * Whether the editor may write its design to the template attribute.
 *
 * Only when Mendix has the attribute (a loading or unavailable attribute
 * accepts setValue and stores nothing), it is editable, and the stored value
 * was understood. A stored template that failed to load is not in the editor,
 * so writing the editor's content would replace it with whatever is on screen.
 */
function canWriteTemplate(attribute, loadError) {
    return attribute.status === "available" /* ValueStatus.Available */ && !attribute.readOnly && !loadError;
}

function ActionButton({ button, disabled }) {
    const busy = button.action.isExecuting;
    return (jsx("button", { type: "button", className: "btn mx-button btn-default", disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick, children: button.caption }));
}
function Toolbar({ ready, readOnly, canSave, preview, exportHtml, saveTemplate }) {
    // A read-only editor always previews, and saving from it would store nothing
    // the user could change.
    const showPreview = preview && !readOnly;
    const showSave = saveTemplate && !readOnly;
    if (!showPreview && !exportHtml && !showSave) {
        return null;
    }
    return (jsxs("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium", children: [showPreview && (jsx("button", { type: "button", className: "btn mx-button btn-default", disabled: !ready, "aria-pressed": preview.previewing, onClick: preview.onClick, children: preview.caption })), exportHtml && jsx(ActionButton, { button: exportHtml, disabled: !ready }), showSave && jsx(ActionButton, { button: saveTemplate, disabled: !ready || !canSave })] }));
}

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;
function execute(action, args) {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute(args);
    }
}
function EditorWrapper(props) {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions, displayMode, editorVersion } = props;
    const emailEditorRef = useRef(null);
    const { options: advanced, error: optionsError } = useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
    const options = useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode, displayMode, editorVersion), [advanced, projectId, theme, imageUploadMode, displayMode, editorVersion]);
    // The editor is recreated when its options change. Remember which options
    // the ready editor was made with, so the old one is forgotten at once.
    const [ready, setReady] = useState(null);
    const editor = ready?.options === options ? ready.editor : null;
    // An empty value never clears the editor (see below), so it is no error either.
    const jsonStatus = JSONTemplate.status;
    const jsonValue = JSONTemplate.value ?? "";
    const parsed = useMemo(() => (jsonStatus === "available" /* ValueStatus.Available */ && jsonValue !== "" ? parseDesign(jsonValue) : {}), [jsonStatus, jsonValue]);
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
    const syncedJson = useRef(undefined);
    const saveTimer = useRef(undefined);
    // The editor is destroyed on unmount; a pending save would call into it.
    useEffect(() => () => clearTimeout(saveTimer.current), []);
    const readOnly = JSONTemplate.readOnly;
    const exportDesign = useCallback((unlayer) => {
        return new Promise(resolve => {
            unlayer.exportHtml(data => {
                resolve({ html: data.html, json: JSON.stringify(data.design) });
            });
        });
    }, []);
    /** Write the design to the attributes, if they can be written. Returns whether it did. */
    const writeAttributes = useCallback(({ html, json }) => {
        const { JSONTemplate: jsonAttr, HTMLBody: htmlAttr } = propsRef.current;
        if (!canWriteTemplate(jsonAttr, loadErrorRef.current)) {
            return false;
        }
        syncedJson.current = json;
        jsonAttr.setValue(json);
        if (htmlAttr && htmlAttr.status === "available" /* ValueStatus.Available */ && !htmlAttr.readOnly) {
            htmlAttr.setValue(html);
        }
        return true;
    }, []);
    const onReady = useCallback((unlayer) => {
        const { imageUploadUrl } = propsRef.current;
        if (propsRef.current.imageUploadMode === "endpoint" && imageUploadUrl) {
            registerImageUpload(unlayer, imageUploadUrl);
        }
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
    }, [exportDesign, writeAttributes]);
    // Load the design from the attribute, once the editor and the value are ready.
    useEffect(() => {
        // An empty value never clears the editor. It is what a rollback of a new
        // object produces, for instance when a pop-up opened by the save action is
        // closed, and clearing would throw away everything the user made.
        if (!editor || jsonStatus !== "available" /* ValueStatus.Available */ || jsonValue === "") {
            return;
        }
        if (jsonValue === syncedJson.current) {
            return;
        }
        syncedJson.current = jsonValue;
        if (parsed.design) {
            editor.loadDesign(parsed.design);
        }
        else {
            console.error(`ReactEmailEditor: ${parsed.error}`);
        }
    }, [editor, jsonStatus, jsonValue, parsed]);
    // Whether the preview is showing: always when the editor is read-only,
    // otherwise when the user switched it on for this editor.
    const [previewToggledFor, setPreviewToggledFor] = useState(null);
    const previewing = editor !== null && (readOnly || previewToggledFor === editor);
    const previewDevice = props.previewDevice ?? "desktop";
    // Show or hide Unlayer's preview to match. A new editor starts without one.
    const previewShownIn = useRef(null);
    useEffect(() => {
        if (!editor) {
            return;
        }
        if (previewing) {
            editor.showPreview(previewDevice);
            previewShownIn.current = editor;
        }
        else if (previewShownIn.current === editor) {
            editor.hidePreview();
            previewShownIn.current = null;
        }
    }, [editor, previewing, previewDevice]);
    const togglePreview = useCallback(() => {
        setPreviewToggledFor(previewing ? null : editor);
    }, [editor, previewing]);
    const locale = props.locale?.value;
    useEffect(() => {
        if (editor && locale !== undefined) {
            editor.setLocale(locale || null);
        }
    }, [editor, locale]);
    // Mendix hands out new list objects on re-renders; compare by content so the
    // editor is only told when the tags really change.
    const mergeTags = JSON.stringify(buildMergeTags(props.mergeTags, props.mergeTagName, props.mergeTagValue, props.mergeTagSample) ?? null);
    useEffect(() => {
        if (editor && mergeTags !== "null") {
            editor.setMergeTags(JSON.parse(mergeTags));
        }
    }, [editor, mergeTags]);
    const runAction = useCallback(async (action, write) => {
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
    }, [editor, exportDesign, writeAttributes]);
    const error = optionsError ?? loadError;
    return (jsxs("div", { className: classNames("react-email-editor-div", props.class), style: props.style, children: [jsx(Toolbar, { ready: editor !== null, readOnly: readOnly, canSave: canWriteTemplate(JSONTemplate, loadError), preview: props.isShowPreview
                    ? {
                        caption: previewing
                            ? props.hidePreviewCaption?.value || "Hide Preview"
                            : props.showPreviewCaption?.value || "Show Preview",
                        previewing,
                        onClick: togglePreview
                    }
                    : undefined, exportHtml: props.isShowExportHtml && props.exportHTMLAction
                    ? {
                        caption: props.exportHtmlCaption?.value || "Export HTML",
                        action: props.exportHTMLAction,
                        onClick: () => runAction(props.exportHTMLAction, false)
                    }
                    : undefined, saveTemplate: props.isShowSaveTemplate && props.saveTemplateAction
                    ? {
                        caption: props.saveTemplateCaption?.value || "Save Template",
                        action: props.saveTemplateAction,
                        onClick: () => runAction(props.saveTemplateAction, true)
                    }
                    : undefined }), error && (jsx("div", { className: "alert alert-danger", role: "alert", children: error })), jsx(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: props.editorHeight || "700px", options: options, scriptUrl: props.scriptUrl?.trim() || undefined })] }));
}

function ReactEmailEditor(props) {
    return jsx(EditorWrapper, { ...props });
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9lZGl0b3JPcHRpb25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2ltYWdlVXBsb2FkLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21lcmdlVGFncy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZS50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Rvb2xiYXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlLFxuICB1c2VNZW1vXG59IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBwYWNrYWdlLmpzb25cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIyLjEuM1wiO1xuXG4vLyBzcmMvbG9hZFNjcmlwdC50c1xudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSBcImh0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzJcIjtcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBmaW5kU2NyaXB0ID0gKHNjcmlwdFVybCkgPT4ge1xuICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFwiKTtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XG4gICAgICBmb3VuZCA9IHNjcmlwdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xudmFyIGlzRW1iZWRSZWFkeSA9ICgpID0+IGxvYWRlZCB8fCB0eXBlb2YgdW5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBhZGRDYWxsYmFjayA9IChjYWxsYmFjaykgPT4ge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9ICgpID0+IHtcbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgbG9hZGVkID0gdHJ1ZTtcbiAgICBsZXQgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSAoY2FsbGJhY2ssIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmwpID0+IHtcbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGZpbmRTY3JpcHQoc2NyaXB0VXJsKTtcbiAgaWYgKCFleGlzdGluZ1NjcmlwdCkge1xuICAgIGNvbnN0IGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc2NyaXB0VXJsKTtcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgZXhpc3RpbmdTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgX191bmxheWVyX2xhc3RFZGl0b3JJZDogMCB9IDogd2luZG93O1xud2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xudmFyIHVzZUNvdW50ZXJFZGl0b3JJZCA9ICgpID0+IHVzZU1lbW8oKCkgPT4gYGVkaXRvci0keysrd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWR9YCwgW10pO1xudmFyIHVzZUdlbmVyYXRlZEVkaXRvcklkID0gdHlwZW9mIFJlYWN0LnVzZUlkID09PSBcImZ1bmN0aW9uXCIgPyAoXG4gIC8vIFN0cmlwICc6JyBzbyB0aGUgaWQgaXMgYSB2YWxpZCBDU1Mgc2VsZWN0b3IgZm9yIHVubGF5ZXIuY3JlYXRlRWRpdG9yLlxuICAoKSA9PiBgZWRpdG9yLSR7UmVhY3QudXNlSWQoKS5yZXBsYWNlKC86L2csIFwiXCIpfWBcbikgOiB1c2VDb3VudGVyRWRpdG9ySWQ7XG5mdW5jdGlvbiBFbWFpbEVkaXRvcklubmVyKHByb3BzLCByZWYpIHtcbiAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2k7XG4gIGNvbnN0IHsgb25Mb2FkLCBvblJlYWR5LCBzY3JpcHRVcmwsIG1pbkhlaWdodCA9IDUwMCwgc3R5bGUgPSB7fSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZShcbiAgICBudWxsXG4gICk7XG4gIGNvbnN0IFtoYXNMb2FkZWRFbWJlZFNjcmlwdCwgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBnZW5lcmF0ZWRJZCA9IHVzZUdlbmVyYXRlZEVkaXRvcklkKCk7XG4gIGNvbnN0IGVkaXRvcklkID0gcHJvcHMuZWRpdG9ySWQgfHwgZ2VuZXJhdGVkSWQ7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4ucHJvcHMub3B0aW9ucyB8fCB7fSxcbiAgICBhcHBlYXJhbmNlOiAoX2IgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX2IgOiAoX2EgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2EuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfYyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYy5kaXNwbGF5TW9kZSkgfHwgXCJlbWFpbFwiLFxuICAgIGxvY2FsZTogKF9lID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX2UgOiAoX2QgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2QubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9nID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX2cgOiAoX2YgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2YucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX2kgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9pIDogKF9oID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9oLnRvb2xzLFxuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2ZXJzaW9uXG4gICAgfVxuICB9O1xuICB1c2VJbXBlcmF0aXZlSGFuZGxlKFxuICAgIHJlZixcbiAgICAoKSA9PiAoe1xuICAgICAgZWRpdG9yXG4gICAgfSksXG4gICAgW2VkaXRvcl1cbiAgKTtcbiAgY29uc3QgZWRpdG9yUmVmID0gdXNlUmVmKGVkaXRvcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZWRpdG9yUmVmLmN1cnJlbnQgPSBlZGl0b3I7XG4gIH0sIFtlZGl0b3JdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdmFyIF9hMjtcbiAgICAgIChfYTIgPSBlZGl0b3JSZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KCgpID0+IHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpLCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIGNvbnN0IG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihcbiAgICAocHJvcE5hbWUpID0+IC9eb24vLnRlc3QocHJvcE5hbWUpXG4gICk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xuICAgIG1ldGhvZFByb3BzLmZvckVhY2goKG1ldGhvZFByb3ApID0+IHtcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09IFwib25Mb2FkXCIgJiYgbWV0aG9kUHJvcCAhPT0gXCJvblJlYWR5XCIgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvblJlYWR5KSB7XG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImVkaXRvcjpyZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgbWV0aG9kUHJvcHMuam9pbihcIixcIildKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIG1pbkhlaWdodFxuICAgICAgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogZWRpdG9ySWQsIHN0eWxlOiB7IC4uLnN0eWxlLCBmbGV4OiAxIH0gfSlcbiAgKTtcbn1cbnZhciBFbWFpbEVkaXRvciA9IFJlYWN0LmZvcndhcmRSZWYoRW1haWxFZGl0b3JJbm5lcik7XG5leHBvcnQge1xuICBFbWFpbEVkaXRvcixcbiAgRW1haWxFZGl0b3IgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgeyBEaXNwbGF5TW9kZUVudW0sIEltYWdlVXBsb2FkTW9kZUVudW0sIFRoZW1lRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5leHBvcnQgdHlwZSBFZGl0b3IgPSBOb25OdWxsYWJsZTxFZGl0b3JSZWY8RGlzcGxheU1vZGVFbnVtPltcImVkaXRvclwiXT47XG5leHBvcnQgdHlwZSBFZGl0b3JPcHRpb25zID0gTm9uTnVsbGFibGU8RW1haWxFZGl0b3JQcm9wczxEaXNwbGF5TW9kZUVudW0+W1wib3B0aW9uc1wiXT47XG5cbi8qKlxuICogUGFyc2UgdGhlIFwiQWR2YW5jZWQgb3B0aW9ucyAoSlNPTilcIiBwcm9wZXJ0eS4gUmV0dXJucyBhbiBlcnJvciBtZXNzYWdlIGluc3RlYWRcbiAqIG9mIHRocm93aW5nLCBzbyBhIHR5cG8gaW4gU3R1ZGlvIFBybyBzaG93cyB1cCBhcyBhIG1lc3NhZ2UsIG5vdCBhIGRlYWQgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQWR2YW5jZWRPcHRpb25zKGpzb246IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsgb3B0aW9uczogRWRpdG9yT3B0aW9uczsgZXJyb3I/OiBzdHJpbmcgfSB7XG4gICAgaWYgKCFqc29uIHx8ICFqc29uLnRyaW0oKSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3B0aW9uczoge30sIGVycm9yOiBcIkFkdmFuY2VkIG9wdGlvbnMgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgb3B0aW9uczogcGFyc2VkIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IGBBZHZhbmNlZCBvcHRpb25zIGFyZSBub3QgdmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgaW4gaGVyZSBtdXN0IGJlIHN0YWJsZTogcmVhY3QtZW1haWwtZWRpdG9yIGRlc3Ryb3lzIGFuZCByZWNyZWF0ZXNcbiAqIHRoZSBlZGl0b3IsIGxvc2luZyB1bnNhdmVkIHdvcmssIHdoZW5ldmVyIHRoZSBzZXJpYWxpemVkIG9wdGlvbnMgY2hhbmdlLiBWYWx1ZXNcbiAqIHRoYXQgY2FuIGNoYW5nZSBhdCBydW50aW1lIChsb2NhbGUsIG1lcmdlIHRhZ3MpIGdvIHRocm91Z2ggdGhlIGVkaXRvciBBUEkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9wdGlvbnMoXG4gICAgYWR2YW5jZWQ6IEVkaXRvck9wdGlvbnMsXG4gICAgcHJvamVjdElkOiBudW1iZXIsXG4gICAgdGhlbWU6IFRoZW1lRW51bSxcbiAgICBpbWFnZVVwbG9hZE1vZGU6IEltYWdlVXBsb2FkTW9kZUVudW0sXG4gICAgZGlzcGxheU1vZGU6IERpc3BsYXlNb2RlRW51bSA9IFwiZW1haWxcIixcbiAgICB2ZXJzaW9uID0gXCJcIlxuKTogRWRpdG9yT3B0aW9ucyB7XG4gICAgLy8gRGlzcGxheSBtb2RlIGFuZCB2ZXJzaW9uIGNvbWUgYmVmb3JlIHRoZSBhZHZhbmNlZCBvcHRpb25zLCBzbyBhcHBzIHRoYXRcbiAgICAvLyBhbHJlYWR5IHNldCB0aGVtIHRoZXJlIGtlZXAgd2hhdCB0aGV5IGhhZC5cbiAgICBjb25zdCBvcHRpb25zOiBFZGl0b3JPcHRpb25zID0ge1xuICAgICAgICBkaXNwbGF5TW9kZSxcbiAgICAgICAgLi4uKHZlcnNpb24udHJpbSgpID8geyB2ZXJzaW9uOiB2ZXJzaW9uLnRyaW0oKSB9IDoge30pLFxuICAgICAgICAuLi5hZHZhbmNlZCxcbiAgICAgICAgYXBwZWFyYW5jZTogeyAuLi5hZHZhbmNlZC5hcHBlYXJhbmNlLCB0aGVtZSB9XG4gICAgfTtcbiAgICBpZiAocHJvamVjdElkID4gMCkge1xuICAgICAgICBvcHRpb25zLnByb2plY3RJZCA9IHByb2plY3RJZDtcbiAgICB9XG4gICAgaWYgKGltYWdlVXBsb2FkTW9kZSA9PT0gXCJkaXNhYmxlZFwiKSB7XG4gICAgICAgIG9wdGlvbnMuZmVhdHVyZXMgPSB7IC4uLmFkdmFuY2VkLmZlYXR1cmVzLCB1c2VyVXBsb2FkczogZmFsc2UgfTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZERlc2lnbiA9IHsgZGVzaWduPzogb2JqZWN0OyBlcnJvcj86IHN0cmluZyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEZXNpZ24oanNvbjogc3RyaW5nKTogUGFyc2VkRGVzaWduIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkZXNpZ24gPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICBpZiAoIWRlc2lnbiB8fCB0eXBlb2YgZGVzaWduICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogXCJUaGUgc2F2ZWQgdGVtcGxhdGUgaXMgbm90IGEgSlNPTiBvYmplY3QuXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkZXNpZ24gfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiBgVGhlIHNhdmVkIHRlbXBsYXRlIGNvdWxkIG5vdCBiZSByZWFkOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFZGl0b3IgfSBmcm9tIFwiLi9lZGl0b3JPcHRpb25zXCI7XG5cbnR5cGUgSW1hZ2VDYWxsYmFjayA9IFBhcmFtZXRlcnM8RWRpdG9yW1wicmVnaXN0ZXJDYWxsYmFja1wiXT5bMV07XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgbXg/OiB7IHNlc3Npb24/OiB7IGdldENvbmZpZz86IChrZXk6IHN0cmluZykgPT4gdW5rbm93biB9IH07XG4gICAgfVxufVxuXG4vKipcbiAqIE1lbmRpeCBwdWJsaXNoZWQgUkVTVCBzZXJ2aWNlcyB0aGF0IHVzZSB0aGUgYWN0aXZlIHNlc3Npb24gZm9yIGF1dGhlbnRpY2F0aW9uXG4gKiByZWplY3QgcmVxdWVzdHMgd2l0aG91dCB0aGUgc2Vzc2lvbidzIENTUkYgdG9rZW4uXG4gKi9cbmZ1bmN0aW9uIGNzcmZIZWFkZXJzKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIGNvbnN0IHRva2VuID0gd2luZG93Lm14Py5zZXNzaW9uPy5nZXRDb25maWc/LihcImNzcmZ0b2tlblwiKTtcbiAgICByZXR1cm4gdHlwZW9mIHRva2VuID09PSBcInN0cmluZ1wiID8geyBcIlgtQ3NyZi1Ub2tlblwiOiB0b2tlbiB9IDoge307XG59XG5cbi8qKlxuICogVXBsb2FkIGltYWdlcyB0byB0aGUgYXBwJ3Mgb3duIGVuZHBvaW50IGluc3RlYWQgb2YgVW5sYXllcidzIHN0b3JhZ2UuIFRoZVxuICogZW5kcG9pbnQgcmVjZWl2ZXMgbXVsdGlwYXJ0L2Zvcm0tZGF0YSB3aXRoIHRoZSBpbWFnZSBpbiBhIHBhcnQgbmFtZWQgXCJmaWxlXCJcbiAqIGFuZCBtdXN0IGFuc3dlciB3aXRoIEpTT04gY29udGFpbmluZyB0aGUgcHVibGljIFwidXJsXCIgb2YgdGhlIHN0b3JlZCBpbWFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySW1hZ2VVcGxvYWQoZWRpdG9yOiBFZGl0b3IsIHVwbG9hZFVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdXBsb2FkOiBJbWFnZUNhbGxiYWNrID0gKGZpbGU6IHsgYXR0YWNobWVudHM6IEZpbGVbXSB9LCBkb25lOiAocmVzdWx0OiBvYmplY3QpID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWxlLmF0dGFjaG1lbnRzWzBdO1xuICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICBkb25lKHsgYWJvcnQ6IHRydWUgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm9keSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBib2R5LmFwcGVuZChcImZpbGVcIiwgaW1hZ2UpO1xuXG4gICAgICAgIGRvbmUoeyBwcm9ncmVzczogMTAgfSk7XG4gICAgICAgIGZldGNoKHVwbG9hZFVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsIC4uLmNzcmZIZWFkZXJzKCkgfSxcbiAgICAgICAgICAgIGJvZHlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVXBsb2FkIGZhaWxlZCB3aXRoIEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGE6IHsgdXJsPzogdW5rbm93biB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhPy51cmwgIT09IFwic3RyaW5nXCIgfHwgIWRhdGEudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXBsb2FkIHJlc3BvbnNlIGhhcyBubyBcInVybFwiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvbmUoeyBwcm9ncmVzczogMTAwLCB1cmw6IGRhdGEudXJsIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZTogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVhY3RFbWFpbEVkaXRvcjogaW1hZ2UgdXBsb2FkIGZhaWxlZC5cIiwgZSk7XG4gICAgICAgICAgICAgICAgZG9uZSh7IGVycm9yOiBlLm1lc3NhZ2UgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuICAgIGVkaXRvci5yZWdpc3RlckNhbGxiYWNrKFwiaW1hZ2VcIiwgdXBsb2FkKTtcbn1cbiIsImltcG9ydCB7IExpc3RFeHByZXNzaW9uVmFsdWUsIExpc3RWYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5cbmV4cG9ydCB0eXBlIE1lcmdlVGFncyA9IFJlY29yZDxzdHJpbmcsIHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nOyBzYW1wbGU/OiBzdHJpbmcgfT47XG5cbi8qKlxuICogVHVybiB0aGUgbWVyZ2UgdGFnIGRhdGFzb3VyY2UgaW50byBVbmxheWVyJ3MgbWVyZ2UgdGFnIG1hcC4gUmV0dXJucyB1bmRlZmluZWRcbiAqIHdoaWxlIHRoZSBsaXN0IGlzIGxvYWRpbmcsIHNvIHRoZSBlZGl0b3Iga2VlcHMgd2hhdCBpdCBoYXMgdW50aWwgdGhlbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWVyZ2VUYWdzKFxuICAgIHNvdXJjZTogTGlzdFZhbHVlIHwgdW5kZWZpbmVkLFxuICAgIG5hbWU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZCxcbiAgICB2YWx1ZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICAgIHNhbXBsZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkXG4pOiBNZXJnZVRhZ3MgfCB1bmRlZmluZWQge1xuICAgIGlmICghc291cmNlIHx8ICFuYW1lIHx8ICF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnN0YXR1cyAhPT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlIHx8ICFzb3VyY2UuaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgdGFnczogTWVyZ2VUYWdzID0ge307XG4gICAgc291cmNlLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBuYW1lLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdGFnVmFsdWUgPSB2YWx1ZS5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIGlmICghdGFnTmFtZSB8fCAhdGFnVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YWdTYW1wbGUgPSBzYW1wbGU/LmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgdGFnc1tgdGFnXyR7aW5kZXh9YF0gPSB0YWdTYW1wbGVcbiAgICAgICAgICAgID8geyBuYW1lOiB0YWdOYW1lLCB2YWx1ZTogdGFnVmFsdWUsIHNhbXBsZTogdGFnU2FtcGxlIH1cbiAgICAgICAgICAgIDogeyBuYW1lOiB0YWdOYW1lLCB2YWx1ZTogdGFnVmFsdWUgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGFncztcbn1cbiIsImltcG9ydCB7IEVkaXRhYmxlVmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG4vKipcbiAqIFdoZXRoZXIgdGhlIGVkaXRvciBtYXkgd3JpdGUgaXRzIGRlc2lnbiB0byB0aGUgdGVtcGxhdGUgYXR0cmlidXRlLlxuICpcbiAqIE9ubHkgd2hlbiBNZW5kaXggaGFzIHRoZSBhdHRyaWJ1dGUgKGEgbG9hZGluZyBvciB1bmF2YWlsYWJsZSBhdHRyaWJ1dGVcbiAqIGFjY2VwdHMgc2V0VmFsdWUgYW5kIHN0b3JlcyBub3RoaW5nKSwgaXQgaXMgZWRpdGFibGUsIGFuZCB0aGUgc3RvcmVkIHZhbHVlXG4gKiB3YXMgdW5kZXJzdG9vZC4gQSBzdG9yZWQgdGVtcGxhdGUgdGhhdCBmYWlsZWQgdG8gbG9hZCBpcyBub3QgaW4gdGhlIGVkaXRvcixcbiAqIHNvIHdyaXRpbmcgdGhlIGVkaXRvcidzIGNvbnRlbnQgd291bGQgcmVwbGFjZSBpdCB3aXRoIHdoYXRldmVyIGlzIG9uIHNjcmVlbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbldyaXRlVGVtcGxhdGUoYXR0cmlidXRlOiBFZGl0YWJsZVZhbHVlPHN0cmluZz4sIGxvYWRFcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5zdGF0dXMgPT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSAmJiAhYXR0cmlidXRlLnJlYWRPbmx5ICYmICFsb2FkRXJyb3I7XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBPcHRpb24gfSBmcm9tIFwibWVuZGl4XCI7XG5cbi8qKlxuICogVGhlIGFjdGlvbiBhcmd1bWVudHMsIGV4YWN0bHkgYXMgUmVhY3RFbWFpbEVkaXRvci54bWwgZ2VuZXJhdGVzIHRoZW0gaW50b1xuICogdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHMuZC50cy4gU3BlbGxpbmcgdGhlbSBvdXQgb25jZSBrZWVwcyB0aGlzIGZpbGUgYW5kXG4gKiB0aGUgZ2VuZXJhdGVkIHByb3BzIGZyb20gZHJpZnRpbmcgYXBhcnQuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQWN0aW9uQXJncyA9IHsgaHRtbF9fOiBPcHRpb248c3RyaW5nPjsganNvbl9fOiBPcHRpb248c3RyaW5nPiB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJCdXR0b24ge1xuICAgIGNhcHRpb246IHN0cmluZztcbiAgICBhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz47XG4gICAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3VG9nZ2xlIHtcbiAgICAvKiogQ2FwdGlvbiBmb3IgdGhlIGN1cnJlbnQgc3RhdGU6IFwiU2hvdyBQcmV2aWV3XCIgd2hpbGUgZWRpdGluZywgXCJIaWRlIFByZXZpZXdcIiB3aGlsZSBwcmV2aWV3aW5nLiAqL1xuICAgIGNhcHRpb246IHN0cmluZztcbiAgICBwcmV2aWV3aW5nOiBib29sZWFuO1xuICAgIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhclByb3BzIHtcbiAgICAvKiogRmFsc2UgdW50aWwgdGhlIGVkaXRvciBoYXMgbG9hZGVkOyBub3RoaW5nIGNhbiBiZSBleHBvcnRlZCBiZWZvcmUgdGhhdC4gKi9cbiAgICByZWFkeTogYm9vbGVhbjtcbiAgICByZWFkT25seTogYm9vbGVhbjtcbiAgICAvKiogRmFsc2Ugd2hpbGUgdGhlIHRlbXBsYXRlIGF0dHJpYnV0ZSBpcyBsb2FkaW5nLCB1bmF2YWlsYWJsZSBvciBjb3VsZCBub3QgYmUgcmVhZC4gKi9cbiAgICBjYW5TYXZlOiBib29sZWFuO1xuICAgIHByZXZpZXc/OiBQcmV2aWV3VG9nZ2xlO1xuICAgIGV4cG9ydEh0bWw/OiBUb29sYmFyQnV0dG9uO1xuICAgIHNhdmVUZW1wbGF0ZT86IFRvb2xiYXJCdXR0b247XG59XG5cbmZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7IGJ1dHRvbiwgZGlzYWJsZWQgfTogeyBidXR0b246IFRvb2xiYXJCdXR0b247IGRpc2FibGVkOiBib29sZWFuIH0pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGJ1c3kgPSBidXR0b24uYWN0aW9uLmlzRXhlY3V0aW5nO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgYnVzeSB8fCAhYnV0dG9uLmFjdGlvbi5jYW5FeGVjdXRlfVxuICAgICAgICAgICAgYXJpYS1idXN5PXtidXN5fVxuICAgICAgICAgICAgb25DbGljaz17YnV0dG9uLm9uQ2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtidXR0b24uY2FwdGlvbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRvb2xiYXIoe1xuICAgIHJlYWR5LFxuICAgIHJlYWRPbmx5LFxuICAgIGNhblNhdmUsXG4gICAgcHJldmlldyxcbiAgICBleHBvcnRIdG1sLFxuICAgIHNhdmVUZW1wbGF0ZVxufTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHwgbnVsbCB7XG4gICAgLy8gQSByZWFkLW9ubHkgZWRpdG9yIGFsd2F5cyBwcmV2aWV3cywgYW5kIHNhdmluZyBmcm9tIGl0IHdvdWxkIHN0b3JlIG5vdGhpbmdcbiAgICAvLyB0aGUgdXNlciBjb3VsZCBjaGFuZ2UuXG4gICAgY29uc3Qgc2hvd1ByZXZpZXcgPSBwcmV2aWV3ICYmICFyZWFkT25seTtcbiAgICBjb25zdCBzaG93U2F2ZSA9IHNhdmVUZW1wbGF0ZSAmJiAhcmVhZE9ubHk7XG4gICAgaWYgKCFzaG93UHJldmlldyAmJiAhZXhwb3J0SHRtbCAmJiAhc2hvd1NhdmUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZW1haWwtZWRpdG9yLXRvb2xiYXIgc3BhY2luZy1pbm5lci1ib3R0b20tbWVkaXVtXCI+XG4gICAgICAgICAgICB7c2hvd1ByZXZpZXcgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlYWR5fVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e3ByZXZpZXcucHJldmlld2luZ31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17cHJldmlldy5vbkNsaWNrfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3ByZXZpZXcuY2FwdGlvbn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZXhwb3J0SHRtbCAmJiA8QWN0aW9uQnV0dG9uIGJ1dHRvbj17ZXhwb3J0SHRtbH0gZGlzYWJsZWQ9eyFyZWFkeX0gLz59XG4gICAgICAgICAgICB7c2hvd1NhdmUgJiYgPEFjdGlvbkJ1dHRvbiBidXR0b249e3NhdmVUZW1wbGF0ZX0gZGlzYWJsZWQ9eyFyZWFkeSB8fCAhY2FuU2F2ZX0gLz59XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IEVtYWlsRWRpdG9yLCB7IEVkaXRvclJlZiB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmltcG9ydCB7IERpc3BsYXlNb2RlRW51bSwgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5pbXBvcnQgeyBidWlsZE9wdGlvbnMsIEVkaXRvciwgcGFyc2VBZHZhbmNlZE9wdGlvbnMsIHBhcnNlRGVzaWduIH0gZnJvbSBcIi4uL3V0aWxzL2VkaXRvck9wdGlvbnNcIjtcbmltcG9ydCB7IHJlZ2lzdGVySW1hZ2VVcGxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvaW1hZ2VVcGxvYWRcIjtcbmltcG9ydCB7IGJ1aWxkTWVyZ2VUYWdzIH0gZnJvbSBcIi4uL3V0aWxzL21lcmdlVGFnc1wiO1xuaW1wb3J0IHsgY2FuV3JpdGVUZW1wbGF0ZSB9IGZyb20gXCIuLi91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZVwiO1xuaW1wb3J0IHsgVGVtcGxhdGVBY3Rpb25BcmdzLCBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xuXG4vKiogSG93IGxvbmcgdG8gd2FpdCBhZnRlciB0aGUgbGFzdCBlZGl0IGJlZm9yZSB3cml0aW5nIHRvIHRoZSBhdHRyaWJ1dGVzLiAqL1xuY29uc3QgU0FWRV9PTl9DSEFOR0VfREVMQVlfTVMgPSA1MDA7XG5cbnR5cGUgRXhwb3J0ZWQgPSB7IGh0bWw6IHN0cmluZzsganNvbjogc3RyaW5nIH07XG5cbi8qKiBSdW4gYSBNZW5kaXggYWN0aW9uIGlmIGl0IGlzIHNldCBhbmQgbWF5IHJ1biBub3cuICovXG5mdW5jdGlvbiBleGVjdXRlKGFjdGlvbjogQWN0aW9uVmFsdWUgfCB1bmRlZmluZWQpOiB2b2lkO1xuZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz4gfCB1bmRlZmluZWQsIGFyZ3M6IFRlbXBsYXRlQWN0aW9uQXJncyk6IHZvaWQ7XG5mdW5jdGlvbiBleGVjdXRlKGFjdGlvbjogQWN0aW9uVmFsdWU8YW55PiB8IHVuZGVmaW5lZCwgYXJncz86IFRlbXBsYXRlQWN0aW9uQXJncyk6IHZvaWQge1xuICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICBhY3Rpb24uZXhlY3V0ZShhcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0b3JXcmFwcGVyKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGFkdmFuY2VkT3B0aW9ucywgZGlzcGxheU1vZGUsIGVkaXRvclZlcnNpb24gfSA9IHByb3BzO1xuICAgIGNvbnN0IGVtYWlsRWRpdG9yUmVmID0gdXNlUmVmPEVkaXRvclJlZjxEaXNwbGF5TW9kZUVudW0+PihudWxsKTtcblxuICAgIGNvbnN0IHsgb3B0aW9uczogYWR2YW5jZWQsIGVycm9yOiBvcHRpb25zRXJyb3IgfSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IHBhcnNlQWR2YW5jZWRPcHRpb25zKGFkdmFuY2VkT3B0aW9ucyksXG4gICAgICAgIFthZHZhbmNlZE9wdGlvbnNdXG4gICAgKTtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gYnVpbGRPcHRpb25zKGFkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGRpc3BsYXlNb2RlLCBlZGl0b3JWZXJzaW9uKSxcbiAgICAgICAgW2FkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGRpc3BsYXlNb2RlLCBlZGl0b3JWZXJzaW9uXVxuICAgICk7XG5cbiAgICAvLyBUaGUgZWRpdG9yIGlzIHJlY3JlYXRlZCB3aGVuIGl0cyBvcHRpb25zIGNoYW5nZS4gUmVtZW1iZXIgd2hpY2ggb3B0aW9uc1xuICAgIC8vIHRoZSByZWFkeSBlZGl0b3Igd2FzIG1hZGUgd2l0aCwgc28gdGhlIG9sZCBvbmUgaXMgZm9yZ290dGVuIGF0IG9uY2UuXG4gICAgY29uc3QgW3JlYWR5LCBzZXRSZWFkeV0gPSB1c2VTdGF0ZTx7IGVkaXRvcjogRWRpdG9yOyBvcHRpb25zOiB0eXBlb2Ygb3B0aW9ucyB9IHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgZWRpdG9yID0gcmVhZHk/Lm9wdGlvbnMgPT09IG9wdGlvbnMgPyByZWFkeS5lZGl0b3IgOiBudWxsO1xuXG4gICAgLy8gQW4gZW1wdHkgdmFsdWUgbmV2ZXIgY2xlYXJzIHRoZSBlZGl0b3IgKHNlZSBiZWxvdyksIHNvIGl0IGlzIG5vIGVycm9yIGVpdGhlci5cbiAgICBjb25zdCBqc29uU3RhdHVzID0gSlNPTlRlbXBsYXRlLnN0YXR1cztcbiAgICBjb25zdCBqc29uVmFsdWUgPSBKU09OVGVtcGxhdGUudmFsdWUgPz8gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiAoanNvblN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmIGpzb25WYWx1ZSAhPT0gXCJcIiA/IHBhcnNlRGVzaWduKGpzb25WYWx1ZSkgOiB7fSksXG4gICAgICAgIFtqc29uU3RhdHVzLCBqc29uVmFsdWVdXG4gICAgKTtcbiAgICBjb25zdCBsb2FkRXJyb3IgPSBwYXJzZWQuZXJyb3I7XG5cbiAgICAvLyBVbmxheWVyIGNhbGxzIGhhbmRsZXJzIHJlZ2lzdGVyZWQgb25jZSBwZXIgZWRpdG9yLCBhbmQgdGhlIHNhdmUtb24tY2hhbmdlXG4gICAgLy8gdGltZXIgY2FuIGZpcmUgYmVmb3JlIHRoZSBuZXh0IHJlbmRlcjsgYm90aCByZWFkIHRoZSBsYXRlc3QgdmFsdWVzXG4gICAgLy8gdGhyb3VnaCB0aGVzZSByZWZzIGluc3RlYWQgb2YgdGhlIHJlbmRlciB0aGV5IHdlcmUgY3JlYXRlZCBpbi5cbiAgICBjb25zdCBwcm9wc1JlZiA9IHVzZVJlZihwcm9wcyk7XG4gICAgY29uc3Qgb3B0aW9uc1JlZiA9IHVzZVJlZihvcHRpb25zKTtcbiAgICBjb25zdCBsb2FkRXJyb3JSZWYgPSB1c2VSZWYobG9hZEVycm9yKTtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgICBwcm9wc1JlZi5jdXJyZW50ID0gcHJvcHM7XG4gICAgICAgIG9wdGlvbnNSZWYuY3VycmVudCA9IG9wdGlvbnM7XG4gICAgICAgIGxvYWRFcnJvclJlZi5jdXJyZW50ID0gbG9hZEVycm9yO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIGxhc3QgZGVzaWduIHN0cmluZyB0aGUgZWRpdG9yIGxvYWRlZCBvciBwcm9kdWNlZC4gV2hlbiB0aGUgYXR0cmlidXRlXG4gICAgLy8gY2hhbmdlcyB0byB0aGlzIHZhbHVlIChiZWNhdXNlIHdlIHdyb3RlIGl0KSB0aGVyZSBpcyBub3RoaW5nIHRvIHJlbG9hZCwgYW5kXG4gICAgLy8gcmVsb2FkaW5nIHdvdWxkIHRocm93IGF3YXkgdGhlIHVzZXIncyB1bmRvIGhpc3RvcnkgYW5kIHNlbGVjdGlvbi5cbiAgICBjb25zdCBzeW5jZWRKc29uID0gdXNlUmVmPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICAgIGNvbnN0IHNhdmVUaW1lciA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICAvLyBUaGUgZWRpdG9yIGlzIGRlc3Ryb3llZCBvbiB1bm1vdW50OyBhIHBlbmRpbmcgc2F2ZSB3b3VsZCBjYWxsIGludG8gaXQuXG4gICAgdXNlRWZmZWN0KCgpID0+ICgpID0+IGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCksIFtdKTtcblxuICAgIGNvbnN0IHJlYWRPbmx5ID0gSlNPTlRlbXBsYXRlLnJlYWRPbmx5O1xuXG4gICAgY29uc3QgZXhwb3J0RGVzaWduID0gdXNlQ2FsbGJhY2soKHVubGF5ZXI6IEVkaXRvcik6IFByb21pc2U8RXhwb3J0ZWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdW5sYXllci5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBodG1sOiBkYXRhLmh0bWwsIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEuZGVzaWduKSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICAvKiogV3JpdGUgdGhlIGRlc2lnbiB0byB0aGUgYXR0cmlidXRlcywgaWYgdGhleSBjYW4gYmUgd3JpdHRlbi4gUmV0dXJucyB3aGV0aGVyIGl0IGRpZC4gKi9cbiAgICBjb25zdCB3cml0ZUF0dHJpYnV0ZXMgPSB1c2VDYWxsYmFjaygoeyBodG1sLCBqc29uIH06IEV4cG9ydGVkKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlOiBqc29uQXR0ciwgSFRNTEJvZHk6IGh0bWxBdHRyIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWNhbldyaXRlVGVtcGxhdGUoanNvbkF0dHIsIGxvYWRFcnJvclJlZi5jdXJyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb247XG4gICAgICAgIGpzb25BdHRyLnNldFZhbHVlKGpzb24pO1xuICAgICAgICBpZiAoaHRtbEF0dHIgJiYgaHRtbEF0dHIuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgIWh0bWxBdHRyLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICBodG1sQXR0ci5zZXRWYWx1ZShodG1sKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBvblJlYWR5ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgICh1bmxheWVyOiBFZGl0b3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW1hZ2VVcGxvYWRVcmwgfSA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAocHJvcHNSZWYuY3VycmVudC5pbWFnZVVwbG9hZE1vZGUgPT09IFwiZW5kcG9pbnRcIiAmJiBpbWFnZVVwbG9hZFVybCkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVySW1hZ2VVcGxvYWQodW5sYXllciwgaW1hZ2VVcGxvYWRVcmwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bmxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkZXNpZ246dXBkYXRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgd3JpdGUgPSBjdXJyZW50LnNhdmVPbkNoYW5nZSAmJiBjYW5Xcml0ZVRlbXBsYXRlKGN1cnJlbnQuSlNPTlRlbXBsYXRlLCBsb2FkRXJyb3JSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKCF3cml0ZSAmJiAhY3VycmVudC5vbkRlc2lnbkNoYW5nZUFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgc2F2ZVRpbWVyLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0RGVzaWduKHVubGF5ZXIpLnRoZW4oZXhwb3J0ZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF0ZXN0ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXRlc3Quc2F2ZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVBdHRyaWJ1dGVzKGV4cG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGUobGF0ZXN0Lm9uRGVzaWduQ2hhbmdlQWN0aW9uLCB7IGh0bWxfXzogZXhwb3J0ZWQuaHRtbCwganNvbl9fOiBleHBvcnRlZC5qc29uIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdW5sYXllci5hZGRFdmVudExpc3RlbmVyKFwiZGVzaWduOmxvYWRlZFwiLCAoKSA9PiBleGVjdXRlKHByb3BzUmVmLmN1cnJlbnQub25EZXNpZ25Mb2FkQWN0aW9uKSk7XG5cbiAgICAgICAgICAgIC8vIEEgbmV3IGVkaXRvciBzdGFydHMgYmxhbmssIHNvIHdoYXRldmVyIGl0IGhhZCBsb2FkZWQgaXMgZ29uZS5cbiAgICAgICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHNldFJlYWR5KHsgZWRpdG9yOiB1bmxheWVyLCBvcHRpb25zOiBvcHRpb25zUmVmLmN1cnJlbnQgfSk7XG4gICAgICAgICAgICBleGVjdXRlKHByb3BzUmVmLmN1cnJlbnQub25SZWFkeUFjdGlvbik7XG4gICAgICAgIH0sXG4gICAgICAgIFtleHBvcnREZXNpZ24sIHdyaXRlQXR0cmlidXRlc11cbiAgICApO1xuXG4gICAgLy8gTG9hZCB0aGUgZGVzaWduIGZyb20gdGhlIGF0dHJpYnV0ZSwgb25jZSB0aGUgZWRpdG9yIGFuZCB0aGUgdmFsdWUgYXJlIHJlYWR5LlxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIEFuIGVtcHR5IHZhbHVlIG5ldmVyIGNsZWFycyB0aGUgZWRpdG9yLiBJdCBpcyB3aGF0IGEgcm9sbGJhY2sgb2YgYSBuZXdcbiAgICAgICAgLy8gb2JqZWN0IHByb2R1Y2VzLCBmb3IgaW5zdGFuY2Ugd2hlbiBhIHBvcC11cCBvcGVuZWQgYnkgdGhlIHNhdmUgYWN0aW9uIGlzXG4gICAgICAgIC8vIGNsb3NlZCwgYW5kIGNsZWFyaW5nIHdvdWxkIHRocm93IGF3YXkgZXZlcnl0aGluZyB0aGUgdXNlciBtYWRlLlxuICAgICAgICBpZiAoIWVkaXRvciB8fCBqc29uU3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgfHwganNvblZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpzb25WYWx1ZSA9PT0gc3luY2VkSnNvbi5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0ganNvblZhbHVlO1xuICAgICAgICBpZiAocGFyc2VkLmRlc2lnbikge1xuICAgICAgICAgICAgZWRpdG9yLmxvYWREZXNpZ24ocGFyc2VkLmRlc2lnbiBhcyBQYXJhbWV0ZXJzPEVkaXRvcltcImxvYWREZXNpZ25cIl0+WzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFJlYWN0RW1haWxFZGl0b3I6ICR7cGFyc2VkLmVycm9yfWApO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwganNvblN0YXR1cywganNvblZhbHVlLCBwYXJzZWRdKTtcblxuICAgIC8vIFdoZXRoZXIgdGhlIHByZXZpZXcgaXMgc2hvd2luZzogYWx3YXlzIHdoZW4gdGhlIGVkaXRvciBpcyByZWFkLW9ubHksXG4gICAgLy8gb3RoZXJ3aXNlIHdoZW4gdGhlIHVzZXIgc3dpdGNoZWQgaXQgb24gZm9yIHRoaXMgZWRpdG9yLlxuICAgIGNvbnN0IFtwcmV2aWV3VG9nZ2xlZEZvciwgc2V0UHJldmlld1RvZ2dsZWRGb3JdID0gdXNlU3RhdGU8RWRpdG9yIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgcHJldmlld2luZyA9IGVkaXRvciAhPT0gbnVsbCAmJiAocmVhZE9ubHkgfHwgcHJldmlld1RvZ2dsZWRGb3IgPT09IGVkaXRvcik7XG4gICAgY29uc3QgcHJldmlld0RldmljZSA9IHByb3BzLnByZXZpZXdEZXZpY2UgPz8gXCJkZXNrdG9wXCI7XG5cbiAgICAvLyBTaG93IG9yIGhpZGUgVW5sYXllcidzIHByZXZpZXcgdG8gbWF0Y2guIEEgbmV3IGVkaXRvciBzdGFydHMgd2l0aG91dCBvbmUuXG4gICAgY29uc3QgcHJldmlld1Nob3duSW4gPSB1c2VSZWY8RWRpdG9yIHwgbnVsbD4obnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldmlld2luZykge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dQcmV2aWV3KHByZXZpZXdEZXZpY2UpO1xuICAgICAgICAgICAgcHJldmlld1Nob3duSW4uY3VycmVudCA9IGVkaXRvcjtcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2aWV3U2hvd25Jbi5jdXJyZW50ID09PSBlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5oaWRlUHJldmlldygpO1xuICAgICAgICAgICAgcHJldmlld1Nob3duSW4uY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCBwcmV2aWV3aW5nLCBwcmV2aWV3RGV2aWNlXSk7XG5cbiAgICBjb25zdCB0b2dnbGVQcmV2aWV3ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBzZXRQcmV2aWV3VG9nZ2xlZEZvcihwcmV2aWV3aW5nID8gbnVsbCA6IGVkaXRvcik7XG4gICAgfSwgW2VkaXRvciwgcHJldmlld2luZ10pO1xuXG4gICAgY29uc3QgbG9jYWxlID0gcHJvcHMubG9jYWxlPy52YWx1ZTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIGxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0TG9jYWxlKGxvY2FsZSB8fCBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGxvY2FsZV0pO1xuXG4gICAgLy8gTWVuZGl4IGhhbmRzIG91dCBuZXcgbGlzdCBvYmplY3RzIG9uIHJlLXJlbmRlcnM7IGNvbXBhcmUgYnkgY29udGVudCBzbyB0aGVcbiAgICAvLyBlZGl0b3IgaXMgb25seSB0b2xkIHdoZW4gdGhlIHRhZ3MgcmVhbGx5IGNoYW5nZS5cbiAgICBjb25zdCBtZXJnZVRhZ3MgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYnVpbGRNZXJnZVRhZ3MocHJvcHMubWVyZ2VUYWdzLCBwcm9wcy5tZXJnZVRhZ05hbWUsIHByb3BzLm1lcmdlVGFnVmFsdWUsIHByb3BzLm1lcmdlVGFnU2FtcGxlKSA/PyBudWxsXG4gICAgKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIG1lcmdlVGFncyAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRNZXJnZVRhZ3MoSlNPTi5wYXJzZShtZXJnZVRhZ3MpKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIG1lcmdlVGFnc10pO1xuXG4gICAgY29uc3QgcnVuQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIGFzeW5jIChhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz4sIHdyaXRlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkID0gYXdhaXQgZXhwb3J0RGVzaWduKGVkaXRvcik7XG4gICAgICAgICAgICAvLyBSdW5uaW5nIHRoZSBzYXZlIGFjdGlvbiBhZnRlciBhIHJlZnVzZWQgd3JpdGUgd291bGQgY29tbWl0IHRoZVxuICAgICAgICAgICAgLy8gb2JqZWN0IGFzIGlmIHRoZSB0ZW1wbGF0ZSBoYWQgYmVlbiBzdG9yZWQuXG4gICAgICAgICAgICBpZiAod3JpdGUgJiYgIXdyaXRlQXR0cmlidXRlcyhleHBvcnRlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleGVjdXRlKGFjdGlvbiwgeyBodG1sX186IGV4cG9ydGVkLmh0bWwsIGpzb25fXzogZXhwb3J0ZWQuanNvbiB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2VkaXRvciwgZXhwb3J0RGVzaWduLCB3cml0ZUF0dHJpYnV0ZXNdXG4gICAgKTtcblxuICAgIGNvbnN0IGVycm9yID0gb3B0aW9uc0Vycm9yID8/IGxvYWRFcnJvcjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicmVhY3QtZW1haWwtZWRpdG9yLWRpdlwiLCBwcm9wcy5jbGFzcyl9IHN0eWxlPXtwcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgICAgIHJlYWR5PXtlZGl0b3IgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgICAgIGNhblNhdmU9e2NhbldyaXRlVGVtcGxhdGUoSlNPTlRlbXBsYXRlLCBsb2FkRXJyb3IpfVxuICAgICAgICAgICAgICAgIHByZXZpZXc9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dQcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByZXZpZXdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByb3BzLmhpZGVQcmV2aWV3Q2FwdGlvbj8udmFsdWUgfHwgXCJIaWRlIFByZXZpZXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHMuc2hvd1ByZXZpZXdDYXB0aW9uPy52YWx1ZSB8fCBcIlNob3cgUHJldmlld1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlld2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRvZ2dsZVByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhwb3J0SHRtbD17XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmlzU2hvd0V4cG9ydEh0bWwgJiYgcHJvcHMuZXhwb3J0SFRNTEFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wcy5leHBvcnRIdG1sQ2FwdGlvbj8udmFsdWUgfHwgXCJFeHBvcnQgSFRNTFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gcnVuQWN0aW9uKHByb3BzLmV4cG9ydEhUTUxBY3Rpb24hLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2F2ZVRlbXBsYXRlPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93U2F2ZVRlbXBsYXRlICYmIHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVDYXB0aW9uPy52YWx1ZSB8fCBcIlNhdmUgVGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gcnVuQWN0aW9uKHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvbiEsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxFbWFpbEVkaXRvclxuICAgICAgICAgICAgICAgIHJlZj17ZW1haWxFZGl0b3JSZWZ9XG4gICAgICAgICAgICAgICAgb25SZWFkeT17b25SZWFkeX1cbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ9e3Byb3BzLmVkaXRvckhlaWdodCB8fCBcIjcwMHB4XCJ9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAgICAgICBzY3JpcHRVcmw9e3Byb3BzLnNjcmlwdFVybD8udHJpbSgpIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVkaXRvcldyYXBwZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VkaXRvcldyYXBwZXJcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5cbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RW1haWxFZGl0b3IocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxFZGl0b3JXcmFwcGVyIHsuLi5wcm9wc30gLz47XG59XG4iXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiX191bmxheWVyX2xhc3RFZGl0b3JJZCIsInVzZUNvdW50ZXJFZGl0b3JJZCIsInVzZU1lbW8iLCJ1c2VHZW5lcmF0ZWRFZGl0b3JJZCIsIlJlYWN0IiwidXNlSWQiLCJyZXBsYWNlIiwiRW1haWxFZGl0b3JJbm5lciIsInByb3BzIiwicmVmIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsIl9mIiwiX2ciLCJfaCIsIl9pIiwib25Mb2FkIiwib25SZWFkeSIsInNjcmlwdFVybCIsIm1pbkhlaWdodCIsInN0eWxlIiwiZWRpdG9yIiwic2V0RWRpdG9yIiwidXNlU3RhdGUiLCJoYXNMb2FkZWRFbWJlZFNjcmlwdCIsInNldEhhc0xvYWRlZEVtYmVkU2NyaXB0IiwiZ2VuZXJhdGVkSWQiLCJlZGl0b3JJZCIsIm9wdGlvbnMiLCJhcHBlYXJhbmNlIiwiZGlzcGxheU1vZGUiLCJsb2NhbGUiLCJwcm9qZWN0SWQiLCJ0b29scyIsImlkIiwic291cmNlIiwibmFtZSIsInZlcnNpb24iLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwiZWRpdG9yUmVmIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3VycmVudCIsIl9hMiIsImRlc3Ryb3kiLCJsb2FkU2NyaXB0IiwidW5sYXllciIsImNyZWF0ZUVkaXRvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXRob2RQcm9wcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJwcm9wTmFtZSIsInRlc3QiLCJmb3JFYWNoIiwibWV0aG9kUHJvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJqb2luIiwiY3JlYXRlRWxlbWVudCIsImZsZXgiLCJkaXNwbGF5IiwiRW1haWxFZGl0b3IiLCJmb3J3YXJkUmVmIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcHBlbmRDbGFzcyIsInBhcnNlVmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJhcHBseSIsInRvU3RyaW5nIiwicHJvdG90eXBlIiwiaW5jbHVkZXMiLCJrZXkiLCJjYWxsIiwidmFs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
