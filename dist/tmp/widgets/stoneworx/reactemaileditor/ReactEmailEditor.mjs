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
function buildOptions(advanced, projectId, theme, imageUploadMode) {
    const options = {
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

function ActionButton({ button, disabled, className }) {
    const busy = button.action.isExecuting;
    return (jsx("button", { type: "button", className: classNames("btn mx-button btn-default", className), disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick, children: button.caption }));
}
function Toolbar({ ready, readOnly, canSave, exportHtml, saveTemplate }) {
    // Saving from a read-only editor would store nothing the user could change.
    const showSave = saveTemplate && !readOnly;
    if (!exportHtml && !showSave) {
        return null;
    }
    return (jsxs("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium", children: [exportHtml && jsx(ActionButton, { button: exportHtml, disabled: !ready }), showSave && (jsx(ActionButton, { button: saveTemplate, disabled: !ready || !canSave, className: exportHtml ? "spacing-outer-left-medium" : undefined }))] }));
}

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;
function EditorWrapper(props) {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions } = props;
    const emailEditorRef = useRef(null);
    const { options: advanced, error: optionsError } = useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
    const options = useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode), [advanced, projectId, theme, imageUploadMode]);
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
        setReady({ editor: unlayer, options: optionsRef.current });
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
        }
        else if (!readOnly && previewShown.current) {
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
        if (action.canExecute && !action.isExecuting) {
            action.execute({ html__: exported.html, json__: exported.json });
        }
    }, [editor, exportDesign, writeAttributes]);
    const error = optionsError ?? loadError;
    return (jsxs("div", { className: classNames("react-email-editor-div", props.class), style: props.style, children: [jsx(Toolbar, { ready: editor !== null, readOnly: readOnly, canSave: canWriteTemplate(JSONTemplate, loadError), exportHtml: props.isShowExportHtml && props.exportHTMLAction
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
                    : undefined }), error && (jsx("div", { className: "alert alert-danger", role: "alert", children: error })), jsx(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: props.editorHeight || "700px", options: options })] }));
}

