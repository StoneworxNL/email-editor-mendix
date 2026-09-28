import React, { useMemo, useState, useImperativeHandle, useRef, useEffect, useCallback } from 'react';

// package.json
var name = "react-email-editor";
var version = "2.1.2";

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
    return (React.createElement("button", { type: "button", className: classNames("btn mx-button btn-default", className), disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick }, button.caption));
}
function Toolbar({ ready, readOnly, canSave, exportHtml, saveTemplate }) {
    // Saving from a read-only editor would store nothing the user could change.
    const showSave = saveTemplate && !readOnly;
    if (!exportHtml && !showSave) {
        return null;
    }
    return (React.createElement("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium" },
        exportHtml && React.createElement(ActionButton, { button: exportHtml, disabled: !ready }),
        showSave && (React.createElement(ActionButton, { button: saveTemplate, disabled: !ready || !canSave, className: exportHtml ? "spacing-outer-left-medium" : undefined }))));
}

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;
function EditorWrapper(props) {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions } = props;
    const emailEditorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [loadError, setLoadError] = useState();
    // Read by the save-on-change timer, which can fire before the render that
    // follows setLoadError.
    const loadErrorRef = useRef();
    const reportLoadError = useCallback((message) => {
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
    const syncedJson = useRef();
    const saveTimer = useRef();
    // The editor is destroyed on unmount; a pending save would call into it.
    useEffect(() => () => clearTimeout(saveTimer.current), []);
    const readOnly = JSONTemplate.readOnly;
    const { options: advanced, error: optionsError } = useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
    const options = useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode), [advanced, projectId, theme, imageUploadMode]);
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
        setEditor(unlayer);
    }, [exportDesign, writeAttributes]);
    // The editor is recreated when its options change; forget the old one.
    useEffect(() => setEditor(null), [options]);
    // Load the design from the attribute, once the editor and the value are ready.
    const jsonStatus = JSONTemplate.status;
    const jsonValue = JSONTemplate.value ?? "";
    useEffect(() => {
        if (!editor || jsonStatus !== "available" /* ValueStatus.Available */) {
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
            editor.loadDesign(design);
        }
        else {
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
    return (React.createElement("div", { className: classNames("react-email-editor-div", props.class), style: props.style },
        React.createElement(Toolbar, { ready: editor !== null, readOnly: readOnly, canSave: canWriteTemplate(JSONTemplate, loadError), exportHtml: props.isShowExportHtml && props.exportHTMLAction
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
                : undefined }),
        error && (React.createElement("div", { className: "alert alert-danger", role: "alert" }, error)),
        React.createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: props.editorHeight || "700px", options: options })));
}

