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
      const emailEditorRef = React.useRef(null);
      const [editor, setEditor] = React.useState(null);
      const [loadError, setLoadError] = React.useState();
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
      /** Write the design to the attributes, if they can be written. */
      const writeAttributes = React.useCallback(({ html, json }) => {
          const { JSONTemplate: jsonAttr, HTMLBody: htmlAttr } = propsRef.current;
          syncedJson.current = json;
          if (!jsonAttr.readOnly) {
              jsonAttr.setValue(json);
          }
          if (htmlAttr && !htmlAttr.readOnly) {
              htmlAttr.setValue(html);
          }
      }, []);
      const onReady = React.useCallback((unlayer) => {
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
              setLoadError(undefined);
              return;
          }
          if (jsonValue === syncedJson.current) {
              return;
          }
          syncedJson.current = jsonValue;
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

  exports.ReactEmailEditor = ReactEmailEditor;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL2VkaXRvck9wdGlvbnMudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvaW1hZ2VVcGxvYWQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbWVyZ2VUYWdzLnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbmltcG9ydCBSZWFjdCwge1xuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlU3RhdGUsXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUsXG4gIHVzZU1lbW9cbn0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIHBhY2thZ2UuanNvblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjIuMS4yXCI7XG5cbi8vIHNyYy9sb2FkU2NyaXB0LnRzXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9IFwiaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/MlwiO1xudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIGxvYWRlZCA9IGZhbHNlO1xudmFyIGZpbmRTY3JpcHQgPSAoc2NyaXB0VXJsKSA9PiB7XG4gIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2NyaXB0XCIpO1xuICBsZXQgZm91bmQgPSBudWxsO1xuICBzY3JpcHRzLmZvckVhY2goKHNjcmlwdCkgPT4ge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGZvdW5kID0gc2NyaXB0O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZDtcbn07XG52YXIgaXNFbWJlZFJlYWR5ID0gKCkgPT4gbG9hZGVkIHx8IHR5cGVvZiB1bmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIGFkZENhbGxiYWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbn07XG52YXIgcnVuQ2FsbGJhY2tzID0gKCkgPT4ge1xuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIGxldCBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IChjYWxsYmFjaywgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybCkgPT4ge1xuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGNvbnN0IGV4aXN0aW5nU2NyaXB0ID0gZmluZFNjcmlwdChzY3JpcHRVcmwpO1xuICBpZiAoIWV4aXN0aW5nU2NyaXB0KSB7XG4gICAgY29uc3QgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaXNFbWJlZFJlYWR5KCkpIHtcbiAgICBydW5DYWxsYmFja3MoKTtcbiAgfSBlbHNlIHtcbiAgICBleGlzdGluZ1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9FbWFpbEVkaXRvci50c3hcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8geyBfX3VubGF5ZXJfbGFzdEVkaXRvcklkOiAwIH0gOiB3aW5kb3c7XG53aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgdXNlQ291bnRlckVkaXRvcklkID0gKCkgPT4gdXNlTWVtbygoKSA9PiBgZWRpdG9yLSR7Kyt3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZH1gLCBbXSk7XG52YXIgdXNlR2VuZXJhdGVkRWRpdG9ySWQgPSB0eXBlb2YgUmVhY3QudXNlSWQgPT09IFwiZnVuY3Rpb25cIiA/IChcbiAgLy8gU3RyaXAgJzonIHNvIHRoZSBpZCBpcyBhIHZhbGlkIENTUyBzZWxlY3RvciBmb3IgdW5sYXllci5jcmVhdGVFZGl0b3IuXG4gICgpID0+IGBlZGl0b3ItJHtSZWFjdC51c2VJZCgpLnJlcGxhY2UoLzovZywgXCJcIil9YFxuKSA6IHVzZUNvdW50ZXJFZGl0b3JJZDtcbmZ1bmN0aW9uIEVtYWlsRWRpdG9ySW5uZXIocHJvcHMsIHJlZikge1xuICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaTtcbiAgY29uc3QgeyBvbkxvYWQsIG9uUmVhZHksIHNjcmlwdFVybCwgbWluSGVpZ2h0ID0gNTAwLCBzdHlsZSA9IHt9IH0gPSBwcm9wcztcbiAgY29uc3QgW2VkaXRvciwgc2V0RWRpdG9yXSA9IHVzZVN0YXRlKFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgW2hhc0xvYWRlZEVtYmVkU2NyaXB0LCBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGdlbmVyYXRlZElkID0gdXNlR2VuZXJhdGVkRWRpdG9ySWQoKTtcbiAgY29uc3QgZWRpdG9ySWQgPSBwcm9wcy5lZGl0b3JJZCB8fCBnZW5lcmF0ZWRJZDtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5wcm9wcy5vcHRpb25zIHx8IHt9LFxuICAgIGFwcGVhcmFuY2U6IChfYiA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfYiA6IChfYSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hcHBlYXJhbmNlLFxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9jID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9jLmRpc3BsYXlNb2RlKSB8fCBcImVtYWlsXCIsXG4gICAgbG9jYWxlOiAoX2UgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfZSA6IChfZCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZC5sb2NhbGUsXG4gICAgcHJvamVjdElkOiAoX2cgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfZyA6IChfZiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfZi5wcm9qZWN0SWQsXG4gICAgdG9vbHM6IChfaSA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX2kgOiAoX2ggPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX2gudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZSxcbiAgICAgIHZlcnNpb25cbiAgICB9XG4gIH07XG4gIHVzZUltcGVyYXRpdmVIYW5kbGUoXG4gICAgcmVmLFxuICAgICgpID0+ICh7XG4gICAgICBlZGl0b3JcbiAgICB9KSxcbiAgICBbZWRpdG9yXVxuICApO1xuICBjb25zdCBlZGl0b3JSZWYgPSB1c2VSZWYoZWRpdG9yKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBlZGl0b3JSZWYuY3VycmVudCA9IGVkaXRvcjtcbiAgfSwgW2VkaXRvcl0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB2YXIgX2EyO1xuICAgICAgKF9hMiA9IGVkaXRvclJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2EyLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoKCkgPT4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSksIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgY29uc3QgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKFxuICAgIChwcm9wTmFtZSkgPT4gL15vbi8udGVzdChwcm9wTmFtZSlcbiAgKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaCgobWV0aG9kUHJvcCkgPT4ge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gXCJvbkxvYWRcIiAmJiBtZXRob2RQcm9wICE9PSBcIm9uUmVhZHlcIiAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwiZWRpdG9yOnJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBtZXRob2RQcm9wcy5qb2luKFwiLFwiKV0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBzdHlsZToge1xuICAgICAgICBmbGV4OiAxLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgbWluSGVpZ2h0XG4gICAgICB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBlZGl0b3JJZCwgc3R5bGU6IHsgLi4uc3R5bGUsIGZsZXg6IDEgfSB9KVxuICApO1xufVxudmFyIEVtYWlsRWRpdG9yID0gUmVhY3QuZm9yd2FyZFJlZihFbWFpbEVkaXRvcklubmVyKTtcbmV4cG9ydCB7XG4gIEVtYWlsRWRpdG9yLFxuICBFbWFpbEVkaXRvciBhcyBkZWZhdWx0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcCIsIi8qIVxuXHRDb3B5cmlnaHQgKGMpIDIwMTggSmVkIFdhdHNvbi5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcblx0aHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoYXJnKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBwYXJzZVZhbHVlKGFyZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VWYWx1ZSAoYXJnKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gYXJnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0cmV0dXJuIGFyZy50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ2xhc3MgKHZhbHVlLCBuZXdDbGFzcykge1xuXHRcdGlmICghbmV3Q2xhc3MpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICsgJyAnICsgbmV3Q2xhc3M7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdmFsdWUgKyBuZXdDbGFzcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCB7IEltYWdlVXBsb2FkTW9kZUVudW0sIFRoZW1lRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5leHBvcnQgdHlwZSBFZGl0b3IgPSBOb25OdWxsYWJsZTxFZGl0b3JSZWZbXCJlZGl0b3JcIl0+O1xuZXhwb3J0IHR5cGUgRWRpdG9yT3B0aW9ucyA9IE5vbk51bGxhYmxlPEVtYWlsRWRpdG9yUHJvcHNbXCJvcHRpb25zXCJdPjtcblxuLyoqXG4gKiBQYXJzZSB0aGUgXCJBZHZhbmNlZCBvcHRpb25zIChKU09OKVwiIHByb3BlcnR5LiBSZXR1cm5zIGFuIGVycm9yIG1lc3NhZ2UgaW5zdGVhZFxuICogb2YgdGhyb3dpbmcsIHNvIGEgdHlwbyBpbiBTdHVkaW8gUHJvIHNob3dzIHVwIGFzIGEgbWVzc2FnZSwgbm90IGEgZGVhZCBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBZHZhbmNlZE9wdGlvbnMoanNvbjogc3RyaW5nIHwgdW5kZWZpbmVkKTogeyBvcHRpb25zOiBFZGl0b3JPcHRpb25zOyBlcnJvcj86IHN0cmluZyB9IHtcbiAgICBpZiAoIWpzb24gfHwgIWpzb24udHJpbSgpKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9IH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBvcHRpb25zOiB7fSwgZXJyb3I6IFwiQWR2YW5jZWQgb3B0aW9ucyBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBwYXJzZWQgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB7IG9wdGlvbnM6IHt9LCBlcnJvcjogYEFkdmFuY2VkIG9wdGlvbnMgYXJlIG5vdCB2YWxpZCBKU09OOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBpbiBoZXJlIG11c3QgYmUgc3RhYmxlOiByZWFjdC1lbWFpbC1lZGl0b3IgZGVzdHJveXMgYW5kIHJlY3JlYXRlc1xuICogdGhlIGVkaXRvciwgbG9zaW5nIHVuc2F2ZWQgd29yaywgd2hlbmV2ZXIgdGhlIHNlcmlhbGl6ZWQgb3B0aW9ucyBjaGFuZ2UuIFZhbHVlc1xuICogdGhhdCBjYW4gY2hhbmdlIGF0IHJ1bnRpbWUgKGxvY2FsZSwgbWVyZ2UgdGFncykgZ28gdGhyb3VnaCB0aGUgZWRpdG9yIEFQSS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkT3B0aW9ucyhcbiAgICBhZHZhbmNlZDogRWRpdG9yT3B0aW9ucyxcbiAgICBwcm9qZWN0SWQ6IG51bWJlcixcbiAgICB0aGVtZTogVGhlbWVFbnVtLFxuICAgIGltYWdlVXBsb2FkTW9kZTogSW1hZ2VVcGxvYWRNb2RlRW51bVxuKTogRWRpdG9yT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0aW9uczogRWRpdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgLi4uYWR2YW5jZWQsXG4gICAgICAgIGFwcGVhcmFuY2U6IHsgLi4uYWR2YW5jZWQuYXBwZWFyYW5jZSwgdGhlbWUgfVxuICAgIH07XG4gICAgaWYgKHByb2plY3RJZCA+IDApIHtcbiAgICAgICAgb3B0aW9ucy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG4gICAgfVxuICAgIGlmIChpbWFnZVVwbG9hZE1vZGUgPT09IFwiZGlzYWJsZWRcIikge1xuICAgICAgICBvcHRpb25zLmZlYXR1cmVzID0geyAuLi5hZHZhbmNlZC5mZWF0dXJlcywgdXNlclVwbG9hZHM6IGZhbHNlIH07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWREZXNpZ24gPSB7IGRlc2lnbj86IG9iamVjdDsgZXJyb3I/OiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGVzaWduKGpzb246IHN0cmluZyk6IFBhcnNlZERlc2lnbiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGVzaWduID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgaWYgKCFkZXNpZ24gfHwgdHlwZW9mIGRlc2lnbiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IFwiVGhlIHNhdmVkIHRlbXBsYXRlIGlzIG5vdCBhIEpTT04gb2JqZWN0LlwiIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGVzaWduIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcjogYFRoZSBzYXZlZCB0ZW1wbGF0ZSBjb3VsZCBub3QgYmUgcmVhZDogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4vZWRpdG9yT3B0aW9uc1wiO1xuXG50eXBlIEltYWdlQ2FsbGJhY2sgPSBQYXJhbWV0ZXJzPEVkaXRvcltcInJlZ2lzdGVyQ2FsbGJhY2tcIl0+WzFdO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG14PzogeyBzZXNzaW9uPzogeyBnZXRDb25maWc/OiAoa2V5OiBzdHJpbmcpID0+IHVua25vd24gfSB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBNZW5kaXggcHVibGlzaGVkIFJFU1Qgc2VydmljZXMgdGhhdCB1c2UgdGhlIGFjdGl2ZSBzZXNzaW9uIGZvciBhdXRoZW50aWNhdGlvblxuICogcmVqZWN0IHJlcXVlc3RzIHdpdGhvdXQgdGhlIHNlc3Npb24ncyBDU1JGIHRva2VuLlxuICovXG5mdW5jdGlvbiBjc3JmSGVhZGVycygpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCB0b2tlbiA9IHdpbmRvdy5teD8uc2Vzc2lvbj8uZ2V0Q29uZmlnPy4oXCJjc3JmdG9rZW5cIik7XG4gICAgcmV0dXJuIHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIiA/IHsgXCJYLUNzcmYtVG9rZW5cIjogdG9rZW4gfSA6IHt9O1xufVxuXG4vKipcbiAqIFVwbG9hZCBpbWFnZXMgdG8gdGhlIGFwcCdzIG93biBlbmRwb2ludCBpbnN0ZWFkIG9mIFVubGF5ZXIncyBzdG9yYWdlLiBUaGVcbiAqIGVuZHBvaW50IHJlY2VpdmVzIG11bHRpcGFydC9mb3JtLWRhdGEgd2l0aCB0aGUgaW1hZ2UgaW4gYSBwYXJ0IG5hbWVkIFwiZmlsZVwiXG4gKiBhbmQgbXVzdCBhbnN3ZXIgd2l0aCBKU09OIGNvbnRhaW5pbmcgdGhlIHB1YmxpYyBcInVybFwiIG9mIHRoZSBzdG9yZWQgaW1hZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckltYWdlVXBsb2FkKGVkaXRvcjogRWRpdG9yLCB1cGxvYWRVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHVwbG9hZDogSW1hZ2VDYWxsYmFjayA9IChmaWxlOiB7IGF0dGFjaG1lbnRzOiBGaWxlW10gfSwgZG9uZTogKHJlc3VsdDogb2JqZWN0KSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gZmlsZS5hdHRhY2htZW50c1swXTtcbiAgICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICAgICAgZG9uZSh7IGFib3J0OiB0cnVlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgYm9keS5hcHBlbmQoXCJmaWxlXCIsIGltYWdlLCBpbWFnZS5uYW1lKTtcblxuICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwIH0pO1xuICAgICAgICBmZXRjaCh1cGxvYWRVcmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczogeyBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLCAuLi5jc3JmSGVhZGVycygpIH0sXG4gICAgICAgICAgICBib2R5XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwbG9hZCBmYWlsZWQgd2l0aCBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiB7IHVybD86IHVua25vd24gfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YT8udXJsICE9PSBcInN0cmluZ1wiIHx8ICFkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwbG9hZCByZXNwb25zZSBoYXMgbm8gXCJ1cmxcIicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb25lKHsgcHJvZ3Jlc3M6IDEwMCwgdXJsOiBkYXRhLnVybCB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGU6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlYWN0RW1haWxFZGl0b3I6IGltYWdlIHVwbG9hZCBmYWlsZWQuXCIsIGUpO1xuICAgICAgICAgICAgICAgIGRvbmUoeyBlcnJvcjogZS5tZXNzYWdlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcbiAgICBlZGl0b3IucmVnaXN0ZXJDYWxsYmFjayhcImltYWdlXCIsIHVwbG9hZCk7XG59XG4iLCJpbXBvcnQgeyBMaXN0RXhwcmVzc2lvblZhbHVlLCBMaXN0VmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG5leHBvcnQgdHlwZSBNZXJnZVRhZ3MgPSBSZWNvcmQ8c3RyaW5nLCB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgc2FtcGxlPzogc3RyaW5nIH0+O1xuXG4vKipcbiAqIFR1cm4gdGhlIG1lcmdlIHRhZyBkYXRhc291cmNlIGludG8gVW5sYXllcidzIG1lcmdlIHRhZyBtYXAuIFJldHVybnMgdW5kZWZpbmVkXG4gKiB3aGlsZSB0aGUgbGlzdCBpcyBsb2FkaW5nLCBzbyB0aGUgZWRpdG9yIGtlZXBzIHdoYXQgaXQgaGFzIHVudGlsIHRoZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1lcmdlVGFncyhcbiAgICBzb3VyY2U6IExpc3RWYWx1ZSB8IHVuZGVmaW5lZCxcbiAgICBuYW1lOiBMaXN0RXhwcmVzc2lvblZhbHVlPHN0cmluZz4gfCB1bmRlZmluZWQsXG4gICAgdmFsdWU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZCxcbiAgICBzYW1wbGU6IExpc3RFeHByZXNzaW9uVmFsdWU8c3RyaW5nPiB8IHVuZGVmaW5lZFxuKTogTWVyZ2VUYWdzIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXNvdXJjZSB8fCAhbmFtZSB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS5zdGF0dXMgIT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZSB8fCAhc291cmNlLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHRhZ3M6IE1lcmdlVGFncyA9IHt9O1xuICAgIHNvdXJjZS5pdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB0YWdOYW1lID0gbmFtZS5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhZ1ZhbHVlID0gdmFsdWUuZ2V0KGl0ZW0pLnZhbHVlO1xuICAgICAgICBpZiAoIXRhZ05hbWUgfHwgIXRhZ1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFnU2FtcGxlID0gc2FtcGxlPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgICAgIHRhZ3NbYHRhZ18ke2luZGV4fWBdID0gdGFnU2FtcGxlXG4gICAgICAgICAgICA/IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlLCBzYW1wbGU6IHRhZ1NhbXBsZSB9XG4gICAgICAgICAgICA6IHsgbmFtZTogdGFnTmFtZSwgdmFsdWU6IHRhZ1ZhbHVlIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhZ3M7XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgT3B0aW9uIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcblxuLyoqXG4gKiBUaGUgYWN0aW9uIGFyZ3VtZW50cywgZXhhY3RseSBhcyBSZWFjdEVtYWlsRWRpdG9yLnhtbCBnZW5lcmF0ZXMgdGhlbSBpbnRvXG4gKiB0eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wcy5kLnRzLiBTcGVsbGluZyB0aGVtIG91dCBvbmNlIGtlZXBzIHRoaXMgZmlsZSBhbmRcbiAqIHRoZSBnZW5lcmF0ZWQgcHJvcHMgZnJvbSBkcmlmdGluZyBhcGFydC5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVBY3Rpb25BcmdzID0geyBodG1sX186IE9wdGlvbjxzdHJpbmc+OyBqc29uX186IE9wdGlvbjxzdHJpbmc+IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhckJ1dHRvbiB7XG4gICAgY2FwdGlvbjogc3RyaW5nO1xuICAgIGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPjtcbiAgICBvbkNsaWNrOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJQcm9wcyB7XG4gICAgLyoqIEZhbHNlIHVudGlsIHRoZSBlZGl0b3IgaGFzIGxvYWRlZDsgbm90aGluZyBjYW4gYmUgZXhwb3J0ZWQgYmVmb3JlIHRoYXQuICovXG4gICAgcmVhZHk6IGJvb2xlYW47XG4gICAgcmVhZE9ubHk6IGJvb2xlYW47XG4gICAgZXhwb3J0SHRtbD86IFRvb2xiYXJCdXR0b247XG4gICAgc2F2ZVRlbXBsYXRlPzogVG9vbGJhckJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gQWN0aW9uQnV0dG9uKHtcbiAgICBidXR0b24sXG4gICAgZGlzYWJsZWQsXG4gICAgY2xhc3NOYW1lXG59OiB7XG4gICAgYnV0dG9uOiBUb29sYmFyQnV0dG9uO1xuICAgIGRpc2FibGVkOiBib29sZWFuO1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbn0pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGJ1c3kgPSBidXR0b24uYWN0aW9uLmlzRXhlY3V0aW5nO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGJ1c3kgfHwgIWJ1dHRvbi5hY3Rpb24uY2FuRXhlY3V0ZX1cbiAgICAgICAgICAgIGFyaWEtYnVzeT17YnVzeX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2J1dHRvbi5vbkNsaWNrfVxuICAgICAgICA+XG4gICAgICAgICAgICB7YnV0dG9uLmNhcHRpb259XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb29sYmFyKHsgcmVhZHksIHJlYWRPbmx5LCBleHBvcnRIdG1sLCBzYXZlVGVtcGxhdGUgfTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHwgbnVsbCB7XG4gICAgLy8gU2F2aW5nIGZyb20gYSByZWFkLW9ubHkgZWRpdG9yIHdvdWxkIHN0b3JlIG5vdGhpbmcgdGhlIHVzZXIgY291bGQgY2hhbmdlLlxuICAgIGNvbnN0IHNob3dTYXZlID0gc2F2ZVRlbXBsYXRlICYmICFyZWFkT25seTtcbiAgICBpZiAoIWV4cG9ydEh0bWwgJiYgIXNob3dTYXZlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWVtYWlsLWVkaXRvci10b29sYmFyIHNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxuICAgICAgICAgICAge2V4cG9ydEh0bWwgJiYgPEFjdGlvbkJ1dHRvbiBidXR0b249e2V4cG9ydEh0bWx9IGRpc2FibGVkPXshcmVhZHl9IC8+fVxuICAgICAgICAgICAge3Nob3dTYXZlICYmIChcbiAgICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbj17c2F2ZVRlbXBsYXRlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlYWR5fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2V4cG9ydEh0bWwgPyBcInNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3JSZWYgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcbmltcG9ydCB7IGJ1aWxkT3B0aW9ucywgRWRpdG9yLCBwYXJzZUFkdmFuY2VkT3B0aW9ucywgcGFyc2VEZXNpZ24gfSBmcm9tIFwiLi4vdXRpbHMvZWRpdG9yT3B0aW9uc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJJbWFnZVVwbG9hZCB9IGZyb20gXCIuLi91dGlscy9pbWFnZVVwbG9hZFwiO1xuaW1wb3J0IHsgYnVpbGRNZXJnZVRhZ3MgfSBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VUYWdzXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZUFjdGlvbkFyZ3MsIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyXCI7XG5cbi8qKiBIb3cgbG9uZyB0byB3YWl0IGFmdGVyIHRoZSBsYXN0IGVkaXQgYmVmb3JlIHdyaXRpbmcgdG8gdGhlIGF0dHJpYnV0ZXMuICovXG5jb25zdCBTQVZFX09OX0NIQU5HRV9ERUxBWV9NUyA9IDUwMDtcblxudHlwZSBFeHBvcnRlZCA9IHsgaHRtbDogc3RyaW5nOyBqc29uOiBzdHJpbmcgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRvcldyYXBwZXIocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBKU09OVGVtcGxhdGUsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSwgYWR2YW5jZWRPcHRpb25zIH0gPSBwcm9wcztcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xuICAgIGNvbnN0IFtlZGl0b3IsIHNldEVkaXRvcl0gPSB1c2VTdGF0ZTxFZGl0b3IgfCBudWxsPihudWxsKTtcbiAgICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nPigpO1xuXG4gICAgLy8gVW5sYXllciBjYWxscyBoYW5kbGVycyByZWdpc3RlcmVkIG9uY2UgcGVyIGVkaXRvcjsgdGhleSByZWFkIHRoZSBsYXRlc3RcbiAgICAvLyBwcm9wcyB0aHJvdWdoIHRoaXMgcmVmIGluc3RlYWQgb2YgdGhlIHJlbmRlciB0aGV5IHdlcmUgY3JlYXRlZCBpbi5cbiAgICBjb25zdCBwcm9wc1JlZiA9IHVzZVJlZihwcm9wcyk7XG4gICAgcHJvcHNSZWYuY3VycmVudCA9IHByb3BzO1xuXG4gICAgLy8gVGhlIGxhc3QgZGVzaWduIHN0cmluZyB0aGUgZWRpdG9yIGxvYWRlZCBvciBwcm9kdWNlZC4gV2hlbiB0aGUgYXR0cmlidXRlXG4gICAgLy8gY2hhbmdlcyB0byB0aGlzIHZhbHVlIChiZWNhdXNlIHdlIHdyb3RlIGl0KSB0aGVyZSBpcyBub3RoaW5nIHRvIHJlbG9hZCwgYW5kXG4gICAgLy8gcmVsb2FkaW5nIHdvdWxkIHRocm93IGF3YXkgdGhlIHVzZXIncyB1bmRvIGhpc3RvcnkgYW5kIHNlbGVjdGlvbi5cbiAgICBjb25zdCBzeW5jZWRKc29uID0gdXNlUmVmPHN0cmluZz4oKTtcblxuICAgIGNvbnN0IHNhdmVUaW1lciA9IHVzZVJlZjxSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0Pj4oKTtcbiAgICAvLyBUaGUgZWRpdG9yIGlzIGRlc3Ryb3llZCBvbiB1bm1vdW50OyBhIHBlbmRpbmcgc2F2ZSB3b3VsZCBjYWxsIGludG8gaXQuXG4gICAgdXNlRWZmZWN0KCgpID0+ICgpID0+IGNsZWFyVGltZW91dChzYXZlVGltZXIuY3VycmVudCksIFtdKTtcblxuICAgIGNvbnN0IHJlYWRPbmx5ID0gSlNPTlRlbXBsYXRlLnJlYWRPbmx5O1xuXG4gICAgY29uc3QgeyBvcHRpb25zOiBhZHZhbmNlZCwgZXJyb3I6IG9wdGlvbnNFcnJvciB9ID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gcGFyc2VBZHZhbmNlZE9wdGlvbnMoYWR2YW5jZWRPcHRpb25zKSxcbiAgICAgICAgW2FkdmFuY2VkT3B0aW9uc11cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB1c2VNZW1vKFxuICAgICAgICAoKSA9PiBidWlsZE9wdGlvbnMoYWR2YW5jZWQsIHByb2plY3RJZCwgdGhlbWUsIGltYWdlVXBsb2FkTW9kZSksXG4gICAgICAgIFthZHZhbmNlZCwgcHJvamVjdElkLCB0aGVtZSwgaW1hZ2VVcGxvYWRNb2RlXVxuICAgICk7XG5cbiAgICBjb25zdCBleHBvcnREZXNpZ24gPSB1c2VDYWxsYmFjaygodW5sYXllcjogRWRpdG9yKTogUHJvbWlzZTxFeHBvcnRlZD4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB1bmxheWVyLmV4cG9ydEh0bWwoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGh0bWw6IGRhdGEuaHRtbCwganNvbjogSlNPTi5zdHJpbmdpZnkoZGF0YS5kZXNpZ24pIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcblxuICAgIC8qKiBXcml0ZSB0aGUgZGVzaWduIHRvIHRoZSBhdHRyaWJ1dGVzLCBpZiB0aGV5IGNhbiBiZSB3cml0dGVuLiAqL1xuICAgIGNvbnN0IHdyaXRlQXR0cmlidXRlcyA9IHVzZUNhbGxiYWNrKCh7IGh0bWwsIGpzb24gfTogRXhwb3J0ZWQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgeyBKU09OVGVtcGxhdGU6IGpzb25BdHRyLCBIVE1MQm9keTogaHRtbEF0dHIgfSA9IHByb3BzUmVmLmN1cnJlbnQ7XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb247XG4gICAgICAgIGlmICghanNvbkF0dHIucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGpzb25BdHRyLnNldFZhbHVlKGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChodG1sQXR0ciAmJiAhaHRtbEF0dHIucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGh0bWxBdHRyLnNldFZhbHVlKGh0bWwpO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgb25SZWFkeSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAodW5sYXllcjogRWRpdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGltYWdlVXBsb2FkVXJsIH0gPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKHByb3BzUmVmLmN1cnJlbnQuaW1hZ2VVcGxvYWRNb2RlID09PSBcImVuZHBvaW50XCIgJiYgaW1hZ2VVcGxvYWRVcmwpIHtcbiAgICAgICAgICAgICAgICByZWdpc3RlckltYWdlVXBsb2FkKHVubGF5ZXIsIGltYWdlVXBsb2FkVXJsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5sYXllci5hZGRFdmVudExpc3RlbmVyKFwiZGVzaWduOnVwZGF0ZWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBwcm9wc1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudC5zYXZlT25DaGFuZ2UgfHwgY3VycmVudC5KU09OVGVtcGxhdGUucmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2F2ZVRpbWVyLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHNhdmVUaW1lci5jdXJyZW50ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydERlc2lnbih1bmxheWVyKS50aGVuKHdyaXRlQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgfSwgU0FWRV9PTl9DSEFOR0VfREVMQVlfTVMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEEgbmV3IGVkaXRvciBzdGFydHMgYmxhbmssIHNvIHdoYXRldmVyIGl0IGhhZCBsb2FkZWQgaXMgZ29uZS5cbiAgICAgICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHNldEVkaXRvcih1bmxheWVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgW2V4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICAvLyBUaGUgZWRpdG9yIGlzIHJlY3JlYXRlZCB3aGVuIGl0cyBvcHRpb25zIGNoYW5nZTsgZm9yZ2V0IHRoZSBvbGQgb25lLlxuICAgIHVzZUVmZmVjdCgoKSA9PiBzZXRFZGl0b3IobnVsbCksIFtvcHRpb25zXSk7XG5cbiAgICAvLyBMb2FkIHRoZSBkZXNpZ24gZnJvbSB0aGUgYXR0cmlidXRlLCBvbmNlIHRoZSBlZGl0b3IgYW5kIHRoZSB2YWx1ZSBhcmUgcmVhZHkuXG4gICAgY29uc3QganNvblN0YXR1cyA9IEpTT05UZW1wbGF0ZS5zdGF0dXM7XG4gICAgY29uc3QganNvblZhbHVlID0gSlNPTlRlbXBsYXRlLnZhbHVlID8/IFwiXCI7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0b3IgfHwganNvblN0YXR1cyAhPT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQW4gZW1wdHkgdmFsdWUgbmV2ZXIgY2xlYXJzIHRoZSBlZGl0b3IuIEl0IGlzIHdoYXQgYSByb2xsYmFjayBvZiBhIG5ld1xuICAgICAgICAvLyBvYmplY3QgcHJvZHVjZXMsIGZvciBpbnN0YW5jZSB3aGVuIGEgcG9wLXVwIG9wZW5lZCBieSB0aGUgc2F2ZSBhY3Rpb24gaXNcbiAgICAgICAgLy8gY2xvc2VkLCBhbmQgY2xlYXJpbmcgd291bGQgdGhyb3cgYXdheSBldmVyeXRoaW5nIHRoZSB1c2VyIG1hZGUuXG4gICAgICAgIGlmIChqc29uVmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHNldExvYWRFcnJvcih1bmRlZmluZWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqc29uVmFsdWUgPT09IHN5bmNlZEpzb24uY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZEpzb24uY3VycmVudCA9IGpzb25WYWx1ZTtcbiAgICAgICAgY29uc3QgeyBkZXNpZ24sIGVycm9yIH0gPSBwYXJzZURlc2lnbihqc29uVmFsdWUpO1xuICAgICAgICBzZXRMb2FkRXJyb3IoZXJyb3IpO1xuICAgICAgICBpZiAoZGVzaWduKSB7XG4gICAgICAgICAgICBlZGl0b3IubG9hZERlc2lnbihkZXNpZ24gYXMgUGFyYW1ldGVyczxFZGl0b3JbXCJsb2FkRGVzaWduXCJdPlswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBSZWFjdEVtYWlsRWRpdG9yOiAke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwganNvblN0YXR1cywganNvblZhbHVlXSk7XG5cbiAgICAvLyBSZWFkLW9ubHk6IHNob3cgdGhlIGRlc2lnbiBhcyBhIHByZXZpZXcgcmF0aGVyIHRoYW4gYW4gZWRpdG9yLlxuICAgIGNvbnN0IHByZXZpZXdTaG93biA9IHVzZVJlZihmYWxzZSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWRPbmx5ICYmICFwcmV2aWV3U2hvd24uY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dQcmV2aWV3KFwiZGVza3RvcFwiKTtcbiAgICAgICAgICAgIHByZXZpZXdTaG93bi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZE9ubHkgJiYgcHJldmlld1Nob3duLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5oaWRlUHJldmlldygpO1xuICAgICAgICAgICAgcHJldmlld1Nob3duLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIFtlZGl0b3IsIHJlYWRPbmx5XSk7XG5cbiAgICBjb25zdCBsb2NhbGUgPSBwcm9wcy5sb2NhbGU/LnZhbHVlO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRMb2NhbGUobG9jYWxlIHx8IG51bGwpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbG9jYWxlXSk7XG5cbiAgICAvLyBNZW5kaXggaGFuZHMgb3V0IG5ldyBsaXN0IG9iamVjdHMgb24gcmUtcmVuZGVyczsgY29tcGFyZSBieSBjb250ZW50IHNvIHRoZVxuICAgIC8vIGVkaXRvciBpcyBvbmx5IHRvbGQgd2hlbiB0aGUgdGFncyByZWFsbHkgY2hhbmdlLlxuICAgIGNvbnN0IG1lcmdlVGFncyA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBidWlsZE1lcmdlVGFncyhwcm9wcy5tZXJnZVRhZ3MsIHByb3BzLm1lcmdlVGFnTmFtZSwgcHJvcHMubWVyZ2VUYWdWYWx1ZSwgcHJvcHMubWVyZ2VUYWdTYW1wbGUpID8/IG51bGxcbiAgICApO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChlZGl0b3IgJiYgbWVyZ2VUYWdzICE9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldE1lcmdlVGFncyhKU09OLnBhcnNlKG1lcmdlVGFncykpO1xuICAgICAgICB9XG4gICAgfSwgW2VkaXRvciwgbWVyZ2VUYWdzXSk7XG5cbiAgICBjb25zdCBydW5BY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAgICAgYXN5bmMgKGFjdGlvbjogQWN0aW9uVmFsdWU8VGVtcGxhdGVBY3Rpb25BcmdzPiwgd3JpdGU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBhd2FpdCBleHBvcnREZXNpZ24oZWRpdG9yKTtcbiAgICAgICAgICAgIGlmICh3cml0ZSkge1xuICAgICAgICAgICAgICAgIHdyaXRlQXR0cmlidXRlcyhleHBvcnRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKHsgaHRtbF9fOiBleHBvcnRlZC5odG1sLCBqc29uX186IGV4cG9ydGVkLmpzb24gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtlZGl0b3IsIGV4cG9ydERlc2lnbiwgd3JpdGVBdHRyaWJ1dGVzXVxuICAgICk7XG5cbiAgICBjb25zdCBlcnJvciA9IG9wdGlvbnNFcnJvciA/PyBsb2FkRXJyb3I7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInJlYWN0LWVtYWlsLWVkaXRvci1kaXZcIiwgcHJvcHMuY2xhc3MpfSBzdHlsZT17cHJvcHMuc3R5bGV9PlxuICAgICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgICAgICByZWFkeT17ZWRpdG9yICE9PSBudWxsfVxuICAgICAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgICAgICBleHBvcnRIdG1sPXtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuaXNTaG93RXhwb3J0SHRtbCAmJiBwcm9wcy5leHBvcnRIVE1MQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLmV4cG9ydEh0bWxDYXB0aW9uPy52YWx1ZSB8fCBcIkV4cG9ydCBIVE1MXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHByb3BzLmV4cG9ydEhUTUxBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuZXhwb3J0SFRNTEFjdGlvbiEsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGU9e1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5pc1Nob3dTYXZlVGVtcGxhdGUgJiYgcHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BzLnNhdmVUZW1wbGF0ZUNhcHRpb24/LnZhbHVlIHx8IFwiU2F2ZSBUZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBwcm9wcy5zYXZlVGVtcGxhdGVBY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBydW5BY3Rpb24ocHJvcHMuc2F2ZVRlbXBsYXRlQWN0aW9uISwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxuICAgICAgICAgICAgICAgIG1pbkhlaWdodD17cHJvcHMuZWRpdG9ySGVpZ2h0IHx8IFwiNzAwcHhcIn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVkaXRvcldyYXBwZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VkaXRvcldyYXBwZXJcIjtcblxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XG5cbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RW1haWxFZGl0b3IocHJvcHM6IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxFZGl0b3JXcmFwcGVyIHsuLi5wcm9wc30gLz47XG59XG4iXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiX191bmxheWVyX2xhc3RFZGl0b3JJZCIsInVzZUNvdW50ZXJFZGl0b3JJZCIsInVzZU1lbW8iLCJ1c2VHZW5lcmF0ZWRFZGl0b3JJZCIsIlJlYWN0IiwidXNlSWQiLCJyZXBsYWNlIiwiRW1haWxFZGl0b3JJbm5lciIsInByb3BzIiwicmVmIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsIl9mIiwiX2ciLCJfaCIsIl9pIiwib25Mb2FkIiwib25SZWFkeSIsInNjcmlwdFVybCIsIm1pbkhlaWdodCIsInN0eWxlIiwiZWRpdG9yIiwic2V0RWRpdG9yIiwidXNlU3RhdGUiLCJoYXNMb2FkZWRFbWJlZFNjcmlwdCIsInNldEhhc0xvYWRlZEVtYmVkU2NyaXB0IiwiZ2VuZXJhdGVkSWQiLCJlZGl0b3JJZCIsIm9wdGlvbnMiLCJhcHBlYXJhbmNlIiwiZGlzcGxheU1vZGUiLCJsb2NhbGUiLCJwcm9qZWN0SWQiLCJ0b29scyIsImlkIiwic291cmNlIiwibmFtZSIsInZlcnNpb24iLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwiZWRpdG9yUmVmIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3VycmVudCIsIl9hMiIsImRlc3Ryb3kiLCJsb2FkU2NyaXB0IiwidW5sYXllciIsImNyZWF0ZUVkaXRvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXRob2RQcm9wcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJwcm9wTmFtZSIsInRlc3QiLCJmb3JFYWNoIiwibWV0aG9kUHJvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJqb2luIiwiY3JlYXRlRWxlbWVudCIsImZsZXgiLCJkaXNwbGF5IiwiRW1haWxFZGl0b3IiLCJmb3J3YXJkUmVmIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcHBlbmRDbGFzcyIsInBhcnNlVmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJhcHBseSIsInRvU3RyaW5nIiwicHJvdG90eXBlIiwiaW5jbHVkZXMiLCJrZXkiLCJjYWxsIiwidmFsdWUiLCJuZXdDbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0IiwidXNlQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWNBLElBQU1BLEdBQUEsR0FDSixPQUFPQyxNQUFBLEtBQVcsV0FBYyxHQUFBO0VBQUVDLEVBQUFBLHNCQUFBLEVBQXdCLENBQUE7RUFBRSxDQUFBLEdBQUlELE1BQUEsQ0FBQTtFQUNsRUQsR0FBQSxDQUFJRSxzQkFBQSxHQUF5QkYsR0FBQSxDQUFJRSxzQkFBQSxJQUEwQixDQUFBLENBQUE7RUFNM0QsSUFBTUMsa0JBQUEsR0FBcUJBLE1BQ3pCQyxhQUFBLENBQVEsTUFBTSxDQUFBLE9BQUEsRUFBVSxFQUFFSixHQUFBLENBQUlFLHNCQUFzQixJQUFJLEVBQUUsQ0FBQSxDQUFBO0VBUTVELElBQU1HLG9CQUFBLEdBQ0osT0FBT0MsS0FBQSxDQUFNQyxLQUFBLEtBQVUsVUFBQTtFQUFBO0VBRW5CLE1BQU0sQ0FBVUQsT0FBQUEsRUFBQUEsS0FBQSxDQUFNQyxLQUFBLEVBQU0sQ0FBRUMsT0FBQSxDQUFRLElBQU0sRUFBQSxFQUFFLENBQUMsQ0FBQSxDQUFBLEdBQy9DTCxrQkFBQSxDQUFBO0VBRU4sU0FBU00sZ0JBR1BDLENBQUFBLEtBQUEsRUFDQUMsR0FBQSxFQUNBO0VBMUNGLEVBQUEsSUFBQUMsRUFBQSxFQUFBQyxFQUFBLEVBQUFDLEVBQUEsRUFBQUMsRUFBQSxFQUFBQyxFQUFBLEVBQUFDLEVBQUEsRUFBQUMsRUFBQSxFQUFBQyxFQUFBLEVBQUFDLEVBQUEsQ0FBQTtJQTJDRSxNQUFNO01BQUVDLE1BQUE7TUFBUUMsT0FBQTtNQUFTQyxTQUFBO0VBQVdDLElBQUFBLFNBQUEsR0FBWSxHQUFBO0VBQUtDLElBQUFBLEtBQUEsR0FBUSxFQUFDO0VBQUUsR0FBQSxHQUFJZixLQUFBLENBQUE7RUFFcEUsRUFBQSxNQUFNLENBQUNnQixNQUFBLEVBQVFDLFNBQVMsQ0FBSUMsR0FBQUEsY0FBQSxDQUMxQixJQUNGLENBQUEsQ0FBQTtFQUVBLEVBQUEsTUFBTSxDQUFDQyxvQkFBQSxFQUFzQkMsdUJBQXVCLENBQUlGLEdBQUFBLGNBQUEsQ0FBUyxLQUFLLENBQUEsQ0FBQTtJQUl0RSxNQUFNRyxXQUFBLEdBQWMxQixvQkFBQSxFQUFxQixDQUFBO0VBQ3pDLEVBQUEsTUFBTTJCLFFBQUEsR0FBV3RCLEtBQUEsQ0FBTXNCLFFBQUEsSUFBWUQsV0FBQSxDQUFBO0VBRW5DLEVBQUEsTUFBTUUsT0FBQSxHQUFVO0VBQ2QsSUFBQSxJQUFJdkIsS0FBQSxDQUFNdUIsT0FBQSxJQUFXLEVBQUMsQ0FBQTtFQUN0QkMsSUFBQUEsVUFBQSxHQUFZckIsRUFBQSxHQUFBSCxLQUFBLENBQU13QixVQUFBLEtBQU4sSUFBQXJCLEdBQUFBLEVBQUEsSUFBb0JELEVBQUEsR0FBQUYsS0FBQSxDQUFNdUIsT0FBQSxLQUFOLElBQUFyQixHQUFBQSxLQUFBQSxDQUFBQSxHQUFBQSxFQUFBLENBQWVzQixVQUFBO0VBQy9DQyxJQUFBQSxXQUFBLEdBQ0V6QixLQUFBLElBQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBQSxLQUFBLENBQU95QixXQUFBLE1BQWVyQixDQUFBQSxFQUFBLEdBQUFKLEtBQUEsQ0FBTXVCLE9BQUEsS0FBTixnQkFBQW5CLEVBQUEsQ0FBZXFCLFdBQUEsQ0FBZ0IsSUFBQSxPQUFBO0VBQ3ZEQyxJQUFBQSxNQUFBLEdBQVFwQixFQUFBLEdBQUFOLEtBQUEsQ0FBTTBCLE1BQUEsS0FBTixJQUFBcEIsR0FBQUEsRUFBQSxJQUFnQkQsRUFBQSxHQUFBTCxLQUFBLENBQU11QixPQUFBLEtBQU4sSUFBQWxCLEdBQUFBLEtBQUFBLENBQUFBLEdBQUFBLEVBQUEsQ0FBZXFCLE1BQUE7RUFDdkNDLElBQUFBLFNBQUEsR0FBV25CLEVBQUEsR0FBQVIsS0FBQSxDQUFNMkIsU0FBQSxLQUFOLElBQUFuQixHQUFBQSxFQUFBLElBQW1CRCxFQUFBLEdBQUFQLEtBQUEsQ0FBTXVCLE9BQUEsS0FBTixJQUFBaEIsR0FBQUEsS0FBQUEsQ0FBQUEsR0FBQUEsRUFBQSxDQUFlb0IsU0FBQTtFQUM3Q0MsSUFBQUEsS0FBQSxHQUFPbEIsRUFBQSxHQUFBVixLQUFBLENBQU00QixLQUFBLEtBQU4sSUFBQWxCLEdBQUFBLEVBQUEsSUFBZUQsRUFBQSxHQUFBVCxLQUFBLENBQU11QixPQUFBLEtBQU4sSUFBQWQsR0FBQUEsS0FBQUEsQ0FBQUEsR0FBQUEsRUFBQSxDQUFlbUIsS0FBQTtFQUVyQ0MsSUFBQUEsRUFBQSxFQUFJUCxRQUFBO0VBQ0pRLElBQUFBLE1BQUEsRUFBUTtRQUNOQyxJQUFBO0VBQ0FDLE1BQUFBLE9BQUFBO0VBQ0YsS0FBQTtFQUNGLEdBQUEsQ0FBQTtJQUVBQyx5QkFBQSxDQUNFaEMsR0FBQSxFQUNBLE9BQU87RUFDTGUsSUFBQUEsTUFBQUE7S0FFRixDQUFBLEVBQUEsQ0FBQ0EsTUFBTSxDQUNULENBQUEsQ0FBQTtFQUlBLEVBQUEsTUFBTWtCLFNBQUEsR0FBWUMsWUFBQSxDQUFPbkIsTUFBTSxDQUFBLENBQUE7RUFDL0JvQixFQUFBQSxlQUFBLENBQVUsTUFBTTtNQUNkRixTQUFBLENBQVVHLE9BQUEsR0FBVXJCLE1BQUEsQ0FBQTtLQUNuQixFQUFBLENBQUNBLE1BQU0sQ0FBQyxDQUFBLENBQUE7RUFFWG9CLEVBQUFBLGVBQUEsQ0FBVSxNQUFNO0VBQ2QsSUFBQSxPQUFPLE1BQU07RUF4RmpCLE1BQUEsSUFBQUUsR0FBQSxDQUFBO1FBeUZNLENBQUFBLEdBQUEsR0FBQUosU0FBQSxDQUFVRyxPQUFBLEtBQVYsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBQyxHQUFBLENBQW1CQyxPQUFBLEVBQUEsQ0FBQTtFQUNyQixLQUFBLENBQUE7RUFDRixHQUFBLEVBQUcsRUFBRSxDQUFBLENBQUE7RUFFTEgsRUFBQUEsZUFBQSxDQUFVLE1BQU07RUFDZGhCLElBQUFBLHVCQUFBLENBQXdCLEtBQUssQ0FBQSxDQUFBO0VBQzdCb0IsSUFBQUEsVUFBQSxDQUFXLE1BQU1wQix1QkFBQSxDQUF3QixJQUFJLEdBQUdQLFNBQVMsQ0FBQSxDQUFBO0tBQ3hELEVBQUEsQ0FBQ0EsU0FBUyxDQUFDLENBQUEsQ0FBQTtFQUVkdUIsRUFBQUEsZUFBQSxDQUFVLE1BQU07TUFDZCxJQUFJLENBQUNqQixvQkFBQSxFQUFzQixPQUFBO01BQzNCSCxNQUFBLElBQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBQSxNQUFBLENBQVF1QixPQUFBLEVBQUEsQ0FBQTtFQUNSdEIsSUFBQUEsU0FBQSxDQUFVd0IsT0FBQSxDQUFRQyxZQUFBLENBQWFuQixPQUFPLENBQUMsQ0FBQSxDQUFBO0tBQ3RDLEVBQUEsQ0FBQ29CLElBQUEsQ0FBS0MsU0FBQSxDQUFVckIsT0FBTyxDQUFBLEVBQUdKLG9CQUFvQixDQUFDLENBQUEsQ0FBQTtFQUVsRCxFQUFBLE1BQU0wQixXQUFBLEdBQWNDLE1BQUEsQ0FBT0MsSUFBQSxDQUFLL0MsS0FBSyxDQUFBLENBQUVnRCxNQUFBLENBQVFDLFFBQUEsSUFDN0MsS0FBQSxDQUFNQyxJQUFBLENBQUtELFFBQVEsQ0FDckIsQ0FBQSxDQUFBO0VBQ0FiLEVBQUFBLGVBQUEsQ0FBVSxNQUFNO01BQ2QsSUFBSSxDQUFDcEIsTUFBQSxFQUFRLE9BQUE7TUFFYkwsTUFBQSxJQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQUEsTUFBQSxDQUFTSyxNQUFBLENBQUEsQ0FBQTtFQUdUNkIsSUFBQUEsV0FBQSxDQUFZTSxPQUFBLENBQVNDLFVBQUEsSUFBZTtFQUNsQyxNQUFBLElBQ0UsTUFBTUYsSUFBQSxDQUFLRSxVQUFVLENBQUEsSUFDckJBLFVBQUEsS0FBZSxRQUFBLElBQ2ZBLFVBQUEsS0FBZSxhQUNmLE9BQU9wRCxLQUFBLENBQU1vRCxVQUFVLE1BQU0sVUFDN0IsRUFBQTtVQUNBcEMsTUFBQSxDQUFPcUMsZ0JBQUEsQ0FBaUJELFVBQUEsRUFBWXBELEtBQUEsQ0FBTW9ELFVBQVUsQ0FBQyxDQUFBLENBQUE7RUFDdkQsT0FBQTtPQUNELENBQUEsQ0FBQTtFQUVELElBQUEsSUFBSXhDLE9BQUEsRUFBUztFQUNYSSxNQUFBQSxNQUFBLENBQU9xQyxnQkFBQSxDQUFpQixjQUFBLEVBQWdCLE1BQU07RUFDNUN6QyxRQUFBQSxPQUFBLENBQVFJLE1BQU0sQ0FBQSxDQUFBO1NBQ2YsQ0FBQSxDQUFBO0VBQ0gsS0FBQTtLQUNDLEVBQUEsQ0FBQ0EsTUFBQSxFQUFRNkIsV0FBQSxDQUFZUyxJQUFBLENBQUssR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFBO0VBRWxDLEVBQUEsc0JBQ0UxRCxLQUFBLENBQUEyRCxhQUFBLENBQUMsS0FBQSxFQUFBO0VBQ0N4QyxJQUFBQSxLQUFBLEVBQU87RUFDTHlDLE1BQUFBLElBQUEsRUFBTSxDQUFBO0VBQ05DLE1BQUFBLE9BQUEsRUFBUyxNQUFBO0VBQ1QzQyxNQUFBQSxTQUFBQTtFQUNGLEtBQUE7RUFBQSxHQUFBLGlCQUVBbEIsS0FBQSxDQUFBMkQsYUFBQSxDQUFDLEtBQUEsRUFBQTtFQUFJMUIsSUFBQUEsRUFBQSxFQUFJUCxRQUFBO0VBQVVQLElBQUFBLEtBQUEsRUFBTztFQUFFLE1BQUEsR0FBR0EsS0FBQTtFQUFPeUMsTUFBQUEsSUFBQSxFQUFNLENBQUE7RUFBRSxLQUFBO0VBQUEsR0FBRyxDQUNuRCxDQUFBLENBQUE7RUFFSixDQUFBO0VBRU8sSUFBTUUsV0FBQSxHQUFjOUQsS0FBQSxDQUFNK0QsVUFBQSxDQUFXNUQsZ0JBQWdCLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDM0k1RDs7RUFFQyxFQUFBLENBQVksWUFBQTs7RUFHWixJQUFBLElBQUk2RCxNQUFNLEdBQUcsRUFBRSxDQUFDQyxjQUFjLENBQUE7TUFFOUIsU0FBU0MsVUFBVUEsR0FBSTtRQUN0QixJQUFJQyxPQUFPLEdBQUcsRUFBRSxDQUFBO0VBRWhCLE1BQUEsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBTSxFQUFFRixDQUFDLEVBQUUsRUFBRTtFQUMxQyxRQUFBLElBQUlHLEdBQUcsR0FBR0YsU0FBUyxDQUFDRCxDQUFDLENBQUMsQ0FBQTtVQUN0QixJQUFJRyxHQUFHLEVBQUU7WUFDUkosT0FBTyxHQUFHSyxXQUFXLENBQUNMLE9BQU8sRUFBRU0sVUFBVSxDQUFDRixHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQ2hELFNBQUE7RUFDRCxPQUFBO0VBRUEsTUFBQSxPQUFPSixPQUFPLENBQUE7RUFDZixLQUFBO01BRUEsU0FBU00sVUFBVUEsQ0FBRUYsR0FBRyxFQUFFO1FBQ3pCLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPQSxHQUFHLEtBQUssUUFBUSxFQUFFO0VBQ3ZELFFBQUEsT0FBT0EsR0FBRyxDQUFBO0VBQ1gsT0FBQTtFQUVBLE1BQUEsSUFBSSxPQUFPQSxHQUFHLEtBQUssUUFBUSxFQUFFO0VBQzVCLFFBQUEsT0FBTyxFQUFFLENBQUE7RUFDVixPQUFBO0VBRUEsTUFBQSxJQUFJRyxLQUFLLENBQUNDLE9BQU8sQ0FBQ0osR0FBRyxDQUFDLEVBQUU7VUFDdkIsT0FBT0wsVUFBVSxDQUFDVSxLQUFLLENBQUMsSUFBSSxFQUFFTCxHQUFHLENBQUMsQ0FBQTtFQUNuQyxPQUFBO1FBRUEsSUFBSUEsR0FBRyxDQUFDTSxRQUFRLEtBQUszQixNQUFNLENBQUM0QixTQUFTLENBQUNELFFBQVEsSUFBSSxDQUFDTixHQUFHLENBQUNNLFFBQVEsQ0FBQ0EsUUFBUSxFQUFFLENBQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtFQUNyRyxRQUFBLE9BQU9SLEdBQUcsQ0FBQ00sUUFBUSxFQUFFLENBQUE7RUFDdEIsT0FBQTtRQUVBLElBQUlWLE9BQU8sR0FBRyxFQUFFLENBQUE7RUFFaEIsTUFBQSxLQUFLLElBQUlhLEdBQUcsSUFBSVQsR0FBRyxFQUFFO0VBQ3BCLFFBQUEsSUFBSVAsTUFBTSxDQUFDaUIsSUFBSSxDQUFDVixHQUFHLEVBQUVTLEdBQUcsQ0FBQyxJQUFJVCxHQUFHLENBQUNTLEdBQUcsQ0FBQyxFQUFFO0VBQ3RDYixVQUFBQSxPQUFPLEdBQUdLLFdBQVcsQ0FBQ0wsT0FBTyxFQUFFYSxHQUFHLENBQUMsQ0FBQTtFQUNwQyxTQUFBO0VBQ0QsT0FBQTtFQUVBLE1BQUEsT0FBT2IsT0FBTyxDQUFBO0VBQ2YsS0FBQTtFQUVBLElBQUEsU0FBU0ssV0FBV0EsQ0FBRVUsS0FBSyxFQUFFQyxRQUFRLEVBQUU7UUFDdEMsSUFBSSxDQUFDQSxRQUFRLEVBQUU7RUFDZCxRQUFBLE9BQU9ELEtBQUssQ0FBQTtFQUNiLE9BQUE7UUFFQSxJQUFJQSxLQUFLLEVBQUU7RUFDVixRQUFBLE9BQU9BLEtBQUssR0FBRyxHQUFHLEdBQUdDLFFBQVEsQ0FBQTtFQUM5QixPQUFBO1FBRUEsT0FBT0QsS0FBSyxHQUFHQyxRQUFRLENBQUE7RUFDeEIsS0FBQTtNQUVBLElBQXFDQyxNQUFNLENBQUNDLE9BQU8sRUFBRTtRQUNwRG5CLFVBQVUsQ0FBQ29CLE9BQU8sR0FBR3BCLFVBQVUsQ0FBQTtRQUMvQmtCLGlCQUFpQmxCLFVBQVUsQ0FBQTtFQUM1QixLQUFDLE1BS007UUFDTnZFLE1BQU0sQ0FBQ3VFLFVBQVUsR0FBR0EsVUFBVSxDQUFBO0VBQy9CLEtBQUE7RUFDRCxHQUFDLEdBQUUsQ0FBQTs7Ozs7Ozs7RUN0RUg7OztFQUdHO0VBQ0csU0FBVSxvQkFBb0IsQ0FBQyxJQUF3QixFQUFBO01BQ3pELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7RUFDdkIsUUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO09BQzFCO0VBQ0QsSUFBQSxJQUFJO1VBQ0EsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNoQyxRQUFBLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Y0FDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlDQUF5QyxFQUFFLENBQUM7V0FDNUU7RUFDRCxRQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDOUI7TUFBQyxPQUFPLENBQUMsRUFBRTtFQUNSLFFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUEscUNBQUEsRUFBeUMsQ0FBVyxDQUFDLE9BQU8sQ0FBQSxDQUFFLEVBQUUsQ0FBQztPQUNqRztFQUNMLENBQUM7RUFFRDs7OztFQUlHO0VBQ0csU0FBVSxZQUFZLENBQ3hCLFFBQXVCLEVBQ3ZCLFNBQWlCLEVBQ2pCLEtBQWdCLEVBQ2hCLGVBQW9DLEVBQUE7RUFFcEMsSUFBQSxNQUFNLE9BQU8sR0FBa0I7RUFDM0IsUUFBQSxHQUFHLFFBQVE7VUFDWCxVQUFVLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFO09BQ2hELENBQUM7RUFDRixJQUFBLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtFQUNmLFFBQUEsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7T0FDakM7RUFDRCxJQUFBLElBQUksZUFBZSxLQUFLLFVBQVUsRUFBRTtFQUNoQyxRQUFBLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO09BQ25FO0VBQ0QsSUFBQSxPQUFPLE9BQU8sQ0FBQztFQUNuQixDQUFDO0VBSUssU0FBVSxXQUFXLENBQUMsSUFBWSxFQUFBO0VBQ3BDLElBQUEsSUFBSTtVQUNBLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDaEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7RUFDdkMsWUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLDBDQUEwQyxFQUFFLENBQUM7V0FDaEU7VUFDRCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDckI7TUFBQyxPQUFPLENBQUMsRUFBRTtVQUNSLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQSxzQ0FBQSxFQUEwQyxDQUFXLENBQUMsT0FBTyxDQUFFLENBQUEsRUFBRSxDQUFDO09BQ3JGO0VBQ0w7O0VDbkRBOzs7RUFHRztFQUNILFNBQVMsV0FBVyxHQUFBO0VBQ2hCLElBQUEsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0VBQzNELElBQUEsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ3RFLENBQUM7RUFFRDs7OztFQUlHO0VBQ2EsU0FBQSxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBQTtFQUNqRSxJQUFBLE1BQU0sTUFBTSxHQUFrQixDQUFDLElBQTZCLEVBQUUsSUFBOEIsS0FBSTtVQUM1RixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUU7RUFDUixZQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2NBQ3RCLE9BQU87V0FDVjtFQUNELFFBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztVQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBRXZDLFFBQUEsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7VUFDdkIsS0FBSyxDQUFDLFNBQVMsRUFBRTtFQUNiLFlBQUEsTUFBTSxFQUFFLE1BQU07RUFDZCxZQUFBLFdBQVcsRUFBRSxhQUFhO2NBQzFCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxHQUFHLFdBQVcsRUFBRSxFQUFFO2NBQ3pELElBQUk7V0FDUCxDQUFDO2VBQ0csSUFBSSxDQUFDLFFBQVEsSUFBRztFQUNiLFlBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7a0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFBLHdCQUFBLEVBQTJCLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQSxDQUFDLENBQUM7ZUFDakU7RUFDRCxZQUFBLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0VBQzNCLFNBQUMsQ0FBQztFQUNELGFBQUEsSUFBSSxDQUFDLENBQUMsSUFBdUIsS0FBSTtFQUM5QixZQUFBLElBQUksT0FBTyxJQUFJLEVBQUUsR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7RUFDNUMsZ0JBQUEsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2VBQ25EO0VBQ0QsWUFBQSxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztFQUMzQyxTQUFDLENBQUM7RUFDRCxhQUFBLEtBQUssQ0FBQyxDQUFDLENBQVEsS0FBSTtFQUNoQixZQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Y0FDM0QsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQy9CLFNBQUMsQ0FBQyxDQUFDO0VBQ1gsS0FBQyxDQUFDO0VBQ0YsSUFBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQzdDOztFQ3ZEQTs7O0VBR0c7RUFDRyxTQUFVLGNBQWMsQ0FDMUIsTUFBNkIsRUFDN0IsSUFBNkMsRUFDN0MsS0FBOEMsRUFDOUMsTUFBK0MsRUFBQTtNQUUvQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0VBQzVCLFFBQUEsT0FBTyxTQUFTLENBQUM7T0FDcEI7TUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQTBCLFdBQUEsZ0NBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO0VBQzFELFFBQUEsT0FBTyxTQUFTLENBQUM7T0FDcEI7TUFDRCxNQUFNLElBQUksR0FBYyxFQUFFLENBQUM7TUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFJO1VBQ2pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1VBQ3JDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO0VBQ3ZDLFFBQUEsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtjQUN2QixPQUFPO1dBQ1Y7VUFDRCxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztFQUMxQyxRQUFBLElBQUksQ0FBQyxDQUFPLElBQUEsRUFBQSxLQUFLLENBQUUsQ0FBQSxDQUFDLEdBQUcsU0FBUztFQUM1QixjQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7Z0JBQ3JELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7RUFDN0MsS0FBQyxDQUFDLENBQUM7RUFDSCxJQUFBLE9BQU8sSUFBSSxDQUFDO0VBQ2hCOztFQ1JBLFNBQVMsWUFBWSxDQUFDLEVBQ2xCLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUtaLEVBQUE7RUFDRyxJQUFBLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0VBQ3ZDLElBQUEsUUFDSSxLQUNJLENBQUEsYUFBQSxDQUFBLFFBQUEsRUFBQSxFQUFBLElBQUksRUFBQyxRQUFRLEVBQ2IsU0FBUyxFQUFFLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSxTQUFTLENBQUMsRUFDN0QsUUFBUSxFQUFFLFFBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBQSxXQUFBLEVBQzVDLElBQUksRUFDZixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFFdEIsRUFBQSxNQUFNLENBQUMsT0FBTyxDQUNWLEVBQ1g7RUFDTixDQUFDO0VBRUssU0FBVSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWdCLEVBQUE7O0VBRS9FLElBQUEsTUFBTSxRQUFRLEdBQUcsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQzNDLElBQUEsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFFBQVEsRUFBRTtFQUMxQixRQUFBLE9BQU8sSUFBSSxDQUFDO09BQ2Y7RUFDRCxJQUFBLFFBQ0ksS0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBSyxTQUFTLEVBQUMsd0RBQXdELEVBQUE7RUFDbEUsUUFBQSxVQUFVLElBQUksS0FBQSxDQUFBLGFBQUEsQ0FBQyxZQUFZLEVBQUEsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBSSxDQUFBO0VBQ3BFLFFBQUEsUUFBUSxLQUNMLEtBQUMsQ0FBQSxhQUFBLENBQUEsWUFBWSxFQUNULEVBQUEsTUFBTSxFQUFFLFlBQVksRUFDcEIsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUNoQixTQUFTLEVBQUUsVUFBVSxHQUFHLDJCQUEyQixHQUFHLFNBQVMsRUFBQSxDQUNqRSxDQUNMLENBQ0MsRUFDUjtFQUNOOztFQ3ZEQTtFQUNBLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0VBSTlCLFNBQVUsYUFBYSxDQUFDLEtBQXFDLEVBQUE7RUFDL0QsSUFBQSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxHQUFHLEtBQUssQ0FBQztFQUNuRixJQUFBLE1BQU0sY0FBYyxHQUFHM0IsWUFBTSxDQUFZLElBQUksQ0FBQyxDQUFDO01BQy9DLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUdqQixjQUFRLENBQWdCLElBQUksQ0FBQyxDQUFDO01BQzFELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUdBLGNBQVEsRUFBVSxDQUFDOzs7RUFJckQsSUFBQSxNQUFNLFFBQVEsR0FBR2lCLFlBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMvQixJQUFBLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7O0VBS3pCLElBQUEsTUFBTSxVQUFVLEdBQUdBLFlBQU0sRUFBVSxDQUFDO0VBRXBDLElBQUEsTUFBTSxTQUFTLEdBQUdBLFlBQU0sRUFBaUMsQ0FBQzs7RUFFMUQsSUFBQUMsZUFBUyxDQUFDLE1BQU0sTUFBTSxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBRTNELElBQUEsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztNQUV2QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEdBQUcxQyxhQUFPLENBQ3RELE1BQU0sb0JBQW9CLENBQUMsZUFBZSxDQUFDLEVBQzNDLENBQUMsZUFBZSxDQUFDLENBQ3BCLENBQUM7RUFDRixJQUFBLE1BQU0sT0FBTyxHQUFHQSxhQUFPLENBQ25CLE1BQU0sWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxFQUMvRCxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUNoRCxDQUFDO0VBRUYsSUFBQSxNQUFNLFlBQVksR0FBR3lGLGlCQUFXLENBQUMsQ0FBQyxPQUFlLEtBQXVCO0VBQ3BFLFFBQUEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUc7RUFDekIsWUFBQSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksSUFBRztrQkFDdEIsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNwRSxhQUFDLENBQUMsQ0FBQztFQUNQLFNBQUMsQ0FBQyxDQUFDO09BQ04sRUFBRSxFQUFFLENBQUMsQ0FBQzs7TUFHUCxNQUFNLGVBQWUsR0FBR0EsaUJBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBWSxLQUFVO0VBQ25FLFFBQUEsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7RUFDeEUsUUFBQSxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztFQUMxQixRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO0VBQ3BCLFlBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUMzQjtFQUNELFFBQUEsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO0VBQ2hDLFlBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUMzQjtPQUNKLEVBQUUsRUFBRSxDQUFDLENBQUM7RUFFUCxJQUFBLE1BQU0sT0FBTyxHQUFHQSxpQkFBVyxDQUN2QixDQUFDLE9BQWUsS0FBSTtFQUNoQixRQUFBLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1VBQzVDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEtBQUssVUFBVSxJQUFJLGNBQWMsRUFBRTtFQUNuRSxZQUFBLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztXQUNoRDtFQUVELFFBQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLE1BQUs7RUFDNUMsWUFBQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO2NBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO2tCQUN4RCxPQUFPO2VBQ1Y7RUFDRCxZQUFBLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDaEMsWUFBQSxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFLO2tCQUNoQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2VBQy9DLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztFQUNoQyxTQUFDLENBQUMsQ0FBQzs7RUFHSCxRQUFBLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1VBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUN2QixLQUFDLEVBQ0QsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQ2xDLENBQUM7O0VBR0YsSUFBQS9DLGVBQVMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0VBRzVDLElBQUEsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztFQUN2QyxJQUFBLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO01BQzNDQSxlQUFTLENBQUMsTUFBSztFQUNYLFFBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxVQUFVLEtBQUEsV0FBQSw4QkFBNEI7Y0FDakQsT0FBTztXQUNWOzs7O0VBSUQsUUFBQSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7Y0FDbEIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2NBQ3hCLE9BQU87V0FDVjtFQUNELFFBQUEsSUFBSSxTQUFTLEtBQUssVUFBVSxDQUFDLE9BQU8sRUFBRTtjQUNsQyxPQUFPO1dBQ1Y7RUFDRCxRQUFBLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1VBQy9CLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQ2pELFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNwQixJQUFJLE1BQU0sRUFBRTtFQUNSLFlBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QyxDQUFDLENBQUM7V0FDcEU7ZUFBTTtFQUNILFlBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxDQUFBLENBQUUsQ0FBQyxDQUFDO1dBQy9DO09BQ0osRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzs7RUFHcEMsSUFBQSxNQUFNLFlBQVksR0FBR0QsWUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ25DQyxlQUFTLENBQUMsTUFBSztVQUNYLElBQUksQ0FBQyxNQUFNLEVBQUU7RUFDVCxZQUFBLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2NBQzdCLE9BQU87V0FDVjtFQUNELFFBQUEsSUFBSSxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO0VBQ25DLFlBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUM5QixZQUFBLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1dBQy9CO0VBQU0sYUFBQSxJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7Y0FDMUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0VBQ3JCLFlBQUEsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7V0FDaEM7RUFDTCxLQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUV2QixJQUFBLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO01BQ25DQSxlQUFTLENBQUMsTUFBSztFQUNYLFFBQUEsSUFBSSxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtFQUNoQyxZQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO1dBQ3BDO0VBQ0wsS0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztNQUlyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUM1QixjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FDekcsQ0FBQztNQUNGQSxlQUFTLENBQUMsTUFBSztFQUNYLFFBQUEsSUFBSSxNQUFNLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRTtjQUNoQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUM5QztFQUNMLEtBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO01BRXhCLE1BQU0sU0FBUyxHQUFHK0MsaUJBQVcsQ0FDekIsT0FBTyxNQUF1QyxFQUFFLEtBQWMsS0FBbUI7VUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtjQUNULE9BQU87V0FDVjtFQUNELFFBQUEsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDNUMsSUFBSSxLQUFLLEVBQUU7Y0FDUCxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7V0FDN0I7VUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0VBQzFDLFlBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztXQUNwRTtPQUNKLEVBQ0QsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUMxQyxDQUFDO0VBRUYsSUFBQSxNQUFNLEtBQUssR0FBRyxZQUFZLElBQUksU0FBUyxDQUFDO0VBRXhDLElBQUEsUUFDSSxLQUFLLENBQUEsYUFBQSxDQUFBLEtBQUEsRUFBQSxFQUFBLFNBQVMsRUFBRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFBO1VBQ2pGLEtBQUMsQ0FBQSxhQUFBLENBQUEsT0FBTyxJQUNKLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxFQUN0QixRQUFRLEVBQUUsUUFBUSxFQUNsQixVQUFVLEVBQ04sS0FBSyxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxnQkFBZ0I7RUFDNUMsa0JBQUU7RUFDSSxvQkFBQSxPQUFPLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEtBQUssSUFBSSxhQUFhO3NCQUN4RCxNQUFNLEVBQUUsS0FBSyxDQUFDLGdCQUFnQjtzQkFDOUIsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBaUIsRUFBRSxLQUFLLENBQUM7RUFDM0QsaUJBQUE7b0JBQ0QsU0FBUyxFQUVuQixZQUFZLEVBQ1IsS0FBSyxDQUFDLGtCQUFrQixJQUFJLEtBQUssQ0FBQyxrQkFBa0I7RUFDaEQsa0JBQUU7RUFDSSxvQkFBQSxPQUFPLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEtBQUssSUFBSSxlQUFlO3NCQUM1RCxNQUFNLEVBQUUsS0FBSyxDQUFDLGtCQUFrQjtzQkFDaEMsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBbUIsRUFBRSxJQUFJLENBQUM7RUFDNUQsaUJBQUE7b0JBQ0QsU0FBUyxFQUVyQixDQUFBO0VBQ0QsUUFBQSxLQUFLLEtBQ0YsS0FBSyxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxTQUFTLEVBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFDM0MsRUFBQSxLQUFLLENBQ0osQ0FDVDtVQUNELEtBQUMsQ0FBQSxhQUFBLENBQUEsV0FBVyxFQUNSLEVBQUEsR0FBRyxFQUFFLGNBQWMsRUFDbkIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxFQUN4QyxPQUFPLEVBQUUsT0FBTyxFQUFBLENBQ2xCLENBQ0EsRUFDUjtFQUNOOztFQzVNTSxTQUFVLGdCQUFnQixDQUFDLEtBQXFDLEVBQUE7RUFDbEUsSUFBQSxPQUFPLEtBQUMsQ0FBQSxhQUFBLENBQUEsYUFBYSxFQUFLLEVBQUEsR0FBQSxLQUFLLEdBQUksQ0FBQztFQUN4Qzs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMV19
