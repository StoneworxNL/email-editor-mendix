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
	function EmailEditorReact({ HTMLBody, JSONTemplate, exportHTMLAction /*, saveTemplateAction*/ }) {
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
	    const exportHtml = () => {
	        var _a;
	        const unlayer = (_a = emailEditorRef.current) === null || _a === void 0 ? void 0 : _a.editor;
	        unlayer === null || unlayer === void 0 ? void 0 : unlayer.exportHtml(data => {
	            const { design, html } = data;
	            // ActionValue is used to represent actions, like the On click property of an action button. For any action except Do nothing, your component will receive a value adhering to the following interface. For Do nothing it will receive undefined. The ActionValue prop appears like this:
	            if (exportHTMLAction && exportHTMLAction.canExecute && !exportHTMLAction.isExecuting) {
	                if (HTMLBody && HTMLBody.status === "available") {
	                    HTMLBody.setValue(html);
	                    if (JSONTemplate && JSONTemplate.status === "available")
	                        JSONTemplate.setValue(JSON.stringify(design));
	                    exportHTMLAction.execute();
	                }
	            }
	        });
	    };
	    // const saveDesign = () => {
	    //     const unlayer = emailEditorRef.current?.editor;
	    //     unlayer?.saveDesign(design => {
	    //         console.log('saveDesign', design);
	    //         alert('Design JSON has been logged in your developer console.');
	    //     });
	    // };
	    return (react.createElement("div", { className: "react-email-editor-div" },
	        react.createElement("div", { className: "spacing-inner-bottom-medium" },
	            react.createElement("button", { className: "btn mx-button btn-default", onClick: exportHtml }, "Export HTML")),
	        react.createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady })));
	}

	function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    return react.createElement(EmailEditorReact, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction });
	}

	exports.ReactEmailEditor = ReactEmailEditor;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZW1haWwtZWRpdG9yL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FbWFpbEVkaXRvclJlYWN0LnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0X19kZWZhdWx0ID0gX2ludGVyb3BEZWZhdWx0KFJlYWN0KTtcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIxLjcuOVwiO1xudmFyIGRlc2NyaXB0aW9uID0gXCJVbmxheWVyJ3MgRW1haWwgRWRpdG9yIENvbXBvbmVudCBmb3IgUmVhY3QuanNcIjtcbnZhciBtYWluID0gXCJkaXN0L2luZGV4LmpzXCI7XG52YXIgdHlwaW5ncyA9IFwiZGlzdC9pbmRleC5kLnRzXCI7XG52YXIgZmlsZXMgPSBbXG5cdFwiZGlzdFwiXG5dO1xudmFyIGVuZ2luZXMgPSB7XG5cdG5vZGU6IFwiPj0xMFwiXG59O1xudmFyIHNjcmlwdHMgPSB7XG5cdHN0YXJ0OiBcInRzZHggd2F0Y2hcIixcblx0YnVpbGQ6IFwidHNkeCBidWlsZFwiLFxuXHR0ZXN0OiBcInRzZHggdGVzdFwiLFxuXHRcInRlc3Q6d2F0Y2hcIjogXCJ0c2R4IHRlc3QgLS13YXRjaFwiLFxuXHRcInRlc3Q6Y292ZXJhZ2VcIjogXCJ0c2R4IHRlc3QgLS1jb3ZlcmFnZVwiLFxuXHRsaW50OiBcInRzZHggbGludFwiLFxuXHRwcmVwYXJlOiBcInRzZHggYnVpbGRcIixcblx0cmVsZWFzZTogXCJucG0gcnVuIGJ1aWxkICYmIG5wbSBwdWJsaXNoXCIsXG5cdFwibmV0bGlmeS1idWlsZFwiOiBcImNkIGRlbW8gJiYgbnBtIGluc3RhbGwgJiYgbnBtIHJ1biBidWlsZFwiXG59O1xudmFyIHBlZXJEZXBlbmRlbmNpZXMgPSB7XG5cdHJlYWN0OiBcIj49MTVcIlxufTtcbnZhciBodXNreSA9IHtcblx0aG9va3M6IHtcblx0XHRcInByZS1jb21taXRcIjogXCJ0c2R4IGxpbnRcIlxuXHR9XG59O1xudmFyIGRlcGVuZGVuY2llcyA9IHtcblx0XCJ1bmxheWVyLXR5cGVzXCI6IFwibGF0ZXN0XCJcbn07XG52YXIgZGV2RGVwZW5kZW5jaWVzID0ge1xuXHRcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjogXCJeNS4wLjJcIixcblx0XCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjEzLjQuMFwiLFxuXHRcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXG5cdFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4wLjEwXCIsXG5cdGh1c2t5OiBcIl44LjAuM1wiLFxuXHRyZWFjdDogXCJeMTguMi4wXCIsXG5cdFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuXHRcInJvbGx1cC1wbHVnaW4tY29weVwiOiBcIl4zLjQuMFwiLFxuXHR0c2R4OiBcIl4wLjE0LjFcIixcblx0dHNsaWI6IFwiXjIuNC4xXCIsXG5cdHR5cGVzY3JpcHQ6IFwiXjQuOS40XCJcbn07XG52YXIgYXV0aG9yID0gXCJcIjtcbnZhciBob21lcGFnZSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yI3JlYWRtZVwiO1xudmFyIGxpY2Vuc2UgPSBcIk1JVFwiO1xudmFyIHJlcG9zaXRvcnkgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvci5naXRcIjtcbnZhciBrZXl3b3JkcyA9IFtcblx0XCJyZWFjdC1jb21wb25lbnRcIlxuXTtcbnZhciBwa2cgPSB7XG5cdG5hbWU6IG5hbWUsXG5cdHZlcnNpb246IHZlcnNpb24sXG5cdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcblx0bWFpbjogbWFpbixcblx0dHlwaW5nczogdHlwaW5ncyxcblx0ZmlsZXM6IGZpbGVzLFxuXHRlbmdpbmVzOiBlbmdpbmVzLFxuXHRzY3JpcHRzOiBzY3JpcHRzLFxuXHRwZWVyRGVwZW5kZW5jaWVzOiBwZWVyRGVwZW5kZW5jaWVzLFxuXHRodXNreTogaHVza3ksXG5cdGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuXHRkZXZEZXBlbmRlbmNpZXM6IGRldkRlcGVuZGVuY2llcyxcblx0YXV0aG9yOiBhdXRob3IsXG5cdGhvbWVwYWdlOiBob21lcGFnZSxcblx0bGljZW5zZTogbGljZW5zZSxcblx0cmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcblx0a2V5d29yZHM6IGtleXdvcmRzXG59O1xuXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9ICdodHRwczovL2VkaXRvci51bmxheWVyLmNvbS9lbWJlZC5qcz8yJztcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBpc1NjcmlwdEluamVjdGVkID0gZnVuY3Rpb24gaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpIHtcbiAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcbiAgdmFyIGluamVjdGVkID0gZmFsc2U7XG4gIHNjcmlwdHMuZm9yRWFjaChmdW5jdGlvbiAoc2NyaXB0KSB7XG4gICAgaWYgKHNjcmlwdC5zcmMuaW5jbHVkZXMoc2NyaXB0VXJsKSkge1xuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpbmplY3RlZDtcbn07XG52YXIgYWRkQ2FsbGJhY2sgPSBmdW5jdGlvbiBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9IGZ1bmN0aW9uIHJ1bkNhbGxiYWNrcygpIHtcbiAgaWYgKGxvYWRlZCkge1xuICAgIHZhciBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQoY2FsbGJhY2ssIHNjcmlwdFVybCkge1xuICBpZiAoc2NyaXB0VXJsID09PSB2b2lkIDApIHtcbiAgICBzY3JpcHRVcmwgPSBkZWZhdWx0U2NyaXB0VXJsO1xuICB9XG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgaWYgKCFpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkpIHtcbiAgICB2YXIgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNjcmlwdFVybCk7XG4gICAgZW1iZWRTY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbWJlZFNjcmlwdCk7XG4gIH0gZWxzZSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH1cbn07XG5cbndpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkID0gd2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQgfHwgMDtcbnZhciBFbWFpbEVkaXRvciA9IC8qI19fUFVSRV9fKi9SZWFjdF9fZGVmYXVsdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBfcHJvcHMkYXBwZWFyYW5jZSwgX3Byb3BzJG9wdGlvbnMsIF9wcm9wcyRvcHRpb25zMiwgX3Byb3BzJGxvY2FsZSwgX3Byb3BzJG9wdGlvbnMzLCBfcHJvcHMkcHJvamVjdElkLCBfcHJvcHMkb3B0aW9uczQsIF9wcm9wcyR0b29scywgX3Byb3BzJG9wdGlvbnM1O1xuICB2YXIgb25Mb2FkID0gcHJvcHMub25Mb2FkLFxuICAgIG9uUmVhZHkgPSBwcm9wcy5vblJlYWR5LFxuICAgIHNjcmlwdFVybCA9IHByb3BzLnNjcmlwdFVybCxcbiAgICBfcHJvcHMkbWluSGVpZ2h0ID0gcHJvcHMubWluSGVpZ2h0LFxuICAgIG1pbkhlaWdodCA9IF9wcm9wcyRtaW5IZWlnaHQgPT09IHZvaWQgMCA/IDUwMCA6IF9wcm9wcyRtaW5IZWlnaHQsXG4gICAgX3Byb3BzJHN0eWxlID0gcHJvcHMuc3R5bGUsXG4gICAgc3R5bGUgPSBfcHJvcHMkc3R5bGUgPT09IHZvaWQgMCA/IHt9IDogX3Byb3BzJHN0eWxlO1xuICB2YXIgX3VzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUobnVsbCksXG4gICAgZWRpdG9yID0gX3VzZVN0YXRlWzBdLFxuICAgIHNldEVkaXRvciA9IF91c2VTdGF0ZVsxXTtcbiAgdmFyIF91c2VTdGF0ZTIgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksXG4gICAgaGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzBdLFxuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlsxXTtcbiAgdmFyIGVkaXRvcklkID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmVkaXRvcklkIHx8IFwiZWRpdG9yLVwiICsgKyt3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZDtcbiAgfSwgW3Byb3BzLmVkaXRvcklkXSk7XG4gIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHByb3BzLm9wdGlvbnMgfHwge30sIHtcbiAgICBhcHBlYXJhbmNlOiAoX3Byb3BzJGFwcGVhcmFuY2UgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX3Byb3BzJGFwcGVhcmFuY2UgOiAoX3Byb3BzJG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfcHJvcHMkb3B0aW9uczIgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMyLmRpc3BsYXlNb2RlKSB8fCAnZW1haWwnLFxuICAgIGxvY2FsZTogKF9wcm9wcyRsb2NhbGUgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfcHJvcHMkbG9jYWxlIDogKF9wcm9wcyRvcHRpb25zMyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczMubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9wcm9wcyRwcm9qZWN0SWQgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfcHJvcHMkcHJvamVjdElkIDogKF9wcm9wcyRvcHRpb25zNCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczQucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX3Byb3BzJHRvb2xzID0gcHJvcHMudG9vbHMpICE9IG51bGwgPyBfcHJvcHMkdG9vbHMgOiAoX3Byb3BzJG9wdGlvbnM1ID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zNS50b29scyxcbiAgICBpZDogZWRpdG9ySWQsXG4gICAgc291cmNlOiB7XG4gICAgICBuYW1lOiBwa2cubmFtZSxcbiAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uXG4gICAgfVxuICB9KTtcbiAgUmVhY3QudXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWRpdG9yOiBlZGl0b3JcbiAgICB9O1xuICB9LCBbZWRpdG9yXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpO1xuICAgIH0sIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgdmFyIG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICByZXR1cm4gL15vbi8udGVzdChwcm9wTmFtZSk7XG4gIH0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICghZWRpdG9yKSByZXR1cm47XG4gICAgb25Mb2FkID09IG51bGwgPyB2b2lkIDAgOiBvbkxvYWQoZWRpdG9yKTtcbiAgICAvLyBBbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIG9uW05hbWVdIGFyZSByZWdpc3RlcmVkIGFzIGV2ZW50IGxpc3RlbmVycy5cbiAgICBtZXRob2RQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RQcm9wKSB7XG4gICAgICBpZiAoL15vbi8udGVzdChtZXRob2RQcm9wKSAmJiBtZXRob2RQcm9wICE9PSAnb25Mb2FkJyAmJiBtZXRob2RQcm9wICE9PSAnb25SZWFkeScgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKG1ldGhvZFByb3AsIHByb3BzW21ldGhvZFByb3BdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAob25SZWFkeSkge1xuICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2VkaXRvcjpyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBPYmplY3Qua2V5cyhtZXRob2RQcm9wcykuam9pbignLCcpXSk7XG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBzdHlsZToge1xuICAgICAgZmxleDogMSxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIG1pbkhlaWdodDogbWluSGVpZ2h0XG4gICAgfVxuICB9LCBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBpZDogZWRpdG9ySWQsXG4gICAgc3R5bGU6IF9leHRlbmRzKHt9LCBzdHlsZSwge1xuICAgICAgZmxleDogMVxuICAgIH0pXG4gIH0pKTtcbn0pO1xuXG5leHBvcnRzLkVtYWlsRWRpdG9yID0gRW1haWxFZGl0b3I7XG5leHBvcnRzLmRlZmF1bHQgPSBFbWFpbEVkaXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMubWFwXG4iLCJcbid1c2Ugc3RyaWN0J1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5wcm9kdWN0aW9uLm1pbi5qcycpXG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5kZXZlbG9wbWVudC5qcycpXG59XG4iLCIvLyBpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCwgdXNlUmVmLCBjcmVhdGVFbGVtZW50LCAvKnVzZVN0YXRlLCovIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yUmVmLCBFbWFpbEVkaXRvclByb3BzIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xuaW1wb3J0IFwiLi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIlxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMge1xuICAgIEhUTUxCb2R5PzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uPzogQWN0aW9uVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbWFpbEVkaXRvclJlYWN0KHtcbiAgICBIVE1MQm9keSxcbiAgICBKU09OVGVtcGxhdGUsXG4gICAgZXhwb3J0SFRNTEFjdGlvbiAvKiwgc2F2ZVRlbXBsYXRlQWN0aW9uKi9cbn06IEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuXG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcbiAgICAvLyBjb25zdCBbSlNPTkRlc2lnbiwgc2V0SlNPTkRlc2lnbl0gPSB1c2VTdGF0ZShKU09OVGVtcGxhdGUpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcbiAgICAgICAgaWYgKCFKU09OVGVtcGxhdGUgfHwgIUpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgfHwgSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSA9PT0gXCJcIikgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh1bmxheWVyKVxuICAgICAgICAgICAgdW5sYXllci5sb2FkRGVzaWduKEpTT04ucGFyc2UoSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSkpO1xuICAgIH0sIFtKU09OVGVtcGxhdGVdKTtcblxuICAgIGNvbnN0IG9uUmVhZHk6IEVtYWlsRWRpdG9yUHJvcHNbXCJvblJlYWR5XCJdID0gdW5sYXllciA9PiB7XG4gICAgICAgIC8vIGVkaXRvciBpcyByZWFkeVxuICAgICAgICAvLyB5b3UgY2FuIGxvYWQgeW91ciB0ZW1wbGF0ZSBoZXJlO1xuICAgICAgICAvLyB0aGUgZGVzaWduIGpzb24gY2FuIGJlIG9idGFpbmVkIGJ5IGNhbGxpbmdcbiAgICAgICAgLy8gdW5sYXllci5sb2FkRGVzaWduKGNhbGxiYWNrKSBvciB1bmxheWVyLmV4cG9ydEh0bWwoY2FsbGJhY2spXG4gICAgICAgIGlmICghSlNPTlRlbXBsYXRlIHx8ICFKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlIHx8IEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgPT09IFwiXCIpIFxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZXhwb3J0SHRtbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcblxuICAgICAgICB1bmxheWVyPy5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XG5cbiAgICAgICAgICAgIC8vIEFjdGlvblZhbHVlIGlzIHVzZWQgdG8gcmVwcmVzZW50IGFjdGlvbnMsIGxpa2UgdGhlIE9uIGNsaWNrIHByb3BlcnR5IG9mIGFuIGFjdGlvbiBidXR0b24uIEZvciBhbnkgYWN0aW9uIGV4Y2VwdCBEbyBub3RoaW5nLCB5b3VyIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYSB2YWx1ZSBhZGhlcmluZyB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS4gRm9yIERvIG5vdGhpbmcgaXQgd2lsbCByZWNlaXZlIHVuZGVmaW5lZC4gVGhlIEFjdGlvblZhbHVlIHByb3AgYXBwZWFycyBsaWtlIHRoaXM6XG4gICAgICAgICAgICBpZiAoZXhwb3J0SFRNTEFjdGlvbiAmJiBleHBvcnRIVE1MQWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWV4cG9ydEhUTUxBY3Rpb24uaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoSFRNTEJvZHkgJiYgSFRNTEJvZHkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIEhUTUxCb2R5LnNldFZhbHVlKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OVGVtcGxhdGUuc2V0VmFsdWUoSlNPTi5zdHJpbmdpZnkoZGVzaWduKSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydEhUTUxBY3Rpb24uZXhlY3V0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIGNvbnN0IHNhdmVEZXNpZ24gPSAoKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbEVkaXRvclJlZi5jdXJyZW50Py5lZGl0b3I7XG5cbiAgICAvLyAgICAgdW5sYXllcj8uc2F2ZURlc2lnbihkZXNpZ24gPT4ge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ3NhdmVEZXNpZ24nLCBkZXNpZ24pO1xuICAgIC8vICAgICAgICAgYWxlcnQoJ0Rlc2lnbiBKU09OIGhhcyBiZWVuIGxvZ2dlZCBpbiB5b3VyIGRldmVsb3BlciBjb25zb2xlLicpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e2V4cG9ydEh0bWx9PlxuICAgICAgICAgICAgICAgICAgICBFeHBvcnQgSFRNTFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxFbWFpbEVkaXRvciByZWY9e2VtYWlsRWRpdG9yUmVmfSBvblJlYWR5PXtvblJlYWR5fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFbWFpbEVkaXRvclJlYWN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9FbWFpbEVkaXRvclJlYWN0XCI7XG5cbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHsgSFRNTEJvZHksIEpTT05UZW1wbGF0ZSwgZXhwb3J0SFRNTEFjdGlvbiwgc2F2ZVRlbXBsYXRlQWN0aW9uIH06IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxFbWFpbEVkaXRvclJlYWN0IFxuICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XG4gICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxuICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxuICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn0gLz47XG59XG4iXSwibmFtZXMiOlsiZGVmYXVsdFNjcmlwdFVybCIsImNhbGxiYWNrcyIsImxvYWRlZCIsImlzU2NyaXB0SW5qZWN0ZWQiLCJzY3JpcHRVcmwiLCJzY3JpcHRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5qZWN0ZWQiLCJmb3JFYWNoIiwic2NyaXB0Iiwic3JjIiwiaW5jbHVkZXMiLCJhZGRDYWxsYmFjayIsImNhbGxiYWNrIiwicHVzaCIsInJ1bkNhbGxiYWNrcyIsInNoaWZ0IiwibG9hZFNjcmlwdCIsImVtYmVkU2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm9ubG9hZCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsInJlcXVpcmUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxnQkFBZ0IsR0FBRyx1Q0FBdUMsQ0FBQTtFQUNoRSxJQUFNQyxTQUFTLEdBQWUsRUFBRSxDQUFBO0VBQ2hDLElBQUlDLE1BQU0sR0FBRyxLQUFLLENBQUE7Q0FFbEIsQ0FBQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJQyxTQUFpQixFQUFBO0lBQ3pDLElBQU1DLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuRCxJQUFJQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0NBRXBCSCxHQUFBQSxPQUFPLENBQUNJLE9BQU8sQ0FBQyxVQUFDQyxNQUFNLEVBQUE7TUFDckIsSUFBSUEsTUFBTSxDQUFDQyxHQUFHLENBQUNDLFFBQVEsQ0FBQ1IsU0FBUyxDQUFDLEVBQUU7UUFDbENJLFFB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