function ReactEmailEditor(props) {
    return jsx(EditorWrapper, { ...props });
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9lZGl0b3JPcHRpb25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2ltYWdlVXBsb2FkLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21lcmdlVGFncy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZS50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Rvb2xiYXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlLFxuICB1c2VNZW1vXG59IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBwYWNrYWdlLmpzb25cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIyLjEuM1wiO1xuXG4vLyBzcmMvbG9hZFNjcmlwdC50c1xudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSBcImh0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzJcIjtcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBmaW5kU2NyaXB0ID0gKHNjcmlwdFVybCkgPT4ge1xuICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFwiKTtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XG4gICAgICBmb3VuZCA9IHNjcmlwdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xudmFyIGlzRW1iZWRSZWFkeSA9ICgpID0+IGxvYWRlZCB8fCB0eXBlb2YgdW5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBhZGRDYWxsYmFjayA9IChjYWxsYmFjaykgPT4ge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9ICgpID0+IHtcbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgbG9hZGVkID0gdHJ1ZTtcbiAgICBsZXQgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSAoY2FsbGJhY2ssIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmwpID0+IHtcbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGZpbmRTY3JpcHQoc2NyaXB0VXJsKTtcbiAgaWYgKCFleGlzdGluZ1NjcmlwdCkge1xuICAgIGNvbnN0IGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc2NyaXB0VXJsKTtcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgZXhpc3RpbmdTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgX191bmxheWVyX2xhc3RFZGl0b3JJZDogMCB9IDogd2luZG93O1xud2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xudmFyIHVzZUNvdW50ZXJFZGl0b3JJZCA9ICgpID0+IHVzZU1lbW8oKCkgPT4gYGVkaXRvci0keysrd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWR9YCwgW10pO1xudmFyIHVzZUdlbmVyYXRlZEVkaXRvcklkID0gdHlwZW9mIFJlYWN0LnVzZUlkID09PSBcImZ1bmN0aW9uXCIgPyAoXG4gIC8vIFN0cmlwICc6JyBzbyB0aGUgaWQgaXMgYSB2YWxpZCBDU1Mgc2VsZWN0b3IgZm9yIHVubGF5ZXIuY3JlYXRlRWRpdG9yLlxuICAoKSA9PiBgZWRpdG9yLSR7UmVhY3QudXNlSWQoKS5yZXBsYWNlKC86L2csIFwiXCIpfWBcbikgOiB1c2VDb3VudGVyRWRpdG9ySWQ7XG5mdW5jdGlvbiBFbWFpbEVkaXRvcklubmVyKHByb3BzLCByZWYpIHtcbiAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2k7XG4gIGNvbnN0IHsgb25Mb2FkLCBvblJlYWR5LCBzY3JpcHRVcmwsIG1pbkhlaWdodCA9IDUwMCwgc3R5bGUgPSB7fSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZShcbiAgICBudWxsXG4gICk7XG4gIGNvbnN0IFtoYXNMb2FkZWRFbWJlZFNjcmlwdCwgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBnZW5lcmF0ZWRJZCA9IHVzZUdlbmVyYXRlZEVkaXRvcklkKCk7XG4gIGNvbnN0IGVkaXRvcklkID0gcHJvcHMuZWRpdG9ySWQgfHwgZ2VuZXJhdGVkSWQ7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4ucHJvcHMub3B0aW9ucyB8fCB7fSxcbiAgICBhcHBlYXJhbmNlOiAoX2IgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX2IgOiAoX2EgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2EuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfYyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYy5kaXNwbGF5TW9kZSkgfHwgXCJlbWFpbFwiLFxuICAgIGxvY2FsZTogKF9lID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX2UgOiAoX2QgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2QubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9nID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX2cgOiAoX2YgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2YucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX2kgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9pIDogKF9oID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9oLnRvb2xzLFxuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2ZXJzaW9uXG4gICAgfVxuICB9O1xuICB1c2VJbXBlcmF0aXZlSGFuZGxlKFxuICAgIHJlZixcbiAgICAoKSA9PiAoe1xuICAgICAgZWRpdG9yXG4gICAgfSksXG4gICAgW2VkaXRvcl1cbiAgKTtcbiAgY29uc3QgZWRpdG9yUmVmID0gdXNlUmVmKGVkaXRvcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZWRpdG9yUmVmLmN1cnJlbnQgPSBlZGl0b3I7XG4gIH0sIFtlZGl0b3JdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdmFyIF9hMjtcbiAgICAgIChfYTIgPSBlZGl0b3JSZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KCgpID0+IHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpLCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIGNvbnN0IG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihcbiAgICAocHJvcE5hbWUpID0+IC9eb24vLnRlc3QocHJvcE5hbWUpXG4gICk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xuICAgIG1ldGhvZFByb3BzLmZvckVhY2goKG1ldGhvZFByb3ApID0+IHtcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09IFwib25Mb2FkXCIgJiYgbWV0aG9kUHJvcCAhPT0gXCJvblJlYWR5XCIgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvblJlYWR5KSB7XG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImVkaXRvcjpyZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgbWV0aG9kUHJvcHMuam9pbihcIixcIildKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIG1pbkhlaWdodFxuICAgICAgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogZWRpdG9ySWQsIHN0eWxlOiB7IC4uLnN0eWxlLCBmbGV4OiAxIH0gfSlcbiAgKTtcbn1cbnZhciBFbWFpbEVkaXRvciA9IFJlYWN0LmZvcndhcmRSZWYoRW1haWxFZGl0b3JJbm5lcik7XG5leHBvcnQge1xuICBFbWFpbEVkaXRvcixcbiAgRW1haWxFZGl0b3IgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgeyBJbWFnZVVwbG9hZE1vZGVFbnVtLCBUaGVtZUVudW0gfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuZXhwb3J0IHR5cGUgRWRpdG9yID0gTm9uTnVsbGFibGU8RWRpdG9yUmVmW1wiZWRpdG9yXCJdPjtcbmV4cG9ydCB0eXBlIEVkaXRvck9wdGlvbnMgPSBOb25OdWxsYWJsZTxFbWFpbEVkaXRvclByb3BzW1wib3B0aW9uc1wiXT47XG5cbi8qKlxuICogUGFyc2UgdGhlIFwiQWR2YW5jZWQgb3B0aW9ucyAoSlNPTilcIiBwcm9wZXJ0eS4gUmV0dXJucyBhbiBlcnJvciBtZXNzYWdlIGluc3RlYWRcbiAqIG9mIHRocm93aW5nLCBzbyBhIHR5cG8gaW4gU3R1ZGlvIFBybyBzaG93cyB1cCBhcyBhIG1lc3NhZ2UsIG5vdCBhIGRlYWQgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQWR2YW5jZWRPcHRpb25zKGpzb246IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsgb3B0aW9uczogRWRpdG9yT3B0aW9uczsgZXJyb3I/OiBzdHJpbmcgfSB7XG4gICAgaWYgKCFqc29uIHx8ICFqc29uLnRyaW0oKSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3B0aW9uczoge30sIGVycm9yOiBcIkFkdmFuY2VkIG9wdGlvbnMgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgb3B0aW9uczogcGFyc2VkIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IGBBZHZhbmNlZCBvcHRpb25zIGFyZSBub3QgdmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgaW4gaGVyZSBtdXN0IGJlIHN0YWJsZTogcmVhY3QtZW1haWwtZWRpdG9yIGRlc3Ryb3lzIGFuZCByZWNyZWF0ZXNcbiAqIHRoZSBlZGl0b3IsIGxvc2luZyB1bnNhdmVkIHdvcmssIHdoZW5ldmVyIHRoZSBzZXJpYWxpemVkIG9wdGlvbnMgY2hhbmdlLiBWYWx1ZXNcbiAqIHRoYXQgY2FuIGNoYW5nZSBhdCBydW50aW1lIChsb2NhbGUsIG1lcmdlIHRhZ3MpIGdvIHRocm91Z2ggdGhlIGVkaXRvciBBUEkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9wdGlvbnMoXG4gICAgYWR2YW5jZWQ6IEVkaXRvck9wdGlvbnMsXG4gICAgcHJvamVjdElkOiBudW1iZXIsXG4gICAgdGhlbWU6IFRoZW1lRW51bSxcbiAgICBpbWFnZVVwbG9hZE1vZGU6IEltYWdlVXBsb2FkTW9kZUVudW1cbik6IEVkaXRvck9wdGlvbnMge1xuICAgIGNvbnN0IG9wdGlvbnM6IEVkaXRvck9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmFkdmFuY2VkLFxuICAgICAgICBhcHBlYXJhbmNlOiB7IC4uLmFkdmFuY2VkLmFwcGVhcmFuY2UsIHRoZW1lIH1cbiAgICB9O1xuICAgIGlmIChwcm9qZWN0SWQgPiAwKSB7XG4gICAgICAgIG9wdGlvbnMucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIH1cbiAgICBpZiAoaW1hZ2VVcGxvYWRNb2RlID09PSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgb3B0aW9ucy5mZWF0dXJlcyA9IHsgLi4uYWR2YW5jZWQuZmVhdHVyZXMsIHVzZXJVcGxvYWRzOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkRGVzaWduID0geyBkZXNpZ24/OiBvYmplY3Q7IGVycm9yPzogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlc2lnbihqc29uOiBzdHJpbmcpOiBQYXJzZWREZXNpZ24ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghZGVzaWduIHx8IHR5cGVvZiBkZXNpZ24gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZSBzYXZlZCB0ZW1wbGF0ZSBpcyBub3QgYSBKU09OIG9iamVjdC5cIiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRlc2lnbiB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGBUaGUgc2F2ZWQgdGVtcGxhdGUgY291bGQgbm90IGJlIHJlYWQ6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YCB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVkaXRvciB9IGZyb20gXCIuL2VkaXRvck9wdGlvbnNcIjtcblxudHlwZSBJbWFnZUNhbGxiYWNrID0gUGFyYW1ldGVyczxFZGl0b3JbXCJyZWdpc3RlckNhbGxiYWNrXCJdPlsxXTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBteD86IHsgc2Vzc2lvbj86IHsgZ2V0Q29uZmlnPzogKGtleTogc3RyaW5nKSA9PiB1bmtub3duIH0gfTtcbiAgICB9XG59XG5cbi8qKlxuICogTWVuZGl4IHB1Ymxpc2hlZCBSRVNUIHNlcnZpY2VzIHRoYXQgdXNlIHRoZSBhY3RpdmUgc2Vzc2lvbiBmb3IgYXV0aGVudGljYXRpb25cbiAqIHJlamVjdCByZXF1ZXN0cyB3aXRob3V0IHRoZSBzZXNzaW9uJ3MgQ1NSRiB0b2tlbi5cbiAqL1xuZnVuY3Rpb24gY3NyZkhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSB3aW5kb3cubXg/LnNlc3Npb24/LmdldENvbmZpZz8uKFwiY3NyZnRva2VuXCIpO1xuICAgIHJldHVybiB0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIgPyB7IFwiWC1Dc3JmLVRva2VuXCI6IHRva2VuIH0gOiB7fTtcbn1cblxuLyoqXG4gKiBVcGxvYWQgaW1hZ2VzIHRvIHRoZSBhcHAncyBvd24gZW5kcG9pbnQgaW5zdGVhZCBvZiBVbmxheWVyJ3Mgc3RvcmFnZS4gVGhlXG4gKiBlbmRwb2ludCByZWNlaXZlcyBtdWx0aXBhcnQvZm9ybS1kYXRhIHdpdGggdGhlIGltYWdlIGluIGEgcGFydCBuYW1lZCBcImZpbGVcIlxuICogYW5kIG11c3QgYW5zd2VyIHdpdGggSlNPTiBjb250YWluaW5nIHRoZSBwdWJsaWMgXCJ1cmxcIiBvZiB0aGUgc3RvcmVkIGltYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJJbWFnZVVwbG9hZChlZGl0b3I6IEVkaXRvciwgdXBsb2FkVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB1cGxvYWQ6IEltYWdlQ2FsbGJhY2sgPSAoZmlsZTogeyBhdHRhY2htZW50czogRmlsZVtdIH0sIGRvbmU6IChyZXN1bHQ6IG9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGUuYXR0YWNobWVudHNbMF07XG4gICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgIGRvbmUoeyBhYm9ydDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKFwiZmlsZVwiLCBpbWFnZSk7XG5cbiAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMCB9KTtcbiAgICAgICAgZmV0Y2godXBsb2FkVXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLi4uY3NyZkhlYWRlcnMoKSB9LFxuICAgICAgICAgICAgYm9keVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkIHdpdGggSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YTogeyB1cmw/OiB1bmtub3duIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGE/LnVybCAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgcmVzcG9uc2UgaGFzIG5vIFwidXJsXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMDAsIHVybDogZGF0YS51cmwgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWFjdEVtYWlsRWRpdG9yOiBpbWFnZSB1cGxvYWQgZmFpbGVkLlwiLCBlKTtcbiAgICAgICAgICAgICAgICBkb25lKHsgZXJyb3I6IGUubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgZWRpdG9yLnJlZ2lzdGVyQ2FsbGJhY2soXCJpbWFnZVwiLCB1cGxvYWQpO1xufVxuIiwiaW1wb3J0IHsgTGlzdEV4cHJlc3Npb25WYWx1ZSwgTGlzdFZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuZXhwb3J0IHR5cGUgTWVyZ2VUYWdzID0gUmVjb3JkPHN0cmluZywgeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHNhbXBsZT86IHN0cmluZyB9PjtcblxuLyoqXG4gKiBUdXJuIHRoZSBtZXJnZSB0YWcgZGF0YXNvdXJjZSBpbnRvIFVubGF5ZXIncyBtZXJnZSB0YWcgbWFwLiBSZXR1cm5zIHVuZGVmaW5lZFxuICogd2hpbGUgdGhlIGxpc3QgaXMgbG9hZGluZywgc28gdGhlIGVkaXRvciBrZWVwcyB3aGF0IGl0IGhhcyB1bnRpbCB0aGVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNZXJnZVRhZ3MoXG4gICAgc291cmNlOiBMaXN0VmFsdWUgfCB1bmRlZmluZWQsXG4gICAgbmFtZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgc2FtcGxlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWRcbik6IE1lcmdlVGFncyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFzb3VyY2UgfHwgIW5hbWUgfHwgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzb3VyY2Uuc3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgfHwgIXNvdXJjZS5pdGVtcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB0YWdzOiBNZXJnZVRhZ3MgPSB7fTtcbiAgICBzb3VyY2UuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5hbWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdWYWx1ZSA9IHZhbHVlLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgaWYgKCF0YWdOYW1lIHx8ICF0YWdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ1NhbXBsZSA9IHNhbXBsZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICB0YWdzW2B0YWdfJHtpbmRleH1gXSA9IHRhZ1NhbXBsZVxuICAgICAgICAgICAgPyB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSwgc2FtcGxlOiB0YWdTYW1wbGUgfVxuICAgICAgICAgICAgOiB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0YWdzO1xufVxuIiwiaW1wb3J0IHsgRWRpdGFibGVWYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5cbi8qKlxuICogV2hldGhlciB0aGUgZWRpdG9yIG1heSB3cml0ZSBpdHMgZGVzaWduIHRvIHRoZSB0ZW1wbGF0ZSBhdHRyaWJ1dGUuXG4gKlxuICogT25seSB3aGVuIE1lbmRpeCBoYXMgdGhlIGF0dHJpYnV0ZSAoYSBsb2FkaW5nIG9yIHVuYXZhaWxhYmxlIGF0dHJpYnV0ZVxuICogYWNjZXB0cyBzZXRWYWx1ZSBhbmQgc3RvcmVzIG5vdGhpbmcpLCBpdCBpcyBlZGl0YWJsZSwgYW5kIHRoZSBzdG9yZWQgdmFsdWVcbiAqIHdhcyB1bmRlcnN0b29kLiBBIHN0b3JlZCB0ZW1wbGF0ZSB0aGF0IGZhaWxlZCB0byBsb2FkIGlzIG5vdCBpbiB0aGUgZWRpdG9yLFxuICogc28gd3JpdGluZyB0aGUgZWRpdG9yJ3MgY29udGVudCB3b3VsZCByZXBsYWNlIGl0IHdpdGggd2hhdGV2ZXIgaXMgb24gc2NyZWVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuV3JpdGVUZW1wbGF0ZShhdHRyaWJ1dGU6IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgbG9hZEVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmICFhdHRyaWJ1dGUucmVhZE9ubHkgJiYgIWxvYWRFcnJvcjtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIE9wdGlvbiB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbi8qKlxuICogVGhlIGFjdGlvbiBhcmd1bWVudHMsIGV4YWN0bHkgYXMgUmVhY3RFbWFpbEVkaXRvci54bWwgZ2VuZXJhdGVzIHRoZW0gaW50b1xuICogdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHMuZC50cy4gU3BlbGxpbmcgdGhlbSBvdXQgb25jZSBrZWVwcyB0aGlzIGZpbGUgYW5kXG4gKiB0aGUgZ2VuZXJhdGVkIHByb3BzIGZyb20gZHJpZnRpbmcgYXBhcnQuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQWN0aW9uQXJncyA9IHsgaHRtbF9fOiBPcHRpb248c3RyaW5nPjsganNvbl9fOiBPcHRpb248c3RyaW5nPiB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJCdXR0b24ge1xuICAgIGNhcHRpb246IHN0cmluZztcbiAgICBhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz47XG4gICAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xuICAgIC8qKiBGYWxzZSB1bnRpbCB0aGUgZWRpdG9yIGhhcyBsb2FkZWQ7IG5vdGhpbmcgY2FuIGJlIGV4cG9ydGVkIGJlZm9yZSB0aGF0LiAqL1xuICAgIHJlYWR5OiBib29sZWFuO1xuICAgIHJlYWRPbmx5OiBib29sZWFuO1xuICAgIC8qKiBGYWxzZSB3aGlsZSB0aGUgdGVtcGxhdGUgYXR0cmlidXRlIGlzIGxvYWRpbmcsIHVuYXZhaWxhYmxlIG9yIGNvdWxkIG5vdCBiZSByZWFkLiAqL1xuICAgIGNhblNhdmU6IGJvb2xlYW47XG4gICAgZXhwb3J0SHRtbD86IFRvb2xiYXJCdXR0b247XG4gICAgc2F2ZVRlbXBsYXRlPzogVG9vbGJhckJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gQWN0aW9uQnV0dG9uKHtcbiAgICBidXR0b24sXG4gICAgZGlzYWJsZWQsXG4gICAgY2xhc3NOYW1lXG59OiB7XG4gICAgYnV0dG9uOiBUb29sYmFyQnV0dG9uO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbn0pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGJ1c3kgPSBidXR0b24uYWN0aW9uLmlzRXhlY3V0aW5nO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGJ1c3kgfHwgIWJ1dHRvbi5hY3Rpb24uY2FuRXhlY3V0ZX1cbiAgICAgICAgICAgIGFyaWEtYnVzeT17YnVzeX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2J1dHRvbi5vbkNsaWNrfVxuICAgICAgICA+XG4gICAgICAgICAgICB7YnV0dG9uLmNhcHRpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb29sYmFyKHsgcmVhZHksIHJlYWRPbmx5LCBjYW5TYXZlLCBleHBvcnRIdG1sLCBzYXZlVGVtcGxhdGUgfTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHwgbnVsbCB7XG4gICAgLy8gU2F2aW5nIGZyb20gYSByZWFkLW9ubHkgZWRpdG9yIHdvdWxkIHN0b3JlIG5vdGhpbmcgdGhlIHVzZXIgY291bGQgY2hhbmdlLlxuICAgIGNvbnN0IHNob3dTYXZlID0gc2F2ZVRlbXBsYXRlICYmICFyZWFkT25seTtcbiAgICBpZiAoIWV4cG9ydEh0bWwgJiYgIXNob3dTYXZlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWVtYWlsLWVkaXRvci10b29sYmFyIHNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxuICAgICAgICAgICAge2V4cG9ydEh0bWwgJiYgPEFjdGlvbkJ1dHRvbiBidXR0b249e2V4cG9ydEh0bWx9IGRpc2FibGVkPXshcmVhZHl9IC8+fVxuICAgICAgICAgICAge3Nob3dTYXZlICYmIChcbiAgICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbj17c2F2ZVRlbXBsYXRlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlYWR5IHx8ICFjYW5TYXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2V4cG9ydEh0bWwgPyBcInNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5pbXBvcnQgeyBidWlsZE9wdGlvbnMsIEVkaXRvciwgcGFyc2VBZHZhbmNlZE9wdGlvbnMsIHBhcnNlRGVzaWduIH0gZnJvbSBcIi4uL3V0aWxzL2VkaXRvck9wdGlvbnNcIjtcbmltcG9ydCB7IHJlZ2lzdGVySW1hZ2VVcGxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvaW1hZ2VVcGxvYWRcIjtcbmltcG9ydCB7IGJ1aWxkTWVyZ2VUYWdzIH0gZnJvbSBcIi4uL3V0aWxzL21lcmdlVGFnc1wiO1xuaW1wb3J0IHsgY2FuV3JpdGVUZW1wbGF0ZSB9IGZyb20gXCIuLi91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZVwiO1xuaW1wb3J0IHsgVGVtcGxhdGVBY3Rpb25BcmdzLCBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xuXG4vKiogSG93IGxvbmcgdG8gd2FpdCBhZnRlciB0aGUgbGFzdCBlZGl0IGJlZm9yZSB3cml0aW5nIHRvIHRoZSBhdHRyaWJ1dGVzLiAqL1xuY29uc3QgU0FWRV9PTl9DSEFOR0VfREVMQVlfTVMgPSA1MDA7XG5cbnR5cGUgRXhwb3J0ZWQgPSB7IGh0bWw6IHN0cmluZzsganNvbjogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0b3JXcmFwcGVyKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGFkdmFuY2VkT3B0aW9ucyB9ID0gcHJvcHM7XG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcblxuICAgIGNvbnN0IHsgb3B0aW9uczogYWR2YW5jZWQsIGVycm9yOiBvcHRpb25zRXJyb3IgfSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IHBhcnNlQWR2YW5jZWRPcHRpb25zKGFkdmFuY2VkT3B0aW9ucyksXG4gICAgICAgIFthZHZhbmNlZE9wdGlvbnNdXG4gICAgKTtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gYnVpbGRPcHRpb25zKGFkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUpLFxuICAgICAgICBbYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZV1cbiAgICApO1xuXG4gICAgLy8gVGhlIGVkaXRvciBpcyByZWNyZWF0ZWQgd2hlbiBpdHMgb3B0aW9ucyBjaGFuZ2UuIFJlbWVtYmVyIHdoaWNoIG9wdGlvbnNcbiAgICAvLyB0aGUgcmVhZHkgZWRpdG9yIHdhcyBtYWRlIHdpdGgsIHNvIHRoZSBvbGQgb25lIGlzIGZvcmdvdHRlbiBhdCBvbmNlLlxuICAgIGNvbnN0IFtyZWFkeSwgc2V0UmVhZHldID0gdXNlU3RhdGU8eyBlZGl0b3I6IEVkaXRvcjsgb3B0aW9uczogdHlwZW9mIG9wdGlvbnMgfSB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IGVkaXRvciA9IHJlYWR5Py5vcHRpb25zID09PSBvcHRpb25zID8gcmVhZHkuZWRpdG9yIDogbnVsbDtcblxuICAgIC8vIEFuIGVtcHR5IHZhbHVlIG5ldmVyIGNsZWFycyB0aGUgZWRpdG9yIChzZWUgYmVsb3cpLCBzbyBpdCBpcyBubyBlcnJvciBlaXRoZXIuXG4gICAgY29uc3QganNvblN0YXR1cyA9IEpTT05UZW1wbGF0ZS5zdGF0dXM7XG4gICAgY29uc3QganNvblZhbHVlID0gSlNPTlRlbXBsYXRlLnZhbHVlID8/IFwiXCI7XG4gICAgY29uc3QgcGFyc2VkID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKGpzb25TdGF0dXMgPT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSAmJiBqc29uVmFsdWUgIT09IFwiXCIgPyBwYXJzZURlc2lnbihqc29uVmFsdWUpIDoge30pLFxuICAgICAgICBbanNvblN0YXR1cywganNvblZhbHVlXVxuICAgICk7XG4gICAgY29uc3QgbG9hZEVycm9yID0gcGFyc2VkLmVycm9yO1xuXG4gICAgLy8gVW5sYXllciBjYWxscyBoYW5kbGVycyByZWdpc3RlcmVkIG9uY2UgcGVyIGVkaXRvciwgYW5kIHRoZSBzYXZlLW9uLWNoYW5nZVxuICAgIC8vIHRpbWVyIGNhbiBmaXJlIGJlZm9yZSB0aGUgbmV4dCByZW5kZXI7IGJvdGggcmVhZCB0aGUgbGF0ZXN0IHZhbHVlc1xuICAgIC8vIHRocm91Z2ggdGhlc2UgcmVmcyBpbnN0ZWFkIG9mIHRoZSByZW5kZXIgdGhleSB3ZXJlIGNyZWF0ZWQgaW4uXG4gICAgY29uc3QgcHJvcHNSZWYgPSB1c2VSZWYocHJvcHMpO1xuICAgIGNvbnN0IG9wdGlvbnNSZWYgPSB1c2VSZWYob3B0aW9ucyk7XG4gICAgY29uc3QgbG9hZEVycm9yUmVmID0gdXNlUmVmKGxvYWRFcnJvcik7XG4gICAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAgICAgcHJvcHNSZWYuY3VycmVudCA9IHByb3BzO1xuICAgICAgICBvcHRpb25zUmVmLmN1cnJlbnQgPSBvcHRpb25zO1xuICAgICAgICBsb2FkRXJyb3JSZWYuY3VycmVudCA9IGxvYWRFcnJvcjtcbiAgICB9KTtcblxuICAgIC8vIFRoZSBsYXN0IGRlc2lnbiBzdHJpbmcgdGhlIGVkaXRvciBsb2FkZWQgb3IgcHJvZHVjZWQuIFdoZW4gdGhlIGF0dHJpYnV0ZVxuICAgIC8vIGNoYW5nZXMgdG8gdGhpcyB2YWx1ZSAoYmVjYXVzZSB3ZSB3cm90ZSBpdCkgdGhlcmUgaXMgbm90aGluZyB0byByZWxvYWQsIGFuZFxuICAgIC8vIHJlbG9hZGluZyB3b3VsZCB0aHJvdyBhd2F5IHRoZSB1c2VyJ3MgdW5kbyBoaXN0b3J5IGFuZCBzZWxlY3Rpb24uXG4gICAgY29uc3Qgc3luY2VkSnNvbiA9IHVzZVJlZjxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgICBjb25zdCBzYXZlVGltZXIgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gICAgLy8gVGhlIGVkaXRvciBpcyBkZXN0cm95ZWQgb24gdW5tb3VudDsgYSBwZW5kaW5nIHNhdmUgd291bGQgY2FsbCBpbnRvIGl0LlxuICAgIHVzZUVmZmVjdCgoKSA9PiAoKSA9PiBjbGVhclRpbWVvdXQoc2F2ZVRpbWVyLmN1cnJlbnQpLCBbXSk7XG5cbiAgICBjb25zdCByZWFkT25seSA9IEpTT05UZW1wbGF0ZS5yZWFkT25seTtcblxuICAgIGNvbnN0IGV4cG9ydERlc2lnbiA9IHVzZUNhbGxiYWNrKCh1bmxheWVyOiBFZGl0b3IpOiBQcm9taXNlPEV4cG9ydGVkPiA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHVubGF5ZXIuZXhwb3J0SHRtbChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgaHRtbDogZGF0YS5odG1sLCBqc29uOiBKU09OLnN0cmluZ2lmeShkYXRhLmRlc2lnbikgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuXG4gICAgLyoqIFdyaXRlIHRoZSBkZXNpZ24gdG8gdGhlIGF0dHJpYnV0ZXMsIGlmIHRoZXkgY2FuIGJlIHdyaXR0ZW4uIFJldHVybnMgd2hldGhlciBpdCBkaWQuICovXG4gICAgY29uc3Qgd3JpdGVBdHRyaWJ1dGVzID0gdXNlQ2FsbGJhY2soKHsgaHRtbCwganNvbiB9OiBFeHBvcnRlZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCB7IEpTT05UZW1wbGF0ZToganNvbkF0dHIsIEhUTUxCb2R5OiBodG1sQXR0ciB9ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFjYW5Xcml0ZVRlbXBsYXRlKGpzb25BdHRyLCBsb2FkRXJyb3JSZWYuY3VycmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uO1xuICAgICAgICBqc29uQXR0ci5zZXRWYWx1ZShqc29uKTtcbiAgICAgICAgaWYgKGh0bWxBdHRyICYmIGh0bWxBdHRyLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmICFodG1sQXR0ci5yZWFkT25seSkge1xuICAgICAgICAgICAgaHRtbEF0dHIuc2V0VmFsdWUoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgb25SZWFkeSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAodW5sYXllcjogRWRpdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGltYWdlVXBsb2FkVXJsIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKHByb3BzUmVmLmN1cnJlbnQuaW1hZ2VVcGxvYWRNb2RlID09PSBcImVuZHBvaW50XCIgJiYgaW1hZ2VVcGxvYWRVcmwpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlckltYWdlVXBsb2FkKHVubGF5ZXIsIGltYWdlVXBsb2FkVXJsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5sYXllci5hZGRFdmVudExpc3RlbmVyKFwiZGVzaWduOnVwZGF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudC5zYXZlT25DaGFuZ2UgfHwgIWNhbldyaXRlVGVtcGxhdGUoY3VycmVudC5KU09OVGVtcGxhdGUsIGxvYWRFcnJvclJlZi5jdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgc2F2ZVRpbWVyLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0RGVzaWduKHVubGF5ZXIpLnRoZW4od3JpdGVBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICB9LCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQSBuZXcgZWRpdG9yIHN0YXJ0cyBibGFuaywgc28gd2hhdGV2ZXIgaXQgaGFkIGxvYWRlZCBpcyBnb25lLlxuICAgICAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc2V0UmVhZHkoeyBlZGl0b3I6IHVubGF5ZXIsIG9wdGlvbnM6IG9wdGlvbnNSZWYuY3VycmVudCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2V4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICAvLyBMb2FkIHRoZSBkZXNpZ24gZnJvbSB0aGUgYXR0cmlidXRlLCBvbmNlIHRoZSBlZGl0b3IgYW5kIHRoZSB2YWx1ZSBhcmUgcmVhZHkuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gQW4gZW1wdHkgdmFsdWUgbmV2ZXIgY2xlYXJzIHRoZSBlZGl0b3IuIEl0IGlzIHdoYXQgYSByb2xsYmFjayBvZiBhIG5ld1xuICAgICAgICAvLyBvYmplY3QgcHJvZHVjZXMsIGZvciBpbnN0YW5jZSB3aGVuIGEgcG9wLXVwIG9wZW5lZCBieSB0aGUgc2F2ZSBhY3Rpb24gaXNcbiAgICAgICAgLy8gY2xvc2VkLCBhbmQgY2xlYXJpbmcgd291bGQgdGhyb3cgYXdheSBldmVyeXRoaW5nIHRoZSB1c2VyIG1hZGUuXG4gICAgICAgIGlmICghZWRpdG9yIHx8IGpzb25TdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSB8fCBqc29uVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoanNvblZhbHVlID09PSBzeW5jZWRKc29uLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uVmFsdWU7XG4gICAgICAgIGlmIChwYXJzZWQuZGVzaWduKSB7XG4gICAgICAgICAgICBlZGl0b3IubG9hZERlc2lnbihwYXJzZWQuZGVzaWduIGFzIFBhcmFtZXRlcnM8RWRpdG9yW1wibG9hZERlc2lnblwiXT5bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUmVhY3RFbWFpbEVkaXRvcjogJHtwYXJzZWQuZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCBqc29uU3RhdHVzLCBqc29uVmFsdWUsIHBhcnNlZF0pO1xuXG4gICAgLy8gUmVhZC1vbmx5OiBzaG93IHRoZSBkZXNpZ24gYXMgYSBwcmV2aWV3IHJhdGhlciB0aGFuIGFuIGVkaXRvci5cbiAgICBjb25zdCBwcmV2aWV3U2hvd24gPSB1c2VSZWYoZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkT25seSAmJiAhcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zaG93UHJldmlldyhcImRlc2t0b3BcIik7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWRPbmx5ICYmIHByZXZpZXdTaG93bi5jdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0b3IuaGlkZVByZXZpZXcoKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCByZWFkT25seV0pO1xuXG4gICAgY29uc3QgbG9jYWxlID0gcHJvcHMubG9jYWxlPy52YWx1ZTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIGxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0TG9jYWxlKGxvY2FsZSB8fCBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGxvY2FsZV0pO1xuXG4gICAgLy8gTWVuZGl4IGhhbmRzIG91dCBuZXcgbGlzdCBvYmplY3RzIG9uIHJlLXJlbmRlcnM7IGNvbXBhcmUgYnkgY29udGVudCBzbyB0aGVcbiAgICAvLyBlZGl0b3IgaXMgb25seSB0b2xkIHdoZW4gdGhlIHRhZ3MgcmVhbGx5IGNoYW5nZS5cbiAgICBjb25zdCBtZXJnZVRhZ3MgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYnVpbGRNZXJnZVRhZ3MocHJvcHMubWVyZ2VUYWdzLCBwcm9wcy5tZXJnZVRhZ05hbWUsIHByb3BzLm1lcmdlVGFnVmFsdWUsIHByb3BzLm1lcmdlVGFnU2FtcGxlKSA/PyBudWxsXG4gICAgKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIG1lcmdlVGFncyAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRNZXJnZVRhZ3MoSlNPTi5wYXJzZShtZXJnZVRhZ3MpKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIG1lcmdlVGFnc10pO1xuXG4gICAgY29uc3QgcnVuQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIGFzeW5jIChhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz4sIHdyaXRlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkID0gYXdhaXQgZXhwb3J0RGVzaWduKGVkaXRvcik7XG4gICAgICAgICAgICAvLyBSdW5uaW5nIHRoZSBzYXZlIGFjdGlvbiBhZnRlciBhIHJlZnVzZWQgd3JpdGUgd291bGQgY29tbWl0IHRoZVxuICAgICAgICAgICAgLy8gb2JqZWN0IGFzIGlmIHRoZSB0ZW1wbGF0ZSBoYWQgYmVlbiBzdG9yZWQuXG4gICAgICAgICAgICBpZiAod3JpdGUgJiYgIXdyaXRlQXR0cmlidXRlcyhleHBvcnRlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKHsgaHRtbF9fOiBleHBvcnRlZC5odG1sLCBqc29uX186IGV4cG9ydGVkLmpzb24gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtlZGl0b3IsIGV4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICBjb25zdCBlcnJvciA9IG9wdGlvbnNFcnJvciA/PyBsb2FkRXJyb3I7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInJlYWN0LWVtYWlsLWVkaXRvci1kaXZcIiwgcHJvcHMuY2xhc3MpfSBzdHlsZT17cHJvcHMuc3R5bGV9PlxuICAgICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgICAgICByZWFkeT17ZWRpdG9yICE9PSBudWxsfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgICAgICBjYW5TYXZlPXtjYW5Xcml0ZVRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgbG9hZEVycm9yKX1cbiAgICAgICAgICAgICAgICBleHBvcnRIdG1sPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93RXhwb3J0SHRtbCAmJiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLmV4cG9ydEh0bWxDYXB0aW9uPy52YWx1ZSB8fCBcIkV4cG9ydCBIVE1MXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLmV4cG9ydEhUTUxBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuZXhwb3J0SFRNTEFjdGlvbiEsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGU9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dTYXZlVGVtcGxhdGUgJiYgcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLnNhdmVUZW1wbGF0ZUNhcHRpb24/LnZhbHVlIHx8IFwiU2F2ZSBUZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uISwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxuICAgICAgICAgICAgICAgIG1pbkhlaWdodD17cHJvcHMuZWRpdG9ySGVpZ2h0IHx8IFwiNzAwcHhcIn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRWRpdG9yV3JhcHBlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlclwiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RFbWFpbEVkaXRvcihwcm9wczogUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPEVkaXRvcldyYXBwZXIgey4uLnByb3BzfSAvPjtcbn1cbiJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJfX3VubGF5ZXJfbGFzdEVkaXRvcklkIiwidXNlQ291bnRlckVkaXRvcklkIiwidXNlTWVtbyIsInVzZUdlbmVyYXRlZEVkaXRvcklkIiwiUmVhY3QiLCJ1c2VJZCIsInJlcGxhY2UiLCJFbWFpbEVkaXRvcklubmVyIiwicHJvcHMiLCJyZWYiLCJfYSIsIl9iIiwiX2MiLCJfZCIsIl9lIiwiX2YiLCJfZyIsIl9oIiwiX2kiLCJvbkxvYWQiLCJvblJlYWR5Iiwic2NyaXB0VXJsIiwibWluSGVpZ2h0Iiwic3R5bGUiLCJlZGl0b3IiLCJzZXRFZGl0b3IiLCJ1c2VTdGF0ZSIsImhhc0xvYWRlZEVtYmVkU2NyaXB0Iiwic2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQiLCJnZW5lcmF0ZWRJZCIsImVkaXRvcklkIiwib3B0aW9ucyIsImFwcGVhcmFuY2UiLCJkaXNwbGF5TW9kZSIsImxvY2FsZSIsInByb2plY3RJZCIsInRvb2xzIiwiaWQiLCJzb3VyY2UiLCJuYW1lIiwidmVyc2lvbiIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJlZGl0b3JSZWYiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJjdXJyZW50IiwiX2EyIiwiZGVzdHJveSIsImxvYWRTY3JpcHQiLCJ1bmxheWVyIiwiY3JlYXRlRWRpdG9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1ldGhvZFByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInByb3BOYW1lIiwidGVzdCIsImZvckVhY2giLCJtZXRob2RQcm9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImpvaW4iLCJjcmVhdGVFbGVtZW50IiwiZmxleCIsImRpc3BsYXkiLCJFbWFpbEVkaXRvciIsImZvcndhcmRSZWYiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsImFwcGVuZENsYXNzIiwicGFyc2VWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImFwcGx5IiwidG9TdHJpbmciLCJwcm90b3R5cGUiLCJpbmNsdWRlcyIsImtleSIsImNhbGwiLCJ2YWx1ZSIsIm5ld0NsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJfanN4IiwiX2pzeHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQUFNQSxHQUFBLEdBQ0osT0FBT0MsTUFBQSxLQUFXLFdBQUEsR0FBYztBQUFFQyxFQUFBQSxzQkFBQSxFQUF3QjtBQUFFLENB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
