define(['exports', 'react'], (function (exports, react) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dist = {exports: {}};

	var reactEmailEditor_cjs_development = {};

	var hasRequiredReactEmailEditor_cjs_development;

	function requireReactEmailEditor_cjs_development () {
		if (hasRequiredReactEmailEditor_cjs_development) return reactEmailEditor_cjs_development;
		hasRequiredReactEmailEditor_cjs_development = 1;

		Object.defineProperty(reactEmailEditor_cjs_development, '__esModule', {
		  value: true
		});
		function _interopDefault(ex) {
		  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
		}
		var React = require('react');
		var React__default = _interopDefault(React);
		function _extends() {
		  _extends = Object.assign ? Object.assign.bind() : function (target) {
		    for (var i = 1; i < arguments.length; i++) {
		      var source = arguments[i];
		      for (var key in source) {
		        if (Object.prototype.hasOwnProperty.call(source, key)) {
		          target[key] = source[key];
		        }
		      }
		    }
		    return target;
		  };
		  return _extends.apply(this, arguments);
		}
		var name = "react-email-editor";
		var version = "1.7.9";
		var description = "Unlayer's Email Editor Component for React.js";
		var main = "dist/index.js";
		var typings = "dist/index.d.ts";
		var files = ["dist"];
		var engines = {
		  node: ">=10"
		};
		var scripts = {
		  start: "tsdx watch",
		  build: "tsdx build",
		  test: "tsdx test",
		  "test:watch": "tsdx test --watch",
		  "test:coverage": "tsdx test --coverage",
		  lint: "tsdx lint",
		  prepare: "tsdx build",
		  release: "npm run build && npm publish",
		  "netlify-build": "cd demo && npm install && npm run build"
		};
		var peerDependencies = {
		  react: ">=15"
		};
		var husky = {
		  hooks: {
		    "pre-commit": "tsdx lint"
		  }
		};
		var dependencies = {
		  "unlayer-types": "latest"
		};
		var devDependencies = {
		  "@rollup/plugin-replace": "^5.0.2",
		  "@testing-library/react": "^13.4.0",
		  "@types/react": "^18.0.27",
		  "@types/react-dom": "^18.0.10",
		  husky: "^8.0.3",
		  react: "^18.2.0",
		  "react-dom": "^18.2.0",
		  "rollup-plugin-copy": "^3.4.0",
		  tsdx: "^0.14.1",
		  tslib: "^2.4.1",
		  typescript: "^4.9.4"
		};
		var author = "";
		var homepage = "https://github.com/unlayer/react-email-editor#readme";
		var license = "MIT";
		var repository = "https://github.com/unlayer/react-email-editor.git";
		var keywords = ["react-component"];
		var pkg = {
		  name: name,
		  version: version,
		  description: description,
		  main: main,
		  typings: typings,
		  files: files,
		  engines: engines,
		  scripts: scripts,
		  peerDependencies: peerDependencies,
		  husky: husky,
		  dependencies: dependencies,
		  devDependencies: devDependencies,
		  author: author,
		  homepage: homepage,
		  license: license,
		  repository: repository,
		  keywords: keywords
		};
		var defaultScriptUrl = 'https://editor.unlayer.com/embed.js?2';
		var callbacks = [];
		var loaded = false;
		var isScriptInjected = function isScriptInjected(scriptUrl) {
		  var scripts = document.querySelectorAll('script');
		  var injected = false;
		  scripts.forEach(function (script) {
		    if (script.src.includes(scriptUrl)) {
		      injected = true;
		    }
		  });
		  return injected;
		};
		var addCallback = function addCallback(callback) {
		  callbacks.push(callback);
		};
		var runCallbacks = function runCallbacks() {
		  if (loaded) {
		    var callback;
		    while (callback = callbacks.shift()) {
		      callback();
		    }
		  }
		};
		var loadScript = function loadScript(callback, scriptUrl) {
		  if (scriptUrl === void 0) {
		    scriptUrl = defaultScriptUrl;
		  }
		  addCallback(callback);
		  if (!isScriptInjected(scriptUrl)) {
		    var embedScript = document.createElement('script');
		    embedScript.setAttribute('src', scriptUrl);
		    embedScript.onload = function () {
		      loaded = true;
		      runCallbacks();
		    };
		    document.head.appendChild(embedScript);
		  } else {
		    runCallbacks();
		  }
		};
		window.__unlayer_lastEditorId = window.__unlayer_lastEditorId || 0;
		var EmailEditor = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
		  var _props$appearance, _props$options, _props$options2, _props$locale, _props$options3, _props$projectId, _props$options4, _props$tools, _props$options5;
		  var onLoad = props.onLoad,
		    onReady = props.onReady,
		    scriptUrl = props.scriptUrl,
		    _props$minHeight = props.minHeight,
		    minHeight = _props$minHeight === void 0 ? 500 : _props$minHeight,
		    _props$style = props.style,
		    style = _props$style === void 0 ? {} : _props$style;
		  var _useState = React.useState(null),
		    editor = _useState[0],
		    setEditor = _useState[1];
		  var _useState2 = React.useState(false),
		    hasLoadedEmbedScript = _useState2[0],
		    setHasLoadedEmbedScript = _useState2[1];
		  var editorId = React.useMemo(function () {
		    return props.editorId || "editor-" + ++window.__unlayer_lastEditorId;
		  }, [props.editorId]);
		  var options = _extends({}, props.options || {}, {
		    appearance: (_props$appearance = props.appearance) != null ? _props$appearance : (_props$options = props.options) == null ? void 0 : _props$options.appearance,
		    displayMode: (props == null ? void 0 : props.displayMode) || ((_props$options2 = props.options) == null ? void 0 : _props$options2.displayMode) || 'email',
		    locale: (_props$locale = props.locale) != null ? _props$locale : (_props$options3 = props.options) == null ? void 0 : _props$options3.locale,
		    projectId: (_props$projectId = props.projectId) != null ? _props$projectId : (_props$options4 = props.options) == null ? void 0 : _props$options4.projectId,
		    tools: (_props$tools = props.tools) != null ? _props$tools : (_props$options5 = props.options) == null ? void 0 : _props$options5.tools,
		    id: editorId,
		    source: {
		      name: pkg.name,
		      version: pkg.version
		    }
		  });
		  React.useImperativeHandle(ref, function () {
		    return {
		      editor: editor
		    };
		  }, [editor]);
		  React.useEffect(function () {
		    return function () {
		      editor == null ? void 0 : editor.destroy();
		    };
		  }, []);
		  React.useEffect(function () {
		    setHasLoadedEmbedScript(false);
		    loadScript(function () {
		      return setHasLoadedEmbedScript(true);
		    }, scriptUrl);
		  }, [scriptUrl]);
		  React.useEffect(function () {
		    if (!hasLoadedEmbedScript) return;
		    editor == null ? void 0 : editor.destroy();
		    setEditor(unlayer.createEditor(options));
		  }, [JSON.stringify(options), hasLoadedEmbedScript]);
		  var methodProps = Object.keys(props).filter(function (propName) {
		    return /^on/.test(propName);
		  });
		  React.useEffect(function () {
		    if (!editor) return;
		    onLoad == null ? void 0 : onLoad(editor);
		    // All properties starting with on[Name] are registered as event listeners.
		    methodProps.forEach(function (methodProp) {
		      if (/^on/.test(methodProp) && methodProp !== 'onLoad' && methodProp !== 'onReady' && typeof props[methodProp] === 'function') {
		        editor.addEventListener(methodProp, props[methodProp]);
		      }
		    });
		    if (onReady) {
		      editor.addEventListener('editor:ready', function () {
		        onReady(editor);
		      });
		    }
		  }, [editor, Object.keys(methodProps).join(',')]);
		  return React__default.createElement("div", {
		    style: {
		      flex: 1,
		      display: 'flex',
		      minHeight: minHeight
		    }
		  }, React__default.createElement("div", {
		    id: editorId,
		    style: _extends({}, style, {
		      flex: 1
		    })
		  }));
		});
		reactEmailEditor_cjs_development.EmailEditor = EmailEditor;
		reactEmailEditor_cjs_development.default = EmailEditor;
		return reactEmailEditor_cjs_development;
	}

	(function (module) {

		{
		  module.exports = requireReactEmailEditor_cjs_development();
		}
	} (dist));

	var EmailEditor = /*@__PURE__*/getDefaultExportFromCjs(dist.exports);

	// import { ReactElement, createElement } from "react";
	function EmailEditorComponent({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    const emailEditorRef = react.useRef(null);
	    // const [JSONDesign, setJSONDesign] = useState(JSONTemplate);
	    react.useEffect(() => {
	        var _a;
	        const unlayer = (_a = emailEditorRef.current) === null || _a === void 0 ? void 0 : _a.editor;
	        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "")
	            return;
	        if (unlayer)
	            unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
	    }, [JSONTemplate]);
	    const onReady = unlayer => {
	        // editor is ready
	        // you can load your template here;
	        // the design json can be obtained by calling
	        // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
	        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "")
	            return;
	        unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
	    };
	    const exportAction = (action) => {
	        var _a;
	        const unlayer = (_a = emailEditorRef.current) === null || _a === void 0 ? void 0 : _a.editor;
	        unlayer === null || unlayer === void 0 ? void 0 : unlayer.exportHtml(data => {
	            const { design, html } = data;
	            // ActionValue is used to represent actions, like the On click property of an action button. For any action except Do nothing, your component will receive a value adhering to the following interface. For Do nothing it will receive undefined. The ActionValue prop appears like this:
	            if (action && action.canExecute && !action.isExecuting) {
	                if (HTMLBody && HTMLBody.status === "available") {
	                    HTMLBody.setValue(html);
	                    if (JSONTemplate && JSONTemplate.status === "available")
	                        JSONTemplate.setValue(JSON.stringify(design));
	                    action.execute();
	                }
	            }
	        });
	    };
	    return (react.createElement("div", { className: "react-email-editor-div" },
	        react.createElement("div", { className: "spacing-inner-bottom-medium" },
	            exportHTMLAction && (react.createElement("button", { className: "btn mx-button btn-default", onClick: () => exportAction(exportHTMLAction) }, "Export HTML")),
	            saveTemplateAction && (react.createElement("button", { className: "btn mx-button btn-default spacing-outer-left-medium", onClick: () => exportAction(saveTemplateAction) }, "Save Template"))),
	        react.createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady })));
	}

	function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    return react.createElement(EmailEditorComponent, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction });
	}

	exports.ReactEmailEditor = ReactEmailEditor;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZW1haWwtZWRpdG9yL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FbWFpbEVkaXRvckNvbXBvbmVudC50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdF9fZGVmYXVsdCA9IF9pbnRlcm9wRGVmYXVsdChSZWFjdCk7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG52YXIgbmFtZSA9IFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG52YXIgdmVyc2lvbiA9IFwiMS43LjlcIjtcbnZhciBkZXNjcmlwdGlvbiA9IFwiVW5sYXllcidzIEVtYWlsIEVkaXRvciBDb21wb25lbnQgZm9yIFJlYWN0LmpzXCI7XG52YXIgbWFpbiA9IFwiZGlzdC9pbmRleC5qc1wiO1xudmFyIHR5cGluZ3MgPSBcImRpc3QvaW5kZXguZC50c1wiO1xudmFyIGZpbGVzID0gW1xuXHRcImRpc3RcIlxuXTtcbnZhciBlbmdpbmVzID0ge1xuXHRub2RlOiBcIj49MTBcIlxufTtcbnZhciBzY3JpcHRzID0ge1xuXHRzdGFydDogXCJ0c2R4IHdhdGNoXCIsXG5cdGJ1aWxkOiBcInRzZHggYnVpbGRcIixcblx0dGVzdDogXCJ0c2R4IHRlc3RcIixcblx0XCJ0ZXN0OndhdGNoXCI6IFwidHNkeCB0ZXN0IC0td2F0Y2hcIixcblx0XCJ0ZXN0OmNvdmVyYWdlXCI6IFwidHNkeCB0ZXN0IC0tY292ZXJhZ2VcIixcblx0bGludDogXCJ0c2R4IGxpbnRcIixcblx0cHJlcGFyZTogXCJ0c2R4IGJ1aWxkXCIsXG5cdHJlbGVhc2U6IFwibnBtIHJ1biBidWlsZCAmJiBucG0gcHVibGlzaFwiLFxuXHRcIm5ldGxpZnktYnVpbGRcIjogXCJjZCBkZW1vICYmIG5wbSBpbnN0YWxsICYmIG5wbSBydW4gYnVpbGRcIlxufTtcbnZhciBwZWVyRGVwZW5kZW5jaWVzID0ge1xuXHRyZWFjdDogXCI+PTE1XCJcbn07XG52YXIgaHVza3kgPSB7XG5cdGhvb2tzOiB7XG5cdFx0XCJwcmUtY29tbWl0XCI6IFwidHNkeCBsaW50XCJcblx0fVxufTtcbnZhciBkZXBlbmRlbmNpZXMgPSB7XG5cdFwidW5sYXllci10eXBlc1wiOiBcImxhdGVzdFwiXG59O1xudmFyIGRldkRlcGVuZGVuY2llcyA9IHtcblx0XCJAcm9sbHVwL3BsdWdpbi1yZXBsYWNlXCI6IFwiXjUuMC4yXCIsXG5cdFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xMy40LjBcIixcblx0XCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxuXHRcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMFwiLFxuXHRodXNreTogXCJeOC4wLjNcIixcblx0cmVhY3Q6IFwiXjE4LjIuMFwiLFxuXHRcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcblx0XCJyb2xsdXAtcGx1Z2luLWNvcHlcIjogXCJeMy40LjBcIixcblx0dHNkeDogXCJeMC4xNC4xXCIsXG5cdHRzbGliOiBcIl4yLjQuMVwiLFxuXHR0eXBlc2NyaXB0OiBcIl40LjkuNFwiXG59O1xudmFyIGF1dGhvciA9IFwiXCI7XG52YXIgaG9tZXBhZ2UgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvciNyZWFkbWVcIjtcbnZhciBsaWNlbnNlID0gXCJNSVRcIjtcbnZhciByZXBvc2l0b3J5ID0gXCJodHRwczovL2dpdGh1Yi5jb20vdW5sYXllci9yZWFjdC1lbWFpbC1lZGl0b3IuZ2l0XCI7XG52YXIga2V5d29yZHMgPSBbXG5cdFwicmVhY3QtY29tcG9uZW50XCJcbl07XG52YXIgcGtnID0ge1xuXHRuYW1lOiBuYW1lLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG5cdG1haW46IG1haW4sXG5cdHR5cGluZ3M6IHR5cGluZ3MsXG5cdGZpbGVzOiBmaWxlcyxcblx0ZW5naW5lczogZW5naW5lcyxcblx0c2NyaXB0czogc2NyaXB0cyxcblx0cGVlckRlcGVuZGVuY2llczogcGVlckRlcGVuZGVuY2llcyxcblx0aHVza3k6IGh1c2t5LFxuXHRkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY2llcyxcblx0ZGV2RGVwZW5kZW5jaWVzOiBkZXZEZXBlbmRlbmNpZXMsXG5cdGF1dGhvcjogYXV0aG9yLFxuXHRob21lcGFnZTogaG9tZXBhZ2UsXG5cdGxpY2Vuc2U6IGxpY2Vuc2UsXG5cdHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG5cdGtleXdvcmRzOiBrZXl3b3Jkc1xufTtcblxudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSAnaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/Mic7XG52YXIgY2FsbGJhY2tzID0gW107XG52YXIgbG9hZGVkID0gZmFsc2U7XG52YXIgaXNTY3JpcHRJbmplY3RlZCA9IGZ1bmN0aW9uIGlzU2NyaXB0SW5qZWN0ZWQoc2NyaXB0VXJsKSB7XG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XG4gIHZhciBpbmplY3RlZCA9IGZhbHNlO1xuICBzY3JpcHRzLmZvckVhY2goZnVuY3Rpb24gKHNjcmlwdCkge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGluamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW5qZWN0ZWQ7XG59O1xudmFyIGFkZENhbGxiYWNrID0gZnVuY3Rpb24gYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xufTtcbnZhciBydW5DYWxsYmFja3MgPSBmdW5jdGlvbiBydW5DYWxsYmFja3MoKSB7XG4gIGlmIChsb2FkZWQpIHtcbiAgICB2YXIgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSBmdW5jdGlvbiBsb2FkU2NyaXB0KGNhbGxiYWNrLCBzY3JpcHRVcmwpIHtcbiAgaWYgKHNjcmlwdFVybCA9PT0gdm9pZCAwKSB7XG4gICAgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybDtcbiAgfVxuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGlmICghaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpKSB7XG4gICAgdmFyIGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgZW1iZWRTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICB9IGVsc2Uge1xuICAgIHJ1bkNhbGxiYWNrcygpO1xuICB9XG59O1xuXG53aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgRW1haWxFZGl0b3IgPSAvKiNfX1BVUkVfXyovUmVhY3RfX2RlZmF1bHQuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICB2YXIgX3Byb3BzJGFwcGVhcmFuY2UsIF9wcm9wcyRvcHRpb25zLCBfcHJvcHMkb3B0aW9uczIsIF9wcm9wcyRsb2NhbGUsIF9wcm9wcyRvcHRpb25zMywgX3Byb3BzJHByb2plY3RJZCwgX3Byb3BzJG9wdGlvbnM0LCBfcHJvcHMkdG9vbHMsIF9wcm9wcyRvcHRpb25zNTtcbiAgdmFyIG9uTG9hZCA9IHByb3BzLm9uTG9hZCxcbiAgICBvblJlYWR5ID0gcHJvcHMub25SZWFkeSxcbiAgICBzY3JpcHRVcmwgPSBwcm9wcy5zY3JpcHRVcmwsXG4gICAgX3Byb3BzJG1pbkhlaWdodCA9IHByb3BzLm1pbkhlaWdodCxcbiAgICBtaW5IZWlnaHQgPSBfcHJvcHMkbWluSGVpZ2h0ID09PSB2b2lkIDAgPyA1MDAgOiBfcHJvcHMkbWluSGVpZ2h0LFxuICAgIF9wcm9wcyRzdHlsZSA9IHByb3BzLnN0eWxlLFxuICAgIHN0eWxlID0gX3Byb3BzJHN0eWxlID09PSB2b2lkIDAgPyB7fSA6IF9wcm9wcyRzdHlsZTtcbiAgdmFyIF91c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLFxuICAgIGVkaXRvciA9IF91c2VTdGF0ZVswXSxcbiAgICBzZXRFZGl0b3IgPSBfdXNlU3RhdGVbMV07XG4gIHZhciBfdXNlU3RhdGUyID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLFxuICAgIGhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlswXSxcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCA9IF91c2VTdGF0ZTJbMV07XG4gIHZhciBlZGl0b3JJZCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9wcy5lZGl0b3JJZCB8fCBcImVkaXRvci1cIiArICsrd2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQ7XG4gIH0sIFtwcm9wcy5lZGl0b3JJZF0pO1xuICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBwcm9wcy5vcHRpb25zIHx8IHt9LCB7XG4gICAgYXBwZWFyYW5jZTogKF9wcm9wcyRhcHBlYXJhbmNlID0gcHJvcHMuYXBwZWFyYW5jZSkgIT0gbnVsbCA/IF9wcm9wcyRhcHBlYXJhbmNlIDogKF9wcm9wcyRvcHRpb25zID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zLmFwcGVhcmFuY2UsXG4gICAgZGlzcGxheU1vZGU6IChwcm9wcyA9PSBudWxsID8gdm9pZCAwIDogcHJvcHMuZGlzcGxheU1vZGUpIHx8ICgoX3Byb3BzJG9wdGlvbnMyID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zMi5kaXNwbGF5TW9kZSkgfHwgJ2VtYWlsJyxcbiAgICBsb2NhbGU6IChfcHJvcHMkbG9jYWxlID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX3Byb3BzJGxvY2FsZSA6IChfcHJvcHMkb3B0aW9uczMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMzLmxvY2FsZSxcbiAgICBwcm9qZWN0SWQ6IChfcHJvcHMkcHJvamVjdElkID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX3Byb3BzJHByb2plY3RJZCA6IChfcHJvcHMkb3B0aW9uczQgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM0LnByb2plY3RJZCxcbiAgICB0b29sczogKF9wcm9wcyR0b29scyA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX3Byb3BzJHRvb2xzIDogKF9wcm9wcyRvcHRpb25zNSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczUudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZTogcGtnLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvblxuICAgIH1cbiAgfSk7XG4gIFJlYWN0LnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRvcjogZWRpdG9yXG4gICAgfTtcbiAgfSwgW2VkaXRvcl0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBlZGl0b3IgPT0gbnVsbCA/IHZvaWQgMCA6IGVkaXRvci5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCh0cnVlKTtcbiAgICB9LCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIHZhciBtZXRob2RQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIC9eb24vLnRlc3QocHJvcE5hbWUpO1xuICB9KTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgLy8gQWxsIHByb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBvbltOYW1lXSBhcmUgcmVnaXN0ZXJlZCBhcyBldmVudCBsaXN0ZW5lcnMuXG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kUHJvcCkge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gJ29uTG9hZCcgJiYgbWV0aG9kUHJvcCAhPT0gJ29uUmVhZHknICYmIHR5cGVvZiBwcm9wc1ttZXRob2RQcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdlZGl0b3I6cmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgT2JqZWN0LmtleXMobWV0aG9kUHJvcHMpLmpvaW4oJywnKV0pO1xuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIGZsZXg6IDEsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBtaW5IZWlnaHQ6IG1pbkhlaWdodFxuICAgIH1cbiAgfSwgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgc3R5bGUsIHtcbiAgICAgIGZsZXg6IDFcbiAgICB9KVxuICB9KSk7XG59KTtcblxuZXhwb3J0cy5FbWFpbEVkaXRvciA9IEVtYWlsRWRpdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gRW1haWxFZGl0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzLm1hcFxuIiwiXG4ndXNlIHN0cmljdCdcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMucHJvZHVjdGlvbi5taW4uanMnKVxufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMnKVxufVxuIiwiLy8gaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSZWFjdEVsZW1lbnQsIHVzZVJlZiwgY3JlYXRlRWxlbWVudCwgLyp1c2VTdGF0ZSwqLyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBFZGl0YWJsZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IEVtYWlsRWRpdG9yLCB7IEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbmltcG9ydCBcIi4uL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxFZGl0b3JTYW1wbGVQcm9wcyB7XG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XG4gICAgSlNPTlRlbXBsYXRlPzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xuICAgIGV4cG9ydEhUTUxBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVtYWlsRWRpdG9yQ29tcG9uZW50KHtcbiAgICBIVE1MQm9keSxcbiAgICBKU09OVGVtcGxhdGUsXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb25cbn06IEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGVtYWlsRWRpdG9yUmVmID0gdXNlUmVmPEVkaXRvclJlZj4obnVsbCk7XG4gICAgLy8gY29uc3QgW0pTT05EZXNpZ24sIHNldEpTT05EZXNpZ25dID0gdXNlU3RhdGUoSlNPTlRlbXBsYXRlKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbEVkaXRvclJlZi5jdXJyZW50Py5lZGl0b3I7XG4gICAgICAgIGlmICghSlNPTlRlbXBsYXRlIHx8ICFKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlIHx8IEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgPT09IFwiXCIpIHJldHVybjtcbiAgICAgICAgaWYgKHVubGF5ZXIpIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcbiAgICB9LCBbSlNPTlRlbXBsYXRlXSk7XG5cbiAgICBjb25zdCBvblJlYWR5OiBFbWFpbEVkaXRvclByb3BzW1wib25SZWFkeVwiXSA9IHVubGF5ZXIgPT4ge1xuICAgICAgICAvLyBlZGl0b3IgaXMgcmVhZHlcbiAgICAgICAgLy8geW91IGNhbiBsb2FkIHlvdXIgdGVtcGxhdGUgaGVyZTtcbiAgICAgICAgLy8gdGhlIGRlc2lnbiBqc29uIGNhbiBiZSBvYnRhaW5lZCBieSBjYWxsaW5nXG4gICAgICAgIC8vIHVubGF5ZXIubG9hZERlc2lnbihjYWxsYmFjaykgb3IgdW5sYXllci5leHBvcnRIdG1sKGNhbGxiYWNrKVxuICAgICAgICBpZiAoIUpTT05UZW1wbGF0ZSB8fCAhSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSB8fCBKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlID09PSBcIlwiKSByZXR1cm47XG5cbiAgICAgICAgdW5sYXllci5sb2FkRGVzaWduKEpTT04ucGFyc2UoSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSkpO1xuICAgIH07XG5cbiAgICBjb25zdCBleHBvcnRBY3Rpb24gPSAoYWN0aW9uOiBBY3Rpb25WYWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCB1bmxheWVyID0gZW1haWxFZGl0b3JSZWYuY3VycmVudD8uZWRpdG9yO1xuXG4gICAgICAgIHVubGF5ZXI/LmV4cG9ydEh0bWwoZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRlc2lnbiwgaHRtbCB9ID0gZGF0YTtcblxuICAgICAgICAgICAgLy8gQWN0aW9uVmFsdWUgaXMgdXNlZCB0byByZXByZXNlbnQgYWN0aW9ucywgbGlrZSB0aGUgT24gY2xpY2sgcHJvcGVydHkgb2YgYW4gYWN0aW9uIGJ1dHRvbi4gRm9yIGFueSBhY3Rpb24gZXhjZXB0IERvIG5vdGhpbmcsIHlvdXIgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBhIHZhbHVlIGFkaGVyaW5nIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLiBGb3IgRG8gbm90aGluZyBpdCB3aWxsIHJlY2VpdmUgdW5kZWZpbmVkLiBUaGUgQWN0aW9uVmFsdWUgcHJvcCBhcHBlYXJzIGxpa2UgdGhpczpcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICAgICAgICAgIGlmIChIVE1MQm9keSAmJiBIVE1MQm9keS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgSFRNTEJvZHkuc2V0VmFsdWUoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChKU09OVGVtcGxhdGUgJiYgSlNPTlRlbXBsYXRlLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZS5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShkZXNpZ24pKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWVtYWlsLWVkaXRvci1kaXZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2luZy1pbm5lci1ib3R0b20tbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAge2V4cG9ydEhUTUxBY3Rpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiBleHBvcnRBY3Rpb24oZXhwb3J0SFRNTEFjdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICAgICAgRXhwb3J0IEhUTUxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHtzYXZlVGVtcGxhdGVBY3Rpb24gJiYgKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHQgc3BhY2luZy1vdXRlci1sZWZ0LW1lZGl1bVwiIG9uQ2xpY2s9eygpID0+IGV4cG9ydEFjdGlvbihzYXZlVGVtcGxhdGVBY3Rpb24pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNhdmUgVGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8RW1haWxFZGl0b3IgcmVmPXtlbWFpbEVkaXRvclJlZn0gb25SZWFkeT17b25SZWFkeX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRW1haWxFZGl0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VtYWlsRWRpdG9yQ29tcG9uZW50XCI7XG5cbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHsgSFRNTEJvZHksIEpTT05UZW1wbGF0ZSwgZXhwb3J0SFRNTEFjdGlvbiwgc2F2ZVRlbXBsYXRlQWN0aW9uIH06IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxFbWFpbEVkaXRvckNvbXBvbmVudFxuICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XG4gICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxuICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxuICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn0gLz47XG59XG4iXSwibmFtZXMiOlsiZGVmYXVsdFNjcmlwdFVybCIsImNhbGxiYWNrcyIsImxvYWRlZCIsImlzU2NyaXB0SW5qZWN0ZWQiLCJzY3JpcHRVcmwiLCJzY3JpcHRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5qZWN0ZWQiLCJmb3JFYWNoIiwic2NyaXB0Iiwic3JjIiwiaW5jbHVkZXMiLCJhZGRDYWxsYmFjayIsImNhbGxiYWNrIiwicHVzaCIsInJ1bkNhbGxiYWNrcyIsInNoaWZ0IiwibG9hZFNjcmlwdCIsImVtYmVkU2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm9ubG9hZCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsInJlcXVpcmUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxnQkFBZ0IsR0FBRyx1Q0FBdUMsQ0FBQTtFQUNoRSxJQUFNQyxTQUFTLEdBQWUsRUFBRSxDQUFBO0VBQ2hDLElBQUlDLE1BQU0sR0FBRyxLQUFLLENBQUE7Q0FFbEIsQ0FBQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJQyxTQUFpQixFQUFBO0lBQ3pDLElBQU1DLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuRCxJQUFJQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0NBRXBCSCxHQUFBQSxPQUFPLENBQUNJLE9BQU8sQ0FBQyxVQUFDQyxNQUFNLEVBQUE7TUFDckIsSUFBSUEsTUFBTSxDQUFDQyxHQUFHLENBQUNDLFFB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
