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
      return (jsxRuntime.jsx("button", { type: "button", className: "btn mx-button btn-default", disabled: disabled || busy || !button.action.canExecute, "aria-busy": busy, onClick: button.onClick, children: button.caption }));
  }
  function Toolbar({ ready, readOnly, canSave, preview, exportHtml, saveTemplate }) {
      // A read-only editor always previews, and saving from it would store nothing
      // the user could change.
      const showPreview = preview && !readOnly;
      const showSave = saveTemplate && !readOnly;
      if (!showPreview && !exportHtml && !showSave) {
          return null;
      }
      return (jsxRuntime.jsxs("div", { className: "react-email-editor-toolbar spacing-inner-bottom-medium", children: [showPreview && (jsxRuntime.jsx("button", { type: "button", className: "btn mx-button btn-default", disabled: !ready, "aria-pressed": preview.previewing, onClick: preview.onClick, children: preview.caption })), exportHtml && jsxRuntime.jsx(ActionButton, { button: exportHtml, disabled: !ready }), showSave && jsxRuntime.jsx(ActionButton, { button: saveTemplate, disabled: !ready || !canSave })] }));
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
      const emailEditorRef = React.useRef(null);
      const { options: advanced, error: optionsError } = React.useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
      const options = React.useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode, displayMode, editorVersion), [advanced, projectId, theme, imageUploadMode, displayMode, editorVersion]);
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
      // Whether the preview is showing: always when the editor is read-only,
      // otherwise when the user switched it on for this editor.
      const [previewToggledFor, setPreviewToggledFor] = React.useState(null);
      const previewing = editor !== null && (readOnly || previewToggledFor === editor);
      const previewDevice = props.previewDevice ?? "desktop";
      // Show or hide Unlayer's preview to match. A new editor starts without one.
      const previewShownIn = React.useRef(null);
      React.useEffect(() => {
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
      const togglePreview = React.useCallback(() => {
          setPreviewToggledFor(previewing ? null : editor);
      }, [editor, previewing]);
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
          execute(action, { html__: exported.html, json__: exported.json });
      }, [editor, exportDesign, writeAttributes]);
      const error = optionsError ?? loadError;
      return (jsxRuntime.jsxs("div", { className: classNames("react-email-editor-div", props.class), style: props.style, children: [jsxRuntime.jsx(Toolbar, { ready: editor !== null, readOnly: readOnly, canSave: canWriteTemplate(JSONTemplate, loadError), preview: props.isShowPreview
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
                      : undefined }), error && (jsxRuntime.jsx("div", { className: "alert alert-danger", role: "alert", children: error })), jsxRuntime.jsx(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: props.editorHeight || "700px", options: options, scriptUrl: props.scriptUrl?.trim() || undefined })] }));
  }

  function ReactEmailEditor(props) {
      return jsxRuntime.jsx(EditorWrapper, { ...props });
  }

  exports.ReactEmailEditor = ReactEmailEditor;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2VkaXRvck9wdGlvbnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvaW1hZ2VVcGxvYWQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbWVyZ2VUYWdzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbmltcG9ydCBSZWFjdCwge1xuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUsXG4gIHVzZU1lbW9cbn0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIHBhY2thZ2UuanNvblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjIuMS4zXCI7XG5cbi8vIHNyYy9sb2FkU2NyaXB0LnRzXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9IFwiaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/MlwiO1xudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIGxvYWRlZCA9IGZhbHNlO1xudmFyIGZpbmRTY3JpcHQgPSAoc2NyaXB0VXJsKSA9PiB7XG4gIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpO1xuICBsZXQgZm91bmQgPSBudWxsO1xuICBzY3JpcHRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGZvdW5kID0gc2NyaXB0O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZDtcbn07XG52YXIgaXNFbWJlZFJlYWR5ID0gKCkgPT4gbG9hZGVkIHx8IHR5cGVvZiB1bmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIGFkZENhbGxiYWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbn07XG52YXIgcnVuQ2FsbGJhY2tzID0gKCkgPT4ge1xuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIGxldCBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IChjYWxsYmFjaywgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybCkgPT4ge1xuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGNvbnN0IGV4aXN0aW5nU2NyaXB0ID0gZmluZFNjcmlwdChzY3JpcHRVcmwpO1xuICBpZiAoIWV4aXN0aW5nU2NyaXB0KSB7XG4gICAgY29uc3QgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBydW5DYWxsYmFja3MoKTtcbiAgfSBlbHNlIHtcbiAgICBleGlzdGluZ1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8geyBfX3VubGF5ZXJfbGFzdEVkaXRvcklkOiAwIH0gOiB3aW5kb3c7XG53aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgdXNlQ291bnRlckVkaXRvcklkID0gKCkgPT4gdXNlTWVtbygoKSA9PiBgZWRpdG9yLSR7Kyt3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZH1gLCBbXSk7XG52YXIgdXNlR2VuZXJhdGVkRWRpdG9ySWQgPSB0eXBlb2YgUmVhY3QudXNlSWQgPT09IFwiZnVuY3Rpb25cIiA/IChcbiAgLy8gU3RyaXAgJzonIHNvIHRoZSBpZCBpcyBhIHZhbGlkIENTUyBzZWxlY3RvciBmb3IgdW5sYXllci5jcmVhdGVFZGl0b3IuXG4gICgpID0+IGBlZGl0b3ItJHtSZWFjdC51c2VJZCgpLnJlcGxhY2UoLzovZywgXCJcIil9YFxuKSA6IHVzZUNvdW50ZXJFZGl0b3JJZDtcbmZ1bmN0aW9uIEVtYWlsRWRpdG9ySW5uZXIocHJvcHMsIHJlZikge1xuICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaTtcbiAgY29uc3QgeyBvbkxvYWQsIG9uUmVhZHksIHNjcmlwdFVybCwgbWluSGVpZ2h0ID0gNTAwLCBzdHlsZSA9IHt9IH0gPSBwcm9wcztcbiAgY29uc3QgW2VkaXRvciwgc2V0RWRpdG9yXSA9IHVzZVN0YXRlKFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgW2hhc0xvYWRlZEVtYmVkU2NyaXB0LCBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGdlbmVyYXRlZElkID0gdXNlR2VuZXJhdGVkRWRpdG9ySWQoKTtcbiAgY29uc3QgZWRpdG9ySWQgPSBwcm9wcy5lZGl0b3JJZCB8fCBnZW5lcmF0ZWRJZDtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5wcm9wcy5vcHRpb25zIHx8IHt9LFxuICAgIGFwcGVhcmFuY2U6IChfYiA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfYiA6IChfYSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hcHBlYXJhbmNlLFxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9jID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLmRpc3BsYXlNb2RlKSB8fCBcImVtYWlsXCIsXG4gICAgbG9jYWxlOiAoX2UgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfZSA6IChfZCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZC5sb2NhbGUsXG4gICAgcHJvamVjdElkOiAoX2cgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfZyA6IChfZiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZi5wcm9qZWN0SWQsXG4gICAgdG9vbHM6IChfaSA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX2kgOiAoX2ggPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2gudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZSxcbiAgICAgIHZlcnNpb25cbiAgICB9XG4gIH07XG4gIHVzZUltcGVyYXRpdmVIYW5kbGUoXG4gICAgcmVmLFxuICAgICgpID0+ICh7XG4gICAgICBlZGl0b3JcbiAgICB9KSxcbiAgICBbZWRpdG9yXVxuICApO1xuICBjb25zdCBlZGl0b3JSZWYgPSB1c2VSZWYoZWRpdG9yKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBlZGl0b3JSZWYuY3VycmVudCA9IGVkaXRvcjtcbiAgfSwgW2VkaXRvcl0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB2YXIgX2EyO1xuICAgICAgKF9hMiA9IGVkaXRvclJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EyLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoKCkgPT4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSksIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgY29uc3QgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKFxuICAgIChwcm9wTmFtZSkgPT4gL15vbi8udGVzdChwcm9wTmFtZSlcbiAgKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaCgobWV0aG9kUHJvcCkgPT4ge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gXCJvbkxvYWRcIiAmJiBtZXRob2RQcm9wICE9PSBcIm9uUmVhZHlcIiAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwiZWRpdG9yOnJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBtZXRob2RQcm9wcy5qb2luKFwiLFwiKV0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgbWluSGVpZ2h0XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBlZGl0b3JJZCwgc3R5bGU6IHsgLi4uc3R5bGUsIGZsZXg6IDEgfSB9KVxuICApO1xufVxudmFyIEVtYWlsRWRpdG9yID0gUmVhY3QuZm9yd2FyZFJlZihFbWFpbEVkaXRvcklubmVyKTtcbmV4cG9ydCB7XG4gIEVtYWlsRWRpdG9yLFxuICBFbWFpbEVkaXRvciBhcyBkZWZhdWx0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsIi8qIVxuXHRDb3B5cmlnaHQgKGMpIDIwMTggSmVkIFdhdHNvbi5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcblx0aHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoYXJnKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBwYXJzZVZhbHVlKGFyZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VWYWx1ZSAoYXJnKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gYXJnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0cmV0dXJuIGFyZy50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ2xhc3MgKHZhbHVlLCBuZXdDbGFzcykge1xuXHRcdGlmICghbmV3Q2xhc3MpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICsgJyAnICsgbmV3Q2xhc3M7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdmFsdWUgKyBuZXdDbGFzcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCB7IERpc3BsYXlNb2RlRW51bSwgSW1hZ2VVcGxvYWRNb2RlRW51bSwgVGhlbWVFbnVtIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5cbmV4cG9ydCB0eXBlIEVkaXRvciA9IE5vbk51bGxhYmxlPEVkaXRvclJlZjxEaXNwbGF5TW9kZUVudW0+W1wiZWRpdG9yXCJdPjtcbmV4cG9ydCB0eXBlIEVkaXRvck9wdGlvbnMgPSBOb25OdWxsYWJsZTxFbWFpbEVkaXRvclByb3BzPERpc3BsYXlNb2RlRW51bT5bXCJvcHRpb25zXCJdPjtcblxuLyoqXG4gKiBQYXJzZSB0aGUgXCJBZHZhbmNlZCBvcHRpb25zIChKU09OKVwiIHByb3BlcnR5LiBSZXR1cm5zIGFuIGVycm9yIG1lc3NhZ2UgaW5zdGVhZFxuICogb2YgdGhyb3dpbmcsIHNvIGEgdHlwbyBpbiBTdHVkaW8gUHJvIHNob3dzIHVwIGFzIGEgbWVzc2FnZSwgbm90IGEgZGVhZCBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBZHZhbmNlZE9wdGlvbnMoanNvbjogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBvcHRpb25zOiBFZGl0b3JPcHRpb25zOyBlcnJvcj86IHN0cmluZyB9IHtcbiAgICBpZiAoIWpzb24gfHwgIWpzb24udHJpbSgpKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9IH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IFwiQWR2YW5jZWQgb3B0aW9ucyBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBwYXJzZWQgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9LCBlcnJvcjogYEFkdmFuY2VkIG9wdGlvbnMgYXJlIG5vdCB2YWxpZCBKU09OOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBpbiBoZXJlIG11c3QgYmUgc3RhYmxlOiByZWFjdC1lbWFpbC1lZGl0b3IgZGVzdHJveXMgYW5kIHJlY3JlYXRlc1xuICogdGhlIGVkaXRvciwgbG9zaW5nIHVuc2F2ZWQgd29yaywgd2hlbmV2ZXIgdGhlIHNlcmlhbGl6ZWQgb3B0aW9ucyBjaGFuZ2UuIFZhbHVlc1xuICogdGhhdCBjYW4gY2hhbmdlIGF0IHJ1bnRpbWUgKGxvY2FsZSwgbWVyZ2UgdGFncykgZ28gdGhyb3VnaCB0aGUgZWRpdG9yIEFQSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyhcbiAgICBhZHZhbmNlZDogRWRpdG9yT3B0aW9ucyxcbiAgICBwcm9qZWN0SWQ6IG51bWJlcixcbiAgICB0aGVtZTogVGhlbWVFbnVtLFxuICAgIGltYWdlVXBsb2FkTW9kZTogSW1hZ2VVcGxvYWRNb2RlRW51bSxcbiAgICBkaXNwbGF5TW9kZTogRGlzcGxheU1vZGVFbnVtID0gXCJlbWFpbFwiLFxuICAgIHZlcnNpb24gPSBcIlwiXG4pOiBFZGl0b3JPcHRpb25zIHtcbiAgICAvLyBEaXNwbGF5IG1vZGUgYW5kIHZlcnNpb24gY29tZSBiZWZvcmUgdGhlIGFkdmFuY2VkIG9wdGlvbnMsIHNvIGFwcHMgdGhhdFxuICAgIC8vIGFscmVhZHkgc2V0IHRoZW0gdGhlcmUga2VlcCB3aGF0IHRoZXkgaGFkLlxuICAgIGNvbnN0IG9wdGlvbnM6IEVkaXRvck9wdGlvbnMgPSB7XG4gICAgICAgIGRpc3BsYXlNb2RlLFxuICAgICAgICAuLi4odmVyc2lvbi50cmltKCkgPyB7IHZlcnNpb246IHZlcnNpb24udHJpbSgpIH0gOiB7fSksXG4gICAgICAgIC4uLmFkdmFuY2VkLFxuICAgICAgICBhcHBlYXJhbmNlOiB7IC4uLmFkdmFuY2VkLmFwcGVhcmFuY2UsIHRoZW1lIH1cbiAgICB9O1xuICAgIGlmIChwcm9qZWN0SWQgPiAwKSB7XG4gICAgICAgIG9wdGlvbnMucHJvamVjdElkID0gcHJvamVjdElkO1xuICAgIH1cbiAgICBpZiAoaW1hZ2VVcGxvYWRNb2RlID09PSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgb3B0aW9ucy5mZWF0dXJlcyA9IHsgLi4uYWR2YW5jZWQuZmVhdHVyZXMsIHVzZXJVcGxvYWRzOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkRGVzaWduID0geyBkZXNpZ24/OiBvYmplY3Q7IGVycm9yPzogc3RyaW5nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURlc2lnbihqc29uOiBzdHJpbmcpOiBQYXJzZWREZXNpZ24ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghZGVzaWduIHx8IHR5cGVvZiBkZXNpZ24gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBcIlRoZSBzYXZlZCB0ZW1wbGF0ZSBpcyBub3QgYSBKU09OIG9iamVjdC5cIiB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRlc2lnbiB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IGBUaGUgc2F2ZWQgdGVtcGxhdGUgY291bGQgbm90IGJlIHJlYWQ6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YCB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVkaXRvciB9IGZyb20gXCIuL2VkaXRvck9wdGlvbnNcIjtcblxudHlwZSBJbWFnZUNhbGxiYWNrID0gUGFyYW1ldGVyczxFZGl0b3JbXCJyZWdpc3RlckNhbGxiYWNrXCJdPlsxXTtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBteD86IHsgc2Vzc2lvbj86IHsgZ2V0Q29uZmlnPzogKGtleTogc3RyaW5nKSA9PiB1bmtub3duIH0gfTtcbiAgICB9XG59XG5cbi8qKlxuICogTWVuZGl4IHB1Ymxpc2hlZCBSRVNUIHNlcnZpY2VzIHRoYXQgdXNlIHRoZSBhY3RpdmUgc2Vzc2lvbiBmb3IgYXV0aGVudGljYXRpb25cbiAqIHJlamVjdCByZXF1ZXN0cyB3aXRob3V0IHRoZSBzZXNzaW9uJ3MgQ1NSRiB0b2tlbi5cbiAqL1xuZnVuY3Rpb24gY3NyZkhlYWRlcnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgdG9rZW4gPSB3aW5kb3cubXg/LnNlc3Npb24/LmdldENvbmZpZz8uKFwiY3NyZnRva2VuXCIpO1xuICAgIHJldHVybiB0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIgPyB7IFwiWC1Dc3JmLVRva2VuXCI6IHRva2VuIH0gOiB7fTtcbn1cblxuLyoqXG4gKiBVcGxvYWQgaW1hZ2VzIHRvIHRoZSBhcHAncyBvd24gZW5kcG9pbnQgaW5zdGVhZCBvZiBVbmxheWVyJ3Mgc3RvcmFnZS4gVGhlXG4gKiBlbmRwb2ludCByZWNlaXZlcyBtdWx0aXBhcnQvZm9ybS1kYXRhIHdpdGggdGhlIGltYWdlIGluIGEgcGFydCBuYW1lZCBcImZpbGVcIlxuICogYW5kIG11c3QgYW5zd2VyIHdpdGggSlNPTiBjb250YWluaW5nIHRoZSBwdWJsaWMgXCJ1cmxcIiBvZiB0aGUgc3RvcmVkIGltYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJJbWFnZVVwbG9hZChlZGl0b3I6IEVkaXRvciwgdXBsb2FkVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB1cGxvYWQ6IEltYWdlQ2FsbGJhY2sgPSAoZmlsZTogeyBhdHRhY2htZW50czogRmlsZVtdIH0sIGRvbmU6IChyZXN1bHQ6IG9iamVjdCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGZpbGUuYXR0YWNobWVudHNbMF07XG4gICAgICAgIGlmICghaW1hZ2UpIHtcbiAgICAgICAgICAgIGRvbmUoeyBhYm9ydDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKFwiZmlsZVwiLCBpbWFnZSk7XG5cbiAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMCB9KTtcbiAgICAgICAgZmV0Y2godXBsb2FkVXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLi4uY3NyZkhlYWRlcnMoKSB9LFxuICAgICAgICAgICAgYm9keVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVcGxvYWQgZmFpbGVkIHdpdGggSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoZGF0YTogeyB1cmw/OiB1bmtub3duIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGE/LnVybCAhPT0gXCJzdHJpbmdcIiB8fCAhZGF0YS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgcmVzcG9uc2UgaGFzIG5vIFwidXJsXCInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9uZSh7IHByb2dyZXNzOiAxMDAsIHVybDogZGF0YS51cmwgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWFjdEVtYWlsRWRpdG9yOiBpbWFnZSB1cGxvYWQgZmFpbGVkLlwiLCBlKTtcbiAgICAgICAgICAgICAgICBkb25lKHsgZXJyb3I6IGUubWVzc2FnZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG4gICAgZWRpdG9yLnJlZ2lzdGVyQ2FsbGJhY2soXCJpbWFnZVwiLCB1cGxvYWQpO1xufVxuIiwiaW1wb3J0IHsgTGlzdEV4cHJlc3Npb25WYWx1ZSwgTGlzdFZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuZXhwb3J0IHR5cGUgTWVyZ2VUYWdzID0gUmVjb3JkPHN0cmluZywgeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHNhbXBsZT86IHN0cmluZyB9PjtcblxuLyoqXG4gKiBUdXJuIHRoZSBtZXJnZSB0YWcgZGF0YXNvdXJjZSBpbnRvIFVubGF5ZXIncyBtZXJnZSB0YWcgbWFwLiBSZXR1cm5zIHVuZGVmaW5lZFxuICogd2hpbGUgdGhlIGxpc3QgaXMgbG9hZGluZywgc28gdGhlIGVkaXRvciBrZWVwcyB3aGF0IGl0IGhhcyB1bnRpbCB0aGVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNZXJnZVRhZ3MoXG4gICAgc291cmNlOiBMaXN0VmFsdWUgfCB1bmRlZmluZWQsXG4gICAgbmFtZTogTGlzdEV4cHJlc3Npb25WYWx1ZTxzdHJpbmc+IHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgc2FtcGxlOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWRcbik6IE1lcmdlVGFncyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFzb3VyY2UgfHwgIW5hbWUgfHwgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzb3VyY2Uuc3RhdHVzICE9PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgfHwgIXNvdXJjZS5pdGVtcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCB0YWdzOiBNZXJnZVRhZ3MgPSB7fTtcbiAgICBzb3VyY2UuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5hbWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdWYWx1ZSA9IHZhbHVlLmdldChpdGVtKS52YWx1ZTtcbiAgICAgICAgaWYgKCF0YWdOYW1lIHx8ICF0YWdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ1NhbXBsZSA9IHNhbXBsZT8uZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICB0YWdzW2B0YWdfJHtpbmRleH1gXSA9IHRhZ1NhbXBsZVxuICAgICAgICAgICAgPyB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSwgc2FtcGxlOiB0YWdTYW1wbGUgfVxuICAgICAgICAgICAgOiB7IG5hbWU6IHRhZ05hbWUsIHZhbHVlOiB0YWdWYWx1ZSB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0YWdzO1xufVxuIiwiaW1wb3J0IHsgRWRpdGFibGVWYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5cbi8qKlxuICogV2hldGhlciB0aGUgZWRpdG9yIG1heSB3cml0ZSBpdHMgZGVzaWduIHRvIHRoZSB0ZW1wbGF0ZSBhdHRyaWJ1dGUuXG4gKlxuICogT25seSB3aGVuIE1lbmRpeCBoYXMgdGhlIGF0dHJpYnV0ZSAoYSBsb2FkaW5nIG9yIHVuYXZhaWxhYmxlIGF0dHJpYnV0ZVxuICogYWNjZXB0cyBzZXRWYWx1ZSBhbmQgc3RvcmVzIG5vdGhpbmcpLCBpdCBpcyBlZGl0YWJsZSwgYW5kIHRoZSBzdG9yZWQgdmFsdWVcbiAqIHdhcyB1bmRlcnN0b29kLiBBIHN0b3JlZCB0ZW1wbGF0ZSB0aGF0IGZhaWxlZCB0byBsb2FkIGlzIG5vdCBpbiB0aGUgZWRpdG9yLFxuICogc28gd3JpdGluZyB0aGUgZWRpdG9yJ3MgY29udGVudCB3b3VsZCByZXBsYWNlIGl0IHdpdGggd2hhdGV2ZXIgaXMgb24gc2NyZWVuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuV3JpdGVUZW1wbGF0ZShhdHRyaWJ1dGU6IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgbG9hZEVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlICYmICFhdHRyaWJ1dGUucmVhZE9ubHkgJiYgIWxvYWRFcnJvcjtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIE9wdGlvbiB9IGZyb20gXCJtZW5kaXhcIjtcblxuLyoqXG4gKiBUaGUgYWN0aW9uIGFyZ3VtZW50cywgZXhhY3RseSBhcyBSZWFjdEVtYWlsRWRpdG9yLnhtbCBnZW5lcmF0ZXMgdGhlbSBpbnRvXG4gKiB0eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wcy5kLnRzLiBTcGVsbGluZyB0aGVtIG91dCBvbmNlIGtlZXBzIHRoaXMgZmlsZSBhbmRcbiAqIHRoZSBnZW5lcmF0ZWQgcHJvcHMgZnJvbSBkcmlmdGluZyBhcGFydC5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVBY3Rpb25BcmdzID0geyBodG1sX186IE9wdGlvbjxzdHJpbmc+OyBqc29uX186IE9wdGlvbjxzdHJpbmc+IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhckJ1dHRvbiB7XG4gICAgY2FwdGlvbjogc3RyaW5nO1xuICAgIGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPjtcbiAgICBvbkNsaWNrOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByZXZpZXdUb2dnbGUge1xuICAgIC8qKiBDYXB0aW9uIGZvciB0aGUgY3VycmVudCBzdGF0ZTogXCJTaG93IFByZXZpZXdcIiB3aGlsZSBlZGl0aW5nLCBcIkhpZGUgUHJldmlld1wiIHdoaWxlIHByZXZpZXdpbmcuICovXG4gICAgY2FwdGlvbjogc3RyaW5nO1xuICAgIHByZXZpZXdpbmc6IGJvb2xlYW47XG4gICAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xuICAgIC8qKiBGYWxzZSB1bnRpbCB0aGUgZWRpdG9yIGhhcyBsb2FkZWQ7IG5vdGhpbmcgY2FuIGJlIGV4cG9ydGVkIGJlZm9yZSB0aGF0LiAqL1xuICAgIHJlYWR5OiBib29sZWFuO1xuICAgIHJlYWRPbmx5OiBib29sZWFuO1xuICAgIC8qKiBGYWxzZSB3aGlsZSB0aGUgdGVtcGxhdGUgYXR0cmlidXRlIGlzIGxvYWRpbmcsIHVuYXZhaWxhYmxlIG9yIGNvdWxkIG5vdCBiZSByZWFkLiAqL1xuICAgIGNhblNhdmU6IGJvb2xlYW47XG4gICAgcHJldmlldz86IFByZXZpZXdUb2dnbGU7XG4gICAgZXhwb3J0SHRtbD86IFRvb2xiYXJCdXR0b247XG4gICAgc2F2ZVRlbXBsYXRlPzogVG9vbGJhckJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gQWN0aW9uQnV0dG9uKHsgYnV0dG9uLCBkaXNhYmxlZCB9OiB7IGJ1dHRvbjogVG9vbGJhckJ1dHRvbjsgZGlzYWJsZWQ6IGJvb2xlYW4gfSk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgYnVzeSA9IGJ1dHRvbi5hY3Rpb24uaXNFeGVjdXRpbmc7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZCB8fCBidXN5IHx8ICFidXR0b24uYWN0aW9uLmNhbkV4ZWN1dGV9XG4gICAgICAgICAgICBhcmlhLWJ1c3k9e2J1c3l9XG4gICAgICAgICAgICBvbkNsaWNrPXtidXR0b24ub25DbGlja31cbiAgICAgICAgPlxuICAgICAgICAgICAge2J1dHRvbi5jYXB0aW9ufVxuICAgICAgICA8L2J1dHRvbj5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9vbGJhcih7XG4gICAgcmVhZHksXG4gICAgcmVhZE9ubHksXG4gICAgY2FuU2F2ZSxcbiAgICBwcmV2aWV3LFxuICAgIGV4cG9ydEh0bWwsXG4gICAgc2F2ZVRlbXBsYXRlXG59OiBUb29sYmFyUHJvcHMpOiBSZWFjdEVsZW1lbnQgfCBudWxsIHtcbiAgICAvLyBBIHJlYWQtb25seSBlZGl0b3IgYWx3YXlzIHByZXZpZXdzLCBhbmQgc2F2aW5nIGZyb20gaXQgd291bGQgc3RvcmUgbm90aGluZ1xuICAgIC8vIHRoZSB1c2VyIGNvdWxkIGNoYW5nZS5cbiAgICBjb25zdCBzaG93UHJldmlldyA9IHByZXZpZXcgJiYgIXJlYWRPbmx5O1xuICAgIGNvbnN0IHNob3dTYXZlID0gc2F2ZVRlbXBsYXRlICYmICFyZWFkT25seTtcbiAgICBpZiAoIXNob3dQcmV2aWV3ICYmICFleHBvcnRIdG1sICYmICFzaG93U2F2ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItdG9vbGJhciBzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cbiAgICAgICAgICAgIHtzaG93UHJldmlldyAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVhZHl9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17cHJldmlldy5wcmV2aWV3aW5nfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcmV2aWV3Lm9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cHJldmlldy5jYXB0aW9ufVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtleHBvcnRIdG1sICYmIDxBY3Rpb25CdXR0b24gYnV0dG9uPXtleHBvcnRIdG1sfSBkaXNhYmxlZD17IXJlYWR5fSAvPn1cbiAgICAgICAgICAgIHtzaG93U2F2ZSAmJiA8QWN0aW9uQnV0dG9uIGJ1dHRvbj17c2F2ZVRlbXBsYXRlfSBkaXNhYmxlZD17IXJlYWR5IHx8ICFjYW5TYXZlfSAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuaW1wb3J0IHsgRGlzcGxheU1vZGVFbnVtLCBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcbmltcG9ydCB7IGJ1aWxkT3B0aW9ucywgRWRpdG9yLCBwYXJzZUFkdmFuY2VkT3B0aW9ucywgcGFyc2VEZXNpZ24gfSBmcm9tIFwiLi4vdXRpbHMvZWRpdG9yT3B0aW9uc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJJbWFnZVVwbG9hZCB9IGZyb20gXCIuLi91dGlscy9pbWFnZVVwbG9hZFwiO1xuaW1wb3J0IHsgYnVpbGRNZXJnZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VUYWdzXCI7XG5pbXBvcnQgeyBjYW5Xcml0ZVRlbXBsYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZUFjdGlvbkFyZ3MsIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyXCI7XG5cbi8qKiBIb3cgbG9uZyB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGVkaXQgYmVmb3JlIHdyaXRpbmcgdG8gdGhlIGF0dHJpYnV0ZXMuICovXG5jb25zdCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyA9IDUwMDtcblxudHlwZSBFeHBvcnRlZCA9IHsgaHRtbDogc3RyaW5nOyBqc29uOiBzdHJpbmcgfTtcblxuLyoqIFJ1biBhIE1lbmRpeCBhY3Rpb24gaWYgaXQgaXMgc2V0IGFuZCBtYXkgcnVuIG5vdy4gKi9cbmZ1bmN0aW9uIGV4ZWN1dGUoYWN0aW9uOiBBY3Rpb25WYWx1ZSB8IHVuZGVmaW5lZCk6IHZvaWQ7XG5mdW5jdGlvbiBleGVjdXRlKGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPiB8IHVuZGVmaW5lZCwgYXJnczogVGVtcGxhdGVBY3Rpb25BcmdzKTogdm9pZDtcbmZ1bmN0aW9uIGV4ZWN1dGUoYWN0aW9uOiBBY3Rpb25WYWx1ZTxhbnk+IHwgdW5kZWZpbmVkLCBhcmdzPzogVGVtcGxhdGVBY3Rpb25BcmdzKTogdm9pZCB7XG4gICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24uY2FuRXhlY3V0ZSAmJiAhYWN0aW9uLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgIGFjdGlvbi5leGVjdXRlKGFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRvcldyYXBwZXIocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBKU09OVGVtcGxhdGUsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgYWR2YW5jZWRPcHRpb25zLCBkaXNwbGF5TW9kZSwgZWRpdG9yVmVyc2lvbiB9ID0gcHJvcHM7XG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPERpc3BsYXlNb2RlRW51bT4+KG51bGwpO1xuXG4gICAgY29uc3QgeyBvcHRpb25zOiBhZHZhbmNlZCwgZXJyb3I6IG9wdGlvbnNFcnJvciB9ID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gcGFyc2VBZHZhbmNlZE9wdGlvbnMoYWR2YW5jZWRPcHRpb25zKSxcbiAgICAgICAgW2FkdmFuY2VkT3B0aW9uc11cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiBidWlsZE9wdGlvbnMoYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgZGlzcGxheU1vZGUsIGVkaXRvclZlcnNpb24pLFxuICAgICAgICBbYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgZGlzcGxheU1vZGUsIGVkaXRvclZlcnNpb25dXG4gICAgKTtcblxuICAgIC8vIFRoZSBlZGl0b3IgaXMgcmVjcmVhdGVkIHdoZW4gaXRzIG9wdGlvbnMgY2hhbmdlLiBSZW1lbWJlciB3aGljaCBvcHRpb25zXG4gICAgLy8gdGhlIHJlYWR5IGVkaXRvciB3YXMgbWFkZSB3aXRoLCBzbyB0aGUgb2xkIG9uZSBpcyBmb3Jnb3R0ZW4gYXQgb25jZS5cbiAgICBjb25zdCBbcmVhZHksIHNldFJlYWR5XSA9IHVzZVN0YXRlPHsgZWRpdG9yOiBFZGl0b3I7IG9wdGlvbnM6IHR5cGVvZiBvcHRpb25zIH0gfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBlZGl0b3IgPSByZWFkeT8ub3B0aW9ucyA9PT0gb3B0aW9ucyA/IHJlYWR5LmVkaXRvciA6IG51bGw7XG5cbiAgICAvLyBBbiBlbXB0eSB2YWx1ZSBuZXZlciBjbGVhcnMgdGhlIGVkaXRvciAoc2VlIGJlbG93KSwgc28gaXQgaXMgbm8gZXJyb3IgZWl0aGVyLlxuICAgIGNvbnN0IGpzb25TdGF0dXMgPSBKU09OVGVtcGxhdGUuc3RhdHVzO1xuICAgIGNvbnN0IGpzb25WYWx1ZSA9IEpTT05UZW1wbGF0ZS52YWx1ZSA/PyBcIlwiO1xuICAgIGNvbnN0IHBhcnNlZCA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IChqc29uU3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYganNvblZhbHVlICE9PSBcIlwiID8gcGFyc2VEZXNpZ24oanNvblZhbHVlKSA6IHt9KSxcbiAgICAgICAgW2pzb25TdGF0dXMsIGpzb25WYWx1ZV1cbiAgICApO1xuICAgIGNvbnN0IGxvYWRFcnJvciA9IHBhcnNlZC5lcnJvcjtcblxuICAgIC8vIFVubGF5ZXIgY2FsbHMgaGFuZGxlcnMgcmVnaXN0ZXJlZCBvbmNlIHBlciBlZGl0b3IsIGFuZCB0aGUgc2F2ZS1vbi1jaGFuZ2VcbiAgICAvLyB0aW1lciBjYW4gZmlyZSBiZWZvcmUgdGhlIG5leHQgcmVuZGVyOyBib3RoIHJlYWQgdGhlIGxhdGVzdCB2YWx1ZXNcbiAgICAvLyB0aHJvdWdoIHRoZXNlIHJlZnMgaW5zdGVhZCBvZiB0aGUgcmVuZGVyIHRoZXkgd2VyZSBjcmVhdGVkIGluLlxuICAgIGNvbnN0IHByb3BzUmVmID0gdXNlUmVmKHByb3BzKTtcbiAgICBjb25zdCBvcHRpb25zUmVmID0gdXNlUmVmKG9wdGlvbnMpO1xuICAgIGNvbnN0IGxvYWRFcnJvclJlZiA9IHVzZVJlZihsb2FkRXJyb3IpO1xuICAgIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHByb3BzUmVmLmN1cnJlbnQgPSBwcm9wcztcbiAgICAgICAgb3B0aW9uc1JlZi5jdXJyZW50ID0gb3B0aW9ucztcbiAgICAgICAgbG9hZEVycm9yUmVmLmN1cnJlbnQgPSBsb2FkRXJyb3I7XG4gICAgfSk7XG5cbiAgICAvLyBUaGUgbGFzdCBkZXNpZ24gc3RyaW5nIHRoZSBlZGl0b3IgbG9hZGVkIG9yIHByb2R1Y2VkLiBXaGVuIHRoZSBhdHRyaWJ1dGVcbiAgICAvLyBjaGFuZ2VzIHRvIHRoaXMgdmFsdWUgKGJlY2F1c2Ugd2Ugd3JvdGUgaXQpIHRoZXJlIGlzIG5vdGhpbmcgdG8gcmVsb2FkLCBhbmRcbiAgICAvLyByZWxvYWRpbmcgd291bGQgdGhyb3cgYXdheSB0aGUgdXNlcidzIHVuZG8gaGlzdG9yeSBhbmQgc2VsZWN0aW9uLlxuICAgIGNvbnN0IHN5bmNlZEpzb24gPSB1c2VSZWY8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gICAgY29uc3Qgc2F2ZVRpbWVyID0gdXNlUmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIC8vIFRoZSBlZGl0b3IgaXMgZGVzdHJveWVkIG9uIHVubW91bnQ7IGEgcGVuZGluZyBzYXZlIHdvdWxkIGNhbGwgaW50byBpdC5cbiAgICB1c2VFZmZlY3QoKCkgPT4gKCkgPT4gY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KSwgW10pO1xuXG4gICAgY29uc3QgcmVhZE9ubHkgPSBKU09OVGVtcGxhdGUucmVhZE9ubHk7XG5cbiAgICBjb25zdCBleHBvcnREZXNpZ24gPSB1c2VDYWxsYmFjaygodW5sYXllcjogRWRpdG9yKTogUHJvbWlzZTxFeHBvcnRlZD4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB1bmxheWVyLmV4cG9ydEh0bWwoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGh0bWw6IGRhdGEuaHRtbCwganNvbjogSlNPTi5zdHJpbmdpZnkoZGF0YS5kZXNpZ24pIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcblxuICAgIC8qKiBXcml0ZSB0aGUgZGVzaWduIHRvIHRoZSBhdHRyaWJ1dGVzLCBpZiB0aGV5IGNhbiBiZSB3cml0dGVuLiBSZXR1cm5zIHdoZXRoZXIgaXQgZGlkLiAqL1xuICAgIGNvbnN0IHdyaXRlQXR0cmlidXRlcyA9IHVzZUNhbGxiYWNrKCh7IGh0bWwsIGpzb24gfTogRXhwb3J0ZWQpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgeyBKU09OVGVtcGxhdGU6IGpzb25BdHRyLCBIVE1MQm9keTogaHRtbEF0dHIgfSA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmICghY2FuV3JpdGVUZW1wbGF0ZShqc29uQXR0ciwgbG9hZEVycm9yUmVmLmN1cnJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0ganNvbjtcbiAgICAgICAganNvbkF0dHIuc2V0VmFsdWUoanNvbik7XG4gICAgICAgIGlmIChodG1sQXR0ciAmJiBodG1sQXR0ci5zdGF0dXMgPT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSAmJiAhaHRtbEF0dHIucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGh0bWxBdHRyLnNldFZhbHVlKGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IG9uUmVhZHkgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHVubGF5ZXI6IEVkaXRvcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpbWFnZVVwbG9hZFVybCB9ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgICAgIGlmIChwcm9wc1JlZi5jdXJyZW50LmltYWdlVXBsb2FkTW9kZSA9PT0gXCJlbmRwb2ludFwiICYmIGltYWdlVXBsb2FkVXJsKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJJbWFnZVVwbG9hZCh1bmxheWVyLCBpbWFnZVVwbG9hZFVybCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVubGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImRlc2lnbjp1cGRhdGVkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gcHJvcHNSZWYuY3VycmVudDtcbiAgICAgICAgICAgICAgICBjb25zdCB3cml0ZSA9IGN1cnJlbnQuc2F2ZU9uQ2hhbmdlICYmIGNhbldyaXRlVGVtcGxhdGUoY3VycmVudC5KU09OVGVtcGxhdGUsIGxvYWRFcnJvclJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoIXdyaXRlICYmICFjdXJyZW50Lm9uRGVzaWduQ2hhbmdlQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzYXZlVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBvcnREZXNpZ24odW5sYXllcikudGhlbihleHBvcnRlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXRlc3QgPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhdGVzdC5zYXZlT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUF0dHJpYnV0ZXMoZXhwb3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZShsYXRlc3Qub25EZXNpZ25DaGFuZ2VBY3Rpb24sIHsgaHRtbF9fOiBleHBvcnRlZC5odG1sLCBqc29uX186IGV4cG9ydGVkLmpzb24gfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIFNBVkVfT05fQ0hBTkdFX0RFTEFZX01TKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1bmxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkZXNpZ246bG9hZGVkXCIsICgpID0+IGV4ZWN1dGUocHJvcHNSZWYuY3VycmVudC5vbkRlc2lnbkxvYWRBY3Rpb24pKTtcblxuICAgICAgICAgICAgLy8gQSBuZXcgZWRpdG9yIHN0YXJ0cyBibGFuaywgc28gd2hhdGV2ZXIgaXQgaGFkIGxvYWRlZCBpcyBnb25lLlxuICAgICAgICAgICAgc3luY2VkSnNvbi5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc2V0UmVhZHkoeyBlZGl0b3I6IHVubGF5ZXIsIG9wdGlvbnM6IG9wdGlvbnNSZWYuY3VycmVudCB9KTtcbiAgICAgICAgICAgIGV4ZWN1dGUocHJvcHNSZWYuY3VycmVudC5vblJlYWR5QWN0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgW2V4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICAvLyBMb2FkIHRoZSBkZXNpZ24gZnJvbSB0aGUgYXR0cmlidXRlLCBvbmNlIHRoZSBlZGl0b3IgYW5kIHRoZSB2YWx1ZSBhcmUgcmVhZHkuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gQW4gZW1wdHkgdmFsdWUgbmV2ZXIgY2xlYXJzIHRoZSBlZGl0b3IuIEl0IGlzIHdoYXQgYSByb2xsYmFjayBvZiBhIG5ld1xuICAgICAgICAvLyBvYmplY3QgcHJvZHVjZXMsIGZvciBpbnN0YW5jZSB3aGVuIGEgcG9wLXVwIG9wZW5lZCBieSB0aGUgc2F2ZSBhY3Rpb24gaXNcbiAgICAgICAgLy8gY2xvc2VkLCBhbmQgY2xlYXJpbmcgd291bGQgdGhyb3cgYXdheSBldmVyeXRoaW5nIHRoZSB1c2VyIG1hZGUuXG4gICAgICAgIGlmICghZWRpdG9yIHx8IGpzb25TdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSB8fCBqc29uVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoanNvblZhbHVlID09PSBzeW5jZWRKc29uLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uVmFsdWU7XG4gICAgICAgIGlmIChwYXJzZWQuZGVzaWduKSB7XG4gICAgICAgICAgICBlZGl0b3IubG9hZERlc2lnbihwYXJzZWQuZGVzaWduIGFzIFBhcmFtZXRlcnM8RWRpdG9yW1wibG9hZERlc2lnblwiXT5bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUmVhY3RFbWFpbEVkaXRvcjogJHtwYXJzZWQuZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9LCBbZWRpdG9yLCBqc29uU3RhdHVzLCBqc29uVmFsdWUsIHBhcnNlZF0pO1xuXG4gICAgLy8gV2hldGhlciB0aGUgcHJldmlldyBpcyBzaG93aW5nOiBhbHdheXMgd2hlbiB0aGUgZWRpdG9yIGlzIHJlYWQtb25seSxcbiAgICAvLyBvdGhlcndpc2Ugd2hlbiB0aGUgdXNlciBzd2l0Y2hlZCBpdCBvbiBmb3IgdGhpcyBlZGl0b3IuXG4gICAgY29uc3QgW3ByZXZpZXdUb2dnbGVkRm9yLCBzZXRQcmV2aWV3VG9nZ2xlZEZvcl0gPSB1c2VTdGF0ZTxFZGl0b3IgfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBwcmV2aWV3aW5nID0gZWRpdG9yICE9PSBudWxsICYmIChyZWFkT25seSB8fCBwcmV2aWV3VG9nZ2xlZEZvciA9PT0gZWRpdG9yKTtcbiAgICBjb25zdCBwcmV2aWV3RGV2aWNlID0gcHJvcHMucHJldmlld0RldmljZSA/PyBcImRlc2t0b3BcIjtcblxuICAgIC8vIFNob3cgb3IgaGlkZSBVbmxheWVyJ3MgcHJldmlldyB0byBtYXRjaC4gQSBuZXcgZWRpdG9yIHN0YXJ0cyB3aXRob3V0IG9uZS5cbiAgICBjb25zdCBwcmV2aWV3U2hvd25JbiA9IHVzZVJlZjxFZGl0b3IgfCBudWxsPihudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2aWV3aW5nKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2hvd1ByZXZpZXcocHJldmlld0RldmljZSk7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd25Jbi5jdXJyZW50ID0gZWRpdG9yO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXZpZXdTaG93bkluLmN1cnJlbnQgPT09IGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmhpZGVQcmV2aWV3KCk7XG4gICAgICAgICAgICBwcmV2aWV3U2hvd25Jbi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIHByZXZpZXdpbmcsIHByZXZpZXdEZXZpY2VdKTtcblxuICAgIGNvbnN0IHRvZ2dsZVByZXZpZXcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldFByZXZpZXdUb2dnbGVkRm9yKHByZXZpZXdpbmcgPyBudWxsIDogZWRpdG9yKTtcbiAgICB9LCBbZWRpdG9yLCBwcmV2aWV3aW5nXSk7XG5cbiAgICBjb25zdCBsb2NhbGUgPSBwcm9wcy5sb2NhbGU/LnZhbHVlO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRMb2NhbGUobG9jYWxlIHx8IG51bGwpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbG9jYWxlXSk7XG5cbiAgICAvLyBNZW5kaXggaGFuZHMgb3V0IG5ldyBsaXN0IG9iamVjdHMgb24gcmUtcmVuZGVyczsgY29tcGFyZSBieSBjb250ZW50IHNvIHRoZVxuICAgIC8vIGVkaXRvciBpcyBvbmx5IHRvbGQgd2hlbiB0aGUgdGFncyByZWFsbHkgY2hhbmdlLlxuICAgIGNvbnN0IG1lcmdlVGFncyA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBidWlsZE1lcmdlVGFncyhwcm9wcy5tZXJnZVRhZ3MsIHByb3BzLm1lcmdlVGFnTmFtZSwgcHJvcHMubWVyZ2VUYWdWYWx1ZSwgcHJvcHMubWVyZ2VUYWdTYW1wbGUpID8/IG51bGxcbiAgICApO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbWVyZ2VUYWdzICE9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldE1lcmdlVGFncyhKU09OLnBhcnNlKG1lcmdlVGFncykpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbWVyZ2VUYWdzXSk7XG5cbiAgICBjb25zdCBydW5BY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAgICAgYXN5bmMgKGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPiwgd3JpdGU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBhd2FpdCBleHBvcnREZXNpZ24oZWRpdG9yKTtcbiAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGhlIHNhdmUgYWN0aW9uIGFmdGVyIGEgcmVmdXNlZCB3cml0ZSB3b3VsZCBjb21taXQgdGhlXG4gICAgICAgICAgICAvLyBvYmplY3QgYXMgaWYgdGhlIHRlbXBsYXRlIGhhZCBiZWVuIHN0b3JlZC5cbiAgICAgICAgICAgIGlmICh3cml0ZSAmJiAhd3JpdGVBdHRyaWJ1dGVzKGV4cG9ydGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4ZWN1dGUoYWN0aW9uLCB7IGh0bWxfXzogZXhwb3J0ZWQuaHRtbCwganNvbl9fOiBleHBvcnRlZC5qc29uIH0pO1xuICAgICAgICB9LFxuICAgICAgICBbZWRpdG9yLCBleHBvcnREZXNpZ24sIHdyaXRlQXR0cmlidXRlc11cbiAgICApO1xuXG4gICAgY29uc3QgZXJyb3IgPSBvcHRpb25zRXJyb3IgPz8gbG9hZEVycm9yO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCIsIHByb3BzLmNsYXNzKX0gc3R5bGU9e3Byb3BzLnN0eWxlfT5cbiAgICAgICAgICAgIDxUb29sYmFyXG4gICAgICAgICAgICAgICAgcmVhZHk9e2VkaXRvciAhPT0gbnVsbH1cbiAgICAgICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICAgICAgY2FuU2F2ZT17Y2FuV3JpdGVUZW1wbGF0ZShKU09OVGVtcGxhdGUsIGxvYWRFcnJvcil9XG4gICAgICAgICAgICAgICAgcHJldmlldz17XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmlzU2hvd1ByZXZpZXdcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJldmlld2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJvcHMuaGlkZVByZXZpZXdDYXB0aW9uPy52YWx1ZSB8fCBcIkhpZGUgUHJldmlld1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5zaG93UHJldmlld0NhcHRpb24/LnZhbHVlIHx8IFwiU2hvdyBQcmV2aWV3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aWV3aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdG9nZ2xlUHJldmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleHBvcnRIdG1sPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93RXhwb3J0SHRtbCAmJiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLmV4cG9ydEh0bWxDYXB0aW9uPy52YWx1ZSB8fCBcIkV4cG9ydCBIVE1MXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLmV4cG9ydEhUTUxBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuZXhwb3J0SFRNTEFjdGlvbiEsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGU9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dTYXZlVGVtcGxhdGUgJiYgcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLnNhdmVUZW1wbGF0ZUNhcHRpb24/LnZhbHVlIHx8IFwiU2F2ZSBUZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uISwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxuICAgICAgICAgICAgICAgIG1pbkhlaWdodD17cHJvcHMuZWRpdG9ySGVpZ2h0IHx8IFwiNzAwcHhcIn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgICAgICAgIHNjcmlwdFVybD17cHJvcHMuc2NyaXB0VXJsPy50cmltKCkgfHwgdW5kZWZpbmVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRWRpdG9yV3JhcHBlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlclwiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RFbWFpbEVkaXRvcihwcm9wczogUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPEVkaXRvcldyYXBwZXIgey4uLnByb3BzfSAvPjtcbn1cbiJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJfX3VubGF5ZXJfbGFzdEVkaXRvcklkIiwidXNlQ291bnRlckVkaXRvcklkIiwidXNlTWVtbyIsInVzZUdlbmVyYXRlZEVkaXRvcklkIiwiUmVhY3QiLCJ1c2VJZCIsInJlcGxhY2UiLCJFbWFpbEVkaXRvcklubmVyIiwicHJvcHMiLCJyZWYiLCJfYSIsIl9iIiwiX2MiLCJfZCIsIl9lIiwiX2YiLCJfZyIsIl9oIiwiX2kiLCJvbkxvYWQiLCJvblJlYWR5Iiwic2NyaXB0VXJsIiwibWluSGVpZ2h0Iiwic3R5bGUiLCJlZGl0b3IiLCJzZXRFZGl0b3IiLCJ1c2VTdGF0ZSIsImhhc0xvYWRlZEVtYmVkU2NyaXB0Iiwic2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQiLCJnZW5lcmF0ZWRJZCIsImVkaXRvcklkIiwib3B0aW9ucyIsImFwcGVhcmFuY2UiLCJkaXNwbGF5TW9kZSIsImxvY2FsZSIsInByb2plY3RJZCIsInRvb2xzIiwiaWQiLCJzb3VyY2UiLCJuYW1lIiwidmVyc2lvbiIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJlZGl0b3JSZWYiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJjdXJyZW50IiwiX2EyIiwiZGVzdHJveSIsImxvYWRTY3JpcHQiLCJ1bmxheWVyIiwiY3JlYXRlRWRpdG9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1ldGhvZFByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInByb3BOYW1lIiwidGVzdCIsImZvckVhY2giLCJtZXRob2RQcm9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImpvaW4iLCJjcmVhdGVFbGVtZW50IiwiZmxleCIsImRpc3BsYXkiLCJFbWFpbEVkaXRvciIsImZvcndhcmRSZWYiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsImFwcGVuZENsYXNzIiwicGFyc2VWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImFwcGx5IiwidG9TdHJpbmciLCJwcm90b3R5cGUiLCJpbmNsdWRlcyIsImtleSIsImNhbGwiLCJ2YWx1ZSIsIm5ld0NsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJfanN4IiwiX2pzeHMiLCJ1c2VMYXlvdXRFZmZlY3QiLCJ1c2VDYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBY0EsSUFBTUEsR0FBQSxHQUNKLE9BQU9DLE1BQUEsS0FBVyxXQUFBLEdBQWM7RUFBRUMsRUFBQUEsc0JBQUEsRUFBd0I7RUFBRSxDQUFBLEdBQUlELE1BQUE7RUFDbEVELEdBQUEsQ0FBSUUsc0JBQUEsR0FBeUJGLEdBQUEsQ0FBSUUsc0JBQUEsSUFBMEIsQ0FBQTtFQU0zRCxJQUFNQyxrQkFBQSxHQUFxQkEsTUFDekJDLGFBQUEsQ0FBUSxNQUFNLENBQUEsT0FBQSxFQUFVLEVBQUVKLEdBQUEsQ0FBSUUsc0JBQXNCLElBQUksRUFBRSxDQUFBO0VBYzVELElBQU1HLG9CQUFBLEdBQ0osT0FBT0MsS0FBQSxDQUFNQyxLQUFBLEtBQVUsVUFBQTtFQUFBO0VBRW5CLE1BQU0sQ0FBQSxPQUFBLEVBQVVELEtBQUEsQ0FBTUMsS0FBQSxFQUFNLENBQUVDLE9BQUEsQ0FBUSxJQUFBLEVBQU0sRUFBRSxDQUFDLENBQUEsQ0FBQSxHQUMvQ0wsa0JBQUE7RUFHTixTQUFTTSxnQkFBQUEsQ0FHUEMsS0FBQSxFQUNBQyxHQUFBLEVBQ0E7RUFqREYsRUFBQSxJQUFBQyxFQUFBLEVBQUFDLEVBQUEsRUFBQUMsRUFBQSxFQUFBQyxFQUFBLEVBQUFDLEVBQUEsRUFBQUMsRUFBQSxFQUFBQyxFQUFBLEVBQUFDLEVBQUEsRUFBQUMsRUFBQTtJQWtERSxNQUFNO01BQUVDLE1BQUE7TUFBUUMsT0FBQTtNQUFTQyxTQUFBO0VBQVdDLElBQUFBLFNBQUEsR0FBWSxHQUFBO0VBQUtDLElBQUFBLEtBQUEsR0FBUTtFQUFHLEdBQUEsR0FBSWYsS0FBQTtFQUVwRSxFQUFBLE1BQU0sQ0FBQ2dCLE1BQUEsRUFBUUMsU0FBUyxDQUFBLEdBQUlDLGNBQUEsQ0FDMUIsSUFDRixDQUFBO0VBRUEsRUFBQSxNQUFNLENBQUNDLG9CQUFBLEVBQXNCQyx1QkFBdUIsQ0FBQSxHQUFJRixjQUFBLENBQVMsS0FBSyxDQUFBO0lBSXRFLE1BQU1HLFdBQUEsR0FBYzFCLG9CQUFBLEVBQXFCO0VBQ3pDLEVBQUEsTUFBTTJCLFFBQUEsR0FBV3RCLEtBQUEsQ0FBTXNCLFFBQUEsSUFBWUQsV0FBQTtFQUVuQyxFQUFBLE1BQU1FLE9BQUEsR0FBVTtFQUNkLElBQUEsSUFBSXZCLEtBQUEsQ0FBTXVCLE9BQUEsSUFBVyxFQUFDLENBQUE7RUFDdEJDLElBQUFBLFVBQUEsR0FBWXJCLEVBQUEsR0FBQUgsS0FBQSxDQUFNd0IsVUFBQSxLQUFOLElBQUEsR0FBQXJCLEVBQUEsSUFBb0JELEVBQUEsR0FBQUYsS0FBQSxDQUFNdUIsT0FBQSxLQUFOLElBQUEsR0FBQSxNQUFBLEdBQUFyQixFQUFBLENBQWVzQixVQUFBO0VBQy9DQyxJQUFBQSxXQUFBLEdBQ0V6QixLQUFBLElBQUEsSUFBQSxHQUFBLE1BQUEsR0FBQUEsS0FBQSxDQUFPeUIsV0FBQSxNQUFBLENBQWVyQixFQUFBLEdBQUFKLEtBQUEsQ0FBTXVCLE9BQUEsS0FBTixnQkFBQW5CLEVBQUEsQ0FBZXFCLFdBQUEsQ0FBQSxJQUFnQixPQUFBO0VBQ3ZEQyxJQUFBQSxNQUFBLEdBQVFwQixFQUFBLEdBQUFOLEtBQUEsQ0FBTTBCLE1BQUEsS0FBTixJQUFBLEdBQUFwQixFQUFBLElBQWdCRCxFQUFBLEdBQUFMLEtBQUEsQ0FBTXVCLE9BQUEsS0FBTixJQUFBLEdBQUEsTUFBQSxHQUFBbEIsRUFBQSxDQUFlcUIsTUFBQTtFQUN2Q0MsSUFBQUEsU0FBQSxHQUFXbkIsRUFBQSxHQUFBUixLQUFBLENBQU0yQixTQUFBLEtBQU4sSUFBQSxHQUFBbkIsRUFBQSxJQUFtQkQsRUFBQSxHQUFBUCxLQUFBLENBQU11QixPQUFBLEtBQU4sSUFBQSxHQUFBLE1BQUEsR0FBQWhCLEVBQUEsQ0FBZW9CLFNBQUE7RUFDN0NDLElBQUFBLEtBQUEsR0FBT2xCLEVBQUEsR0FBQVYsS0FBQSxDQUFNNEIsS0FBQSxLQUFOLElBQUEsR0FBQWxCLEVBQUEsSUFBZUQsRUFBQSxHQUFBVCxLQUFBLENBQU11QixPQUFBLEtBQU4sSUFBQSxHQUFBLE1BQUEsR0FBQWQsRUFBQSxDQUFlbUIsS0FBQTtFQUVyQ0MsSUFBQUEsRUFBQSxFQUFJUCxRQUFBO0VBQ0pRLElBQUFBLE1BQUEsRUFBUTtRQUNOQyxJQUFBO0VBQ0FDLE1BQUFBO0VBQ0Y7RUFDRixHQUFBO0lBRUFDLHlCQUFBLENBQ0VoQyxHQUFBLEVBQ0EsT0FBTztFQUNMZSxJQUFBQTtLQUNGLENBQUEsRUFDQSxDQUFDQSxNQUFNLENBQ1QsQ0FBQTtFQUlBLEVBQUEsTUFBTWtCLFNBQUEsR0FBWUMsWUFBQSxDQUFPbkIsTUFBTSxDQUFBO0VBQy9Cb0IsRUFBQUEsZUFBQSxDQUFVLE1BQU07TUFDZEYsU0FBQSxDQUFVRyxPQUFBLEdBQVVyQixNQUFBO0lBQ3RCLENBQUEsRUFBRyxDQUFDQSxNQUFNLENBQUMsQ0FBQTtFQUVYb0IsRUFBQUEsZUFBQSxDQUFVLE1BQU07RUFDZCxJQUFBLE9BQU8sTUFBTTtFQS9GakIsTUFBQSxJQUFBRSxHQUFBO1FBZ0dNLENBQUFBLEdBQUEsR0FBQUosU0FBQSxDQUFVRyxPQUFBLEtBQVYsSUFBQSxHQUFBLE1BQUEsR0FBQUMsR0FBQSxDQUFtQkMsT0FBQSxFQUFBO0VBQ3JCLElBQUEsQ0FBQTtFQUNGLEVBQUEsQ0FBQSxFQUFHLEVBQUUsQ0FBQTtFQUVMSCxFQUFBQSxlQUFBLENBQVUsTUFBTTtFQUNkaEIsSUFBQUEsdUJBQUEsQ0FBd0IsS0FBSyxDQUFBO0VBQzdCb0IsSUFBQUEsVUFBQSxDQUFXLE1BQU1wQix1QkFBQSxDQUF3QixJQUFJLEdBQUdQLFNBQVMsQ0FBQTtJQUMzRCxDQUFBLEVBQUcsQ0FBQ0EsU0FBUyxDQUFDLENBQUE7RUFFZHVCLEVBQUFBLGVBQUEsQ0FBVSxNQUFNO01BQ2QsSUFBSSxDQUFDakIsb0JBQUEsRUFBc0I7TUFDM0JILE1BQUEsSUFBQSxJQUFBLEdBQUEsTUFBQSxHQUFBQSxNQUFBLENBQVF1QixPQUFBLEVBQUE7RUFDUnRCLElBQUFBLFNBQUEsQ0FBVXdCLE9BQUEsQ0FBUUMsWUFBQSxDQUFhbkIsT0FBTyxDQUFDLENBQUE7SUFDekMsQ0FBQSxFQUFHLENBQUNvQixJQUFBLENBQUtDLFNBQUEsQ0FBVXJCLE9BQU8sQ0FBQSxFQUFHSixvQkFBb0IsQ0FBQyxDQUFBO0VBRWxELEVBQUEsTUFBTTBCLFdBQUEsR0FBY0MsTUFBQSxDQUFPQyxJQUFBLENBQUsvQyxLQUFLLENBQUEsQ0FBRWdELE1BQUEsQ0FBUUMsUUFBQSxJQUM3QyxLQUFBLENBQU1DLElBQUEsQ0FBS0QsUUFBUSxDQUNyQixDQUFBO0VBQ0FiLEVBQUFBLGVBQUEsQ0FBVSxNQUFNO01BQ2QsSUFBSSxDQUFDcEIsTUFBQSxFQUFRO01BRWJMLE1BQUEsSUFBQSxJQUFBLEdBQUEsTUFBQSxHQUFBQSxNQUFBLENBQVNLLE1BQUEsQ0FBQTtFQUdUNkIsSUFBQUEsV0FBQSxDQUFZTSxPQUFBLENBQVNDLFVBQUEsSUFBZTtFQUNsQyxNQUFBLElBQ0UsTUFBTUYsSUFBQSxDQUFLRSxVQUFVLENBQUEsSUFDckJBLFVBQUEsS0FBZSxRQUFBLElBQ2ZBLFVBQUEsS0FBZSxhQUNmLE9BQU9wRCxLQUFBLENBQU1vRCxVQUFVLE1BQU0sVUFBQSxFQUM3QjtVQUNBcEMsTUFBQSxDQUFPcUMsZ0JBQUEsQ0FBaUJELFVBQUEsRUFBWXBELEtBQUEsQ0FBTW9ELFVBQVUsQ0FBQyxDQUFBO0VBQ3ZELE1BQUE7TUFDRixDQUFDLENBQUE7RUFFRCxJQUFBLElBQUl4QyxPQUFBLEVBQVM7RUFDWEksTUFBQUEsTUFBQSxDQUFPcUMsZ0JBQUEsQ0FBaUIsY0FBQSxFQUFnQixNQUFNO0VBQzVDekMsUUFBQUEsT0FBQSxDQUFRSSxNQUFNLENBQUE7UUFDaEIsQ0FBQyxDQUFBO0VBQ0gsSUFBQTtJQUNGLENBQUEsRUFBRyxDQUFDQSxNQUFBLEVBQVE2QixXQUFBLENBQVlTLElBQUEsQ0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBRWxDLEVBQUEsc0JBQ0UxRCxLQUFBLENBQUEyRCxhQUFBLENBQUMsS0FBQSxFQUFBO0VBQ0N4QyxJQUFBQSxLQUFBLEVBQU87RUFDTHlDLE1BQUFBLElBQUEsRUFBTSxDQUFBO0VBQ05DLE1BQUFBLE9BQUEsRUFBUyxNQUFBO0VBQ1QzQyxNQUFBQTtFQUNGO0VBQUEsR0FBQSxpQkFFQWxCLEtBQUEsQ0FBQTJELGFBQUEsQ0FBQyxLQUFBLEVBQUE7RUFBSTFCLElBQUFBLEVBQUEsRUFBSVAsUUFBQTtFQUFVUCxJQUFBQSxLQUFBLEVBQU87RUFBRSxNQUFBLEdBQUdBLEtBQUE7RUFBT3lDLE1BQUFBLElBQUEsRUFBTTtFQUFFO0VBQUEsR0FBRyxDQUNuRCxDQUFBO0VBRUo7RUFFTyxJQUFNRSxXQUFBLEdBQWM5RCxLQUFBLENBQU0rRCxVQUFBLENBQVc1RCxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUNsSjVEOztFQUVDLEVBQUEsQ0FBQSxZQUFZOztFQUdaLElBQUEsSUFBSTZELE1BQU0sR0FBRyxFQUFFLENBQUNDLGNBQWM7TUFFOUIsU0FBU0MsVUFBVUEsR0FBSTtRQUN0QixJQUFJQyxPQUFPLEdBQUcsRUFBRTtFQUVoQixNQUFBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQU0sRUFBRUYsQ0FBQyxFQUFFLEVBQUU7RUFDMUMsUUFBQSxJQUFJRyxHQUFHLEdBQUdGLFNBQVMsQ0FBQ0QsQ0FBQyxDQUFDO1VBQ3RCLElBQUlHLEdBQUcsRUFBRTtZQUNSSixPQUFPLEdBQUdLLFdBQVcsQ0FBQ0wsT0FBTyxFQUFFTSxVQUFVLENBQUNGLEdBQUcsQ0FBQyxDQUFDO0VBQ2hELFFBQUE7RUFDRCxNQUFBO0VBRUEsTUFBQSxPQUFPSixPQUFPO0VBQ2YsSUFBQTtNQUVBLFNBQVNNLFVBQVVBLENBQUVGLEdBQUcsRUFBRTtRQUN6QixJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsRUFBRTtFQUN2RCxRQUFBLE9BQU9BLEdBQUc7RUFDWCxNQUFBO0VBRUEsTUFBQSxJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLEVBQUU7RUFDNUIsUUFBQSxPQUFPLEVBQUU7RUFDVixNQUFBO0VBRUEsTUFBQSxJQUFJRyxLQUFLLENBQUNDLE9BQU8sQ0FBQ0osR0FBRyxDQUFDLEVBQUU7VUFDdkIsT0FBT0wsVUFBVSxDQUFDVSxLQUFLLENBQUMsSUFBSSxFQUFFTCxHQUFHLENBQUM7RUFDbkMsTUFBQTtRQUVBLElBQUlBLEdBQUcsQ0FBQ00sUUFBUSxLQUFLM0IsTUFBTSxDQUFDNEIsU0FBUyxDQUFDRCxRQUFRLElBQUksQ0FBQ04sR0FBRyxDQUFDTSxRQUFRLENBQUNBLFFBQVEsRUFBRSxDQUFDRSxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7RUFDckcsUUFBQSxPQUFPUixHQUFHLENBQUNNLFFBQVEsRUFBRTtFQUN0QixNQUFBO1FBRUEsSUFBSVYsT0FBTyxHQUFHLEVBQUU7RUFFaEIsTUFBQSxLQUFLLElBQUlhLEdBQUcsSUFBSVQsR0FBRyxFQUFFO0VBQ3BCLFFBQUEsSUFBSVAsTUFBTSxDQUFDaUIsSUFBSSxDQUFDVixHQUFHLEVBQUVTLEdBQUcsQ0FBQyxJQUFJVCxHQUFHLENBQUNTLEdBQUcsQ0FBQyxFQUFFO0VBQ3RDYixVQUFBQSxPQUFPLEdBQUdLLFdBQVcsQ0FBQ0wsT0FBTyxFQUFFYSxHQUFHLENBQUM7RUFDcEMsUUFBQTtFQUNELE1BQUE7RUFFQSxNQUFBLE9BQU9iLE9BQU87RUFDZixJQUFBO0VBRUEsSUFBQSxTQUFTSyxXQUFXQSxDQUFFVSxLQUFLLEVBQUVDLFFBQVEsRUFBRTtRQUN0QyxJQUFJLENBQUNBLFFBQVEsRUFBRTtFQUNkLFFBQUEsT0FBT0QsS0FBSztFQUNiLE1BQUE7UUFFQSxJQUFJQSxLQUFLLEVBQUU7RUFDVixRQUFBLE9BQU9BLEtBQUssR0FBRyxHQUFHLEdBQUdDLFFBQVE7RUFDOUIsTUFBQTtRQUVBLE9BQU9ELEtBQUssR0FBR0MsUUFBUTtFQUN4QixJQUFBO01BRUEsSUFBcUNDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFO1FBQ3BEbkIsVUFBVSxDQUFDb0IsT0FBTyxHQUFHcEIsVUFBVTtRQUMvQmtCLGlCQUFpQmxCLFVBQVU7RUFDNUIsSUFBQSxDQUFDLE1BS007UUFDTnZFLE1BQU0sQ0FBQ3VFLFVBQVUsR0FBR0EsVUFBVTtFQUMvQixJQUFBO0VBQ0QsRUFBQSxDQUFDLEdBQUUsQ0FBQTs7Ozs7Ozs7RUN0RUg7OztFQUdHO0VBQ0csU0FBVSxvQkFBb0IsQ0FBQyxJQUF3QixFQUFBO01BQ3pELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7RUFDdkIsUUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtNQUMxQjtFQUNBLElBQUEsSUFBSTtVQUNBLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0VBQy9CLFFBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtjQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUseUNBQXlDLEVBQUU7VUFDNUU7RUFDQSxRQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO01BQzlCO01BQUUsT0FBTyxDQUFDLEVBQUU7RUFDUixRQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFBLHFDQUFBLEVBQXlDLENBQVcsQ0FBQyxPQUFPLENBQUEsQ0FBRSxFQUFFO01BQ2pHO0VBQ0o7RUFFQTs7OztFQUlHO1dBQ2EsWUFBWSxDQUN4QixRQUF1QixFQUN2QixTQUFpQixFQUNqQixLQUFnQixFQUNoQixlQUFvQyxFQUNwQyxXQUFBLEdBQStCLE9BQU8sRUFDdEMsT0FBTyxHQUFHLEVBQUUsRUFBQTs7O0VBSVosSUFBQSxNQUFNLE9BQU8sR0FBa0I7VUFDM0IsV0FBVztVQUNYLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUN0RCxRQUFBLEdBQUcsUUFBUTtVQUNYLFVBQVUsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLO09BQzlDO0VBQ0QsSUFBQSxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7RUFDZixRQUFBLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUztNQUNqQztFQUNBLElBQUEsSUFBSSxlQUFlLEtBQUssVUFBVSxFQUFFO0VBQ2hDLFFBQUEsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO01BQ25FO0VBQ0EsSUFBQSxPQUFPLE9BQU87RUFDbEI7RUFJTSxTQUFVLFdBQVcsQ0FBQyxJQUFZLEVBQUE7RUFDcEMsSUFBQSxJQUFJO1VBQ0EsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7VUFDL0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7RUFDdkMsWUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLDBDQUEwQyxFQUFFO1VBQ2hFO1VBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRTtNQUNyQjtNQUFFLE9BQU8sQ0FBQyxFQUFFO1VBQ1IsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFBLHNDQUFBLEVBQTBDLENBQVcsQ0FBQyxPQUFPLENBQUEsQ0FBRSxFQUFFO01BQ3JGO0VBQ0o7O0VDekRBOzs7RUFHRztFQUNILFNBQVMsV0FBVyxHQUFBO0VBQ2hCLElBQUEsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQztFQUMxRCxJQUFBLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7RUFDckU7RUFFQTs7OztFQUlHO0VBQ0csU0FBVSxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBQTtFQUNqRSxJQUFBLE1BQU0sTUFBTSxHQUFrQixDQUFDLElBQTZCLEVBQUUsSUFBOEIsS0FBSTtVQUM1RixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO0VBQ1IsWUFBQSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Y0FDckI7VUFDSjtFQUNBLFFBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7RUFDM0IsUUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7RUFFMUIsUUFBQSxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7VUFDdEIsS0FBSyxDQUFDLFNBQVMsRUFBRTtFQUNiLFlBQUEsTUFBTSxFQUFFLE1BQU07RUFDZCxZQUFBLFdBQVcsRUFBRSxhQUFhO2NBQzFCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxHQUFHLFdBQVcsRUFBRSxFQUFFO2NBQ3pEO1dBQ0g7ZUFDSSxJQUFJLENBQUMsUUFBUSxJQUFHO0VBQ2IsWUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtrQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLENBQUEsd0JBQUEsRUFBMkIsUUFBUSxDQUFDLE1BQU0sQ0FBQSxDQUFFLENBQUM7Y0FDakU7RUFDQSxZQUFBLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRTtFQUMxQixRQUFBLENBQUM7RUFDQSxhQUFBLElBQUksQ0FBQyxDQUFDLElBQXVCLEtBQUk7RUFDOUIsWUFBQSxJQUFJLE9BQU8sSUFBSSxFQUFFLEdBQUcsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0VBQzVDLGdCQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUM7Y0FDbkQ7RUFDQSxZQUFBLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUMxQyxRQUFBLENBQUM7RUFDQSxhQUFBLEtBQUssQ0FBQyxDQUFDLENBQVEsS0FBSTtFQUNoQixZQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEVBQUUsQ0FBQyxDQUFDO2NBQzFELElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDOUIsUUFBQSxDQUFDLENBQUM7RUFDVixJQUFBLENBQUM7RUFDRCxJQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0VBQzVDOztFQ3ZEQTs7O0VBR0c7RUFDRyxTQUFVLGNBQWMsQ0FDMUIsTUFBNkIsRUFDN0IsSUFBNkMsRUFDN0MsS0FBOEMsRUFDOUMsTUFBK0MsRUFBQTtNQUUvQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0VBQzVCLFFBQUEsT0FBTyxTQUFTO01BQ3BCO01BQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFBLFdBQUEsZ0NBQThCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtFQUMxRCxRQUFBLE9BQU8sU0FBUztNQUNwQjtNQUNBLE1BQU0sSUFBSSxHQUFjLEVBQUU7TUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFJO1VBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSztVQUNwQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUs7RUFDdEMsUUFBQSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFO2NBQ3ZCO1VBQ0o7VUFDQSxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUs7RUFDekMsUUFBQSxJQUFJLENBQUMsQ0FBQSxJQUFBLEVBQU8sS0FBSyxDQUFBLENBQUUsQ0FBQyxHQUFHO0VBQ25CLGNBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVM7Z0JBQ25ELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0VBQzVDLElBQUEsQ0FBQyxDQUFDO0VBQ0YsSUFBQSxPQUFPLElBQUk7RUFDZjs7RUMvQkE7Ozs7Ozs7RUFPRztFQUNHLFNBQVUsZ0JBQWdCLENBQUMsU0FBZ0MsRUFBRSxTQUE2QixFQUFBO0VBQzVGLElBQUEsT0FBTyxTQUFTLENBQUMsTUFBTSxLQUFBLFdBQUEsZ0NBQThCLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVM7RUFDMUY7O0VDc0JBLFNBQVMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBZ0QsRUFBQTtFQUNwRixJQUFBLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVztFQUN0QyxJQUFBLFFBQ0lxQixjQUFBLENBQUEsUUFBQSxFQUFBLEVBQ0ksSUFBSSxFQUFDLFFBQVEsRUFDYixTQUFTLEVBQUMsMkJBQTJCLEVBQ3JDLFFBQVEsRUFBRSxRQUFRLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUEsV0FBQSxFQUM1QyxJQUFJLEVBQ2YsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLFlBRXRCLE1BQU0sQ0FBQyxPQUFPLEVBQUEsQ0FDVjtFQUVqQjtFQUVNLFNBQVUsT0FBTyxDQUFDLEVBQ3BCLEtBQUssRUFDTCxRQUFRLEVBQ1IsT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUNELEVBQUE7OztFQUdYLElBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxJQUFJLENBQUMsUUFBUTtFQUN4QyxJQUFBLE1BQU0sUUFBUSxHQUFHLFlBQVksSUFBSSxDQUFDLFFBQVE7TUFDMUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFFBQVEsRUFBRTtFQUMxQyxRQUFBLE9BQU8sSUFBSTtNQUNmO0VBQ0EsSUFBQSxRQUNJQyxlQUFBLENBQUEsS0FBQSxFQUFBLEVBQUssU0FBUyxFQUFDLHdEQUF3RCxFQUFBLFFBQUEsRUFBQSxDQUNsRSxXQUFXLEtBQ1JELDJCQUNJLElBQUksRUFBQyxRQUFRLEVBQ2IsU0FBUyxFQUFDLDJCQUEyQixFQUNyQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUEsY0FBQSxFQUNGLE9BQU8sQ0FBQyxVQUFVLEVBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFBLFFBQUEsRUFFdkIsT0FBTyxDQUFDLE9BQU8sRUFBQSxDQUNYLENBQ1osRUFDQSxVQUFVLElBQUlBLGNBQUEsQ0FBQyxZQUFZLEVBQUEsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssR0FBSSxFQUNwRSxRQUFRLElBQUlBLGNBQUEsQ0FBQyxZQUFZLEVBQUEsRUFBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBQSxDQUFJLENBQUEsRUFBQSxDQUMvRTtFQUVkOztFQ3JFQTtFQUNBLE1BQU0sdUJBQXVCLEdBQUcsR0FBRztFQU9uQyxTQUFTLE9BQU8sQ0FBQyxNQUFvQyxFQUFFLElBQXlCLEVBQUE7TUFDNUUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7RUFDcEQsUUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztNQUN4QjtFQUNKO0VBRU0sU0FBVSxhQUFhLENBQUMsS0FBcUMsRUFBQTtFQUMvRCxJQUFBLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsR0FBRyxLQUFLO0VBQzlHLElBQUEsTUFBTSxjQUFjLEdBQUdoRCxZQUFNLENBQTZCLElBQUksQ0FBQztNQUUvRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEdBQUd6QyxhQUFPLENBQ3RELE1BQU0sb0JBQW9CLENBQUMsZUFBZSxDQUFDLEVBQzNDLENBQUMsZUFBZSxDQUFDLENBQ3BCO0VBQ0QsSUFBQSxNQUFNLE9BQU8sR0FBR0EsYUFBTyxDQUNuQixNQUFNLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxFQUMzRixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQzVFOzs7TUFJRCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHd0IsY0FBUSxDQUFxRCxJQUFJLENBQUM7RUFDNUYsSUFBQSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsT0FBTyxLQUFLLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUk7O0VBRy9ELElBQUEsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU07RUFDdEMsSUFBQSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxJQUFJLEVBQUU7RUFDMUMsSUFBQSxNQUFNLE1BQU0sR0FBR3hCLGFBQU8sQ0FDbEIsT0FBTyxVQUFVLEtBQUEsV0FBQSxnQ0FBOEIsU0FBUyxLQUFLLEVBQUUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQzlGLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUMxQjtFQUNELElBQUEsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUs7Ozs7RUFLOUIsSUFBQSxNQUFNLFFBQVEsR0FBR3lDLFlBQU0sQ0FBQyxLQUFLLENBQUM7RUFDOUIsSUFBQSxNQUFNLFVBQVUsR0FBR0EsWUFBTSxDQUFDLE9BQU8sQ0FBQztFQUNsQyxJQUFBLE1BQU0sWUFBWSxHQUFHQSxZQUFNLENBQUMsU0FBUyxDQUFDO01BQ3RDa0QscUJBQWUsQ0FBQyxNQUFLO0VBQ2pCLFFBQUEsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLO0VBQ3hCLFFBQUEsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPO0VBQzVCLFFBQUEsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTO0VBQ3BDLElBQUEsQ0FBQyxDQUFDOzs7O0VBS0YsSUFBQSxNQUFNLFVBQVUsR0FBR2xELFlBQU0sQ0FBcUIsU0FBUyxDQUFDO0VBRXhELElBQUEsTUFBTSxTQUFTLEdBQUdBLFlBQU0sQ0FBNEMsU0FBUyxDQUFDOztFQUU5RSxJQUFBQyxlQUFTLENBQUMsTUFBTSxNQUFNLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBRTFELElBQUEsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVE7RUFFdEMsSUFBQSxNQUFNLFlBQVksR0FBR2tELGlCQUFXLENBQUMsQ0FBQyxPQUFlLEtBQXVCO0VBQ3BFLFFBQUEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUc7RUFDekIsWUFBQSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksSUFBRztrQkFDdEIsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7RUFDbkUsWUFBQSxDQUFDLENBQUM7RUFDTixRQUFBLENBQUMsQ0FBQztNQUNOLENBQUMsRUFBRSxFQUFFLENBQUM7O01BR04sTUFBTSxlQUFlLEdBQUdBLGlCQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQVksS0FBYTtFQUN0RSxRQUFBLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTztVQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtFQUNuRCxZQUFBLE9BQU8sS0FBSztVQUNoQjtFQUNBLFFBQUEsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJO0VBQ3pCLFFBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDdkIsUUFBQSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFBLFdBQUEsZ0NBQThCLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtFQUM3RSxZQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1VBQzNCO0VBQ0EsUUFBQSxPQUFPLElBQUk7TUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDO0VBRU4sSUFBQSxNQUFNLE9BQU8sR0FBR0EsaUJBQVcsQ0FDdkIsQ0FBQyxPQUFlLEtBQUk7RUFDaEIsUUFBQSxNQUFNLEVBQUUsY0FBYyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU87VUFDM0MsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxVQUFVLElBQUksY0FBYyxFQUFFO0VBQ25FLFlBQUEsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztVQUNoRDtFQUVBLFFBQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE1BQUs7RUFDNUMsWUFBQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTztFQUNoQyxZQUFBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDO2NBQ2xHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUU7a0JBQ3pDO2NBQ0o7RUFDQSxZQUFBLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0VBQy9CLFlBQUEsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBSztrQkFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUc7RUFDbEMsb0JBQUEsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU87RUFDL0Isb0JBQUEsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFOzBCQUNyQixlQUFlLENBQUMsUUFBUSxDQUFDO3NCQUM3QjtFQUNBLG9CQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0VBQzFGLGdCQUFBLENBQUMsQ0FBQztjQUNOLENBQUMsRUFBRSx1QkFBdUIsQ0FBQztFQUMvQixRQUFBLENBQUMsQ0FBQztFQUVGLFFBQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0VBRzdGLFFBQUEsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTO0VBQzlCLFFBQUEsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQzFELFFBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0VBQzNDLElBQUEsQ0FBQyxFQUNELENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUNsQzs7TUFHRGxELGVBQVMsQ0FBQyxNQUFLOzs7O1VBSVgsSUFBSSxDQUFDLE1BQU0sSUFBSSxVQUFVLEtBQUEsV0FBQSxnQ0FBOEIsU0FBUyxLQUFLLEVBQUUsRUFBRTtjQUNyRTtVQUNKO0VBQ0EsUUFBQSxJQUFJLFNBQVMsS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFFO2NBQ2xDO1VBQ0o7RUFDQSxRQUFBLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUztFQUM5QixRQUFBLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtFQUNmLFlBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBNkMsQ0FBQztVQUMzRTtlQUFPO2NBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBLGtCQUFBLEVBQXFCLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBRSxDQUFDO1VBQ3REO01BQ0osQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7OztNQUkzQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsR0FBR2xCLGNBQVEsQ0FBZ0IsSUFBSSxDQUFDO0VBQy9FLElBQUEsTUFBTSxVQUFVLEdBQUcsTUFBTSxLQUFLLElBQUksS0FBSyxRQUFRLElBQUksaUJBQWlCLEtBQUssTUFBTSxDQUFDO0VBQ2hGLElBQUEsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxTQUFTOztFQUd0RCxJQUFBLE1BQU0sY0FBYyxHQUFHaUIsWUFBTSxDQUFnQixJQUFJLENBQUM7TUFDbERDLGVBQVMsQ0FBQyxNQUFLO1VBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRTtjQUNUO1VBQ0o7VUFDQSxJQUFJLFVBQVUsRUFBRTtFQUNaLFlBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7RUFDakMsWUFBQSxjQUFjLENBQUMsT0FBTyxHQUFHLE1BQU07VUFDbkM7RUFBTyxhQUFBLElBQUksY0FBYyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7Y0FDMUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtFQUNwQixZQUFBLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtVQUNqQztNQUNKLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7RUFFdkMsSUFBQSxNQUFNLGFBQWEsR0FBR2tELGlCQUFXLENBQUMsTUFBSztVQUNuQyxvQkFBb0IsQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQztFQUNwRCxJQUFBLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztFQUV4QixJQUFBLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSztNQUNsQ2xELGVBQVMsQ0FBQyxNQUFLO0VBQ1gsUUFBQSxJQUFJLE1BQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0VBQ2hDLFlBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO1VBQ3BDO0VBQ0osSUFBQSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7OztNQUlwQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUM1QixjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FDekc7TUFDREEsZUFBUyxDQUFDLE1BQUs7RUFDWCxRQUFBLElBQUksTUFBTSxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7Y0FDaEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQzlDO0VBQ0osSUFBQSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFFdkIsTUFBTSxTQUFTLEdBQUdrRCxpQkFBVyxDQUN6QixPQUFPLE1BQXVDLEVBQUUsS0FBYyxLQUFtQjtVQUM3RSxJQUFJLENBQUMsTUFBTSxFQUFFO2NBQ1Q7VUFDSjtFQUNBLFFBQUEsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDOzs7VUFHM0MsSUFBSSxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7Y0FDckM7VUFDSjtFQUNBLFFBQUEsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7TUFDckUsQ0FBQyxFQUNELENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FDMUM7RUFFRCxJQUFBLE1BQU0sS0FBSyxHQUFHLFlBQVksSUFBSSxTQUFTO01BRXZDLFFBQ0lGLHlCQUFLLFNBQVMsRUFBRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFBLFFBQUEsRUFBQSxDQUNqRkQsZUFBQyxPQUFPLEVBQUEsRUFDSixLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksRUFDdEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLGdCQUFnQixDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFDbEQsT0FBTyxFQUNILEtBQUssQ0FBQztFQUNGLHNCQUFFO0VBQ0ksd0JBQUEsT0FBTyxFQUFFO0VBQ0wsOEJBQUUsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEtBQUssSUFBSTtFQUNyQyw4QkFBRSxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLGNBQWM7MEJBQ3ZELFVBQVU7RUFDVix3QkFBQSxPQUFPLEVBQUU7RUFDWjt3QkFDRCxTQUFTLEVBRW5CLFVBQVUsRUFDTixLQUFLLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDO0VBQzVCLHNCQUFFO0VBQ0ksd0JBQUEsT0FBTyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLElBQUksYUFBYTswQkFDeEQsTUFBTSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7MEJBQzlCLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWlCLEVBQUUsS0FBSztFQUMxRDt3QkFDRCxTQUFTLEVBRW5CLFlBQVksRUFDUixLQUFLLENBQUMsa0JBQWtCLElBQUksS0FBSyxDQUFDO0VBQzlCLHNCQUFFO0VBQ0ksd0JBQUEsT0FBTyxFQUFFLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLElBQUksZUFBZTswQkFDNUQsTUFBTSxFQUFFLEtBQUssQ0FBQyxrQkFBa0I7MEJBQ2hDLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0JBQW1CLEVBQUUsSUFBSTtFQUMzRDt3QkFDRCxTQUFTLEVBQUEsQ0FFckIsRUFDRCxLQUFLLEtBQ0ZBLGNBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBSyxTQUFTLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQSxRQUFBLEVBQzNDLEtBQUssRUFBQSxDQUNKLENBQ1QsRUFDREEsY0FBQSxDQUFDLFdBQVcsRUFBQSxFQUNSLEdBQUcsRUFBRSxjQUFjLEVBQ25CLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxJQUFJLE9BQU8sRUFDeEMsT0FBTyxFQUFFLE9BQU8sRUFDaEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksU0FBUyxFQUFBLENBQ2pELENBQUEsRUFBQSxDQUNBO0VBRWQ7O0VDaFFNLFNBQVUsZ0JBQWdCLENBQUMsS0FBcUMsRUFBQTtFQUNsRSxJQUFBLE9BQU9BLGNBQUEsQ0FBQyxhQUFhLEVBQUEsRUFBQSxHQUFLLEtBQUssR0FBSTtFQUN2Qzs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxXX0=
