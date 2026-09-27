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
        body.append("file", image, image.name);
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

function ActionButton({ button, disabled, className }) {
    const busy = button.action.isExecuting;
    return (React.createElement("button", { type: "button", className: classNames("btn mx-button btn-default", className), disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick }, button.caption));
}
function Toolbar({ ready, readOnly, exportHtml, saveTemplate }) {
    // Saving from a read-only editor would store nothing the user could change.
    const showSave = saveTemplate && !readOnly;
    if (!exportHtml && !showSave) {
        return null;
    }
    return (React.createElement("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium" },
        exportHtml && React.createElement(ActionButton, { button: exportHtml, disabled: !ready }),
        showSave && (React.createElement(ActionButton, { button: saveTemplate, disabled: !ready, className: exportHtml ? "spacing-outer-left-medium" : undefined }))));
}

/** How long to wait after the last edit before writing to the attributes. */
const SAVE_ON_CHANGE_DELAY_MS = 500;
function EditorWrapper(props) {
    const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions } = props;
    const emailEditorRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [loadError, setLoadError] = useState();
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
    /** Write the design to the attributes, if they can be written. */
    const writeAttributes = useCallback(({ html, json }) => {
        const { JSONTemplate: jsonAttr, HTMLBody: htmlAttr } = propsRef.current;
        syncedJson.current = json;
        if (!jsonAttr.readOnly) {
            jsonAttr.setValue(json);
        }
        if (htmlAttr && !htmlAttr.readOnly) {
            htmlAttr.setValue(html);
        }
    }, []);
    const onReady = useCallback((unlayer) => {
        const { imageUploadUrl } = propsRef.current;
        if (propsRef.current.imageUploadMode === "endpoint" && imageUploadUrl) {
            registerImageUpload(unlayer, imageUploadUrl);
        }
        unlayer.addEventListener("design:updated", () => {
            const current = propsRef.current;
            if (!current.saveOnChange || current.JSONTemplate.readOnly) {
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
        if (jsonValue === (syncedJson.current ?? "")) {
            return;
        }
        syncedJson.current = jsonValue;
        if (jsonValue === "") {
            setLoadError(undefined);
            editor.loadBlank();
            return;
        }
        const { design, error } = parseDesign(jsonValue);
        setLoadError(error);
        if (design) {
            editor.loadDesign(design);
        }
        else {
            console.error(`ReactEmailEditor: ${error}`);
        }
    }, [editor, jsonStatus, jsonValue]);
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
        if (write) {
            writeAttributes(exported);
        }
        if (action.canExecute && !action.isExecuting) {
            action.execute({ html__: exported.html, json__: exported.json });
        }
    }, [editor, exportDesign, writeAttributes]);
    const error = optionsError ?? loadError;
    return (React.createElement("div", { className: classNames("react-email-editor-div", props.class), style: props.style },
        React.createElement(Toolbar, { ready: editor !== null, readOnly: readOnly, exportHtml: props.isShowExportHtml && props.exportHTMLAction
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9pbmRleC5tanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9lZGl0b3JPcHRpb25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2ltYWdlVXBsb2FkLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21lcmdlVGFncy50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Rvb2xiYXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG5pbXBvcnQgUmVhY3QsIHtcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlLFxuICB1c2VNZW1vXG59IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBwYWNrYWdlLmpzb25cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIyLjEuMlwiO1xuXG4vLyBzcmMvbG9hZFNjcmlwdC50c1xudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSBcImh0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzJcIjtcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBmaW5kU2NyaXB0ID0gKHNjcmlwdFVybCkgPT4ge1xuICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFwiKTtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XG4gICAgICBmb3VuZCA9IHNjcmlwdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm91bmQ7XG59O1xudmFyIGlzRW1iZWRSZWFkeSA9ICgpID0+IGxvYWRlZCB8fCB0eXBlb2YgdW5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBhZGRDYWxsYmFjayA9IChjYWxsYmFjaykgPT4ge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9ICgpID0+IHtcbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgbG9hZGVkID0gdHJ1ZTtcbiAgICBsZXQgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSAoY2FsbGJhY2ssIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmwpID0+IHtcbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGZpbmRTY3JpcHQoc2NyaXB0VXJsKTtcbiAgaWYgKCFleGlzdGluZ1NjcmlwdCkge1xuICAgIGNvbnN0IGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc2NyaXB0VXJsKTtcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzRW1iZWRSZWFkeSgpKSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgZXhpc3RpbmdTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvRW1haWxFZGl0b3IudHN4XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHsgX191bmxheWVyX2xhc3RFZGl0b3JJZDogMCB9IDogd2luZG93O1xud2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xudmFyIHVzZUNvdW50ZXJFZGl0b3JJZCA9ICgpID0+IHVzZU1lbW8oKCkgPT4gYGVkaXRvci0keysrd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWR9YCwgW10pO1xudmFyIHVzZUdlbmVyYXRlZEVkaXRvcklkID0gdHlwZW9mIFJlYWN0LnVzZUlkID09PSBcImZ1bmN0aW9uXCIgPyAoXG4gIC8vIFN0cmlwICc6JyBzbyB0aGUgaWQgaXMgYSB2YWxpZCBDU1Mgc2VsZWN0b3IgZm9yIHVubGF5ZXIuY3JlYXRlRWRpdG9yLlxuICAoKSA9PiBgZWRpdG9yLSR7UmVhY3QudXNlSWQoKS5yZXBsYWNlKC86L2csIFwiXCIpfWBcbikgOiB1c2VDb3VudGVyRWRpdG9ySWQ7XG5mdW5jdGlvbiBFbWFpbEVkaXRvcklubmVyKHByb3BzLCByZWYpIHtcbiAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2k7XG4gIGNvbnN0IHsgb25Mb2FkLCBvblJlYWR5LCBzY3JpcHRVcmwsIG1pbkhlaWdodCA9IDUwMCwgc3R5bGUgPSB7fSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZShcbiAgICBudWxsXG4gICk7XG4gIGNvbnN0IFtoYXNMb2FkZWRFbWJlZFNjcmlwdCwgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBnZW5lcmF0ZWRJZCA9IHVzZUdlbmVyYXRlZEVkaXRvcklkKCk7XG4gIGNvbnN0IGVkaXRvcklkID0gcHJvcHMuZWRpdG9ySWQgfHwgZ2VuZXJhdGVkSWQ7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgLi4ucHJvcHMub3B0aW9ucyB8fCB7fSxcbiAgICBhcHBlYXJhbmNlOiAoX2IgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX2IgOiAoX2EgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2EuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfYyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYy5kaXNwbGF5TW9kZSkgfHwgXCJlbWFpbFwiLFxuICAgIGxvY2FsZTogKF9lID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX2UgOiAoX2QgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2QubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9nID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX2cgOiAoX2YgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2YucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX2kgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9pIDogKF9oID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9oLnRvb2xzLFxuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2ZXJzaW9uXG4gICAgfVxuICB9O1xuICB1c2VJbXBlcmF0aXZlSGFuZGxlKFxuICAgIHJlZixcbiAgICAoKSA9PiAoe1xuICAgICAgZWRpdG9yXG4gICAgfSksXG4gICAgW2VkaXRvcl1cbiAgKTtcbiAgY29uc3QgZWRpdG9yUmVmID0gdXNlUmVmKGVkaXRvcik7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZWRpdG9yUmVmLmN1cnJlbnQgPSBlZGl0b3I7XG4gIH0sIFtlZGl0b3JdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdmFyIF9hMjtcbiAgICAgIChfYTIgPSBlZGl0b3JSZWYuY3VycmVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9hMi5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KCgpID0+IHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpLCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIGNvbnN0IG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihcbiAgICAocHJvcE5hbWUpID0+IC9eb24vLnRlc3QocHJvcE5hbWUpXG4gICk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xuICAgIG1ldGhvZFByb3BzLmZvckVhY2goKG1ldGhvZFByb3ApID0+IHtcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09IFwib25Mb2FkXCIgJiYgbWV0aG9kUHJvcCAhPT0gXCJvblJlYWR5XCIgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvblJlYWR5KSB7XG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImVkaXRvcjpyZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgbWV0aG9kUHJvcHMuam9pbihcIixcIildKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZmxleDogMSxcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIG1pbkhlaWdodFxuICAgICAgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogZWRpdG9ySWQsIHN0eWxlOiB7IC4uLnN0eWxlLCBmbGV4OiAxIH0gfSlcbiAgKTtcbn1cbnZhciBFbWFpbEVkaXRvciA9IFJlYWN0LmZvcndhcmRSZWYoRW1haWxFZGl0b3JJbm5lcik7XG5leHBvcnQge1xuICBFbWFpbEVkaXRvcixcbiAgRW1haWxFZGl0b3IgYXMgZGVmYXVsdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXAiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgeyBJbWFnZVVwbG9hZE1vZGVFbnVtLCBUaGVtZUVudW0gfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuZXhwb3J0IHR5cGUgRWRpdG9yID0gTm9uTnVsbGFibGU8RWRpdG9yUmVmW1wiZWRpdG9yXCJdPjtcbmV4cG9ydCB0eXBlIEVkaXRvck9wdGlvbnMgPSBOb25OdWxsYWJsZTxFbWFpbEVkaXRvclByb3BzW1wib3B0aW9uc1wiXT47XG5cbi8qKlxuICogUGFyc2UgdGhlIFwiQWR2YW5jZWQgb3B0aW9ucyAoSlNPTilcIiBwcm9wZXJ0eS4gUmV0dXJucyBhbiBlcnJvciBtZXNzYWdlIGluc3RlYWRcbiAqIG9mIHRocm93aW5nLCBzbyBhIHR5cG8gaW4gU3R1ZGlvIFBybyBzaG93cyB1cCBhcyBhIG1lc3NhZ2UsIG5vdCBhIGRlYWQgcGFnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQWR2YW5jZWRPcHRpb25zKGpzb246IHN0cmluZyB8IHVuZGVmaW5lZCk6IHsgb3B0aW9uczogRWRpdG9yT3B0aW9uczsgZXJyb3I/OiBzdHJpbmcgfSB7XG4gICAgaWYgKCFqc29uIHx8ICFqc29uLnRyaW0oKSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSB9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgb3B0aW9uczoge30sIGVycm9yOiBcIkFkdmFuY2VkIG9wdGlvbnMgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgb3B0aW9uczogcGFyc2VkIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IGBBZHZhbmNlZCBvcHRpb25zIGFyZSBub3QgdmFsaWQgSlNPTjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgaW4gaGVyZSBtdXN0IGJlIHN0YWJsZTogcmVhY3QtZW1haWwtZWRpdG9yIGRlc3Ryb3lzIGFuZCByZWNyZWF0ZXNcbiAqIHRoZSBlZGl0b3IsIGxvc2luZyB1bnNhdmVkIHdvcmssIHdoZW5ldmVyIHRoZSBzZXJpYWxpemVkIG9wdGlvbnMgY2hhbmdlLiBWYWx1ZXNcbiAqIHRoYXQgY2FuIGNoYW5nZSBhdCBydW50aW1lIChsb2NhbGUsIG1lcmdlIHRhZ3MpIGdvIHRocm91Z2ggdGhlIGVkaXRvciBBUEkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE9wdGlvbnMoXG4gICAgYWR2YW5jZWQ6IEVkaXRvck9wdGlvbnMsXG4gICAgcHJvamVjdElkOiBudW1iZXIsXG4gICAgdGhlbWU6IFRoZW1lRW51bSxcbiAgICBpbWFnZVVwbG9hZE1vZGU6IEltYWdlVXBsb2FkTW9kZUVudW1cbik6IEVkaXRvck9wdGlvbnMge1xuICAgIGNvbnN0IG9wdGlvbnM6IEVkaXRvck9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmFkdmFuY2VkLFxuICAgICAgICBhcHBlYXJhbmNlOiB7IC4uLmFkdmFuY2VkLmFwcGVhcmFuY2UsIHRoZW1lIH1cbiAgICB9O1xuICAgIGlmIChwcm9qZWN0SWQgPiAwKSB7XG4gICAgICAgIG9wdGlvbnMucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIH1cbiAgICBpZiAoaW1hZ2VVcGxvYWRNb2RlID09PSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgb3B0aW9ucy5mZWF0dXJlcyA9IHsgLi4uYWR2YW5jZWQuZmVhdHVyZXMsIHVzZXJVcGxvYWRzOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkRGVzaWduID0geyBkZXNpZ24/OiBvYmplY3Q7IGVycm9yPzogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlc2lnbihqc29uOiBzdHJpbmcpOiBQYXJzZWREZXNpZ24ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghZGVzaWduIHx8IHR5cGVvZiBkZXNpZ24gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZSBzYXZlZCB0ZW1wbGF0ZSBpcyBub3QgYSBKU09OIG9iamVjdC5cIiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRlc2lnbiB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGBUaGUgc2F2ZWQgdGVtcGxhdGUgY291bGQgbm90IGJlIHJlYWQ6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YCB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVkaXRvciB9IGZyb20gXCIuL2VkaXRvck9wdGlvbnNcIjtcblxudHlwZSBJbWFnZUNhbGxiYWNrID0gUGFyYW1ldGVyczxFZGl0b3JbXCJyZWdpc3RlckNhbGxiYWNrXCJdPlsxXTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBteD86IHsgc2Vzc2lvbj86IHsgZ2V0Q29uZmlnPzogKGtleTogc3RyaW5nKSA9PiB1bmtub3duIH0gfTtcbiAgICB9XG59XG5cbi8qKlxuICogTWVuZGl4IHB1Ymxpc2hlZCBSRVNUIHNlcnZpY2VzIHRoYXQgdXNlIHRoZSBhY3RpdmUgc2Vzc2lvbiBmb3IgYXV0aGVudGljYXRpb25cbiAqIHJlamVjdCByZXF1ZXN0cyB3aXRob3V0IHRoZSBzZXNzaW9uJ3MgQ1NSRiB0b2tlbi5cbiAqL1xuZnVuY3Rpb24gY3NyZkhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSB3aW5kb3cubXg/LnNlc3Npb24/LmdldENvbmZpZz8uKFwiY3NyZnRva2VuXCIpO1xuICAgIHJldHVybiB0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIgPyB7IFwiWC1Dc3JmLVRva2VuXCI6IHRva2VuIH0gOiB7fTtcbn1cblxuLyoqXG4gKiBVcGxvYWQgaW1hZ2VzIHRvIHRoZSBhcHAncyBvd24gZW5kcG9pbnQgaW5zdGVhZCBvZiBVbmxheWVyJ3Mgc3RvcmFnZS4gVGhlXG4gKiBlbmRwb2ludCByZWNlaXZlcyBtdWx0aXBhcnQvZm9ybS1kYXRhIHdpdGggdGhlIGltYWdlIGluIGEgcGFydCBuYW1lZCBcImZpbGVcIlxuICogYW5kIG11c3QgYW5zd2VyIHdpdGggSlNPTiBjb250YWluaW5nIHRoZSBwdWJsaWMgXCJ1cmxcIiBvZiB0aGUgc3RvcmVkIGltYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJJbWFnZVVwbG9hZChlZGl0b3I6IEVkaXRvciwgdXBsb2FkVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB1cGxvYWQ6IEltYWdlQ2FsbGJhY2sgPSAoZmlsZTogeyBhdHRhY2htZW50czogRmlsZVtdIH0sIGRvbmU6IChyZXN1bHQ6IG9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGUuYXR0YWNobWVudHNbMF07XG4gICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgIGRvbmUoeyBhYm9ydDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKFwiZmlsZVwiLCBpbWFnZSwgaW1hZ2UubmFtZSk7XG5cbiAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMCB9KTtcbiAgICAgICAgZmV0Y2godXBsb2FkVXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLi4uY3NyZkhlYWRlcnMoKSB9LFxuICAgICAgICAgICAgYm9keVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkIHdpdGggSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YTogeyB1cmw/OiB1bmtub3duIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGE/LnVybCAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgcmVzcG9uc2UgaGFzIG5vIFwidXJsXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMDAsIHVybDogZGF0YS51cmwgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWFjdEVtYWlsRWRpdG9yOiBpbWFnZSB1cGxvYWQgZmFpbGVkLlwiLCBlKTtcbiAgICAgICAgICAgICAgICBkb25lKHsgZXJyb3I6IGUubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgZWRpdG9yLnJlZ2lzdGVyQ2FsbGJhY2soXCJpbWFnZVwiLCB1cGxvYWQpO1xufVxuIiwiaW1wb3J0IHsgTGlzdEV4cHJlc3Npb25WYWx1ZSwgTGlzdFZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuZXhwb3J0IHR5cGUgTWVyZ2VUYWdzID0gUmVjb3JkPHN0cmluZywgeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHNhbXBsZT86IHN0cmluZyB9PjtcblxuLyoqXG4gKiBUdXJuIHRoZSBtZXJnZSB0YWcgZGF0YXNvdXJjZSBpbnRvIFVubGF5ZXIncyBtZXJnZSB0YWcgbWFwLiBSZXR1cm5zIHVuZGVmaW5lZFxuICogd2hpbGUgdGhlIGxpc3QgaXMgbG9hZGluZywgc28gdGhlIGVkaXRvciBrZWVwcyB3aGF0IGl0IGhhcyB1bnRpbCB0aGVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNZXJnZVRhZ3MoXG4gICAgc291cmNlOiBMaXN0VmFsdWUgfCB1bmRlZmluZWQsXG4gICAgbmFtZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgc2FtcGxlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWRcbik6IE1lcmdlVGFncyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFzb3VyY2UgfHwgIW5hbWUgfHwgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzb3VyY2Uuc3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgfHwgIXNvdXJjZS5pdGVtcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB0YWdzOiBNZXJnZVRhZ3MgPSB7fTtcbiAgICBzb3VyY2UuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5hbWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdWYWx1ZSA9IHZhbHVlLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgaWYgKCF0YWdOYW1lIHx8ICF0YWdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ1NhbXBsZSA9IHNhbXBsZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICB0YWdzW2B0YWdfJHtpbmRleH1gXSA9IHRhZ1NhbXBsZVxuICAgICAgICAgICAgPyB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSwgc2FtcGxlOiB0YWdTYW1wbGUgfVxuICAgICAgICAgICAgOiB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0YWdzO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIE9wdGlvbiB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbi8qKlxuICogVGhlIGFjdGlvbiBhcmd1bWVudHMsIGV4YWN0bHkgYXMgUmVhY3RFbWFpbEVkaXRvci54bWwgZ2VuZXJhdGVzIHRoZW0gaW50b1xuICogdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHMuZC50cy4gU3BlbGxpbmcgdGhlbSBvdXQgb25jZSBrZWVwcyB0aGlzIGZpbGUgYW5kXG4gKiB0aGUgZ2VuZXJhdGVkIHByb3BzIGZyb20gZHJpZnRpbmcgYXBhcnQuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQWN0aW9uQXJncyA9IHsgaHRtbF9fOiBPcHRpb248c3RyaW5nPjsganNvbl9fOiBPcHRpb248c3RyaW5nPiB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJCdXR0b24ge1xuICAgIGNhcHRpb246IHN0cmluZztcbiAgICBhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz47XG4gICAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xuICAgIC8qKiBGYWxzZSB1bnRpbCB0aGUgZWRpdG9yIGhhcyBsb2FkZWQ7IG5vdGhpbmcgY2FuIGJlIGV4cG9ydGVkIGJlZm9yZSB0aGF0LiAqL1xuICAgIHJlYWR5OiBib29sZWFuO1xuICAgIHJlYWRPbmx5OiBib29sZWFuO1xuICAgIGV4cG9ydEh0bWw/OiBUb29sYmFyQnV0dG9uO1xuICAgIHNhdmVUZW1wbGF0ZT86IFRvb2xiYXJCdXR0b247XG59XG5cbmZ1bmN0aW9uIEFjdGlvbkJ1dHRvbih7XG4gICAgYnV0dG9uLFxuICAgIGRpc2FibGVkLFxuICAgIGNsYXNzTmFtZVxufToge1xuICAgIGJ1dHRvbjogVG9vbGJhckJ1dHRvbjtcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XG59KTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBidXN5ID0gYnV0dG9uLmFjdGlvbi5pc0V4ZWN1dGluZztcbiAgICByZXR1cm4gKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHRcIiwgY2xhc3NOYW1lKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCBidXN5IHx8ICFidXR0b24uYWN0aW9uLmNhbkV4ZWN1dGV9XG4gICAgICAgICAgICBhcmlhLWJ1c3k9e2J1c3l9XG4gICAgICAgICAgICBvbkNsaWNrPXtidXR0b24ub25DbGlja31cbiAgICAgICAgPlxuICAgICAgICAgICAge2J1dHRvbi5jYXB0aW9ufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9vbGJhcih7IHJlYWR5LCByZWFkT25seSwgZXhwb3J0SHRtbCwgc2F2ZVRlbXBsYXRlIH06IFRvb2xiYXJQcm9wcyk6IFJlYWN0RWxlbWVudCB8IG51bGwge1xuICAgIC8vIFNhdmluZyBmcm9tIGEgcmVhZC1vbmx5IGVkaXRvciB3b3VsZCBzdG9yZSBub3RoaW5nIHRoZSB1c2VyIGNvdWxkIGNoYW5nZS5cbiAgICBjb25zdCBzaG93U2F2ZSA9IHNhdmVUZW1wbGF0ZSAmJiAhcmVhZE9ubHk7XG4gICAgaWYgKCFleHBvcnRIdG1sICYmICFzaG93U2F2ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItdG9vbGJhciBzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cbiAgICAgICAgICAgIHtleHBvcnRIdG1sICYmIDxBY3Rpb25CdXR0b24gYnV0dG9uPXtleHBvcnRIdG1sfSBkaXNhYmxlZD17IXJlYWR5fSAvPn1cbiAgICAgICAgICAgIHtzaG93U2F2ZSAmJiAoXG4gICAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBidXR0b249e3NhdmVUZW1wbGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZWFkeX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtleHBvcnRIdG1sID8gXCJzcGFjaW5nLW91dGVyLWxlZnQtbWVkaXVtXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5pbXBvcnQgeyBidWlsZE9wdGlvbnMsIEVkaXRvciwgcGFyc2VBZHZhbmNlZE9wdGlvbnMsIHBhcnNlRGVzaWduIH0gZnJvbSBcIi4uL3V0aWxzL2VkaXRvck9wdGlvbnNcIjtcbmltcG9ydCB7IHJlZ2lzdGVySW1hZ2VVcGxvYWQgfSBmcm9tIFwiLi4vdXRpbHMvaW1hZ2VVcGxvYWRcIjtcbmltcG9ydCB7IGJ1aWxkTWVyZ2VUYWdzIH0gZnJvbSBcIi4uL3V0aWxzL21lcmdlVGFnc1wiO1xuaW1wb3J0IHsgVGVtcGxhdGVBY3Rpb25BcmdzLCBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xuXG4vKiogSG93IGxvbmcgdG8gd2FpdCBhZnRlciB0aGUgbGFzdCBlZGl0IGJlZm9yZSB3cml0aW5nIHRvIHRoZSBhdHRyaWJ1dGVzLiAqL1xuY29uc3QgU0FWRV9PTl9DSEFOR0VfREVMQVlfTVMgPSA1MDA7XG5cbnR5cGUgRXhwb3J0ZWQgPSB7IGh0bWw6IHN0cmluZzsganNvbjogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0b3JXcmFwcGVyKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUsIGFkdmFuY2VkT3B0aW9ucyB9ID0gcHJvcHM7XG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcbiAgICBjb25zdCBbZWRpdG9yLCBzZXRFZGl0b3JdID0gdXNlU3RhdGU8RWRpdG9yIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZz4oKTtcblxuICAgIC8vIFVubGF5ZXIgY2FsbHMgaGFuZGxlcnMgcmVnaXN0ZXJlZCBvbmNlIHBlciBlZGl0b3I7IHRoZXkgcmVhZCB0aGUgbGF0ZXN0XG4gICAgLy8gcHJvcHMgdGhyb3VnaCB0aGlzIHJlZiBpbnN0ZWFkIG9mIHRoZSByZW5kZXIgdGhleSB3ZXJlIGNyZWF0ZWQgaW4uXG4gICAgY29uc3QgcHJvcHNSZWYgPSB1c2VSZWYocHJvcHMpO1xuICAgIHByb3BzUmVmLmN1cnJlbnQgPSBwcm9wcztcblxuICAgIC8vIFRoZSBsYXN0IGRlc2lnbiBzdHJpbmcgdGhlIGVkaXRvciBsb2FkZWQgb3IgcHJvZHVjZWQuIFdoZW4gdGhlIGF0dHJpYnV0ZVxuICAgIC8vIGNoYW5nZXMgdG8gdGhpcyB2YWx1ZSAoYmVjYXVzZSB3ZSB3cm90ZSBpdCkgdGhlcmUgaXMgbm90aGluZyB0byByZWxvYWQsIGFuZFxuICAgIC8vIHJlbG9hZGluZyB3b3VsZCB0aHJvdyBhd2F5IHRoZSB1c2VyJ3MgdW5kbyBoaXN0b3J5IGFuZCBzZWxlY3Rpb24uXG4gICAgY29uc3Qgc3luY2VkSnNvbiA9IHVzZVJlZjxzdHJpbmc+KCk7XG5cbiAgICBjb25zdCBzYXZlVGltZXIgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4+KCk7XG4gICAgLy8gVGhlIGVkaXRvciBpcyBkZXN0cm95ZWQgb24gdW5tb3VudDsgYSBwZW5kaW5nIHNhdmUgd291bGQgY2FsbCBpbnRvIGl0LlxuICAgIHVzZUVmZmVjdCgoKSA9PiAoKSA9PiBjbGVhclRpbWVvdXQoc2F2ZVRpbWVyLmN1cnJlbnQpLCBbXSk7XG5cbiAgICBjb25zdCByZWFkT25seSA9IEpTT05UZW1wbGF0ZS5yZWFkT25seTtcblxuICAgIGNvbnN0IHsgb3B0aW9uczogYWR2YW5jZWQsIGVycm9yOiBvcHRpb25zRXJyb3IgfSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IHBhcnNlQWR2YW5jZWRPcHRpb25zKGFkdmFuY2VkT3B0aW9ucyksXG4gICAgICAgIFthZHZhbmNlZE9wdGlvbnNdXG4gICAgKTtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gYnVpbGRPcHRpb25zKGFkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUpLFxuICAgICAgICBbYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZV1cbiAgICApO1xuXG4gICAgY29uc3QgZXhwb3J0RGVzaWduID0gdXNlQ2FsbGJhY2soKHVubGF5ZXI6IEVkaXRvcik6IFByb21pc2U8RXhwb3J0ZWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdW5sYXllci5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBodG1sOiBkYXRhLmh0bWwsIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEuZGVzaWduKSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICAvKiogV3JpdGUgdGhlIGRlc2lnbiB0byB0aGUgYXR0cmlidXRlcywgaWYgdGhleSBjYW4gYmUgd3JpdHRlbi4gKi9cbiAgICBjb25zdCB3cml0ZUF0dHJpYnV0ZXMgPSB1c2VDYWxsYmFjaygoeyBodG1sLCBqc29uIH06IEV4cG9ydGVkKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlOiBqc29uQXR0ciwgSFRNTEJvZHk6IGh0bWxBdHRyIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uO1xuICAgICAgICBpZiAoIWpzb25BdHRyLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICBqc29uQXR0ci5zZXRWYWx1ZShqc29uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaHRtbEF0dHIgJiYgIWh0bWxBdHRyLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICBodG1sQXR0ci5zZXRWYWx1ZShodG1sKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IG9uUmVhZHkgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHVubGF5ZXI6IEVkaXRvcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpbWFnZVVwbG9hZFVybCB9ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgICAgIGlmIChwcm9wc1JlZi5jdXJyZW50LmltYWdlVXBsb2FkTW9kZSA9PT0gXCJlbmRwb2ludFwiICYmIGltYWdlVXBsb2FkVXJsKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJJbWFnZVVwbG9hZCh1bmxheWVyLCBpbWFnZVVwbG9hZFVybCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVubGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRlc2lnbjp1cGRhdGVkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnQuc2F2ZU9uQ2hhbmdlIHx8IGN1cnJlbnQuSlNPTlRlbXBsYXRlLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzYXZlVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBvcnREZXNpZ24odW5sYXllcikudGhlbih3cml0ZUF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIH0sIFNBVkVfT05fQ0hBTkdFX0RFTEFZX01TKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBIG5ldyBlZGl0b3Igc3RhcnRzIGJsYW5rLCBzbyB3aGF0ZXZlciBpdCBoYWQgbG9hZGVkIGlzIGdvbmUuXG4gICAgICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBzZXRFZGl0b3IodW5sYXllcik7XG4gICAgICAgIH0sXG4gICAgICAgIFtleHBvcnREZXNpZ24sIHdyaXRlQXR0cmlidXRlc11cbiAgICApO1xuXG4gICAgLy8gVGhlIGVkaXRvciBpcyByZWNyZWF0ZWQgd2hlbiBpdHMgb3B0aW9ucyBjaGFuZ2U7IGZvcmdldCB0aGUgb2xkIG9uZS5cbiAgICB1c2VFZmZlY3QoKCkgPT4gc2V0RWRpdG9yKG51bGwpLCBbb3B0aW9uc10pO1xuXG4gICAgLy8gTG9hZCB0aGUgZGVzaWduIGZyb20gdGhlIGF0dHJpYnV0ZSwgb25jZSB0aGUgZWRpdG9yIGFuZCB0aGUgdmFsdWUgYXJlIHJlYWR5LlxuICAgIGNvbnN0IGpzb25TdGF0dXMgPSBKU09OVGVtcGxhdGUuc3RhdHVzO1xuICAgIGNvbnN0IGpzb25WYWx1ZSA9IEpTT05UZW1wbGF0ZS52YWx1ZSA/PyBcIlwiO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghZWRpdG9yIHx8IGpzb25TdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqc29uVmFsdWUgPT09IChzeW5jZWRKc29uLmN1cnJlbnQgPz8gXCJcIikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uVmFsdWU7XG4gICAgICAgIGlmIChqc29uVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHNldExvYWRFcnJvcih1bmRlZmluZWQpO1xuICAgICAgICAgICAgZWRpdG9yLmxvYWRCbGFuaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgZGVzaWduLCBlcnJvciB9ID0gcGFyc2VEZXNpZ24oanNvblZhbHVlKTtcbiAgICAgICAgc2V0TG9hZEVycm9yKGVycm9yKTtcbiAgICAgICAgaWYgKGRlc2lnbikge1xuICAgICAgICAgICAgZWRpdG9yLmxvYWREZXNpZ24oZGVzaWduIGFzIFBhcmFtZXRlcnM8RWRpdG9yW1wibG9hZERlc2lnblwiXT5bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUmVhY3RFbWFpbEVkaXRvcjogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGpzb25TdGF0dXMsIGpzb25WYWx1ZV0pO1xuXG4gICAgLy8gUmVhZC1vbmx5OiBzaG93IHRoZSBkZXNpZ24gYXMgYSBwcmV2aWV3IHJhdGhlciB0aGFuIGFuIGVkaXRvci5cbiAgICBjb25zdCBwcmV2aWV3U2hvd24gPSB1c2VSZWYoZmFsc2UpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkT25seSAmJiAhcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zaG93UHJldmlldyhcImRlc2t0b3BcIik7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd24uY3VycmVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWRPbmx5ICYmIHByZXZpZXdTaG93bi5jdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0b3IuaGlkZVByZXZpZXcoKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCByZWFkT25seV0pO1xuXG4gICAgY29uc3QgbG9jYWxlID0gcHJvcHMubG9jYWxlPy52YWx1ZTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIGxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0TG9jYWxlKGxvY2FsZSB8fCBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGxvY2FsZV0pO1xuXG4gICAgLy8gTWVuZGl4IGhhbmRzIG91dCBuZXcgbGlzdCBvYmplY3RzIG9uIHJlLXJlbmRlcnM7IGNvbXBhcmUgYnkgY29udGVudCBzbyB0aGVcbiAgICAvLyBlZGl0b3IgaXMgb25seSB0b2xkIHdoZW4gdGhlIHRhZ3MgcmVhbGx5IGNoYW5nZS5cbiAgICBjb25zdCBtZXJnZVRhZ3MgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYnVpbGRNZXJnZVRhZ3MocHJvcHMubWVyZ2VUYWdzLCBwcm9wcy5tZXJnZVRhZ05hbWUsIHByb3BzLm1lcmdlVGFnVmFsdWUsIHByb3BzLm1lcmdlVGFnU2FtcGxlKSA/PyBudWxsXG4gICAgKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZWRpdG9yICYmIG1lcmdlVGFncyAhPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRNZXJnZVRhZ3MoSlNPTi5wYXJzZShtZXJnZVRhZ3MpKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIG1lcmdlVGFnc10pO1xuXG4gICAgY29uc3QgcnVuQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIGFzeW5jIChhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz4sIHdyaXRlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkID0gYXdhaXQgZXhwb3J0RGVzaWduKGVkaXRvcik7XG4gICAgICAgICAgICBpZiAod3JpdGUpIHtcbiAgICAgICAgICAgICAgICB3cml0ZUF0dHJpYnV0ZXMoZXhwb3J0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSh7IGh0bWxfXzogZXhwb3J0ZWQuaHRtbCwganNvbl9fOiBleHBvcnRlZC5qc29uIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbZWRpdG9yLCBleHBvcnREZXNpZ24sIHdyaXRlQXR0cmlidXRlc11cbiAgICApO1xuXG4gICAgY29uc3QgZXJyb3IgPSBvcHRpb25zRXJyb3IgPz8gbG9hZEVycm9yO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCIsIHByb3BzLmNsYXNzKX0gc3R5bGU9e3Byb3BzLnN0eWxlfT5cbiAgICAgICAgICAgIDxUb29sYmFyXG4gICAgICAgICAgICAgICAgcmVhZHk9e2VkaXRvciAhPT0gbnVsbH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICAgICAgZXhwb3J0SHRtbD17XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmlzU2hvd0V4cG9ydEh0bWwgJiYgcHJvcHMuZXhwb3J0SFRNTEFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wcy5leHBvcnRIdG1sQ2FwdGlvbj8udmFsdWUgfHwgXCJFeHBvcnQgSFRNTFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gcnVuQWN0aW9uKHByb3BzLmV4cG9ydEhUTUxBY3Rpb24hLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2F2ZVRlbXBsYXRlPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93U2F2ZVRlbXBsYXRlICYmIHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVDYXB0aW9uPy52YWx1ZSB8fCBcIlNhdmUgVGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gcnVuQWN0aW9uKHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvbiEsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxFbWFpbEVkaXRvclxuICAgICAgICAgICAgICAgIHJlZj17ZW1haWxFZGl0b3JSZWZ9XG4gICAgICAgICAgICAgICAgb25SZWFkeT17b25SZWFkeX1cbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ9e3Byb3BzLmVkaXRvckhlaWdodCB8fCBcIjcwMHB4XCJ9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFZGl0b3JXcmFwcGVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyXCI7XG5cbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiA8RWRpdG9yV3JhcHBlciB7Li4ucHJvcHN9IC8+O1xufVxuIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsIl9fdW5sYXllcl9sYXN0RWRpdG9ySWQiLCJ1c2VDb3VudGVyRWRpdG9ySWQiLCJ1c2VNZW1vIiwidXNlR2VuZXJhdGVkRWRpdG9ySWQiLCJSZWFjdCIsInVzZUlkIiwicmVwbGFjZSIsIkVtYWlsRWRpdG9ySW5uZXIiLCJwcm9wcyIsInJlZiIsIl9hIiwiX2IiLCJfYyIsIl9kIiwiX2UiLCJfZiIsIl9nIiwiX2giLCJfaSIsIm9uTG9hZCIsIm9uUmVhZHkiLCJzY3JpcHRVcmwiLCJtaW5IZWlnaHQiLCJzdHlsZSIsImVkaXRvciIsInNldEVkaXRvciIsInVzZVN0YXRlIiwiaGFzTG9hZGVkRW1iZWRTY3JpcHQiLCJzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCIsImdlbmVyYXRlZElkIiwiZWRpdG9ySWQiLCJvcHRpb25zIiwiYXBwZWFyYW5jZSIsImRpc3BsYXlNb2RlIiwibG9jYWxlIiwicHJvamVjdElkIiwidG9vbHMiLCJpZCIsInNvdXJjZSIsIm5hbWUiLCJ2ZXJzaW9uIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsImVkaXRvclJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJfYTIiLCJkZXN0cm95IiwibG9hZFNjcmlwdCIsInVubGF5ZXIiLCJjcmVhdGVFZGl0b3IiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0aG9kUHJvcHMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwicHJvcE5hbWUiLCJ0ZXN0IiwiZm9yRWFjaCIsIm1ldGhvZFByb3AiLCJhZGRFdmVudExpc3RlbmVyIiwiam9pbiIsImNyZWF0ZUVsZW1lbnQiLCJmbGV4IiwiZGlzcGxheSIsIkVtYWlsRWRpdG9yIiwiZm9yd2FyZFJlZiIsImhhc093biIsImhhc093blByb3BlcnR5IiwiY2xhc3NOYW1lcyIsImNsYXNzZXMiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJnIiwiYXBwZW5kQ2xhc3MiLCJwYXJzZVZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiYXBwbHkiLCJ0b1N0cmluZyIsInByb3RvdHlwZSIsImluY2x1ZGVzIiwia2V5IiwiY2FsbCIsInZhbHVlIiwibmV3Q2xhc3MiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFBTUEsR0FBQSxHQUNKLE9BQU9DLE1BQUEsS0FBVyxXQUFjLEdBQUE7QUFBRUMsRUFBQUEsc0JBQUEsRUFBd0IsQ0FBQTtBQUFFLENBQUEsR0FBSUQsTUFBQSxDQUFBO0FBQ2xFRCxHQUFBLENBQUlFLHNCQUFBLEdBQXlCRixHQUFBLENBQUlFLHNCQUFBLElBQTBCLENBQUEsQ0FBQTtBQU0zRCxJQUFNQyxrQkFBQSxHQUFxQkEsTUFDekJDLE9BQUEsQ0FBUSxNQUFNLENBQUEsT0FBQSxFQUFVLEVBQUVKLEdBQUEsQ0FBSUUsc0JBQXNCLElBQUksRUFBRSxDQUFBLENBQUE7QUFRNUQsSUFBTUcsb0JBQUEsR0FDSixPQUFPQyxLQUFBLENBQU1DLEtBQUEsS0FBVSxVQUFBO0FBQUE7QUFFbkIsTUFBTSxDQUFVRCxPQUFBQSxFQUFBQSxLQUFBLENBQU1DLEtBQUEsRUFBTSxDQUFFQyxPQUFBLENB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
