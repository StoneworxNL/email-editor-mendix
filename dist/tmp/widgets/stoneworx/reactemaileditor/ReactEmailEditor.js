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

	function TopToolbar({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction, emailRef }) {
	    const exportAction = (action) => {
	        var _a;
	        const unlayer = (_a = emailRef.current) === null || _a === void 0 ? void 0 : _a.editor;
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
	    return (react.createElement("div", { className: "spacing-inner-bottom-medium" },
	        exportHTMLAction && (react.createElement("button", { className: "btn mx-button btn-default", onClick: () => exportAction(exportHTMLAction) }, "Export HTML")),
	        saveTemplateAction && (react.createElement("button", { className: "btn mx-button btn-default spacing-outer-left-medium", onClick: () => exportAction(saveTemplateAction) }, "Save Template"))));
	}

	// import { ReactElement, createElement } from "react";
	function loadJSONTemplate(JSONTemplate, unlayer) {
	    if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "")
	        return;
	    else {
	        unlayer && unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
	    }
	}
	function EmailEditorComponent({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    const emailEditorRef = react.useRef(null);
	    react.useEffect(() => {
	        var _a;
	        const unlayer = (_a = emailEditorRef.current) === null || _a === void 0 ? void 0 : _a.editor;
	        loadJSONTemplate(JSONTemplate, unlayer);
	    }, [JSONTemplate]);
	    const onReady = unlayer => {
	        loadJSONTemplate(JSONTemplate, unlayer);
	    };
	    return (react.createElement("div", { className: "react-email-editor-div" },
	        react.createElement(TopToolbar, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction, emailRef: emailEditorRef }),
	        react.createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady, 
	            // projectId={projectId}
	            // minHeight="100vh"
	            options: {
	                appearance: {
	                    theme: "modern_light"
	                }
	            } })));
	}

	function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    return (react.createElement(EmailEditorComponent, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction }));
	}

	exports.ReactEmailEditor = ReactEmailEditor;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZW1haWwtZWRpdG9yL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ub3BUb29sYmFyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VtYWlsRWRpdG9yQ29tcG9uZW50LnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5cclxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xyXG5cclxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XHJcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcclxuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH07XHJcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxudmFyIHZlcnNpb24gPSBcIjEuNy45XCI7XHJcbnZhciBkZXNjcmlwdGlvbiA9IFwiVW5sYXllcidzIEVtYWlsIEVkaXRvciBDb21wb25lbnQgZm9yIFJlYWN0LmpzXCI7XHJcbnZhciBtYWluID0gXCJkaXN0L2luZGV4LmpzXCI7XHJcbnZhciB0eXBpbmdzID0gXCJkaXN0L2luZGV4LmQudHNcIjtcclxudmFyIGZpbGVzID0gW1xyXG5cdFwiZGlzdFwiXHJcbl07XHJcbnZhciBlbmdpbmVzID0ge1xyXG5cdG5vZGU6IFwiPj0xMFwiXHJcbn07XHJcbnZhciBzY3JpcHRzID0ge1xyXG5cdHN0YXJ0OiBcInRzZHggd2F0Y2hcIixcclxuXHRidWlsZDogXCJ0c2R4IGJ1aWxkXCIsXHJcblx0dGVzdDogXCJ0c2R4IHRlc3RcIixcclxuXHRcInRlc3Q6d2F0Y2hcIjogXCJ0c2R4IHRlc3QgLS13YXRjaFwiLFxyXG5cdFwidGVzdDpjb3ZlcmFnZVwiOiBcInRzZHggdGVzdCAtLWNvdmVyYWdlXCIsXHJcblx0bGludDogXCJ0c2R4IGxpbnRcIixcclxuXHRwcmVwYXJlOiBcInRzZHggYnVpbGRcIixcclxuXHRyZWxlYXNlOiBcIm5wbSBydW4gYnVpbGQgJiYgbnBtIHB1Ymxpc2hcIixcclxuXHRcIm5ldGxpZnktYnVpbGRcIjogXCJjZCBkZW1vICYmIG5wbSBpbnN0YWxsICYmIG5wbSBydW4gYnVpbGRcIlxyXG59O1xyXG52YXIgcGVlckRlcGVuZGVuY2llcyA9IHtcclxuXHRyZWFjdDogXCI+PTE1XCJcclxufTtcclxudmFyIGh1c2t5ID0ge1xyXG5cdGhvb2tzOiB7XHJcblx0XHRcInByZS1jb21taXRcIjogXCJ0c2R4IGxpbnRcIlxyXG5cdH1cclxufTtcclxudmFyIGRlcGVuZGVuY2llcyA9IHtcclxuXHRcInVubGF5ZXItdHlwZXNcIjogXCJsYXRlc3RcIlxyXG59O1xyXG52YXIgZGV2RGVwZW5kZW5jaWVzID0ge1xyXG5cdFwiQHJvbGx1cC9wbHVnaW4tcmVwbGFjZVwiOiBcIl41LjAuMlwiLFxyXG5cdFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xMy40LjBcIixcclxuXHRcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXHJcblx0XCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcclxuXHRodXNreTogXCJeOC4wLjNcIixcclxuXHRyZWFjdDogXCJeMTguMi4wXCIsXHJcblx0XCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXHJcblx0XCJyb2xsdXAtcGx1Z2luLWNvcHlcIjogXCJeMy40LjBcIixcclxuXHR0c2R4OiBcIl4wLjE0LjFcIixcclxuXHR0c2xpYjogXCJeMi40LjFcIixcclxuXHR0eXBlc2NyaXB0OiBcIl40LjkuNFwiXHJcbn07XHJcbnZhciBhdXRob3IgPSBcIlwiO1xyXG52YXIgaG9tZXBhZ2UgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvciNyZWFkbWVcIjtcclxudmFyIGxpY2Vuc2UgPSBcIk1JVFwiO1xyXG52YXIgcmVwb3NpdG9yeSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yLmdpdFwiO1xyXG52YXIga2V5d29yZHMgPSBbXHJcblx0XCJyZWFjdC1jb21wb25lbnRcIlxyXG5dO1xyXG52YXIgcGtnID0ge1xyXG5cdG5hbWU6IG5hbWUsXHJcblx0dmVyc2lvbjogdmVyc2lvbixcclxuXHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcblx0bWFpbjogbWFpbixcclxuXHR0eXBpbmdzOiB0eXBpbmdzLFxyXG5cdGZpbGVzOiBmaWxlcyxcclxuXHRlbmdpbmVzOiBlbmdpbmVzLFxyXG5cdHNjcmlwdHM6IHNjcmlwdHMsXHJcblx0cGVlckRlcGVuZGVuY2llczogcGVlckRlcGVuZGVuY2llcyxcclxuXHRodXNreTogaHVza3ksXHJcblx0ZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXMsXHJcblx0ZGV2RGVwZW5kZW5jaWVzOiBkZXZEZXBlbmRlbmNpZXMsXHJcblx0YXV0aG9yOiBhdXRob3IsXHJcblx0aG9tZXBhZ2U6IGhvbWVwYWdlLFxyXG5cdGxpY2Vuc2U6IGxpY2Vuc2UsXHJcblx0cmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuXHRrZXl3b3Jkczoga2V5d29yZHNcclxufTtcclxuXHJcbnZhciBkZWZhdWx0U2NyaXB0VXJsID0gJ2h0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzInO1xyXG52YXIgY2FsbGJhY2tzID0gW107XHJcbnZhciBsb2FkZWQgPSBmYWxzZTtcclxudmFyIGlzU2NyaXB0SW5qZWN0ZWQgPSBmdW5jdGlvbiBpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkge1xyXG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XHJcbiAgdmFyIGluamVjdGVkID0gZmFsc2U7XHJcbiAgc2NyaXB0cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JpcHQpIHtcclxuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcclxuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBpbmplY3RlZDtcclxufTtcclxudmFyIGFkZENhbGxiYWNrID0gZnVuY3Rpb24gYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcclxuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbn07XHJcbnZhciBydW5DYWxsYmFja3MgPSBmdW5jdGlvbiBydW5DYWxsYmFja3MoKSB7XHJcbiAgaWYgKGxvYWRlZCkge1xyXG4gICAgdmFyIGNhbGxiYWNrO1xyXG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbnZhciBsb2FkU2NyaXB0ID0gZnVuY3Rpb24gbG9hZFNjcmlwdChjYWxsYmFjaywgc2NyaXB0VXJsKSB7XHJcbiAgaWYgKHNjcmlwdFVybCA9PT0gdm9pZCAwKSB7XHJcbiAgICBzY3JpcHRVcmwgPSBkZWZhdWx0U2NyaXB0VXJsO1xyXG4gIH1cclxuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XHJcbiAgaWYgKCFpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkpIHtcclxuICAgIHZhciBlbWJlZFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgZW1iZWRTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBzY3JpcHRVcmwpO1xyXG4gICAgZW1iZWRTY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICBydW5DYWxsYmFja3MoKTtcclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcnVuQ2FsbGJhY2tzKCk7XHJcbiAgfVxyXG59O1xyXG5cclxud2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xyXG52YXIgRW1haWxFZGl0b3IgPSAvKiNfX1BVUkVfXyovUmVhY3RfX2RlZmF1bHQuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xyXG4gIHZhciBfcHJvcHMkYXBwZWFyYW5jZSwgX3Byb3BzJG9wdGlvbnMsIF9wcm9wcyRvcHRpb25zMiwgX3Byb3BzJGxvY2FsZSwgX3Byb3BzJG9wdGlvbnMzLCBfcHJvcHMkcHJvamVjdElkLCBfcHJvcHMkb3B0aW9uczQsIF9wcm9wcyR0b29scywgX3Byb3BzJG9wdGlvbnM1O1xyXG4gIHZhciBvbkxvYWQgPSBwcm9wcy5vbkxvYWQsXHJcbiAgICBvblJlYWR5ID0gcHJvcHMub25SZWFkeSxcclxuICAgIHNjcmlwdFVybCA9IHByb3BzLnNjcmlwdFVybCxcclxuICAgIF9wcm9wcyRtaW5IZWlnaHQgPSBwcm9wcy5taW5IZWlnaHQsXHJcbiAgICBtaW5IZWlnaHQgPSBfcHJvcHMkbWluSGVpZ2h0ID09PSB2b2lkIDAgPyA1MDAgOiBfcHJvcHMkbWluSGVpZ2h0LFxyXG4gICAgX3Byb3BzJHN0eWxlID0gcHJvcHMuc3R5bGUsXHJcbiAgICBzdHlsZSA9IF9wcm9wcyRzdHlsZSA9PT0gdm9pZCAwID8ge30gOiBfcHJvcHMkc3R5bGU7XHJcbiAgdmFyIF91c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLFxyXG4gICAgZWRpdG9yID0gX3VzZVN0YXRlWzBdLFxyXG4gICAgc2V0RWRpdG9yID0gX3VzZVN0YXRlWzFdO1xyXG4gIHZhciBfdXNlU3RhdGUyID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLFxyXG4gICAgaGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzBdLFxyXG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzFdO1xyXG4gIHZhciBlZGl0b3JJZCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHByb3BzLmVkaXRvcklkIHx8IFwiZWRpdG9yLVwiICsgKyt3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZDtcclxuICB9LCBbcHJvcHMuZWRpdG9ySWRdKTtcclxuICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBwcm9wcy5vcHRpb25zIHx8IHt9LCB7XHJcbiAgICBhcHBlYXJhbmNlOiAoX3Byb3BzJGFwcGVhcmFuY2UgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX3Byb3BzJGFwcGVhcmFuY2UgOiAoX3Byb3BzJG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMuYXBwZWFyYW5jZSxcclxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9wcm9wcyRvcHRpb25zMiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczIuZGlzcGxheU1vZGUpIHx8ICdlbWFpbCcsXHJcbiAgICBsb2NhbGU6IChfcHJvcHMkbG9jYWxlID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX3Byb3BzJGxvY2FsZSA6IChfcHJvcHMkb3B0aW9uczMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMzLmxvY2FsZSxcclxuICAgIHByb2plY3RJZDogKF9wcm9wcyRwcm9qZWN0SWQgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfcHJvcHMkcHJvamVjdElkIDogKF9wcm9wcyRvcHRpb25zNCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczQucHJvamVjdElkLFxyXG4gICAgdG9vbHM6IChfcHJvcHMkdG9vbHMgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9wcm9wcyR0b29scyA6IChfcHJvcHMkb3B0aW9uczUgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM1LnRvb2xzLFxyXG4gICAgaWQ6IGVkaXRvcklkLFxyXG4gICAgc291cmNlOiB7XHJcbiAgICAgIG5hbWU6IHBrZy5uYW1lLFxyXG4gICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvblxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFJlYWN0LnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlZGl0b3I6IGVkaXRvclxyXG4gICAgfTtcclxuICB9LCBbZWRpdG9yXSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdChmYWxzZSk7XHJcbiAgICBsb2FkU2NyaXB0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpO1xyXG4gICAgfSwgc2NyaXB0VXJsKTtcclxuICB9LCBbc2NyaXB0VXJsXSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaGFzTG9hZGVkRW1iZWRTY3JpcHQpIHJldHVybjtcclxuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcclxuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XHJcbiAgfSwgW0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpLCBoYXNMb2FkZWRFbWJlZFNjcmlwdF0pO1xyXG4gIHZhciBtZXRob2RQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKHByb3BOYW1lKSB7XHJcbiAgICByZXR1cm4gL15vbi8udGVzdChwcm9wTmFtZSk7XHJcbiAgfSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghZWRpdG9yKSByZXR1cm47XHJcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xyXG4gICAgLy8gQWxsIHByb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBvbltOYW1lXSBhcmUgcmVnaXN0ZXJlZCBhcyBldmVudCBsaXN0ZW5lcnMuXHJcbiAgICBtZXRob2RQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RQcm9wKSB7XHJcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09ICdvbkxvYWQnICYmIG1ldGhvZFByb3AgIT09ICdvblJlYWR5JyAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKG9uUmVhZHkpIHtcclxuICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2VkaXRvcjpyZWFkeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvblJlYWR5KGVkaXRvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sIFtlZGl0b3IsIE9iamVjdC5rZXlzKG1ldGhvZFByb3BzKS5qb2luKCcsJyldKTtcclxuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XHJcbiAgICBzdHlsZToge1xyXG4gICAgICBmbGV4OiAxLFxyXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgIG1pbkhlaWdodDogbWluSGVpZ2h0XHJcbiAgICB9XHJcbiAgfSwgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XHJcbiAgICBpZDogZWRpdG9ySWQsXHJcbiAgICBzdHlsZTogX2V4dGVuZHMoe30sIHN0eWxlLCB7XHJcbiAgICAgIGZsZXg6IDFcclxuICAgIH0pXHJcbiAgfSkpO1xyXG59KTtcclxuXHJcbmV4cG9ydHMuRW1haWxFZGl0b3IgPSBFbWFpbEVkaXRvcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gRW1haWxFZGl0b3I7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMubWFwXHJcbiIsIlxyXG4ndXNlIHN0cmljdCdcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMucHJvZHVjdGlvbi5taW4uanMnKVxyXG59IGVsc2Uge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzJylcclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgLyp1c2VTdGF0ZSwqLyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgRWRpdGFibGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcclxuaW1wb3J0IHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xyXG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIGVtYWlsUmVmOiBSZWFjdC5SZWZPYmplY3Q8RWRpdG9yUmVmPjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRvcFRvb2xiYXIoe1xyXG4gICAgSFRNTEJvZHksXHJcbiAgICBKU09OVGVtcGxhdGUsXHJcbiAgICBleHBvcnRIVE1MQWN0aW9uLFxyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uLFxyXG4gICAgZW1haWxSZWZcclxufTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHtcclxuICAgIGNvbnN0IGV4cG9ydEFjdGlvbiA9IChhY3Rpb246IEFjdGlvblZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuICAgICAgICB1bmxheWVyPy5leHBvcnRIdG1sKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRlc2lnbiwgaHRtbCB9ID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFjdGlvblZhbHVlIGlzIHVzZWQgdG8gcmVwcmVzZW50IGFjdGlvbnMsIGxpa2UgdGhlIE9uIGNsaWNrIHByb3BlcnR5IG9mIGFuIGFjdGlvbiBidXR0b24uIEZvciBhbnkgYWN0aW9uIGV4Y2VwdCBEbyBub3RoaW5nLCB5b3VyIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYSB2YWx1ZSBhZGhlcmluZyB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS4gRm9yIERvIG5vdGhpbmcgaXQgd2lsbCByZWNlaXZlIHVuZGVmaW5lZC4gVGhlIEFjdGlvblZhbHVlIHByb3AgYXBwZWFycyBsaWtlIHRoaXM6XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKEhUTUxCb2R5ICYmIEhUTUxCb2R5LnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIEhUTUxCb2R5LnNldFZhbHVlKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChKU09OVGVtcGxhdGUgJiYgSlNPTlRlbXBsYXRlLnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTlRlbXBsYXRlLnNldFZhbHVlKEpTT04uc3RyaW5naWZ5KGRlc2lnbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxyXG4gICAgICAgICAgICB7ZXhwb3J0SFRNTEFjdGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiBleHBvcnRBY3Rpb24oZXhwb3J0SFRNTEFjdGlvbil9PlxyXG4gICAgICAgICAgICAgICAgICAgIEV4cG9ydCBIVE1MXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHtzYXZlVGVtcGxhdGVBY3Rpb24gJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBteC1idXR0b24gYnRuLWRlZmF1bHQgc3BhY2luZy1vdXRlci1sZWZ0LW1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKHNhdmVUZW1wbGF0ZUFjdGlvbil9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZSBUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcbiIsIi8vIGltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZWFjdEVsZW1lbnQsIHVzZVJlZiwgY3JlYXRlRWxlbWVudCwgLyp1c2VTdGF0ZSwqLyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XHJcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3IsIEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxuaW1wb3J0IHsgVG9wVG9vbGJhciB9IGZyb20gXCIuL1RvcFRvb2xiYXJcIjtcclxuLy8gaW1wb3J0IFwiLi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxFZGl0b3JTYW1wbGVQcm9wcyB7XHJcbiAgICBIVE1MQm9keT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIGV4cG9ydEhUTUxBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgdW5sYXllcj86IEVkaXRvciB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmICghSlNPTlRlbXBsYXRlIHx8ICFKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlIHx8IEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgPT09IFwiXCIpIHJldHVybjtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVubGF5ZXIgJiYgdW5sYXllci5sb2FkRGVzaWduKEpTT04ucGFyc2UoSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRW1haWxFZGl0b3JDb21wb25lbnQoe1xyXG4gICAgSFRNTEJvZHksXHJcbiAgICBKU09OVGVtcGxhdGUsXHJcbiAgICBleHBvcnRIVE1MQWN0aW9uLFxyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uXHJcbn06IEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xyXG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbEVkaXRvclJlZi5jdXJyZW50Py5lZGl0b3I7XHJcbiAgICAgICAgbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGUsIHVubGF5ZXIpO1xyXG4gICAgfSwgW0pTT05UZW1wbGF0ZV0pO1xyXG5cclxuICAgIGNvbnN0IG9uUmVhZHk6IEVtYWlsRWRpdG9yUHJvcHNbXCJvblJlYWR5XCJdID0gdW5sYXllciA9PiB7XHJcbiAgICAgICAgbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGUsIHVubGF5ZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZW1haWwtZWRpdG9yLWRpdlwiPlxyXG4gICAgICAgICAgICA8VG9wVG9vbGJhclxyXG4gICAgICAgICAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxyXG4gICAgICAgICAgICAgICAgSlNPTlRlbXBsYXRlPXtKU09OVGVtcGxhdGV9XHJcbiAgICAgICAgICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259XHJcbiAgICAgICAgICAgICAgICBlbWFpbFJlZj17ZW1haWxFZGl0b3JSZWZ9XHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICA8RW1haWxFZGl0b3JcclxuICAgICAgICAgICAgICAgIHJlZj17ZW1haWxFZGl0b3JSZWZ9XHJcbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxyXG4gICAgICAgICAgICAgICAgLy8gcHJvamVjdElkPXtwcm9qZWN0SWR9XHJcbiAgICAgICAgICAgICAgICAvLyBtaW5IZWlnaHQ9XCIxMDB2aFwiXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJtb2Rlcm5fbGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBFbWFpbEVkaXRvckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvRW1haWxFZGl0b3JDb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xyXG5cclxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RW1haWxFZGl0b3Ioe1xyXG4gICAgSFRNTEJvZHksXHJcbiAgICBKU09OVGVtcGxhdGUsXHJcbiAgICBleHBvcnRIVE1MQWN0aW9uLFxyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uXHJcbn06IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxFbWFpbEVkaXRvckNvbXBvbmVudFxyXG4gICAgICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XHJcbiAgICAgICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxyXG4gICAgICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxyXG4gICAgICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn1cclxuICAgICAgICAvPlxyXG4gICAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiZGVmYXVsdFNjcmlwdFVybCIsImNhbGxiYWNrcyIsImxvYWRlZCIsImlzU2NyaXB0SW5qZWN0ZWQiLCJzY3JpcHRVcmwiLCJzY3JpcHRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5qZWN0ZWQiLCJmb3JFYWNoIiwic2NyaXB0Iiwic3JjIiwiaW5jbHVkZXMiLCJhZGRDYWxsYmFjayIsImNhbGxiYWNrIiwicHVzaCIsInJ1bkNhbGxiYWNrcyIsInNoaWZ0IiwibG9hZFNjcmlwdCIsImVtYmVkU2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm9ubG9hZCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsInJlcXVpcmUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxnQkFBZ0IsR0FBRyx1Q0FBdUMsQ0FBQTtFQUNoRSxJQUFNQyxTQUFTLEdBQWUsRUFBRSxDQUFBO0VBQ2hDLElBQUlDLE1BQU0sR0FBRyxLQUFLLENBQUE7Q0FFbEIsQ0FBQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJQyxTQUFpQixFQUFBO0lBQ3pDLElBQU1DLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuRCxJQUFJQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0NBRXBCSCxHQUFBQSxPQUFP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
