define(['exports', 'react'], (function (exports, React) { 'use strict';

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
      const emailEditorRef = React.useRef(null);
      const [editor, setEditor] = React.useState(null);
      const [loadError, setLoadError] = React.useState();
      // Read by the save-on-change timer, which can fire before the render that
      // follows setLoadError.
      const loadErrorRef = React.useRef();
      const reportLoadError = React.useCallback((message) => {
          loadErrorRef.current = message;
          setLoadError(message);
      }, []);
      // Unlayer calls handlers registered once per editor; they read the latest
      // props through this ref instead of the render they were created in.
      const propsRef = React.useRef(props);
      propsRef.current = props;
      // The last design string the editor loaded or produced. When the attribute
      // changes to this value (because we wrote it) there is nothing to reload, and
      // reloading would throw away the user's undo history and selection.
      const syncedJson = React.useRef();
      const saveTimer = React.useRef();
      // The editor is destroyed on unmount; a pending save would call into it.
      React.useEffect(() => () => clearTimeout(saveTimer.current), []);
      const readOnly = JSONTemplate.readOnly;
      const { options: advanced, error: optionsError } = React.useMemo(() => parseAdvancedOptions(advancedOptions), [advancedOptions]);
      const options = React.useMemo(() => buildOptions(advanced, projectId, theme, imageUploadMode), [advanced, projectId, theme, imageUploadMode]);
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
          setEditor(unlayer);
      }, [exportDesign, writeAttributes]);
      // The editor is recreated when its options change; forget the old one.
      React.useEffect(() => setEditor(null), [options]);
      // Load the design from the attribute, once the editor and the value are ready.
      const jsonStatus = JSONTemplate.status;
      const jsonValue = JSONTemplate.value ?? "";
      React.useEffect(() => {
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

  exports.ReactEmailEditor = ReactEmailEditor;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2VkaXRvck9wdGlvbnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvaW1hZ2VVcGxvYWQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbWVyZ2VUYWdzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbmltcG9ydCBSZWFjdCwge1xuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUsXG4gIHVzZU1lbW9cbn0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIHBhY2thZ2UuanNvblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjIuMS4yXCI7XG5cbi8vIHNyYy9sb2FkU2NyaXB0LnRzXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9IFwiaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/MlwiO1xudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIGxvYWRlZCA9IGZhbHNlO1xudmFyIGZpbmRTY3JpcHQgPSAoc2NyaXB0VXJsKSA9PiB7XG4gIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpO1xuICBsZXQgZm91bmQgPSBudWxsO1xuICBzY3JpcHRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGZvdW5kID0gc2NyaXB0O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZDtcbn07XG52YXIgaXNFbWJlZFJlYWR5ID0gKCkgPT4gbG9hZGVkIHx8IHR5cGVvZiB1bmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIGFkZENhbGxiYWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbn07XG52YXIgcnVuQ2FsbGJhY2tzID0gKCkgPT4ge1xuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIGxldCBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IChjYWxsYmFjaywgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybCkgPT4ge1xuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGNvbnN0IGV4aXN0aW5nU2NyaXB0ID0gZmluZFNjcmlwdChzY3JpcHRVcmwpO1xuICBpZiAoIWV4aXN0aW5nU2NyaXB0KSB7XG4gICAgY29uc3QgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBydW5DYWxsYmFja3MoKTtcbiAgfSBlbHNlIHtcbiAgICBleGlzdGluZ1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8geyBfX3VubGF5ZXJfbGFzdEVkaXRvcklkOiAwIH0gOiB3aW5kb3c7XG53aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgdXNlQ291bnRlckVkaXRvcklkID0gKCkgPT4gdXNlTWVtbygoKSA9PiBgZWRpdG9yLSR7Kyt3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZH1gLCBbXSk7XG52YXIgdXNlR2VuZXJhdGVkRWRpdG9ySWQgPSB0eXBlb2YgUmVhY3QudXNlSWQgPT09IFwiZnVuY3Rpb25cIiA/IChcbiAgLy8gU3RyaXAgJzonIHNvIHRoZSBpZCBpcyBhIHZhbGlkIENTUyBzZWxlY3RvciBmb3IgdW5sYXllci5jcmVhdGVFZGl0b3IuXG4gICgpID0+IGBlZGl0b3ItJHtSZWFjdC51c2VJZCgpLnJlcGxhY2UoLzovZywgXCJcIil9YFxuKSA6IHVzZUNvdW50ZXJFZGl0b3JJZDtcbmZ1bmN0aW9uIEVtYWlsRWRpdG9ySW5uZXIocHJvcHMsIHJlZikge1xuICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaTtcbiAgY29uc3QgeyBvbkxvYWQsIG9uUmVhZHksIHNjcmlwdFVybCwgbWluSGVpZ2h0ID0gNTAwLCBzdHlsZSA9IHt9IH0gPSBwcm9wcztcbiAgY29uc3QgW2VkaXRvciwgc2V0RWRpdG9yXSA9IHVzZVN0YXRlKFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgW2hhc0xvYWRlZEVtYmVkU2NyaXB0LCBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGdlbmVyYXRlZElkID0gdXNlR2VuZXJhdGVkRWRpdG9ySWQoKTtcbiAgY29uc3QgZWRpdG9ySWQgPSBwcm9wcy5lZGl0b3JJZCB8fCBnZW5lcmF0ZWRJZDtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5wcm9wcy5vcHRpb25zIHx8IHt9LFxuICAgIGFwcGVhcmFuY2U6IChfYiA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfYiA6IChfYSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hcHBlYXJhbmNlLFxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9jID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLmRpc3BsYXlNb2RlKSB8fCBcImVtYWlsXCIsXG4gICAgbG9jYWxlOiAoX2UgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfZSA6IChfZCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZC5sb2NhbGUsXG4gICAgcHJvamVjdElkOiAoX2cgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfZyA6IChfZiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZi5wcm9qZWN0SWQsXG4gICAgdG9vbHM6IChfaSA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX2kgOiAoX2ggPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2gudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZSxcbiAgICAgIHZlcnNpb25cbiAgICB9XG4gIH07XG4gIHVzZUltcGVyYXRpdmVIYW5kbGUoXG4gICAgcmVmLFxuICAgICgpID0+ICh7XG4gICAgICBlZGl0b3JcbiAgICB9KSxcbiAgICBbZWRpdG9yXVxuICApO1xuICBjb25zdCBlZGl0b3JSZWYgPSB1c2VSZWYoZWRpdG9yKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBlZGl0b3JSZWYuY3VycmVudCA9IGVkaXRvcjtcbiAgfSwgW2VkaXRvcl0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB2YXIgX2EyO1xuICAgICAgKF9hMiA9IGVkaXRvclJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EyLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoKCkgPT4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSksIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgY29uc3QgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKFxuICAgIChwcm9wTmFtZSkgPT4gL15vbi8udGVzdChwcm9wTmFtZSlcbiAgKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaCgobWV0aG9kUHJvcCkgPT4ge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gXCJvbkxvYWRcIiAmJiBtZXRob2RQcm9wICE9PSBcIm9uUmVhZHlcIiAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwiZWRpdG9yOnJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBtZXRob2RQcm9wcy5qb2luKFwiLFwiKV0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgbWluSGVpZ2h0XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBlZGl0b3JJZCwgc3R5bGU6IHsgLi4uc3R5bGUsIGZsZXg6IDEgfSB9KVxuICApO1xufVxudmFyIEVtYWlsRWRpdG9yID0gUmVhY3QuZm9yd2FyZFJlZihFbWFpbEVkaXRvcklubmVyKTtcbmV4cG9ydCB7XG4gIEVtYWlsRWRpdG9yLFxuICBFbWFpbEVkaXRvciBhcyBkZWZhdWx0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsIi8qIVxuXHRDb3B5cmlnaHQgKGMpIDIwMTggSmVkIFdhdHNvbi5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcblx0aHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoYXJnKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBwYXJzZVZhbHVlKGFyZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VWYWx1ZSAoYXJnKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gYXJnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0cmV0dXJuIGFyZy50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ2xhc3MgKHZhbHVlLCBuZXdDbGFzcykge1xuXHRcdGlmICghbmV3Q2xhc3MpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICsgJyAnICsgbmV3Q2xhc3M7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdmFsdWUgKyBuZXdDbGFzcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCB7IEltYWdlVXBsb2FkTW9kZUVudW0sIFRoZW1lRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5leHBvcnQgdHlwZSBFZGl0b3IgPSBOb25OdWxsYWJsZTxFZGl0b3JSZWZbXCJlZGl0b3JcIl0+O1xuZXhwb3J0IHR5cGUgRWRpdG9yT3B0aW9ucyA9IE5vbk51bGxhYmxlPEVtYWlsRWRpdG9yUHJvcHNbXCJvcHRpb25zXCJdPjtcblxuLyoqXG4gKiBQYXJzZSB0aGUgXCJBZHZhbmNlZCBvcHRpb25zIChKU09OKVwiIHByb3BlcnR5LiBSZXR1cm5zIGFuIGVycm9yIG1lc3NhZ2UgaW5zdGVhZFxuICogb2YgdGhyb3dpbmcsIHNvIGEgdHlwbyBpbiBTdHVkaW8gUHJvIHNob3dzIHVwIGFzIGEgbWVzc2FnZSwgbm90IGEgZGVhZCBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBZHZhbmNlZE9wdGlvbnMoanNvbjogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBvcHRpb25zOiBFZGl0b3JPcHRpb25zOyBlcnJvcj86IHN0cmluZyB9IHtcbiAgICBpZiAoIWpzb24gfHwgIWpzb24udHJpbSgpKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9IH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IFwiQWR2YW5jZWQgb3B0aW9ucyBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBwYXJzZWQgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9LCBlcnJvcjogYEFkdmFuY2VkIG9wdGlvbnMgYXJlIG5vdCB2YWxpZCBKU09OOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBpbiBoZXJlIG11c3QgYmUgc3RhYmxlOiByZWFjdC1lbWFpbC1lZGl0b3IgZGVzdHJveXMgYW5kIHJlY3JlYXRlc1xuICogdGhlIGVkaXRvciwgbG9zaW5nIHVuc2F2ZWQgd29yaywgd2hlbmV2ZXIgdGhlIHNlcmlhbGl6ZWQgb3B0aW9ucyBjaGFuZ2UuIFZhbHVlc1xuICogdGhhdCBjYW4gY2hhbmdlIGF0IHJ1bnRpbWUgKGxvY2FsZSwgbWVyZ2UgdGFncykgZ28gdGhyb3VnaCB0aGUgZWRpdG9yIEFQSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyhcbiAgICBhZHZhbmNlZDogRWRpdG9yT3B0aW9ucyxcbiAgICBwcm9qZWN0SWQ6IG51bWJlcixcbiAgICB0aGVtZTogVGhlbWVFbnVtLFxuICAgIGltYWdlVXBsb2FkTW9kZTogSW1hZ2VVcGxvYWRNb2RlRW51bVxuKTogRWRpdG9yT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9uczogRWRpdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgLi4uYWR2YW5jZWQsXG4gICAgICAgIGFwcGVhcmFuY2U6IHsgLi4uYWR2YW5jZWQuYXBwZWFyYW5jZSwgdGhlbWUgfVxuICAgIH07XG4gICAgaWYgKHByb2plY3RJZCA+IDApIHtcbiAgICAgICAgb3B0aW9ucy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgfVxuICAgIGlmIChpbWFnZVVwbG9hZE1vZGUgPT09IFwiZGlzYWJsZWRcIikge1xuICAgICAgICBvcHRpb25zLmZlYXR1cmVzID0geyAuLi5hZHZhbmNlZC5mZWF0dXJlcywgdXNlclVwbG9hZHM6IGZhbHNlIH07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWREZXNpZ24gPSB7IGRlc2lnbj86IG9iamVjdDsgZXJyb3I/OiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVzaWduKGpzb246IHN0cmluZyk6IFBhcnNlZERlc2lnbiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGVzaWduID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgaWYgKCFkZXNpZ24gfHwgdHlwZW9mIGRlc2lnbiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhlIHNhdmVkIHRlbXBsYXRlIGlzIG5vdCBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGVzaWduIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogYFRoZSBzYXZlZCB0ZW1wbGF0ZSBjb3VsZCBub3QgYmUgcmVhZDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4vZWRpdG9yT3B0aW9uc1wiO1xuXG50eXBlIEltYWdlQ2FsbGJhY2sgPSBQYXJhbWV0ZXJzPEVkaXRvcltcInJlZ2lzdGVyQ2FsbGJhY2tcIl0+WzFdO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG14PzogeyBzZXNzaW9uPzogeyBnZXRDb25maWc/OiAoa2V5OiBzdHJpbmcpID0+IHVua25vd24gfSB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBNZW5kaXggcHVibGlzaGVkIFJFU1Qgc2VydmljZXMgdGhhdCB1c2UgdGhlIGFjdGl2ZSBzZXNzaW9uIGZvciBhdXRoZW50aWNhdGlvblxuICogcmVqZWN0IHJlcXVlc3RzIHdpdGhvdXQgdGhlIHNlc3Npb24ncyBDU1JGIHRva2VuLlxuICovXG5mdW5jdGlvbiBjc3JmSGVhZGVycygpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCB0b2tlbiA9IHdpbmRvdy5teD8uc2Vzc2lvbj8uZ2V0Q29uZmlnPy4oXCJjc3JmdG9rZW5cIik7XG4gICAgcmV0dXJuIHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIiA/IHsgXCJYLUNzcmYtVG9rZW5cIjogdG9rZW4gfSA6IHt9O1xufVxuXG4vKipcbiAqIFVwbG9hZCBpbWFnZXMgdG8gdGhlIGFwcCdzIG93biBlbmRwb2ludCBpbnN0ZWFkIG9mIFVubGF5ZXIncyBzdG9yYWdlLiBUaGVcbiAqIGVuZHBvaW50IHJlY2VpdmVzIG11bHRpcGFydC9mb3JtLWRhdGEgd2l0aCB0aGUgaW1hZ2UgaW4gYSBwYXJ0IG5hbWVkIFwiZmlsZVwiXG4gKiBhbmQgbXVzdCBhbnN3ZXIgd2l0aCBKU09OIGNvbnRhaW5pbmcgdGhlIHB1YmxpYyBcInVybFwiIG9mIHRoZSBzdG9yZWQgaW1hZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckltYWdlVXBsb2FkKGVkaXRvcjogRWRpdG9yLCB1cGxvYWRVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHVwbG9hZDogSW1hZ2VDYWxsYmFjayA9IChmaWxlOiB7IGF0dGFjaG1lbnRzOiBGaWxlW10gfSwgZG9uZTogKHJlc3VsdDogb2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZmlsZS5hdHRhY2htZW50c1swXTtcbiAgICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICAgICAgZG9uZSh7IGFib3J0OiB0cnVlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgYm9keS5hcHBlbmQoXCJmaWxlXCIsIGltYWdlKTtcblxuICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwIH0pO1xuICAgICAgICBmZXRjaCh1cGxvYWRVcmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCAuLi5jc3JmSGVhZGVycygpIH0sXG4gICAgICAgICAgICBib2R5XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwbG9hZCBmYWlsZWQgd2l0aCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiB7IHVybD86IHVua25vd24gfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YT8udXJsICE9PSBcInN0cmluZ1wiIHx8ICFkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCByZXNwb25zZSBoYXMgbm8gXCJ1cmxcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwMCwgdXJsOiBkYXRhLnVybCB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlYWN0RW1haWxFZGl0b3I6IGltYWdlIHVwbG9hZCBmYWlsZWQuXCIsIGUpO1xuICAgICAgICAgICAgICAgIGRvbmUoeyBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBlZGl0b3IucmVnaXN0ZXJDYWxsYmFjayhcImltYWdlXCIsIHVwbG9hZCk7XG59XG4iLCJpbXBvcnQgeyBMaXN0RXhwcmVzc2lvblZhbHVlLCBMaXN0VmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG5leHBvcnQgdHlwZSBNZXJnZVRhZ3MgPSBSZWNvcmQ8c3RyaW5nLCB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgc2FtcGxlPzogc3RyaW5nIH0+O1xuXG4vKipcbiAqIFR1cm4gdGhlIG1lcmdlIHRhZyBkYXRhc291cmNlIGludG8gVW5sYXllcidzIG1lcmdlIHRhZyBtYXAuIFJldHVybnMgdW5kZWZpbmVkXG4gKiB3aGlsZSB0aGUgbGlzdCBpcyBsb2FkaW5nLCBzbyB0aGUgZWRpdG9yIGtlZXBzIHdoYXQgaXQgaGFzIHVudGlsIHRoZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1lcmdlVGFncyhcbiAgICBzb3VyY2U6IExpc3RWYWx1ZSB8IHVuZGVmaW5lZCxcbiAgICBuYW1lOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgdmFsdWU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZCxcbiAgICBzYW1wbGU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZFxuKTogTWVyZ2VUYWdzIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXNvdXJjZSB8fCAhbmFtZSB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS5zdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSB8fCAhc291cmNlLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHRhZ3M6IE1lcmdlVGFncyA9IHt9O1xuICAgIHNvdXJjZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB0YWdOYW1lID0gbmFtZS5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhZ1ZhbHVlID0gdmFsdWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBpZiAoIXRhZ05hbWUgfHwgIXRhZ1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnU2FtcGxlID0gc2FtcGxlPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIHRhZ3NbYHRhZ18ke2luZGV4fWBdID0gdGFnU2FtcGxlXG4gICAgICAgICAgICA/IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlLCBzYW1wbGU6IHRhZ1NhbXBsZSB9XG4gICAgICAgICAgICA6IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhZ3M7XG59XG4iLCJpbXBvcnQgeyBFZGl0YWJsZVZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBlZGl0b3IgbWF5IHdyaXRlIGl0cyBkZXNpZ24gdG8gdGhlIHRlbXBsYXRlIGF0dHJpYnV0ZS5cbiAqXG4gKiBPbmx5IHdoZW4gTWVuZGl4IGhhcyB0aGUgYXR0cmlidXRlIChhIGxvYWRpbmcgb3IgdW5hdmFpbGFibGUgYXR0cmlidXRlXG4gKiBhY2NlcHRzIHNldFZhbHVlIGFuZCBzdG9yZXMgbm90aGluZyksIGl0IGlzIGVkaXRhYmxlLCBhbmQgdGhlIHN0b3JlZCB2YWx1ZVxuICogd2FzIHVuZGVyc3Rvb2QuIEEgc3RvcmVkIHRlbXBsYXRlIHRoYXQgZmFpbGVkIHRvIGxvYWQgaXMgbm90IGluIHRoZSBlZGl0b3IsXG4gKiBzbyB3cml0aW5nIHRoZSBlZGl0b3IncyBjb250ZW50IHdvdWxkIHJlcGxhY2UgaXQgd2l0aCB3aGF0ZXZlciBpcyBvbiBzY3JlZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW5Xcml0ZVRlbXBsYXRlKGF0dHJpYnV0ZTogRWRpdGFibGVWYWx1ZTxzdHJpbmc+LCBsb2FkRXJyb3I6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdHRyaWJ1dGUuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgIWF0dHJpYnV0ZS5yZWFkT25seSAmJiAhbG9hZEVycm9yO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIE9wdGlvbiB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbi8qKlxuICogVGhlIGFjdGlvbiBhcmd1bWVudHMsIGV4YWN0bHkgYXMgUmVhY3RFbWFpbEVkaXRvci54bWwgZ2VuZXJhdGVzIHRoZW0gaW50b1xuICogdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHMuZC50cy4gU3BlbGxpbmcgdGhlbSBvdXQgb25jZSBrZWVwcyB0aGlzIGZpbGUgYW5kXG4gKiB0aGUgZ2VuZXJhdGVkIHByb3BzIGZyb20gZHJpZnRpbmcgYXBhcnQuXG4gKi9cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQWN0aW9uQXJncyA9IHsgaHRtbF9fOiBPcHRpb248c3RyaW5nPjsganNvbl9fOiBPcHRpb248c3RyaW5nPiB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJCdXR0b24ge1xuICAgIGNhcHRpb246IHN0cmluZztcbiAgICBhY3Rpb246IEFjdGlvblZhbHVlPFRlbXBsYXRlQWN0aW9uQXJncz47XG4gICAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xuICAgIC8qKiBGYWxzZSB1bnRpbCB0aGUgZWRpdG9yIGhhcyBsb2FkZWQ7IG5vdGhpbmcgY2FuIGJlIGV4cG9ydGVkIGJlZm9yZSB0aGF0LiAqL1xuICAgIHJlYWR5OiBib29sZWFuO1xuICAgIHJlYWRPbmx5OiBib29sZWFuO1xuICAgIC8qKiBGYWxzZSB3aGlsZSB0aGUgdGVtcGxhdGUgYXR0cmlidXRlIGlzIGxvYWRpbmcsIHVuYXZhaWxhYmxlIG9yIGNvdWxkIG5vdCBiZSByZWFkLiAqL1xuICAgIGNhblNhdmU6IGJvb2xlYW47XG4gICAgZXhwb3J0SHRtbD86IFRvb2xiYXJCdXR0b247XG4gICAgc2F2ZVRlbXBsYXRlPzogVG9vbGJhckJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gQWN0aW9uQnV0dG9uKHtcbiAgICBidXR0b24sXG4gICAgZGlzYWJsZWQsXG4gICAgY2xhc3NOYW1lXG59OiB7XG4gICAgYnV0dG9uOiBUb29sYmFyQnV0dG9uO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbn0pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGJ1c3kgPSBidXR0b24uYWN0aW9uLmlzRXhlY3V0aW5nO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGJ1c3kgfHwgIWJ1dHRvbi5hY3Rpb24uY2FuRXhlY3V0ZX1cbiAgICAgICAgICAgIGFyaWEtYnVzeT17YnVzeX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2J1dHRvbi5vbkNsaWNrfVxuICAgICAgICA+XG4gICAgICAgICAgICB7YnV0dG9uLmNhcHRpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb29sYmFyKHsgcmVhZHksIHJlYWRPbmx5LCBjYW5TYXZlLCBleHBvcnRIdG1sLCBzYXZlVGVtcGxhdGUgfTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHwgbnVsbCB7XG4gICAgLy8gU2F2aW5nIGZyb20gYSByZWFkLW9ubHkgZWRpdG9yIHdvdWxkIHN0b3JlIG5vdGhpbmcgdGhlIHVzZXIgY291bGQgY2hhbmdlLlxuICAgIGNvbnN0IHNob3dTYXZlID0gc2F2ZVRlbXBsYXRlICYmICFyZWFkT25seTtcbiAgICBpZiAoIWV4cG9ydEh0bWwgJiYgIXNob3dTYXZlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWVtYWlsLWVkaXRvci10b29sYmFyIHNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxuICAgICAgICAgICAge2V4cG9ydEh0bWwgJiYgPEFjdGlvbkJ1dHRvbiBidXR0b249e2V4cG9ydEh0bWx9IGRpc2FibGVkPXshcmVhZHl9IC8+fVxuICAgICAgICAgICAge3Nob3dTYXZlICYmIChcbiAgICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbj17c2F2ZVRlbXBsYXRlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlYWR5IHx8ICFjYW5TYXZlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2V4cG9ydEh0bWwgPyBcInNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3JSZWYgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcbmltcG9ydCB7IGJ1aWxkT3B0aW9ucywgRWRpdG9yLCBwYXJzZUFkdmFuY2VkT3B0aW9ucywgcGFyc2VEZXNpZ24gfSBmcm9tIFwiLi4vdXRpbHMvZWRpdG9yT3B0aW9uc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJJbWFnZVVwbG9hZCB9IGZyb20gXCIuLi91dGlscy9pbWFnZVVwbG9hZFwiO1xuaW1wb3J0IHsgYnVpbGRNZXJnZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VUYWdzXCI7XG5pbXBvcnQgeyBjYW5Xcml0ZVRlbXBsYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3RlbXBsYXRlQXR0cmlidXRlXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZUFjdGlvbkFyZ3MsIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyXCI7XG5cbi8qKiBIb3cgbG9uZyB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGVkaXQgYmVmb3JlIHdyaXRpbmcgdG8gdGhlIGF0dHJpYnV0ZXMuICovXG5jb25zdCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyA9IDUwMDtcblxudHlwZSBFeHBvcnRlZCA9IHsgaHRtbDogc3RyaW5nOyBqc29uOiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRvcldyYXBwZXIocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBKU09OVGVtcGxhdGUsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgYWR2YW5jZWRPcHRpb25zIH0gPSBwcm9wcztcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xuICAgIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZTxFZGl0b3IgfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nPigpO1xuICAgIC8vIFJlYWQgYnkgdGhlIHNhdmUtb24tY2hhbmdlIHRpbWVyLCB3aGljaCBjYW4gZmlyZSBiZWZvcmUgdGhlIHJlbmRlciB0aGF0XG4gICAgLy8gZm9sbG93cyBzZXRMb2FkRXJyb3IuXG4gICAgY29uc3QgbG9hZEVycm9yUmVmID0gdXNlUmVmPHN0cmluZz4oKTtcbiAgICBjb25zdCByZXBvcnRMb2FkRXJyb3IgPSB1c2VDYWxsYmFjaygobWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGxvYWRFcnJvclJlZi5jdXJyZW50ID0gbWVzc2FnZTtcbiAgICAgICAgc2V0TG9hZEVycm9yKG1lc3NhZ2UpO1xuICAgIH0sIFtdKTtcblxuICAgIC8vIFVubGF5ZXIgY2FsbHMgaGFuZGxlcnMgcmVnaXN0ZXJlZCBvbmNlIHBlciBlZGl0b3I7IHRoZXkgcmVhZCB0aGUgbGF0ZXN0XG4gICAgLy8gcHJvcHMgdGhyb3VnaCB0aGlzIHJlZiBpbnN0ZWFkIG9mIHRoZSByZW5kZXIgdGhleSB3ZXJlIGNyZWF0ZWQgaW4uXG4gICAgY29uc3QgcHJvcHNSZWYgPSB1c2VSZWYocHJvcHMpO1xuICAgIHByb3BzUmVmLmN1cnJlbnQgPSBwcm9wcztcblxuICAgIC8vIFRoZSBsYXN0IGRlc2lnbiBzdHJpbmcgdGhlIGVkaXRvciBsb2FkZWQgb3IgcHJvZHVjZWQuIFdoZW4gdGhlIGF0dHJpYnV0ZVxuICAgIC8vIGNoYW5nZXMgdG8gdGhpcyB2YWx1ZSAoYmVjYXVzZSB3ZSB3cm90ZSBpdCkgdGhlcmUgaXMgbm90aGluZyB0byByZWxvYWQsIGFuZFxuICAgIC8vIHJlbG9hZGluZyB3b3VsZCB0aHJvdyBhd2F5IHRoZSB1c2VyJ3MgdW5kbyBoaXN0b3J5IGFuZCBzZWxlY3Rpb24uXG4gICAgY29uc3Qgc3luY2VkSnNvbiA9IHVzZVJlZjxzdHJpbmc+KCk7XG5cbiAgICBjb25zdCBzYXZlVGltZXIgPSB1c2VSZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4+KCk7XG4gICAgLy8gVGhlIGVkaXRvciBpcyBkZXN0cm95ZWQgb24gdW5tb3VudDsgYSBwZW5kaW5nIHNhdmUgd291bGQgY2FsbCBpbnRvIGl0LlxuICAgIHVzZUVmZmVjdCgoKSA9PiAoKSA9PiBjbGVhclRpbWVvdXQoc2F2ZVRpbWVyLmN1cnJlbnQpLCBbXSk7XG5cbiAgICBjb25zdCByZWFkT25seSA9IEpTT05UZW1wbGF0ZS5yZWFkT25seTtcblxuICAgIGNvbnN0IHsgb3B0aW9uczogYWR2YW5jZWQsIGVycm9yOiBvcHRpb25zRXJyb3IgfSA9IHVzZU1lbW8oXG4gICAgICAgICgpID0+IHBhcnNlQWR2YW5jZWRPcHRpb25zKGFkdmFuY2VkT3B0aW9ucyksXG4gICAgICAgIFthZHZhbmNlZE9wdGlvbnNdXG4gICAgKTtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gYnVpbGRPcHRpb25zKGFkdmFuY2VkLCBwcm9qZWN0SWQsIHRoZW1lLCBpbWFnZVVwbG9hZE1vZGUpLFxuICAgICAgICBbYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZV1cbiAgICApO1xuXG4gICAgY29uc3QgZXhwb3J0RGVzaWduID0gdXNlQ2FsbGJhY2soKHVubGF5ZXI6IEVkaXRvcik6IFByb21pc2U8RXhwb3J0ZWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdW5sYXllci5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBodG1sOiBkYXRhLmh0bWwsIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEuZGVzaWduKSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICAvKiogV3JpdGUgdGhlIGRlc2lnbiB0byB0aGUgYXR0cmlidXRlcywgaWYgdGhleSBjYW4gYmUgd3JpdHRlbi4gUmV0dXJucyB3aGV0aGVyIGl0IGRpZC4gKi9cbiAgICBjb25zdCB3cml0ZUF0dHJpYnV0ZXMgPSB1c2VDYWxsYmFjaygoeyBodG1sLCBqc29uIH06IEV4cG9ydGVkKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IHsgSlNPTlRlbXBsYXRlOiBqc29uQXR0ciwgSFRNTEJvZHk6IGh0bWxBdHRyIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIWNhbldyaXRlVGVtcGxhdGUoanNvbkF0dHIsIGxvYWRFcnJvclJlZi5jdXJyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb247XG4gICAgICAgIGpzb25BdHRyLnNldFZhbHVlKGpzb24pO1xuICAgICAgICBpZiAoaHRtbEF0dHIgJiYgaHRtbEF0dHIuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgIWh0bWxBdHRyLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICBodG1sQXR0ci5zZXRWYWx1ZShodG1sKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBvblJlYWR5ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgICh1bmxheWVyOiBFZGl0b3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaW1hZ2VVcGxvYWRVcmwgfSA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAocHJvcHNSZWYuY3VycmVudC5pbWFnZVVwbG9hZE1vZGUgPT09IFwiZW5kcG9pbnRcIiAmJiBpbWFnZVVwbG9hZFVybCkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVySW1hZ2VVcGxvYWQodW5sYXllciwgaW1hZ2VVcGxvYWRVcmwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bmxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkZXNpZ246dXBkYXRlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50LnNhdmVPbkNoYW5nZSB8fCAhY2FuV3JpdGVUZW1wbGF0ZShjdXJyZW50LkpTT05UZW1wbGF0ZSwgbG9hZEVycm9yUmVmLmN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNhdmVUaW1lci5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICBzYXZlVGltZXIuY3VycmVudCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBleHBvcnREZXNpZ24odW5sYXllcikudGhlbih3cml0ZUF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgICAgIH0sIFNBVkVfT05fQ0hBTkdFX0RFTEFZX01TKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBIG5ldyBlZGl0b3Igc3RhcnRzIGJsYW5rLCBzbyB3aGF0ZXZlciBpdCBoYWQgbG9hZGVkIGlzIGdvbmUuXG4gICAgICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBzZXRFZGl0b3IodW5sYXllcik7XG4gICAgICAgIH0sXG4gICAgICAgIFtleHBvcnREZXNpZ24sIHdyaXRlQXR0cmlidXRlc11cbiAgICApO1xuXG4gICAgLy8gVGhlIGVkaXRvciBpcyByZWNyZWF0ZWQgd2hlbiBpdHMgb3B0aW9ucyBjaGFuZ2U7IGZvcmdldCB0aGUgb2xkIG9uZS5cbiAgICB1c2VFZmZlY3QoKCkgPT4gc2V0RWRpdG9yKG51bGwpLCBbb3B0aW9uc10pO1xuXG4gICAgLy8gTG9hZCB0aGUgZGVzaWduIGZyb20gdGhlIGF0dHJpYnV0ZSwgb25jZSB0aGUgZWRpdG9yIGFuZCB0aGUgdmFsdWUgYXJlIHJlYWR5LlxuICAgIGNvbnN0IGpzb25TdGF0dXMgPSBKU09OVGVtcGxhdGUuc3RhdHVzO1xuICAgIGNvbnN0IGpzb25WYWx1ZSA9IEpTT05UZW1wbGF0ZS52YWx1ZSA/PyBcIlwiO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghZWRpdG9yIHx8IGpzb25TdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFuIGVtcHR5IHZhbHVlIG5ldmVyIGNsZWFycyB0aGUgZWRpdG9yLiBJdCBpcyB3aGF0IGEgcm9sbGJhY2sgb2YgYSBuZXdcbiAgICAgICAgLy8gb2JqZWN0IHByb2R1Y2VzLCBmb3IgaW5zdGFuY2Ugd2hlbiBhIHBvcC11cCBvcGVuZWQgYnkgdGhlIHNhdmUgYWN0aW9uIGlzXG4gICAgICAgIC8vIGNsb3NlZCwgYW5kIGNsZWFyaW5nIHdvdWxkIHRocm93IGF3YXkgZXZlcnl0aGluZyB0aGUgdXNlciBtYWRlLlxuICAgICAgICBpZiAoanNvblZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXBvcnRMb2FkRXJyb3IodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoanNvblZhbHVlID09PSBzeW5jZWRKc29uLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzeW5jZWRKc29uLmN1cnJlbnQgPSBqc29uVmFsdWU7XG4gICAgICAgIGNvbnN0IHsgZGVzaWduLCBlcnJvciB9ID0gcGFyc2VEZXNpZ24oanNvblZhbHVlKTtcbiAgICAgICAgcmVwb3J0TG9hZEVycm9yKGVycm9yKTtcbiAgICAgICAgaWYgKGRlc2lnbikge1xuICAgICAgICAgICAgZWRpdG9yLmxvYWREZXNpZ24oZGVzaWduIGFzIFBhcmFtZXRlcnM8RWRpdG9yW1wibG9hZERlc2lnblwiXT5bMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUmVhY3RFbWFpbEVkaXRvcjogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIGpzb25TdGF0dXMsIGpzb25WYWx1ZSwgcmVwb3J0TG9hZEVycm9yXSk7XG5cbiAgICAvLyBSZWFkLW9ubHk6IHNob3cgdGhlIGRlc2lnbiBhcyBhIHByZXZpZXcgcmF0aGVyIHRoYW4gYW4gZWRpdG9yLlxuICAgIGNvbnN0IHByZXZpZXdTaG93biA9IHVzZVJlZihmYWxzZSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWRPbmx5ICYmICFwcmV2aWV3U2hvd24uY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dQcmV2aWV3KFwiZGVza3RvcFwiKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZE9ubHkgJiYgcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5oaWRlUHJldmlldygpO1xuICAgICAgICAgICAgcHJldmlld1Nob3duLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIHJlYWRPbmx5XSk7XG5cbiAgICBjb25zdCBsb2NhbGUgPSBwcm9wcy5sb2NhbGU/LnZhbHVlO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRMb2NhbGUobG9jYWxlIHx8IG51bGwpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbG9jYWxlXSk7XG5cbiAgICAvLyBNZW5kaXggaGFuZHMgb3V0IG5ldyBsaXN0IG9iamVjdHMgb24gcmUtcmVuZGVyczsgY29tcGFyZSBieSBjb250ZW50IHNvIHRoZVxuICAgIC8vIGVkaXRvciBpcyBvbmx5IHRvbGQgd2hlbiB0aGUgdGFncyByZWFsbHkgY2hhbmdlLlxuICAgIGNvbnN0IG1lcmdlVGFncyA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBidWlsZE1lcmdlVGFncyhwcm9wcy5tZXJnZVRhZ3MsIHByb3BzLm1lcmdlVGFnTmFtZSwgcHJvcHMubWVyZ2VUYWdWYWx1ZSwgcHJvcHMubWVyZ2VUYWdTYW1wbGUpID8/IG51bGxcbiAgICApO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbWVyZ2VUYWdzICE9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldE1lcmdlVGFncyhKU09OLnBhcnNlKG1lcmdlVGFncykpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbWVyZ2VUYWdzXSk7XG5cbiAgICBjb25zdCBydW5BY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAgICAgYXN5bmMgKGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPiwgd3JpdGU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBhd2FpdCBleHBvcnREZXNpZ24oZWRpdG9yKTtcbiAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGhlIHNhdmUgYWN0aW9uIGFmdGVyIGEgcmVmdXNlZCB3cml0ZSB3b3VsZCBjb21taXQgdGhlXG4gICAgICAgICAgICAvLyBvYmplY3QgYXMgaWYgdGhlIHRlbXBsYXRlIGhhZCBiZWVuIHN0b3JlZC5cbiAgICAgICAgICAgIGlmICh3cml0ZSAmJiAhd3JpdGVBdHRyaWJ1dGVzKGV4cG9ydGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY3Rpb24uY2FuRXhlY3V0ZSAmJiAhYWN0aW9uLmlzRXhlY3V0aW5nKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoeyBodG1sX186IGV4cG9ydGVkLmh0bWwsIGpzb25fXzogZXhwb3J0ZWQuanNvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2VkaXRvciwgZXhwb3J0RGVzaWduLCB3cml0ZUF0dHJpYnV0ZXNdXG4gICAgKTtcblxuICAgIGNvbnN0IGVycm9yID0gb3B0aW9uc0Vycm9yID8/IGxvYWRFcnJvcjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicmVhY3QtZW1haWwtZWRpdG9yLWRpdlwiLCBwcm9wcy5jbGFzcyl9IHN0eWxlPXtwcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgICAgIHJlYWR5PXtlZGl0b3IgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgICAgIGNhblNhdmU9e2NhbldyaXRlVGVtcGxhdGUoSlNPTlRlbXBsYXRlLCBsb2FkRXJyb3IpfVxuICAgICAgICAgICAgICAgIGV4cG9ydEh0bWw9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dFeHBvcnRIdG1sICYmIHByb3BzLmV4cG9ydEhUTUxBY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcHMuZXhwb3J0SHRtbENhcHRpb24/LnZhbHVlIHx8IFwiRXhwb3J0IEhUTUxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogcHJvcHMuZXhwb3J0SFRNTEFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHJ1bkFjdGlvbihwcm9wcy5leHBvcnRIVE1MQWN0aW9uISwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNhdmVUZW1wbGF0ZT17XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmlzU2hvd1NhdmVUZW1wbGF0ZSAmJiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcHMuc2F2ZVRlbXBsYXRlQ2FwdGlvbj8udmFsdWUgfHwgXCJTYXZlIFRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLnNhdmVUZW1wbGF0ZUFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHJ1bkFjdGlvbihwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24hLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8RW1haWxFZGl0b3JcbiAgICAgICAgICAgICAgICByZWY9e2VtYWlsRWRpdG9yUmVmfVxuICAgICAgICAgICAgICAgIG9uUmVhZHk9e29uUmVhZHl9XG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0PXtwcm9wcy5lZGl0b3JIZWlnaHQgfHwgXCI3MDBweFwifVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRWRpdG9yV3JhcHBlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlclwiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RFbWFpbEVkaXRvcihwcm9wczogUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPEVkaXRvcldyYXBwZXIgey4uLnByb3BzfSAvPjtcbn1cbiJdLCJuYW1lcyI6WyJ3aW4iLCJ3aW5kb3ciLCJfX3VubGF5ZXJfbGFzdEVkaXRvcklkIiwidXNlQ291bnRlckVkaXRvcklkIiwidXNlTWVtbyIsInVzZUdlbmVyYXRlZEVkaXRvcklkIiwiUmVhY3QiLCJ1c2VJZCIsInJlcGxhY2UiLCJFbWFpbEVkaXRvcklubmVyIiwicHJvcHMiLCJyZWYiLCJfYSIsIl9iIiwiX2MiLCJfZCIsIl9lIiwiX2YiLCJfZyIsIl9oIiwiX2kiLCJvbkxvYWQiLCJvblJlYWR5Iiwic2NyaXB0VXJsIiwibWluSGVpZ2h0Iiwic3R5bGUiLCJlZGl0b3IiLCJzZXRFZGl0b3IiLCJ1c2VTdGF0ZSIsImhhc0xvYWRlZEVtYmVkU2NyaXB0Iiwic2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQiLCJnZW5lcmF0ZWRJZCIsImVkaXRvcklkIiwib3B0aW9ucyIsImFwcGVhcmFuY2UiLCJkaXNwbGF5TW9kZSIsImxvY2FsZSIsInByb2plY3RJZCIsInRvb2xzIiwiaWQiLCJzb3VyY2UiLCJuYW1lIiwidmVyc2lvbiIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJlZGl0b3JSZWYiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJjdXJyZW50IiwiX2EyIiwiZGVzdHJveSIsImxvYWRTY3JpcHQiLCJ1bmxheWVyIiwiY3JlYXRlRWRpdG9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1ldGhvZFByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInByb3BOYW1lIiwidGVzdCIsImZvckVhY2giLCJtZXRob2RQcm9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImpvaW4iLCJjcmVhdGVFbGVtZW50IiwiZmxleCIsImRpc3BsYXkiLCJFbWFpbEVkaXRvciIsImZvcndhcmRSZWYiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsImFwcGVuZENsYXNzIiwicGFyc2VWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImFwcGx5IiwidG9TdHJpbmciLCJwcm90b3R5cGUiLCJpbmNsdWRlcyIsImtleSIsImNhbGwiLCJ2YWx1ZSIsIm5ld0NsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ1c2VDYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBY0EsSUFBTUEsR0FBQSxHQUNKLE9BQU9DLE1BQUEsS0FBVyxXQUFjLEdBQUE7RUFBRUMsRUFBQUEsc0JBQUEsRUFBd0IsQ0FBQTtFQUFFLENBQUEsR0FBSUQsTUFBQSxDQUFBO0VBQ2xFRCxHQUFBLENBQUlFLHNCQUFBLEdBQXlCRixHQUFBLENBQUlFLHNCQUFBLElBQTBCLENBQUEsQ0FBQTtFQU0zRCxJQUFNQyxrQkFBQSxHQUFxQkEsTUFDekJDLGFBQUEsQ0FBUSxNQUFNLENBQUEsT0FBQSxFQUFVLEVBQUVKLEdBQUEsQ0FBSUUsc0JBQXNCLElBQUksRUFBRSxDQUFBLENBQUE7RUFRNUQsSUFBTUcsb0JBQUEsR0FDSixPQUFPQyxLQUFBLENBQU1DLEtBQUEsS0FBVSxVQUFBO0VBQUE7RUFFbkIs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QU0sS0FBSyxHQUFHLFlBQVksSUFBSSxTQUFTLENBQUM7RUFFeEMsSUFBQSxRQUNJLEtBQUssQ0FBQSxhQUFBLENBQUEsS0FBQSxFQUFBLEVBQUEsU0FBUyxFQUFFLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUE7RUFDakYsUUFBQSxLQUFBLENBQUEsYUFBQSxDQUFDLE9BQU8sRUFBQSxFQUNKLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxFQUN0QixRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUNsRCxVQUFVLEVBQ04sS0FBSyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxnQkFBZ0I7RUFDNUMsa0JBQUU7RUFDSSxvQkFBQSxPQUFPLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEtBQUssSUFBSSxhQUFhO3NCQUN4RCxNQUFNLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtzQkFDOUIsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBaUIsRUFBRSxLQUFLLENBQUM7RUFDM0QsaUJBQUE7b0JBQ0QsU0FBUyxFQUVuQixZQUFZLEVBQ1IsS0FBSyxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxrQkFBa0I7RUFDaEQsa0JBQUU7RUFDSSxvQkFBQSxPQUFPLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEtBQUssSUFBSSxlQUFlO3NCQUM1RCxNQUFNLEVBQUUsS0FBSyxDQUFDLGtCQUFrQjtzQkFDaEMsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBbUIsRUFBRSxJQUFJLENBQUM7RUFDNUQsaUJBQUE7b0JBQ0QsU0FBUyxFQUVyQixDQUFBO0VBQ0QsUUFBQSxLQUFLLEtBQ0YsS0FBSyxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFDM0MsRUFBQSxLQUFLLENBQ0osQ0FDVDtVQUNELEtBQUMsQ0FBQSxhQUFBLENBQUEsV0FBVyxFQUNSLEVBQUEsR0FBRyxFQUFFLGNBQWMsRUFDbkIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxFQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFBLENBQ2xCLENBQ0EsRUFDUjtFQUNOOztFQ3pOTSxTQUFVLGdCQUFnQixDQUFDLEtBQXFDLEVBQUE7RUFDbEUsSUFBQSxPQUFPLEtBQUMsQ0FBQSxhQUFBLENBQUEsYUFBYSxFQUFLLEVBQUEsR0FBQSxLQUFLLEdBQUksQ0FBQztFQUN4Qzs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMV19
