define(['exports', 'react/jsx-runtime', 'react'], (function (exports, jsxRuntime, React) { 'use strict';

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
  var useCounterEditorId = () => React.useMemo(() => `editor-${++win.__unlayer_lastEditorId}`, []);
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
    const [editor, setEditor] = React.useState(null);
    const [hasLoadedEmbedScript, setHasLoadedEmbedScript] = React.useState(false);
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
    React.useImperativeHandle(ref, () => ({
      editor
    }), [editor]);
    const editorRef = React.useRef(editor);
    React.useEffect(() => {
      editorRef.current = editor;
    }, [editor]);
    React.useEffect(() => {
      return () => {
        var _a2;
        (_a2 = editorRef.current) == null ? void 0 : _a2.destroy();
      };
    }, []);
    React.useEffect(() => {
      setHasLoadedEmbedScript(false);
      loadScript(() => setHasLoadedEmbedScript(true), scriptUrl);
    }, [scriptUrl]);
    React.useEffect(() => {
      if (!hasLoadedEmbedScript) return;
      editor == null ? void 0 : editor.destroy();
      setEditor(unlayer.createEditor(options));
    }, [JSON.stringify(options), hasLoadedEmbedScript]);
    const methodProps = Object.keys(props).filter(propName => /^on/.test(propName));
    React.useEffect(() => {
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
      return (jsxRuntime.jsx("button", { type: "button", className: classNames("btn mx-button btn-default", className), disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick, children: button.caption }));
  }
  function Toolbar({ ready, readOnly, canSave, exportHtml, saveTemplate }) {
      // Saving from a read-only editor would store nothing the user could change.
      const showSave = saveTemplate && !readOnly;
      if (!exportHtml && !showSave) {
          return null;
      }
      return (jsxRuntime.jsxs("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium", children: [exportHtml && jsxRuntime.jsx(ActionButton, { button: exportHtml, disabled: !ready }), showSave && (jsxRuntime.jsx(ActionButton, { button: saveTemplate, disabled: !ready || !canSave, className: exportHtml ? "spacing-outer-left-medium" : undefined }))] }));
  }

  /** How long to wait after the last edit before writing to the attributes. */
  const SAVE_ON_CHANGE_DELAY_MS = 500;
  function EditorWrapper(props) {
      const { JSONTemplate, projectId, theme, imageUploadMode, advancedOptions } = props;
      const emailEditorRef = React.useRef(null);
      const { options: advanced, error: optionsError } = React.useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
      const options = React.useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode), [advanced, projectId, theme, imageUploadMode]);
      // The editor is recreated when its options change. Remember which options
      // the ready editor was made with, so the old one is forgotten at once.
      const [ready, setReady] = React.useState(null);
      const editor = ready?.options === options ? ready.editor : null;
      // An empty value never clears the editor (see below), so it is no error either.
      const jsonStatus = JSONTemplate.status;
      const jsonValue = JSONTemplate.value ?? "";
      const parsed = React.useMemo(() => (jsonStatus === "available" /* ValueStatus.Available */ && jsonValue !== "" ? parseDesign(jsonValue) : {}), [jsonStatus, jsonValue]);
      const loadError = parsed.error;
      // Unlayer calls handlers registered once per editor, and the save-on-change
      // timer can fire before the next render; both read the latest values
      // through these refs instead of the render they were created in.
      const propsRef = React.useRef(props);
      const optionsRef = React.useRef(options);
      const loadErrorRef = React.useRef(loadError);
      React.useLayoutEffect(() => {
          propsRef.current = props;
          optionsRef.current = options;
          loadErrorRef.current = loadError;
      });
      // The last design string the editor loaded or produced. When the attribute
      // changes to this value (because we wrote it) there is nothing to reload, and
      // reloading would throw away the user's undo history and selection.
      const syncedJson = React.useRef(undefined);
      const saveTimer = React.useRef(undefined);
      // The editor is destroyed on unmount; a pending save would call into it.
      React.useEffect(() => () => clearTimeout(saveTimer.current), []);
      const readOnly = JSONTemplate.readOnly;
      const exportDesign = React.useCallback((unlayer) => {
          return new Promise(resolve => {
              unlayer.exportHtml(data => {
                  resolve({ html: data.html, json: JSON.stringify(data.design) });
              });
          });
      }, []);
      /** Write the design to the attributes, if they can be written. Returns whether it did. */
      const writeAttributes = React.useCallback(({ html, json }) => {
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
      const onReady = React.useCallback((unlayer) => {
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
      React.useEffect(() => {
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
      const previewShown = React.useRef(false);
      React.useEffect(() => {
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
      React.useEffect(() => {
          if (editor && locale !== undefined) {
              editor.setLocale(locale || null);
          }
      }, [editor, locale]);
      // Mendix hands out new list objects on re-renders; compare by content so the
      // editor is only told when the tags really change.
      const mergeTags = JSON.stringify(buildMergeTags(props.mergeTags, props.mergeTagName, props.mergeTagValue, props.mergeTagSample) ?? null);
      React.useEffect(() => {
          if (editor && mergeTags !== "null") {
              editor.setMergeTags(JSON.parse(mergeTags));
          }
      }, [editor, mergeTags]);
      const runAction = React.useCallback(async (action, write) => {
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
      return (jsxRuntime.jsxs("div", { className: classNames("react-email-editor-div", props.class), style: props.style, children: [jsxRuntime.jsx(Toolbar, { ready: editor !== null, readOnly: readOnly, canSave: canWriteTemplate(JSONTemplate, loadError), exportHtml: props.isShowExportHtml && props.exportHTMLAction
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
                      : undefined }), error && (jsxRuntime.jsx("div", { className: "alert alert-danger", role: "alert", children: error })), jsxRuntime.jsx(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: props.editorHeight || "700px", options: options })] }));
  }

  function ReactEmailEditor(props) {
      return jsxRuntime.jsx(EditorWrapper, { ...props });
  }

  exports.ReactEmailEditor = ReactEmailEditor;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2VkaXRvck9wdGlvbnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvaW1hZ2VVcGxvYWQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbWVyZ2VUYWdzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbmltcG9ydCBSZWFjdCwge1xuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUsXG4gIHVzZU1lbW9cbn0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIHBhY2thZ2UuanNvblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjIuMS4zXCI7XG5cbi8vIHNyYy9sb2FkU2NyaXB0LnRzXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9IFwiaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/MlwiO1xudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIGxvYWRlZCA9IGZhbHNlO1xudmFyIGZpbmRTY3JpcHQgPSAoc2NyaXB0VXJsKSA9PiB7XG4gIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpO1xuICBsZXQgZm91bmQgPSBudWxsO1xuICBzY3JpcHRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGZvdW5kID0gc2NyaXB0O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZDtcbn07XG52YXIgaXNFbWJlZFJlYWR5ID0gKCkgPT4gbG9hZGVkIHx8IHR5cGVvZiB1bmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIGFkZENhbGxiYWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbn07XG52YXIgcnVuQ2FsbGJhY2tzID0gKCkgPT4ge1xuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIGxldCBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IChjYWxsYmFjaywgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybCkgPT4ge1xuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGNvbnN0IGV4aXN0aW5nU2NyaXB0ID0gZmluZFNjcmlwdChzY3JpcHRVcmwpO1xuICBpZiAoIWV4aXN0aW5nU2NyaXB0KSB7XG4gICAgY29uc3QgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBydW5DYWxsYmFja3MoKTtcbiAgfSBlbHNlIHtcbiAgICBleGlzdGluZ1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8geyBfX3VubGF5ZXJfbGFzdEVkaXRvcklkOiAwIH0gOiB3aW5kb3c7XG53aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgdXNlQ291bnRlckVkaXRvcklkID0gKCkgPT4gdXNlTWVtbygoKSA9PiBgZWRpdG9yLSR7Kyt3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZH1gLCBbXSk7XG52YXIgdXNlR2VuZXJhdGVkRWRpdG9ySWQgPSB0eXBlb2YgUmVhY3QudXNlSWQgPT09IFwiZnVuY3Rpb25cIiA/IChcbiAgLy8gU3RyaXAgJzonIHNvIHRoZSBpZCBpcyBhIHZhbGlkIENTUyBzZWxlY3RvciBmb3IgdW5sYXllci5jcmVhdGVFZGl0b3IuXG4gICgpID0+IGBlZGl0b3ItJHtSZWFjdC51c2VJZCgpLnJlcGxhY2UoLzovZywgXCJcIil9YFxuKSA6IHVzZUNvdW50ZXJFZGl0b3JJZDtcbmZ1bmN0aW9uIEVtYWlsRWRpdG9ySW5uZXIocHJvcHMsIHJlZikge1xuICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaTtcbiAgY29uc3QgeyBvbkxvYWQsIG9uUmVhZHksIHNjcmlwdFVybCwgbWluSGVpZ2h0ID0gNTAwLCBzdHlsZSA9IHt9IH0gPSBwcm9wcztcbiAgY29uc3QgW2VkaXRvciwgc2V0RWRpdG9yXSA9IHVzZVN0YXRlKFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgW2hhc0xvYWRlZEVtYmVkU2NyaXB0LCBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGdlbmVyYXRlZElkID0gdXNlR2VuZXJhdGVkRWRpdG9ySWQoKTtcbiAgY29uc3QgZWRpdG9ySWQgPSBwcm9wcy5lZGl0b3JJZCB8fCBnZW5lcmF0ZWRJZDtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5wcm9wcy5vcHRpb25zIHx8IHt9LFxuICAgIGFwcGVhcmFuY2U6IChfYiA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfYiA6IChfYSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hcHBlYXJhbmNlLFxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9jID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLmRpc3BsYXlNb2RlKSB8fCBcImVtYWlsXCIsXG4gICAgbG9jYWxlOiAoX2UgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfZSA6IChfZCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZC5sb2NhbGUsXG4gICAgcHJvamVjdElkOiAoX2cgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfZyA6IChfZiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZi5wcm9qZWN0SWQsXG4gICAgdG9vbHM6IChfaSA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX2kgOiAoX2ggPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2gudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZSxcbiAgICAgIHZlcnNpb25cbiAgICB9XG4gIH07XG4gIHVzZUltcGVyYXRpdmVIYW5kbGUoXG4gICAgcmVmLFxuICAgICgpID0+ICh7XG4gICAgICBlZGl0b3JcbiAgICB9KSxcbiAgICBbZWRpdG9yXVxuICApO1xuICBjb25zdCBlZGl0b3JSZWYgPSB1c2VSZWYoZWRpdG9yKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBlZGl0b3JSZWYuY3VycmVudCA9IGVkaXRvcjtcbiAgfSwgW2VkaXRvcl0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB2YXIgX2EyO1xuICAgICAgKF9hMiA9IGVkaXRvclJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EyLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoKCkgPT4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSksIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgY29uc3QgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKFxuICAgIChwcm9wTmFtZSkgPT4gL15vbi8udGVzdChwcm9wTmFtZSlcbiAgKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaCgobWV0aG9kUHJvcCkgPT4ge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gXCJvbkxvYWRcIiAmJiBtZXRob2RQcm9wICE9PSBcIm9uUmVhZHlcIiAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwiZWRpdG9yOnJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBtZXRob2RQcm9wcy5qb2luKFwiLFwiKV0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgbWluSGVpZ2h0XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBlZGl0b3JJZCwgc3R5bGU6IHsgLi4uc3R5bGUsIGZsZXg6IDEgfSB9KVxuICApO1xufVxudmFyIEVtYWlsRWRpdG9yID0gUmVhY3QuZm9yd2FyZFJlZihFbWFpbEVkaXRvcklubmVyKTtcbmV4cG9ydCB7XG4gIEVtYWlsRWRpdG9yLFxuICBFbWFpbEVkaXRvciBhcyBkZWZhdWx0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsIi8qIVxuXHRDb3B5cmlnaHQgKGMpIDIwMTggSmVkIFdhdHNvbi5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcblx0aHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoYXJnKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBwYXJzZVZhbHVlKGFyZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VWYWx1ZSAoYXJnKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gYXJnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0cmV0dXJuIGFyZy50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ2xhc3MgKHZhbHVlLCBuZXdDbGFzcykge1xuXHRcdGlmICghbmV3Q2xhc3MpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICsgJyAnICsgbmV3Q2xhc3M7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdmFsdWUgKyBuZXdDbGFzcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCB7IEltYWdlVXBsb2FkTW9kZUVudW0sIFRoZW1lRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5leHBvcnQgdHlwZSBFZGl0b3IgPSBOb25OdWxsYWJsZTxFZGl0b3JSZWZbXCJlZGl0b3JcIl0+O1xuZXhwb3J0IHR5cGUgRWRpdG9yT3B0aW9ucyA9IE5vbk51bGxhYmxlPEVtYWlsRWRpdG9yUHJvcHNbXCJvcHRpb25zXCJdPjtcblxuLyoqXG4gKiBQYXJzZSB0aGUgXCJBZHZhbmNlZCBvcHRpb25zIChKU09OKVwiIHByb3BlcnR5LiBSZXR1cm5zIGFuIGVycm9yIG1lc3NhZ2UgaW5zdGVhZFxuICogb2YgdGhyb3dpbmcsIHNvIGEgdHlwbyBpbiBTdHVkaW8gUHJvIHNob3dzIHVwIGFzIGEgbWVzc2FnZSwgbm90IGEgZGVhZCBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBZHZhbmNlZE9wdGlvbnMoanNvbjogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBvcHRpb25zOiBFZGl0b3JPcHRpb25zOyBlcnJvcj86IHN0cmluZyB9IHtcbiAgICBpZiAoIWpzb24gfHwgIWpzb24udHJpbSgpKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9IH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IFwiQWR2YW5jZWQgb3B0aW9ucyBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBwYXJzZWQgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9LCBlcnJvcjogYEFkdmFuY2VkIG9wdGlvbnMgYXJlIG5vdCB2YWxpZCBKU09OOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBpbiBoZXJlIG11c3QgYmUgc3RhYmxlOiByZWFjdC1lbWFpbC1lZGl0b3IgZGVzdHJveXMgYW5kIHJlY3JlYXRlc1xuICogdGhlIGVkaXRvciwgbG9zaW5nIHVuc2F2ZWQgd29yaywgd2hlbmV2ZXIgdGhlIHNlcmlhbGl6ZWQgb3B0aW9ucyBjaGFuZ2UuIFZhbHVlc1xuICogdGhhdCBjYW4gY2hhbmdlIGF0IHJ1bnRpbWUgKGxvY2FsZSwgbWVyZ2UgdGFncykgZ28gdGhyb3VnaCB0aGUgZWRpdG9yIEFQSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyhcbiAgICBhZHZhbmNlZDogRWRpdG9yT3B0aW9ucyxcbiAgICBwcm9qZWN0SWQ6IG51bWJlcixcbiAgICB0aGVtZTogVGhlbWVFbnVtLFxuICAgIGltYWdlVXBsb2FkTW9kZTogSW1hZ2VVcGxvYWRNb2RlRW51bVxuKTogRWRpdG9yT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9uczogRWRpdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgLi4uYWR2YW5jZWQsXG4gICAgICAgIGFwcGVhcmFuY2U6IHsgLi4uYWR2YW5jZWQuYXBwZWFyYW5jZSwgdGhlbWUgfVxuICAgIH07XG4gICAgaWYgKHByb2plY3RJZCA+IDApIHtcbiAgICAgICAgb3B0aW9ucy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgfVxuICAgIGlmIChpbWFnZVVwbG9hZE1vZGUgPT09IFwiZGlzYWJsZWRcIikge1xuICAgICAgICBvcHRpb25zLmZlYXR1cmVzID0geyAuLi5hZHZhbmNlZC5mZWF0dXJlcywgdXNlclVwbG9hZHM6IGZhbHNlIH07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWREZXNpZ24gPSB7IGRlc2lnbj86IG9iamVjdDsgZXJyb3I/OiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVzaWduKGpzb246IHN0cmluZyk6IFBhcnNlZERlc2lnbiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGVzaWduID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgaWYgKCFkZXNpZ24gfHwgdHlwZW9mIGRlc2lnbiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhlIHNhdmVkIHRlbXBsYXRlIGlzIG5vdCBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGVzaWduIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogYFRoZSBzYXZlZCB0ZW1wbGF0ZSBjb3VsZCBub3QgYmUgcmVhZDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4vZWRpdG9yT3B0aW9uc1wiO1xuXG50eXBlIEltYWdlQ2FsbGJhY2sgPSBQYXJhbWV0ZXJzPEVkaXRvcltcInJlZ2lzdGVyQ2FsbGJhY2tcIl0+WzFdO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG14PzogeyBzZXNzaW9uPzogeyBnZXRDb25maWc/OiAoa2V5OiBzdHJpbmcpID0+IHVua25vd24gfSB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBNZW5kaXggcHVibGlzaGVkIFJFU1Qgc2VydmljZXMgdGhhdCB1c2UgdGhlIGFjdGl2ZSBzZXNzaW9uIGZvciBhdXRoZW50aWNhdGlvblxuICogcmVqZWN0IHJlcXVlc3RzIHdpdGhvdXQgdGhlIHNlc3Npb24ncyBDU1JGIHRva2VuLlxuICovXG5mdW5jdGlvbiBjc3JmSGVhZGVycygpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCB0b2tlbiA9IHdpbmRvdy5teD8uc2Vzc2lvbj8uZ2V0Q29uZmlnPy4oXCJjc3JmdG9rZW5cIik7XG4gICAgcmV0dXJuIHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIiA/IHsgXCJYLUNzcmYtVG9rZW5cIjogdG9rZW4gfSA6IHt9O1xufVxuXG4vKipcbiAqIFVwbG9hZCBpbWFnZXMgdG8gdGhlIGFwcCdzIG93biBlbmRwb2ludCBpbnN0ZWFkIG9mIFVubGF5ZXIncyBzdG9yYWdlLiBUaGVcbiAqIGVuZHBvaW50IHJlY2VpdmVzIG11bHRpcGFydC9mb3JtLWRhdGEgd2l0aCB0aGUgaW1hZ2UgaW4gYSBwYXJ0IG5hbWVkIFwiZmlsZVwiXG4gKiBhbmQgbXVzdCBhbnN3ZXIgd2l0aCBKU09OIGNvbnRhaW5pbmcgdGhlIHB1YmxpYyBcInVybFwiIG9mIHRoZSBzdG9yZWQgaW1hZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckltYWdlVXBsb2FkKGVkaXRvcjogRWRpdG9yLCB1cGxvYWRVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHVwbG9hZDogSW1hZ2VDYWxsYmFjayA9IChmaWxlOiB7IGF0dGFjaG1lbnRzOiBGaWxlW10gfSwgZG9uZTogKHJlc3VsdDogb2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZmlsZS5hdHRhY2htZW50c1swXTtcbiAgICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICAgICAgZG9uZSh7IGFib3J0OiB0cnVlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgYm9keS5hcHBlbmQoXCJmaWxlXCIsIGltYWdlKTtcblxuICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwIH0pO1xuICAgICAgICBmZXRjaCh1cGxvYWRVcmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCAuLi5jc3JmSGVhZGVycygpIH0sXG4gICAgICAgICAgICBib2R5XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwbG9hZCBmYWlsZWQgd2l0aCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiB7IHVybD86IHVua25vd24gfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YT8udXJsICE9PSBcInN0cmluZ1wiIHx8ICFkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCByZXNwb25zZSBoYXMgbm8gXCJ1cmxcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwMCwgdXJsOiBkYXRhLnVybCB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlYWN0RW1haWxFZGl0b3I6IGltYWdlIHVwbG9hZCBmYWlsZWQuXCIsIGUpO1xuICAgICAgICAgICAgICAgIGRvbmUoeyBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBlZGl0b3IucmVnaXN0ZXJDYWxsYmFjayhcImltYWdlXCIsIHVwbG9hZCk7XG59XG4iLCJpbXBvcnQgeyBMaXN0RXhwcmVzc2lvblZhbHVlLCBMaXN0VmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG5leHBvcnQgdHlwZSBNZXJnZVRhZ3MgPSBSZWNvcmQ8c3RyaW5nLCB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgc2FtcGxlPzogc3RyaW5nIH0+O1xuXG4vKipcbiAqIFR1cm4gdGhlIG1lcmdlIHRhZyBkYXRhc291cmNlIGludG8gVW5sYXllcidzIG1lcmdlIHRhZyBtYXAuIFJldHVybnMgdW5kZWZpbmVkXG4gKiB3aGlsZSB0aGUgbGlzdCBpcyBsb2FkaW5nLCBzbyB0aGUgZWRpdG9yIGtlZXBzIHdoYXQgaXQgaGFzIHVudGlsIHRoZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1lcmdlVGFncyhcbiAgICBzb3VyY2U6IExpc3RWYWx1ZSB8IHVuZGVmaW5lZCxcbiAgICBuYW1lOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgdmFsdWU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZCxcbiAgICBzYW1wbGU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZFxuKTogTWVyZ2VUYWdzIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXNvdXJjZSB8fCAhbmFtZSB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS5zdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSB8fCAhc291cmNlLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHRhZ3M6IE1lcmdlVGFncyA9IHt9O1xuICAgIHNvdXJjZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB0YWdOYW1lID0gbmFtZS5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhZ1ZhbHVlID0gdmFsdWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBpZiAoIXRhZ05hbWUgfHwgIXRhZ1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnU2FtcGxlID0gc2FtcGxlPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIHRhZ3NbYHRhZ18ke2luZGV4fWBdID0gdGFnU2FtcGxlXG4gICAgICAgICAgICA/IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlLCBzYW1wbGU6IHRhZ1NhbXBsZSB9XG4gICAgICAgICAgICA6IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhZ3M7XG59XG4iLCJpbXBvcnQgeyBFZGl0YWJsZVZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBlZGl0b3IgbWF5IHdyaXRlIGl0cyBkZXNpZ24gdG8gdGhlIHRlbXBsYXRlIGF0dHJpYnV0ZS5cbiAqXG4gKiBPbmx5IHdoZW4gTWVuZGl4IGhhcyB0aGUgYXR0cmlidXRlIChhIGxvYWRpbmcgb3IgdW5hdmFpbGFibGUgYXR0cmlidXRlXG4gKiBhY2NlcHRzIHNldFZhbHVlIGFuZCBzdG9yZXMgbm90aGluZyksIGl0IGlzIGVkaXRhYmxlLCBhbmQgdGhlIHN0b3JlZCB2YWx1ZVxuICogd2FzIHVuZGVyc3Rvb2QuIEEgc3RvcmVkIHRlbXBsYXRlIHRoYXQgZmFpbGVkIHRvIGxvYWQgaXMgbm90IGluIHRoZSBlZGl0b3IsXG4gKiBzbyB3cml0aW5nIHRoZSBlZGl0b3IncyBjb250ZW50IHdvdWxkIHJlcGxhY2UgaXQgd2l0aCB3aGF0ZXZlciBpcyBvbiBzY3JlZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Xcml0ZVRlbXBsYXRlKGF0dHJpYnV0ZTogRWRpdGFibGVWYWx1ZTxzdHJpbmc+LCBsb2FkRXJyb3I6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdHRyaWJ1dGUuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgIWF0dHJpYnV0ZS5yZWFkT25seSAmJiAhbG9hZEVycm9yO1xufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgT3B0aW9uIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuLyoqXG4gKiBUaGUgYWN0aW9uIGFyZ3VtZW50cywgZXhhY3RseSBhcyBSZWFjdEVtYWlsRWRpdG9yLnhtbCBnZW5lcmF0ZXMgdGhlbSBpbnRvXG4gKiB0eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wcy5kLnRzLiBTcGVsbGluZyB0aGVtIG91dCBvbmNlIGtlZXBzIHRoaXMgZmlsZSBhbmRcbiAqIHRoZSBnZW5lcmF0ZWQgcHJvcHMgZnJvbSBkcmlmdGluZyBhcGFydC5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVBY3Rpb25BcmdzID0geyBodG1sX186IE9wdGlvbjxzdHJpbmc+OyBqc29uX186IE9wdGlvbjxzdHJpbmc+IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhckJ1dHRvbiB7XG4gICAgY2FwdGlvbjogc3RyaW5nO1xuICAgIGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPjtcbiAgICBvbkNsaWNrOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJQcm9wcyB7XG4gICAgLyoqIEZhbHNlIHVudGlsIHRoZSBlZGl0b3IgaGFzIGxvYWRlZDsgbm90aGluZyBjYW4gYmUgZXhwb3J0ZWQgYmVmb3JlIHRoYXQuICovXG4gICAgcmVhZHk6IGJvb2xlYW47XG4gICAgcmVhZE9ubHk6IGJvb2xlYW47XG4gICAgLyoqIEZhbHNlIHdoaWxlIHRoZSB0ZW1wbGF0ZSBhdHRyaWJ1dGUgaXMgbG9hZGluZywgdW5hdmFpbGFibGUgb3IgY291bGQgbm90IGJlIHJlYWQuICovXG4gICAgY2FuU2F2ZTogYm9vbGVhbjtcbiAgICBleHBvcnRIdG1sPzogVG9vbGJhckJ1dHRvbjtcbiAgICBzYXZlVGVtcGxhdGU/OiBUb29sYmFyQnV0dG9uO1xufVxuXG5mdW5jdGlvbiBBY3Rpb25CdXR0b24oe1xuICAgIGJ1dHRvbixcbiAgICBkaXNhYmxlZCxcbiAgICBjbGFzc05hbWVcbn06IHtcbiAgICBidXR0b246IFRvb2xiYXJCdXR0b247XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xufSk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgYnVzeSA9IGJ1dHRvbi5hY3Rpb24uaXNFeGVjdXRpbmc7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIsIGNsYXNzTmFtZSl9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgYnVzeSB8fCAhYnV0dG9uLmFjdGlvbi5jYW5FeGVjdXRlfVxuICAgICAgICAgICAgYXJpYS1idXN5PXtidXN5fVxuICAgICAgICAgICAgb25DbGljaz17YnV0dG9uLm9uQ2xpY2t9XG4gICAgICAgID5cbiAgICAgICAgICAgIHtidXR0b24uY2FwdGlvbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRvb2xiYXIoeyByZWFkeSwgcmVhZE9ubHksIGNhblNhdmUsIGV4cG9ydEh0bWwsIHNhdmVUZW1wbGF0ZSB9OiBUb29sYmFyUHJvcHMpOiBSZWFjdEVsZW1lbnQgfCBudWxsIHtcbiAgICAvLyBTYXZpbmcgZnJvbSBhIHJlYWQtb25seSBlZGl0b3Igd291bGQgc3RvcmUgbm90aGluZyB0aGUgdXNlciBjb3VsZCBjaGFuZ2UuXG4gICAgY29uc3Qgc2hvd1NhdmUgPSBzYXZlVGVtcGxhdGUgJiYgIXJlYWRPbmx5O1xuICAgIGlmICghZXhwb3J0SHRtbCAmJiAhc2hvd1NhdmUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZW1haWwtZWRpdG9yLXRvb2xiYXIgc3BhY2luZy1pbm5lci1ib3R0b20tbWVkaXVtXCI+XG4gICAgICAgICAgICB7ZXhwb3J0SHRtbCAmJiA8QWN0aW9uQnV0dG9uIGJ1dHRvbj17ZXhwb3J0SHRtbH0gZGlzYWJsZWQ9eyFyZWFkeX0gLz59XG4gICAgICAgICAgICB7c2hvd1NhdmUgJiYgKFxuICAgICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uPXtzYXZlVGVtcGxhdGV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVhZHkgfHwgIWNhblNhdmV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZXhwb3J0SHRtbCA/IFwic3BhY2luZy1vdXRlci1sZWZ0LW1lZGl1bVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3JSZWYgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcbmltcG9ydCB7IGJ1aWxkT3B0aW9ucywgRWRpdG9yLCBwYXJzZUFkdmFuY2VkT3B0aW9ucywgcGFyc2VEZXNpZ24gfSBmcm9tIFwiLi4vdXRpbHMvZWRpdG9yT3B0aW9uc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJJbWFnZVVwbG9hZCB9IGZyb20gXCIuLi91dGlscy9pbWFnZVVwbG9hZFwiO1xuaW1wb3J0IHsgYnVpbGRNZXJnZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VUYWdzXCI7XG5pbXBvcnQgeyBjYW5Xcml0ZVRlbXBsYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZUFjdGlvbkFyZ3MsIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyXCI7XG5cbi8qKiBIb3cgbG9uZyB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGVkaXQgYmVmb3JlIHdyaXRpbmcgdG8gdGhlIGF0dHJpYnV0ZXMuICovXG5jb25zdCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyA9IDUwMDtcblxudHlwZSBFeHBvcnRlZCA9IHsgaHRtbDogc3RyaW5nOyBqc29uOiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRvcldyYXBwZXIocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBKU09OVGVtcGxhdGUsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgYWR2YW5jZWRPcHRpb25zIH0gPSBwcm9wcztcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xuXG4gICAgY29uc3QgeyBvcHRpb25zOiBhZHZhbmNlZCwgZXJyb3I6IG9wdGlvbnNFcnJvciB9ID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gcGFyc2VBZHZhbmNlZE9wdGlvbnMoYWR2YW5jZWRPcHRpb25zKSxcbiAgICAgICAgW2FkdmFuY2VkT3B0aW9uc11cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiBidWlsZE9wdGlvbnMoYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSksXG4gICAgICAgIFthZHZhbmNlZCwgcHJvamVjdElkLCB0aGVtZSwgaW1hZ2VVcGxvYWRNb2RlXVxuICAgICk7XG5cbiAgICAvLyBUaGUgZWRpdG9yIGlzIHJlY3JlYXRlZCB3aGVuIGl0cyBvcHRpb25zIGNoYW5nZS4gUmVtZW1iZXIgd2hpY2ggb3B0aW9uc1xuICAgIC8vIHRoZSByZWFkeSBlZGl0b3Igd2FzIG1hZGUgd2l0aCwgc28gdGhlIG9sZCBvbmUgaXMgZm9yZ290dGVuIGF0IG9uY2UuXG4gICAgY29uc3QgW3JlYWR5LCBzZXRSZWFkeV0gPSB1c2VTdGF0ZTx7IGVkaXRvcjogRWRpdG9yOyBvcHRpb25zOiB0eXBlb2Ygb3B0aW9ucyB9IHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgZWRpdG9yID0gcmVhZHk/Lm9wdGlvbnMgPT09IG9wdGlvbnMgPyByZWFkeS5lZGl0b3IgOiBudWxsO1xuXG4gICAgLy8gQW4gZW1wdHkgdmFsdWUgbmV2ZXIgY2xlYXJzIHRoZSBlZGl0b3IgKHNlZSBiZWxvdyksIHNvIGl0IGlzIG5vIGVycm9yIGVpdGhlci5cbiAgICBjb25zdCBqc29uU3RhdHVzID0gSlNPTlRlbXBsYXRlLnN0YXR1cztcbiAgICBjb25zdCBqc29uVmFsdWUgPSBKU09OVGVtcGxhdGUudmFsdWUgPz8gXCJcIjtcbiAgICBjb25zdCBwYXJzZWQgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiAoanNvblN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmIGpzb25WYWx1ZSAhPT0gXCJcIiA/IHBhcnNlRGVzaWduKGpzb25WYWx1ZSkgOiB7fSksXG4gICAgICAgIFtqc29uU3RhdHVzLCBqc29uVmFsdWVdXG4gICAgKTtcbiAgICBjb25zdCBsb2FkRXJyb3IgPSBwYXJzZWQuZXJyb3I7XG5cbiAgICAvLyBVbmxheWVyIGNhbGxzIGhhbmRsZXJzIHJlZ2lzdGVyZWQgb25jZSBwZXIgZWRpdG9yLCBhbmQgdGhlIHNhdmUtb24tY2hhbmdlXG4gICAgLy8gdGltZXIgY2FuIGZpcmUgYmVmb3JlIHRoZSBuZXh0IHJlbmRlcjsgYm90aCByZWFkIHRoZSBsYXRlc3QgdmFsdWVzXG4gICAgLy8gdGhyb3VnaCB0aGVzZSByZWZzIGluc3RlYWQgb2YgdGhlIHJlbmRlciB0aGV5IHdlcmUgY3JlYXRlZCBpbi5cbiAgICBjb25zdCBwcm9wc1JlZiA9IHVzZVJlZihwcm9wcyk7XG4gICAgY29uc3Qgb3B0aW9uc1JlZiA9IHVzZVJlZihvcHRpb25zKTtcbiAgICBjb25zdCBsb2FkRXJyb3JSZWYgPSB1c2VSZWYobG9hZEVycm9yKTtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgICBwcm9wc1JlZi5jdXJyZW50ID0gcHJvcHM7XG4gICAgICAgIG9wdGlvbnNSZWYuY3VycmVudCA9IG9wdGlvbnM7XG4gICAgICAgIGxvYWRFcnJvclJlZi5jdXJyZW50ID0gbG9hZEVycm9yO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIGxhc3QgZGVzaWduIHN0cmluZyB0aGUgZWRpdG9yIGxvYWRlZCBvciBwcm9kdWNlZC4gV2hlbiB0aGUgYXR0cmlidXRlXG4gICAgLy8gY2hhbmdlcyB0byB0aGlzIHZhbHVlIChiZWNhdXNlIHdlIHdyb3RlIGl0KSB0aGVyZSBpcyBub3RoaW5nIHRvIHJlbG9hZCwgYW5kXG4gICAgLy8gcmVsb2FkaW5nIHdvdWxkIHRocm93IGF3YXkgdGhlIHVzZXIncyB1bmRvIGhpc3RvcnkgYW5kIHNlbGVjdGlvbi5cbiAgICBjb25zdCBzeW5jZWRKc29uID0gdXNlUmVmPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICAgIGNvbnN0IHNhdmVUaW1lciA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICAvLyBUaGUgZWRpdG9yIGlzIGRlc3Ryb3llZCBvbiB1bm1vdW50OyBhIHBlbmRpbmcgc2F2ZSB3b3VsZCBjYWxsIGludG8gaXQuXG4gICAgdXNlRWZmZWN0KCgpID0+ICgpID0+IGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCksIFtdKTtcblxuICAgIGNvbnN0IHJlYWRPbmx5ID0gSlNPTlRlbXBsYXRlLnJlYWRPbmx5O1xuXG4gICAgY29uc3QgZXhwb3J0RGVzaWduID0gdXNlQ2FsbGJhY2soKHVubGF5ZXI6IEVkaXRvcik6IFByb21pc2U8RXhwb3J0ZWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdW5sYXllci5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBodG1sOiBkYXRhLmh0bWwsIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEuZGVzaWduKSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICAvKiogV3JpdGUgdGhlIGRlc2lnbiB0byB0aGUgYXR0cmlidXRlcywgaWYgdGhleSBjYW4gYmUgd3JpdHRlbi4gUmV0dXJucyB3aGV0aGVyIGl0IGRpZC4gKi9cbiAgICBjb25zdCB3cml0ZUF0dHJpYnV0ZXMgPSB1c2VDYWxsYmFjaygoeyBodG1sLCBqc29uIH06IEV4cG9ydGVkKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlOiBqc29uQXR0ciwgSFRNTEJvZHk6IGh0bWxBdHRyIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWNhbldyaXRlVGVtcGxhdGUoanNvbkF0dHIsIGxvYWRFcnJvclJlZi5jdXJyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb247XG4gICAgICAgIGpzb25BdHRyLnNldFZhbHVlKGpzb24pO1xuICAgICAgICBpZiAoaHRtbEF0dHIgJiYgaHRtbEF0dHIuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgIWh0bWxBdHRyLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICBodG1sQXR0ci5zZXRWYWx1ZShodG1sKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBvblJlYWR5ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgICh1bmxheWVyOiBFZGl0b3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW1hZ2VVcGxvYWRVcmwgfSA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAocHJvcHNSZWYuY3VycmVudC5pbWFnZVVwbG9hZE1vZGUgPT09IFwiZW5kcG9pbnRcIiAmJiBpbWFnZVVwbG9hZFVybCkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVySW1hZ2VVcGxvYWQodW5sYXllciwgaW1hZ2VVcGxvYWRVcmwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bmxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkZXNpZ246dXBkYXRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50LnNhdmVPbkNoYW5nZSB8fCAhY2FuV3JpdGVUZW1wbGF0ZShjdXJyZW50LkpTT05UZW1wbGF0ZSwgbG9hZEVycm9yUmVmLmN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzYXZlVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBvcnREZXNpZ24odW5sYXllcikudGhlbih3cml0ZUF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIH0sIFNBVkVfT05fQ0hBTkdFX0RFTEFZX01TKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBIG5ldyBlZGl0b3Igc3RhcnRzIGJsYW5rLCBzbyB3aGF0ZXZlciBpdCBoYWQgbG9hZGVkIGlzIGdvbmUuXG4gICAgICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBzZXRSZWFkeSh7IGVkaXRvcjogdW5sYXllciwgb3B0aW9uczogb3B0aW9uc1JlZi5jdXJyZW50IH0pO1xuICAgICAgICB9LFxuICAgICAgICBbZXhwb3J0RGVzaWduLCB3cml0ZUF0dHJpYnV0ZXNdXG4gICAgKTtcblxuICAgIC8vIExvYWQgdGhlIGRlc2lnbiBmcm9tIHRoZSBhdHRyaWJ1dGUsIG9uY2UgdGhlIGVkaXRvciBhbmQgdGhlIHZhbHVlIGFyZSByZWFkeS5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAvLyBBbiBlbXB0eSB2YWx1ZSBuZXZlciBjbGVhcnMgdGhlIGVkaXRvci4gSXQgaXMgd2hhdCBhIHJvbGxiYWNrIG9mIGEgbmV3XG4gICAgICAgIC8vIG9iamVjdCBwcm9kdWNlcywgZm9yIGluc3RhbmNlIHdoZW4gYSBwb3AtdXAgb3BlbmVkIGJ5IHRoZSBzYXZlIGFjdGlvbiBpc1xuICAgICAgICAvLyBjbG9zZWQsIGFuZCBjbGVhcmluZyB3b3VsZCB0aHJvdyBhd2F5IGV2ZXJ5dGhpbmcgdGhlIHVzZXIgbWFkZS5cbiAgICAgICAgaWYgKCFlZGl0b3IgfHwganNvblN0YXR1cyAhPT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlIHx8IGpzb25WYWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqc29uVmFsdWUgPT09IHN5bmNlZEpzb24uY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb25WYWx1ZTtcbiAgICAgICAgaWYgKHBhcnNlZC5kZXNpZ24pIHtcbiAgICAgICAgICAgIGVkaXRvci5sb2FkRGVzaWduKHBhcnNlZC5kZXNpZ24gYXMgUGFyYW1ldGVyczxFZGl0b3JbXCJsb2FkRGVzaWduXCJdPlswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBSZWFjdEVtYWlsRWRpdG9yOiAke3BhcnNlZC5lcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGpzb25TdGF0dXMsIGpzb25WYWx1ZSwgcGFyc2VkXSk7XG5cbiAgICAvLyBSZWFkLW9ubHk6IHNob3cgdGhlIGRlc2lnbiBhcyBhIHByZXZpZXcgcmF0aGVyIHRoYW4gYW4gZWRpdG9yLlxuICAgIGNvbnN0IHByZXZpZXdTaG93biA9IHVzZVJlZihmYWxzZSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWRPbmx5ICYmICFwcmV2aWV3U2hvd24uY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dQcmV2aWV3KFwiZGVza3RvcFwiKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZE9ubHkgJiYgcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5oaWRlUHJldmlldygpO1xuICAgICAgICAgICAgcHJldmlld1Nob3duLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIHJlYWRPbmx5XSk7XG5cbiAgICBjb25zdCBsb2NhbGUgPSBwcm9wcy5sb2NhbGU/LnZhbHVlO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRMb2NhbGUobG9jYWxlIHx8IG51bGwpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbG9jYWxlXSk7XG5cbiAgICAvLyBNZW5kaXggaGFuZHMgb3V0IG5ldyBsaXN0IG9iamVjdHMgb24gcmUtcmVuZGVyczsgY29tcGFyZSBieSBjb250ZW50IHNvIHRoZVxuICAgIC8vIGVkaXRvciBpcyBvbmx5IHRvbGQgd2hlbiB0aGUgdGFncyByZWFsbHkgY2hhbmdlLlxuICAgIGNvbnN0IG1lcmdlVGFncyA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBidWlsZE1lcmdlVGFncyhwcm9wcy5tZXJnZVRhZ3MsIHByb3BzLm1lcmdlVGFnTmFtZSwgcHJvcHMubWVyZ2VUYWdWYWx1ZSwgcHJvcHMubWVyZ2VUYWdTYW1wbGUpID8/IG51bGxcbiAgICApO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbWVyZ2VUYWdzICE9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldE1lcmdlVGFncyhKU09OLnBhcnNlKG1lcmdlVGFncykpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbWVyZ2VUYWdzXSk7XG5cbiAgICBjb25zdCBydW5BY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAgICAgYXN5bmMgKGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPiwgd3JpdGU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBhd2FpdCBleHBvcnREZXNpZ24oZWRpdG9yKTtcbiAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGhlIHNhdmUgYWN0aW9uIGFmdGVyIGEgcmVmdXNlZCB3cml0ZSB3b3VsZCBjb21taXQgdGhlXG4gICAgICAgICAgICAvLyBvYmplY3QgYXMgaWYgdGhlIHRlbXBsYXRlIGhhZCBiZWVuIHN0b3JlZC5cbiAgICAgICAgICAgIGlmICh3cml0ZSAmJiAhd3JpdGVBdHRyaWJ1dGVzKGV4cG9ydGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24uY2FuRXhlY3V0ZSAmJiAhYWN0aW9uLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoeyBodG1sX186IGV4cG9ydGVkLmh0bWwsIGpzb25fXzogZXhwb3J0ZWQuanNvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2VkaXRvciwgZXhwb3J0RGVzaWduLCB3cml0ZUF0dHJpYnV0ZXNdXG4gICAgKTtcblxuICAgIGNvbnN0IGVycm9yID0gb3B0aW9uc0Vycm9yID8/IGxvYWRFcnJvcjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicmVhY3QtZW1haWwtZWRpdG9yLWRpdlwiLCBwcm9wcy5jbGFzcyl9IHN0eWxlPXtwcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgICAgIHJlYWR5PXtlZGl0b3IgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgICAgIGNhblNhdmU9e2NhbldyaXRlVGVtcGxhdGUoSlNPTlRlbXBsYXRlLCBsb2FkRXJyb3IpfVxuICAgICAgICAgICAgICAgIGV4cG9ydEh0bWw9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dFeHBvcnRIdG1sICYmIHByb3BzLmV4cG9ydEhUTUxBY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcHMuZXhwb3J0SHRtbENhcHRpb24/LnZhbHVlIHx8IFwiRXhwb3J0IEhUTUxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogcHJvcHMuZXhwb3J0SFRNTEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHJ1bkFjdGlvbihwcm9wcy5leHBvcnRIVE1MQWN0aW9uISwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNhdmVUZW1wbGF0ZT17XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmlzU2hvd1NhdmVUZW1wbGF0ZSAmJiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcHMuc2F2ZVRlbXBsYXRlQ2FwdGlvbj8udmFsdWUgfHwgXCJTYXZlIFRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHJ1bkFjdGlvbihwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24hLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8RW1haWxFZGl0b3JcbiAgICAgICAgICAgICAgICByZWY9e2VtYWlsRWRpdG9yUmVmfVxuICAgICAgICAgICAgICAgIG9uUmVhZHk9e29uUmVhZHl9XG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0PXtwcm9wcy5lZGl0b3JIZWlnaHQgfHwgXCI3MDBweFwifVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFZGl0b3JXcmFwcGVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyXCI7XG5cbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHByb3BzOiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiA8RWRpdG9yV3JhcHBlciB7Li4ucHJvcHN9IC8+O1xufVxuIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsIl9fdW5sYXllcl9sYXN0RWRpdG9ySWQiLCJ1c2VDb3VudGVyRWRpdG9ySWQiLCJ1c2VNZW1vIiwidXNlR2VuZXJhdGVkRWRpdG9ySWQiLCJSZWFjdCIsInVzZUlkIiwicmVwbGFjZSIsIkVtYWlsRWRpdG9ySW5uZXIiLCJwcm9wcyIsInJlZiIsIl9hIiwiX2IiLCJfYyIsIl9kIiwiX2UiLCJfZiIsIl9nIiwiX2giLCJfaSIsIm9uTG9hZCIsIm9uUmVhZHkiLCJzY3JpcHRVcmwiLCJtaW5IZWlnaHQiLCJzdHlsZSIsImVkaXRvciIsInNldEVkaXRvciIsInVzZVN0YXRlIiwiaGFzTG9hZGVkRW1iZWRTY3JpcHQiLCJzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCIsImdlbmVyYXRlZElkIiwiZWRpdG9ySWQiLCJvcHRpb25zIiwiYXBwZWFyYW5jZSIsImRpc3BsYXlNb2RlIiwibG9jYWxlIiwicHJvamVjdElkIiwidG9vbHMiLCJpZCIsInNvdXJjZSIsIm5hbWUiLCJ2ZXJzaW9uIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsImVkaXRvclJlZiIsInVzZVJlZiIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJfYTIiLCJkZXN0cm95IiwibG9hZFNjcmlwdCIsInVubGF5ZXIiLCJjcmVhdGVFZGl0b3IiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0aG9kUHJvcHMiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwicHJvcE5hbWUiLCJ0ZXN0IiwiZm9yRWFjaCIsIm1ldGhvZFByb3AiLCJhZGRFdmVudExpc3RlbmVyIiwiam9pbiIsImNyZWF0ZUVsZW1lbnQiLCJmbGV4IiwiZGlzcGxheSIsIkVtYWlsRWRpdG9yIiwiZm9yd2FyZFJlZiIsImhhc093biIsImhhc093blByb3BlcnR5IiwiY2xhc3NOYW1lcyIsImNsYXNzZXMiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJnIiwiYXBwZW5kQ2xhc3MiLCJwYXJzZVZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiYXBwbHkiLCJ0b1N0cmluZyIsInByb3RvdHlwZSIsImluY2x1ZGVzIiwia2V5IiwiY2FsbCIsInZhbHVlIiwibmV3Q2xhc3MiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsIl9qc3giLCJfanN4cyIsInVzZUxheW91dEVmZmVjdCIsInVzZUNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFjQSxJQUFNQSxHQUFBLEdBQ0osT0FBT0MsTUFBQSxLQUFXLFdBQUEsR0FBYztF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