function ReactEmailEditor(props) {
    return React.createElement(EditorWrapper, { ...props });
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9lZGl0b3JPcHRpb25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2ltYWdlVXBsb2FkLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21lcmdlVGFncy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZS50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Rvb2xiYXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlLFxuICB1c2VNZW1vXG59IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBwYWNrYWdlLmpzb25cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIyLjEuMlwiO1xuXG4vLyBzcmMvbG9hZFNjcmlwdC50c1xudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSBcImh0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzJcIjtcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBmaW5kU2NyaXB0ID0gKHNjcmlwdFVybCkgPT4ge1xuICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFwiKTtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XG4gICAgICBmb3VuZCA9IHNjcmlwdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xudmFyIGlzRW1iZWRSZWFkeSA9ICgpID0+IGxvYWRlZCB8fCB0eXBlb2YgdW5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBhZGRDYWxsYmFjayA9IChjYWxsYmFjaykgPT4ge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9ICgpID0+IHtcbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgbG9hZGVkID0gdHJ1ZTtcbiAgICBsZXQgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSAoY2FsbGJhY2ssIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmwpID0+IHtcbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGZpbmRTY3JpcHQoc2NyaXB0VXJsKTtcbiAgaWYgKCFleGlzdGluZ1NjcmlwdCkge1xuICAgIGNvbnN0IGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc2NyaXB0VXJsKTtcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgZXhpc3RpbmdTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgX191bmxheWVyX2xhc3RFZGl0b3JJZDogMCB9IDogd2luZG93O1xud2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xudmFyIHVzZUNvdW50ZXJFZGl0b3JJZCA9ICgpID0+IHVzZU1lbW8oKCkgPT4gYGVkaXRvci0keysrd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWR9YCwgW10pO1xudmFyIHVzZUdlbmVyYXRlZEVkaXRvcklkID0gdHlwZW9mIFJlYWN0LnVzZUlkID09PSBcImZ1bmN0aW9uXCIgPyAoXG4gIC8vIFN0cmlwICc6JyBzbyB0aGUgaWQgaXMgYSB2YWxpZCBDU1Mgc2VsZWN0b3IgZm9yIHVubGF5ZXIuY3JlYXRlRWRpdG9yLlxuICAoKSA9PiBgZWRpdG9yLSR7UmVhY3QudXNlSWQoKS5yZXBsYWNlKC86L2csIFwiXCIpfWBcbikgOiB1c2VDb3VudGVyRWRpdG9ySWQ7XG5mdW5jdGlvbiBFbWFpbEVkaXRvcklubmVyKHByb3BzLCByZWYpIHtcbiAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2k7XG4gIGNvbnN0IHsgb25Mb2FkLCBvblJlYWR5LCBzY3JpcHRVcmwsIG1pbkhlaWdodCA9IDUwMCwgc3R5bGUgPSB7fSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZShcbiAgICBudWxsXG4gICk7XG4gIGNvbnN0IFtoYXNMb2FkZWRFbWJlZFNjcmlwdCwgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBnZW5lcmF0ZWRJZCA9IHVzZUdlbmVyYXRlZEVkaXRvcklkKCk7XG4gIGNvbnN0IGVkaXRvcklkID0gcHJvcHMuZWRpdG9ySWQgfHwgZ2VuZXJhdGVkSWQ7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4ucHJvcHMub3B0aW9ucyB8fCB7fSxcbiAgICBhcHBlYXJhbmNlOiAoX2IgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX2IgOiAoX2EgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2EuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfYyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYy5kaXNwbGF5TW9kZSkgfHwgXCJlbWFpbFwiLFxuICAgIGxvY2FsZTogKF9lID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX2UgOiAoX2QgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2QubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9nID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX2cgOiAoX2YgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2YucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX2kgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9pIDogKF9oID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9oLnRvb2xzLFxuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2ZXJzaW9uXG4gICAgfVxuICB9O1xuICB1c2VJbXBlcmF0aXZlSGFuZGxlKFxuICAgIHJlZixcbiAgICAoKSA9PiAoe1xuICAgICAgZWRpdG9yXG4gICAgfSksXG4gICAgW2VkaXRvcl1cbiAgKTtcbiAgY29uc3QgZWRpdG9yUmVmID0gdXNlUmVmKGVkaXRvcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZWRpdG9yUmVmLmN1cnJlbnQgPSBlZGl0b3I7XG4gIH0sIFtlZGl0b3JdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdmFyIF9hMjtcbiAgICAgIChfYTIgPSBlZGl0b3JSZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KCgpID0+IHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpLCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIGNvbnN0IG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihcbiAgICAocHJvcE5hbWUpID0+IC9eb24vLnRlc3QocHJvcE5hbWUpXG4gICk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xuICAgIG1ldGhvZFByb3BzLmZvckVhY2goKG1ldGhvZFByb3ApID0+IHtcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09IFwib25Mb2FkXCIgJiYgbWV0aG9kUHJvcCAhPT0gXCJvblJlYWR5XCIgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvblJlYWR5KSB7XG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImVkaXRvcjpyZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgbWV0aG9kUHJvcHMuam9pbihcIixcIildKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIG1pbkhlaWdodFxuICAgICAgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogZWRpdG9ySWQsIHN0eWxlOiB7IC4uLnN0eWxlLCBmbGV4OiAxIH0gfSlcbiAgKTtcbn1cbnZhciBFbWFpbEVkaXRvciA9IFJlYWN0LmZvcndhcmRSZWYoRW1haWxFZGl0b3JJbm5lcik7XG5leHBvcnQge1xuICBFbWFpbEVkaXRvcixcbiAgRW1haWxFZGl0b3IgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgeyBJbWFnZVVwbG9hZE1vZGVFbnVtLCBUaGVtZUVudW0gfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuZXhwb3J0IHR5cGUgRWRpdG9yID0gTm9uTnVsbGFibGU8RWRpdG9yUmVmW1wiZWRpdG9yXCJdPjtcbmV4cG9ydCB0eXBlIEVkaXRvck9wdGlvbnMgPSBOb25OdWxsYWJsZTxFbWFpbEVkaXRvclByb3BzW1wib3B0aW9uc1wiXT47XG5cbi8qKlxuICogUGFyc2UgdGhlIFwiQWR2YW5jZWQgb3B0aW9ucyAoSlNPTilcIiBwcm9wZXJ0eS4gUmV0dXJucyBhbiBlcnJvciBtZXNzYWdlIGluc3RlYWRcbiAqIG9mIHRocm93aW5nLCBzbyBhIHR5cG8gaW4gU3R1ZGlvIFBybyBzaG93cyB1cCBhcyBhIG1lc3NhZ2UsIG5vdCBhIGRlYWQgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQWR2YW5jZWRPcHRpb25zKGpzb246IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsgb3B0aW9uczogRWRpdG9yT3B0aW9uczsgZXJyb3I/OiBzdHJpbmcgfSB7XG4gICAgaWYgKCFqc29uIHx8ICFqc29uLnRyaW0oKSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3B0aW9uczoge30sIGVycm9yOiBcIkFkdmFuY2VkIG9wdGlvbnMgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgb3B0aW9uczogcGFyc2VkIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IGBBZHZhbmNlZCBvcHRpb25zIGFyZSBub3QgdmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgaW4gaGVyZSBtdXN0IGJlIHN0YWJsZTogcmVhY3QtZW1haWwtZWRpdG9yIGRlc3Ryb3lzIGFuZCByZWNyZWF0ZXNcbiAqIHRoZSBlZGl0b3IsIGxvc2luZyB1bnNhdmVkIHdvcmssIHdoZW5ldmVyIHRoZSBzZXJpYWxpemVkIG9wdGlvbnMgY2hhbmdlLiBWYWx1ZXNcbiAqIHRoYXQgY2FuIGNoYW5nZSBhdCBydW50aW1lIChsb2NhbGUsIG1lcmdlIHRhZ3MpIGdvIHRocm91Z2ggdGhlIGVkaXRvciBBUEkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9wdGlvbnMoXG4gICAgYWR2YW5jZWQ6IEVkaXRvck9wdGlvbnMsXG4gICAgcHJvamVjdElkOiBudW1iZXIsXG4gICAgdGhlbWU6IFRoZW1lRW51bSxcbiAgICBpbWFnZVVwbG9hZE1vZGU6IEltYWdlVXBsb2FkTW9kZUVudW1cbik6IEVkaXRvck9wdGlvbnMge1xuICAgIGNvbnN0IG9wdGlvbnM6IEVkaXRvck9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmFkdmFuY2VkLFxuICAgICAgICBhcHBlYXJhbmNlOiB7IC4uLmFkdmFuY2VkLmFwcGVhcmFuY2UsIHRoZW1lIH1cbiAgICB9O1xuICAgIGlmIChwcm9qZWN0SWQgPiAwKSB7XG4gICAgICAgIG9wdGlvbnMucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIH1cbiAgICBpZiAoaW1hZ2VVcGxvYWRNb2RlID09PSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgb3B0aW9ucy5mZWF0dXJlcyA9IHsgLi4uYWR2YW5jZWQuZmVhdHVyZXMsIHVzZXJVcGxvYWRzOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkRGVzaWduID0geyBkZXNpZ24/OiBvYmplY3Q7IGVycm9yPzogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlc2lnbihqc29uOiBzdHJpbmcpOiBQYXJzZWREZXNpZ24ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghZGVzaWduIHx8IHR5cGVvZiBkZXNpZ24gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZSBzYXZlZCB0ZW1wbGF0ZSBpcyBub3QgYSBKU09OIG9iamVjdC5cIiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRlc2lnbiB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGBUaGUgc2F2ZWQgdGVtcGxhdGUgY291bGQgbm90IGJlIHJlYWQ6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YCB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVkaXRvciB9IGZyb20gXCIuL2VkaXRvck9wdGlvbnNcIjtcblxudHlwZSBJbWFnZUNhbGxiYWNrID0gUGFyYW1ldGVyczxFZGl0b3JbXCJyZWdpc3RlckNhbGxiYWNrXCJdPlsxXTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBteD86IHsgc2Vzc2lvbj86IHsgZ2V0Q29uZmlnPzogKGtleTogc3RyaW5nKSA9PiB1bmtub3duIH0gfTtcbiAgICB9XG59XG5cbi8qKlxuICogTWVuZGl4IHB1Ymxpc2hlZCBSRVNUIHNlcnZpY2VzIHRoYXQgdXNlIHRoZSBhY3RpdmUgc2Vzc2lvbiBmb3IgYXV0aGVudGljYXRpb25cbiAqIHJlamVjdCByZXF1ZXN0cyB3aXRob3V0IHRoZSBzZXNzaW9uJ3MgQ1NSRiB0b2tlbi5cbiAqL1xuZnVuY3Rpb24gY3NyZkhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSB3aW5kb3cubXg/LnNlc3Npb24/LmdldENvbmZpZz8uKFwiY3NyZnRva2VuXCIpO1xuICAgIHJldHVybiB0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIgPyB7IFwiWC1Dc3JmLVRva2VuXCI6IHRva2VuIH0gOiB7fTtcbn1cblxuLyoqXG4gKiBVcGxvYWQgaW1hZ2VzIHRvIHRoZSBhcHAncyBvd24gZW5kcG9pbnQgaW5zdGVhZCBvZiBVbmxheWVyJ3Mgc3RvcmFnZS4gVGhlXG4gKiBlbmRwb2ludCByZWNlaXZlcyBtdWx0aXBhcnQvZm9ybS1kYXRhIHdpdGggdGhlIGltYWdlIGluIGEgcGFydCBuYW1lZCBcImZpbGVcIlxuICogYW5kIG11c3QgYW5zd2VyIHdpdGggSlNPTiBjb250YWluaW5nIHRoZSBwdWJsaWMgXCJ1cmxcIiBvZiB0aGUgc3RvcmVkIGltYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJJbWFnZVVwbG9hZChlZGl0b3I6IEVkaXRvciwgdXBsb2FkVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB1cGxvYWQ6IEltYWdlQ2FsbGJhY2sgPSAoZmlsZTogeyBhdHRhY2htZW50czogRmlsZVtdIH0sIGRvbmU6IChyZXN1bHQ6IG9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGUuYXR0YWNobWVudHNbMF07XG4gICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgIGRvbmUoeyBhYm9ydDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKFwiZmlsZVwiLCBpbWFnZSk7XG5cbiAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMCB9KTtcbiAgICAgICAgZmV0Y2godXBsb2FkVXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLi4uY3NyZkhlYWRlcnMoKSB9LFxuICAgICAgICAgICAgYm9keVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkIHdpdGggSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YTogeyB1cmw/OiB1bmtub3duIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGE/LnVybCAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgcmVzcG9uc2UgaGFzIG5vIFwidXJsXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMDAsIHVybDogZGF0YS51cmwgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWFjdEVtYWlsRWRpdG9yOiBpbWFnZSB1cGxvYWQgZmFpbGVkLlwiLCBlKTtcbiAgICAgICAgICAgICAgICBkb25lKHsgZXJyb3I6IGUubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgZWRpdG9yLnJlZ2lzdGVyQ2FsbGJhY2soXCJpbWFnZVwiLCB1cGxvYWQpO1xufVxuIiwiaW1wb3J0IHsgTGlzdEV4cHJlc3Npb25WYWx1ZSwgTGlzdFZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuZXhwb3J0IHR5cGUgTWVyZ2VUYWdzID0gUmVjb3JkPHN0cmluZywgeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHNhbXBsZT86IHN0cmluZyB9PjtcblxuLyoqXG4gKiBUdXJuIHRoZSBtZXJnZSB0YWcgZGF0YXNvdXJjZSBpbnRvIFVubGF5ZXIncyBtZXJnZSB0YWcgbWFwLiBSZXR1cm5zIHVuZGVmaW5lZFxuICogd2hpbGUgdGhlIGxpc3QgaXMgbG9hZGluZywgc28gdGhlIGVkaXRvciBrZWVwcyB3aGF0IGl0IGhhcyB1bnRpbCB0aGVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNZXJnZVRhZ3MoXG4gICAgc291cmNlOiBMaXN0VmFsdWUgfCB1bmRlZmluZWQsXG4gICAgbmFtZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgc2FtcGxlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWRcbik6IE1lcmdlVGFncyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFzb3VyY2UgfHwgIW5hbWUgfHwgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzb3VyY2Uuc3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgfHwgIXNvdXJjZS5pdGVtcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB0YWdzOiBNZXJnZVRhZ3MgPSB7fTtcbiAgICBzb3VyY2UuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5hbWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdWYWx1ZSA9IHZhbHVlLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgaWYgKCF0YWdOYW1lIHx8ICF0YWdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ1NhbXBsZSA9IHNhbXBsZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICB0YWdzW2B0YWdfJHtpbmRleH1gXSA9IHRhZ1NhbXBsZVxuICAgICAgICAgICAgPyB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSwgc2FtcGxlOiB0YWdTYW1wbGUgfVxuICAgICAgICAgICAgOiB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0YWdzO1xufVxuIiwiaW1wb3J0IHsgRWRpdGFibGVWYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5cbi8qKlxuICogV2hldGhlciB0aGUgZWRpdG9yIG1heSB3cml0ZSBpdHMgZGVzaWduIHRvIHRoZSB0ZW1wbGF0ZSBhdHRyaWJ1dGUuXG4gKlxuICogT25seSB3aGVuIE1lbmRpeCBoYXMgdGhlIGF0dHJpYnV0ZSAoYSBsb2FkaW5nIG9yIHVuYXZhaWxhYmxlIGF0dHJpYnV0ZVxuICogYWNjZXB0cyBzZXRWYWx1ZSBhbmQgc3RvcmVzIG5vdGhpbmcpLCBpdCBpcyBlZGl0YWJsZSwgYW5kIHRoZSBzdG9yZWQgdmFsdWVcbiAqIHdhcyB1bmRlcnN0b29kLiBBIHN0b3JlZCB0ZW1wbGF0ZSB0aGF0IGZhaWxlZCB0byBsb2FkIGlzIG5vdCBpbiB0aGUgZWRpdG9yLFxuICogc28gd3JpdGluZyB0aGUgZWRpdG9yJ3MgY29udGVudCB3b3VsZCByZXBsYWNlIGl0IHdpdGggd2hhdGV2ZXIgaXMgb24gc2NyZWVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuV3JpdGVUZW1wbGF0ZShhdHRyaWJ1dGU6IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgbG9hZEVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmICFhdHRyaWJ1dGUucmVhZE9ubHkgJiYgIWxvYWRFcnJvcjtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBPcHRpb24gfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG4vKipcbiAqIFRoZSBhY3Rpb24gYXJndW1lbnRzLCBleGFjdGx5IGFzIFJlYWN0RW1haWxFZGl0b3IueG1sIGdlbmVyYXRlcyB0aGVtIGludG9cbiAqIHR5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzLmQudHMuIFNwZWxsaW5nIHRoZW0gb3V0IG9uY2Uga2VlcHMgdGhpcyBmaWxlIGFuZFxuICogdGhlIGdlbmVyYXRlZCBwcm9wcyBmcm9tIGRyaWZ0aW5nIGFwYXJ0LlxuICovXG5leHBvcnQgdHlwZSBUZW1wbGF0ZUFjdGlvbkFyZ3MgPSB7IGh0bWxfXzogT3B0aW9uPHN0cmluZz47IGpzb25fXzogT3B0aW9uPHN0cmluZz4gfTtcblxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyQnV0dG9uIHtcbiAgICBjYXB0aW9uOiBzdHJpbmc7XG4gICAgYWN0aW9uOiBBY3Rpb25WYWx1ZTxUZW1wbGF0ZUFjdGlvbkFyZ3M+O1xuICAgIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhclByb3BzIHtcbiAgICAvKiogRmFsc2UgdW50aWwgdGhlIGVkaXRvciBoYXMgbG9hZGVkOyBub3RoaW5nIGNhbiBiZSBleHBvcnRlZCBiZWZvcmUgdGhhdC4gKi9cbiAgICByZWFkeTogYm9vbGVhbjtcbiAgICByZWFkT25seTogYm9vbGVhbjtcbiAgICAvKiogRmFsc2Ugd2hpbGUgdGhlIHRlbXBsYXRlIGF0dHJpYnV0ZSBpcyBsb2FkaW5nLCB1bmF2YWlsYWJsZSBvciBjb3VsZCBub3QgYmUgcmVhZC4gKi9cbiAgICBjYW5TYXZlOiBib29sZWFuO1xuICAgIGV4cG9ydEh0bWw/OiBUb29sYmFyQnV0dG9uO1xuICAgIHNhdmVUZW1wbGF0ZT86IFRvb2xiYXJCdXR0b247XG59XG5cbmZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7XG4gICAgYnV0dG9uLFxuICAgIGRpc2FibGVkLFxuICAgIGNsYXNzTmFtZVxufToge1xuICAgIGJ1dHRvbjogVG9vbGJhckJ1dHRvbjtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG59KTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBidXN5ID0gYnV0dG9uLmFjdGlvbi5pc0V4ZWN1dGluZztcbiAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHRcIiwgY2xhc3NOYW1lKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCBidXN5IHx8ICFidXR0b24uYWN0aW9uLmNhbkV4ZWN1dGV9XG4gICAgICAgICAgICBhcmlhLWJ1c3k9e2J1c3l9XG4gICAgICAgICAgICBvbkNsaWNrPXtidXR0b24ub25DbGlja31cbiAgICAgICAgPlxuICAgICAgICAgICAge2J1dHRvbi5jYXB0aW9ufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9vbGJhcih7IHJlYWR5LCByZWFkT25seSwgY2FuU2F2ZSwgZXhwb3J0SHRtbCwgc2F2ZVRlbXBsYXRlIH06IFRvb2xiYXJQcm9wcyk6IFJlYWN0RWxlbWVudCB8IG51bGwge1xuICAgIC8vIFNhdmluZyBmcm9tIGEgcmVhZC1vbmx5IGVkaXRvciB3b3VsZCBzdG9yZSBub3RoaW5nIHRoZSB1c2VyIGNvdWxkIGNoYW5nZS5cbiAgICBjb25zdCBzaG93U2F2ZSA9IHNhdmVUZW1wbGF0ZSAmJiAhcmVhZE9ubHk7XG4gICAgaWYgKCFleHBvcnRIdG1sICYmICFzaG93U2F2ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItdG9vbGJhciBzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cbiAgICAgICAgICAgIHtleHBvcnRIdG1sICYmIDxBY3Rpb25CdXR0b24gYnV0dG9uPXtleHBvcnRIdG1sfSBkaXNhYmxlZD17IXJlYWR5fSAvPn1cbiAgICAgICAgICAgIHtzaG93U2F2ZSAmJiAoXG4gICAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBidXR0b249e3NhdmVUZW1wbGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZWFkeSB8fCAhY2FuU2F2ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtleHBvcnRIdG1sID8gXCJzcGFjaW5nLW91dGVyLWxlZnQtbWVkaXVtXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5pbXBvcnQgeyBidWlsZE9wdGlvbnMsIEVkaXRvciwgcGFyc2VBZHZhbmNlZE9wdGlvbnMsIHBhcnNlRGVzaWduIH0gZnJvbSBcIi4uL3V0aWxzL2VkaXRvck9wdGlvbnNcIjtcbmltcG9ydCB7IHJlZ2lzdGVySW1hZ2VVcGxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvaW1hZ2VVcGxvYWRcIjtcbmltcG9ydCB7IGJ1aWxkTWVyZ2VUYWdzIH0gZnJvbSBcIi4uL3V0aWxzL21lcmdlVGFnc1wiO1xuaW1wb3J0IHsgY2FuV3JpdGVUZW1wbGF0ZSB9IGZyb20gXCIuLi91dGlscy90ZW1wbGF0ZUF0dHJpYnV0ZVwiO1xuaW1wb3J0IHsgVGVtcGxhdGVBY3Rpb25BcmdzLCBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xuXG4vKiogSG93IGxvbmcgdG8gd2FpdCBhZnRlciB0aGUgbGFzdCBlZGl0IGJlZm9yZSB3cml0aW5nIHRvIHRoZSBhdHRyaWJ1dGVzLiAqL1xuY29uc3QgU0FWRV9PTl9DSEFOR0VfREVMQVlfTVMgPSA1MDA7XG5cbnR5cGUgRXhwb3J0ZWQgPSB7IGh0bWw6IHN0cmluZzsganNvbjogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0b3JXcmFwcGVyKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGFkdmFuY2VkT3B0aW9ucyB9ID0gcHJvcHM7XG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcbiAgICBjb25zdCBbZWRpdG9yLCBzZXRFZGl0b3JdID0gdXNlU3RhdGU8RWRpdG9yIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcbiAgICAvLyBSZWFkIGJ5IHRoZSBzYXZlLW9uLWNoYW5nZSB0aW1lciwgd2hpY2ggY2FuIGZpcmUgYmVmb3JlIHRoZSByZW5kZXIgdGhhdFxuICAgIC8vIGZvbGxvd3Mgc2V0TG9hZEVycm9yLlxuICAgIGNvbnN0IGxvYWRFcnJvclJlZiA9IHVzZVJlZjxzdHJpbmc+KCk7XG4gICAgY29uc3QgcmVwb3J0TG9hZEVycm9yID0gdXNlQ2FsbGJhY2soKG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgICBsb2FkRXJyb3JSZWYuY3VycmVudCA9IG1lc3NhZ2U7XG4gICAgICAgIHNldExvYWRFcnJvcihtZXNzYWdlKTtcbiAgICB9LCBbXSk7XG5cbiAgICAvLyBVbmxheWVyIGNhbGxzIGhhbmRsZXJzIHJlZ2lzdGVyZWQgb25jZSBwZXIgZWRpdG9yOyB0aGV5IHJlYWQgdGhlIGxhdGVzdFxuICAgIC8vIHByb3BzIHRocm91Z2ggdGhpcyByZWYgaW5zdGVhZCBvZiB0aGUgcmVuZGVyIHRoZXkgd2VyZSBjcmVhdGVkIGluLlxuICAgIGNvbnN0IHByb3BzUmVmID0gdXNlUmVmKHByb3BzKTtcbiAgICBwcm9wc1JlZi5jdXJyZW50ID0gcHJvcHM7XG5cbiAgICAvLyBUaGUgbGFzdCBkZXNpZ24gc3RyaW5nIHRoZSBlZGl0b3IgbG9hZGVkIG9yIHByb2R1Y2VkLiBXaGVuIHRoZSBhdHRyaWJ1dGVcbiAgICAvLyBjaGFuZ2VzIHRvIHRoaXMgdmFsdWUgKGJlY2F1c2Ugd2Ugd3JvdGUgaXQpIHRoZXJlIGlzIG5vdGhpbmcgdG8gcmVsb2FkLCBhbmRcbiAgICAvLyByZWxvYWRpbmcgd291bGQgdGhyb3cgYXdheSB0aGUgdXNlcidzIHVuZG8gaGlzdG9yeSBhbmQgc2VsZWN0aW9uLlxuICAgIGNvbnN0IHN5bmNlZEpzb24gPSB1c2VSZWY8c3RyaW5nPigpO1xuXG4gICAgY29uc3Qgc2F2ZVRpbWVyID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+PigpO1xuICAgIC8vIFRoZSBlZGl0b3IgaXMgZGVzdHJveWVkIG9uIHVubW91bnQ7IGEgcGVuZGluZyBzYXZlIHdvdWxkIGNhbGwgaW50byBpdC5cbiAgICB1c2VFZmZlY3QoKCkgPT4gKCkgPT4gY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KSwgW10pO1xuXG4gICAgY29uc3QgcmVhZE9ubHkgPSBKU09OVGVtcGxhdGUucmVhZE9ubHk7XG5cbiAgICBjb25zdCB7IG9wdGlvbnM6IGFkdmFuY2VkLCBlcnJvcjogb3B0aW9uc0Vycm9yIH0gPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiBwYXJzZUFkdmFuY2VkT3B0aW9ucyhhZHZhbmNlZE9wdGlvbnMpLFxuICAgICAgICBbYWR2YW5jZWRPcHRpb25zXVxuICAgICk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IGJ1aWxkT3B0aW9ucyhhZHZhbmNlZCwgcHJvamVjdElkLCB0aGVtZSwgaW1hZ2VVcGxvYWRNb2RlKSxcbiAgICAgICAgW2FkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGVdXG4gICAgKTtcblxuICAgIGNvbnN0IGV4cG9ydERlc2lnbiA9IHVzZUNhbGxiYWNrKCh1bmxheWVyOiBFZGl0b3IpOiBQcm9taXNlPEV4cG9ydGVkPiA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHVubGF5ZXIuZXhwb3J0SHRtbChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgaHRtbDogZGF0YS5odG1sLCBqc29uOiBKU09OLnN0cmluZ2lmeShkYXRhLmRlc2lnbikgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuXG4gICAgLyoqIFdyaXRlIHRoZSBkZXNpZ24gdG8gdGhlIGF0dHJpYnV0ZXMsIGlmIHRoZXkgY2FuIGJlIHdyaXR0ZW4uIFJldHVybnMgd2hldGhlciBpdCBkaWQuICovXG4gICAgY29uc3Qgd3JpdGVBdHRyaWJ1dGVzID0gdXNlQ2FsbGJhY2soKHsgaHRtbCwganNvbiB9OiBFeHBvcnRlZCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCB7IEpTT05UZW1wbGF0ZToganNvbkF0dHIsIEhUTUxCb2R5OiBodG1sQXR0ciB9ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFjYW5Xcml0ZVRlbXBsYXRlKGpzb25BdHRyLCBsb2FkRXJyb3JSZWYuY3VycmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uO1xuICAgICAgICBqc29uQXR0ci5zZXRWYWx1ZShqc29uKTtcbiAgICAgICAgaWYgKGh0bWxBdHRyICYmIGh0bWxBdHRyLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmICFodG1sQXR0ci5yZWFkT25seSkge1xuICAgICAgICAgICAgaHRtbEF0dHIuc2V0VmFsdWUoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgb25SZWFkeSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAodW5sYXllcjogRWRpdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGltYWdlVXBsb2FkVXJsIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKHByb3BzUmVmLmN1cnJlbnQuaW1hZ2VVcGxvYWRNb2RlID09PSBcImVuZHBvaW50XCIgJiYgaW1hZ2VVcGxvYWRVcmwpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlckltYWdlVXBsb2FkKHVubGF5ZXIsIGltYWdlVXBsb2FkVXJsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5sYXllci5hZGRFdmVudExpc3RlbmVyKFwiZGVzaWduOnVwZGF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudC5zYXZlT25DaGFuZ2UgfHwgIWNhbldyaXRlVGVtcGxhdGUoY3VycmVudC5KU09OVGVtcGxhdGUsIGxvYWRFcnJvclJlZi5jdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgc2F2ZVRpbWVyLmN1cnJlbnQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0RGVzaWduKHVubGF5ZXIpLnRoZW4od3JpdGVBdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgICAgICB9LCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQSBuZXcgZWRpdG9yIHN0YXJ0cyBibGFuaywgc28gd2hhdGV2ZXIgaXQgaGFkIGxvYWRlZCBpcyBnb25lLlxuICAgICAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc2V0RWRpdG9yKHVubGF5ZXIpO1xuICAgICAgICB9LFxuICAgICAgICBbZXhwb3J0RGVzaWduLCB3cml0ZUF0dHJpYnV0ZXNdXG4gICAgKTtcblxuICAgIC8vIFRoZSBlZGl0b3IgaXMgcmVjcmVhdGVkIHdoZW4gaXRzIG9wdGlvbnMgY2hhbmdlOyBmb3JnZXQgdGhlIG9sZCBvbmUuXG4gICAgdXNlRWZmZWN0KCgpID0+IHNldEVkaXRvcihudWxsKSwgW29wdGlvbnNdKTtcblxuICAgIC8vIExvYWQgdGhlIGRlc2lnbiBmcm9tIHRoZSBhdHRyaWJ1dGUsIG9uY2UgdGhlIGVkaXRvciBhbmQgdGhlIHZhbHVlIGFyZSByZWFkeS5cbiAgICBjb25zdCBqc29uU3RhdHVzID0gSlNPTlRlbXBsYXRlLnN0YXR1cztcbiAgICBjb25zdCBqc29uVmFsdWUgPSBKU09OVGVtcGxhdGUudmFsdWUgPz8gXCJcIjtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoIWVkaXRvciB8fCBqc29uU3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbiBlbXB0eSB2YWx1ZSBuZXZlciBjbGVhcnMgdGhlIGVkaXRvci4gSXQgaXMgd2hhdCBhIHJvbGxiYWNrIG9mIGEgbmV3XG4gICAgICAgIC8vIG9iamVjdCBwcm9kdWNlcywgZm9yIGluc3RhbmNlIHdoZW4gYSBwb3AtdXAgb3BlbmVkIGJ5IHRoZSBzYXZlIGFjdGlvbiBpc1xuICAgICAgICAvLyBjbG9zZWQsIGFuZCBjbGVhcmluZyB3b3VsZCB0aHJvdyBhd2F5IGV2ZXJ5dGhpbmcgdGhlIHVzZXIgbWFkZS5cbiAgICAgICAgaWYgKGpzb25WYWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmVwb3J0TG9hZEVycm9yKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGpzb25WYWx1ZSA9PT0gc3luY2VkSnNvbi5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0ganNvblZhbHVlO1xuICAgICAgICBjb25zdCB7IGRlc2lnbiwgZXJyb3IgfSA9IHBhcnNlRGVzaWduKGpzb25WYWx1ZSk7XG4gICAgICAgIHJlcG9ydExvYWRFcnJvcihlcnJvcik7XG4gICAgICAgIGlmIChkZXNpZ24pIHtcbiAgICAgICAgICAgIGVkaXRvci5sb2FkRGVzaWduKGRlc2lnbiBhcyBQYXJhbWV0ZXJzPEVkaXRvcltcImxvYWREZXNpZ25cIl0+WzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFJlYWN0RW1haWxFZGl0b3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCBqc29uU3RhdHVzLCBqc29uVmFsdWUsIHJlcG9ydExvYWRFcnJvcl0pO1xuXG4gICAgLy8gUmVhZC1vbmx5OiBzaG93IHRoZSBkZXNpZ24gYXMgYSBwcmV2aWV3IHJhdGhlciB0aGFuIGFuIGVkaXRvci5cbiAgICBjb25zdCBwcmV2aWV3U2hvd24gPSB1c2VSZWYoZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkT25seSAmJiAhcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zaG93UHJldmlldyhcImRlc2t0b3BcIik7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWRPbmx5ICYmIHByZXZpZXdTaG93bi5jdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0b3IuaGlkZVByZXZpZXcoKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCByZWFkT25seV0pO1xuXG4gICAgY29uc3QgbG9jYWxlID0gcHJvcHMubG9jYWxlPy52YWx1ZTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIGxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0TG9jYWxlKGxvY2FsZSB8fCBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGxvY2FsZV0pO1xuXG4gICAgLy8gTWVuZGl4IGhhbmRzIG91dCBuZXcgbGlzdCBvYmplY3RzIG9uIHJlLXJlbmRlcnM7IGNvbXBhcmUgYnkgY29udGVudCBzbyB0aGVcbiAgICAvLyBlZGl0b3IgaXMgb25seSB0b2xkIHdoZW4gdGhlIHRhZ3MgcmVhbGx5IGNoYW5nZS5cbiAgICBjb25zdCBtZXJnZVRhZ3MgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYnVpbGRNZXJnZVRhZ3MocHJvcHMubWVyZ2VUYWdzLCBwcm9wcy5tZXJnZVRhZ05hbWUsIHByb3BzLm1lcmdlVGFnVmFsdWUsIHByb3BzLm1lcmdlVGFnU2FtcGxlKSA/PyBudWxsXG4gICAgKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIG1lcmdlVGFncyAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRNZXJnZVRhZ3MoSlNPTi5wYXJzZShtZXJnZVRhZ3MpKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIG1lcmdlVGFnc10pO1xuXG4gICAgY29uc3QgcnVuQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIGFzeW5jIChhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz4sIHdyaXRlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkID0gYXdhaXQgZXhwb3J0RGVzaWduKGVkaXRvcik7XG4gICAgICAgICAgICAvLyBSdW5uaW5nIHRoZSBzYXZlIGFjdGlvbiBhZnRlciBhIHJlZnVzZWQgd3JpdGUgd291bGQgY29tbWl0IHRoZVxuICAgICAgICAgICAgLy8gb2JqZWN0IGFzIGlmIHRoZSB0ZW1wbGF0ZSBoYWQgYmVlbiBzdG9yZWQuXG4gICAgICAgICAgICBpZiAod3JpdGUgJiYgIXdyaXRlQXR0cmlidXRlcyhleHBvcnRlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKHsgaHRtbF9fOiBleHBvcnRlZC5odG1sLCBqc29uX186IGV4cG9ydGVkLmpzb24gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtlZGl0b3IsIGV4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICBjb25zdCBlcnJvciA9IG9wdGlvbnNFcnJvciA/PyBsb2FkRXJyb3I7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInJlYWN0LWVtYWlsLWVkaXRvci1kaXZcIiwgcHJvcHMuY2xhc3MpfSBzdHlsZT17cHJvcHMuc3R5bGV9PlxuICAgICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgICAgICByZWFkeT17ZWRpdG9yICE9PSBudWxsfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgICAgICBjYW5TYXZlPXtjYW5Xcml0ZVRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgbG9hZEVycm9yKX1cbiAgICAgICAgICAgICAgICBleHBvcnRIdG1sPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93RXhwb3J0SHRtbCAmJiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLmV4cG9ydEh0bWxDYXB0aW9uPy52YWx1ZSB8fCBcIkV4cG9ydCBIVE1MXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLmV4cG9ydEhUTUxBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuZXhwb3J0SFRNTEFjdGlvbiEsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGU9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dTYXZlVGVtcGxhdGUgJiYgcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLnNhdmVUZW1wbGF0ZUNhcHRpb24/LnZhbHVlIHx8IFwiU2F2ZSBUZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uISwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxuICAgICAgICAgICAgICAgIG1pbkhlaWdodD17cHJvcHMuZWRpdG9ySGVpZ2h0IHx8IFwiNzAwcHhcIn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVkaXRvcldyYXBwZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VkaXRvcldyYXBwZXJcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5cbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RW1haWxFZGl0b3IocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxFZGl0b3JXcmFwcGVyIHsuLi5wcm9wc30gLz47XG59XG4iXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiX191bmxheWVyX2xhc3RFZGl0b3JJZCIsInVzZUNvdW50ZXJFZGl0b3JJZCIsInVzZU1lbW8iLCJ1c2VHZW5lcmF0ZWRFZGl0b3JJZCIsIlJlYWN0IiwidXNlSWQiLCJyZXBsYWNlIiwiRW1haWxFZGl0b3JJbm5lciIsInByb3BzIiwicmVmIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsIl9mIiwiX2ciLCJfaCIsIl9pIiwib25Mb2FkIiwib25SZWFkeSIsInNjcmlwdFVybCIsIm1pbkhlaWdodCIsInN0eWxlIiwiZWRpdG9yIiwic2V0RWRpdG9yIiwidXNlU3RhdGUiLCJoYXNMb2FkZWRFbWJlZFNjcmlwdCIsInNldEhhc0xvYWRlZEVtYmVkU2NyaXB0IiwiZ2VuZXJhdGVkSWQiLCJlZGl0b3JJZCIsIm9wdGlvbnMiLCJhcHBlYXJhbmNlIiwiZGlzcGxheU1vZGUiLCJsb2NhbGUiLCJwcm9qZWN0SWQiLCJ0b29scyIsImlkIiwic291cmNlIiwibmFtZSIsInZlcnNpb24iLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwiZWRpdG9yUmVmIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3VycmVudCIsIl9hMiIsImRlc3Ryb3kiLCJsb2FkU2NyaXB0IiwidW5sYXllciIsImNyZWF0ZUVkaXRvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXRob2RQcm9wcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJwcm9wTmFtZSIsInRlc3QiLCJmb3JFYWNoIiwibWV0aG9kUHJvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJqb2luIiwiY3JlYXRlRWxlbWVudCIsImZsZXgiLCJkaXNwbGF5IiwiRW1haWxFZGl0b3IiLCJmb3J3YXJkUmVmIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcHBlbmRDbGFzcyIsInBhcnNlVmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJhcHBseSIsInRvU3RyaW5nIiwicHJvdG90eXBlIiwiaW5jbHVkZXMiLCJrZXkiLCJjYWxsIiwidmFsdWUiLCJuZXdDbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQUFNQSxHQUFBLEdBQ0osT0FBT0MsTUFBQSxLQUFXLFdBQWMsR0FBQTtBQUFFQyxFQUFBQSxzQkFBQSxFQUF3QixDQUFBO0FBQUUsQ0FBQSxHQUFJRCxNQUFBLENBQUE7QUFDbEVELEdBQUEsQ0FBSUUsc0JBQUEsR0FBeUJGLEdBQUEsQ0FBSUUsc0JBQUEsSUFBMEIsQ0FBQSxDQUFBO0FBTTNELElBQU1DLGtCQUFBLEdBQXFCQSxNQUN6QkMsT0FBQSxDQUFRLE1BQU0sQ0FBQSxPQUFBLEVBQVUsRUFBRUosR0FBQSxDQUFJRSxzQkFBc0IsSUFBSSxFQUFFLENBQUEsQ0FBQTtBQVE1RCxJQUFNRyxvQkFBQSxHQUNKLE9BQU9DLEtBQUEsQ0FBTUMsS0FBQSxLQUFVLFVBQUE7QUFBQTtBQUVuQixNQUFNLENBQVVELE9B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S0FBSyxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUUsVUFBVSxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQTtBQUNqRixRQUFBLEtBQUEsQ0FBQSxhQUFBLENBQUMsT0FBTyxFQUFBLEVBQ0osS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQ3RCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQ2xELFVBQVUsRUFDTixLQUFLLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLGdCQUFnQjtBQUM1QyxrQkFBRTtBQUNJLG9CQUFBLE9BQU8sRUFBRSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxJQUFJLGFBQWE7b0JBQ3hELE1BQU0sRUFBRSxLQUFLLENBQUMsZ0JBQWdCO29CQUM5QixPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFpQixFQUFFLEtBQUssQ0FBQztBQUMzRCxpQkFBQTtrQkFDRCxTQUFTLEVBRW5CLFlBQVksRUFDUixLQUFLLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDLGtCQUFrQjtBQUNoRCxrQkFBRTtBQUNJLG9CQUFBLE9BQU8sRUFBRSxLQUFLLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxJQUFJLGVBQWU7b0JBQzVELE1BQU0sRUFBRSxLQUFLLENBQUMsa0JBQWtCO29CQUNoQyxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFtQixFQUFFLElBQUksQ0FBQztBQUM1RCxpQkFBQTtrQkFDRCxTQUFTLEVBRXJCLENBQUE7QUFDRCxRQUFBLEtBQUssS0FDRixLQUFLLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFBLFNBQVMsRUFBQyxvQkFBb0IsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUMzQyxFQUFBLEtBQUssQ0FDSixDQUNUO1FBQ0QsS0FBQyxDQUFBLGFBQUEsQ0FBQSxXQUFXLEVBQ1IsRUFBQSxHQUFHLEVBQUUsY0FBYyxFQUNuQixPQUFPLEVBQUUsT0FBTyxFQUNoQixTQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxPQUFPLEVBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUEsQ0FDbEIsQ0FDQSxFQUNSO0FBQ047O0FDek5NLFNBQVUsZ0JBQWdCLENBQUMsS0FBcUMsRUFBQTtBQUNsRSxJQUFBLE9BQU8sS0FBQyxDQUFBLGFBQUEsQ0FBQSxhQUFhLEVBQUssRUFBQSxHQUFBLEtBQUssR0FBSSxDQUFDO0FBQ3hDOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDFdfQ==
