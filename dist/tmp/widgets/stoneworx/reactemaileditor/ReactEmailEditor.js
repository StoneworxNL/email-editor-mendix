define(['exports', 'react'], (function (exports, React) { 'use strict';

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
		var version = "1.7.11";
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
		var win = typeof window === 'undefined' ? {
		  __unlayer_lastEditorId: 0
		} : window;
		win.__unlayer_lastEditorId = win.__unlayer_lastEditorId || 0;
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
		    return props.editorId || "editor-" + ++win.__unlayer_lastEditorId;
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

	var hasRequiredDist;

	function requireDist () {
		if (hasRequiredDist) return dist.exports;
		hasRequiredDist = 1;

		{
		  dist.exports = requireReactEmailEditor_cjs_development();
		}
		return dist.exports;
	}

	var distExports = requireDist();
	var EmailEditor = /*@__PURE__*/getDefaultExportFromCjs(distExports);

	function Toolbar({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction, emailRef }) {
	    const exportAction = (action) => {
	        const unlayer = emailRef.current?.editor;
	        unlayer?.exportHtml((data) => {
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
	    return (React.createElement("div", { className: "spacing-inner-bottom-medium" },
	        exportHTMLAction && (React.createElement("button", { className: "btn mx-button btn-default", onClick: () => exportAction(exportHTMLAction) }, "Export HTML")),
	        saveTemplateAction && (React.createElement("button", { className: "btn mx-button btn-default spacing-outer-left-medium", onClick: () => exportAction(saveTemplateAction) }, "Save Template"))));
	}

	function loadJSONTemplate(JSONTemplate, unlayer) {
	    if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "")
	        return;
	    else {
	        unlayer && unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
	    }
	}
	function EditorWrapper({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    const emailEditorRef = React.useRef(null);
	    React.useEffect(() => {
	        const unlayer = emailEditorRef.current?.editor;
	        loadJSONTemplate(JSONTemplate, unlayer);
	    }, [JSONTemplate]);
	    const onReady = unlayer => {
	        loadJSONTemplate(JSONTemplate, unlayer);
	    };
	    return (React.createElement("div", { className: "react-email-editor-div" },
	        React.createElement(Toolbar, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction, emailRef: emailEditorRef }),
	        React.createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady, 
	            // projectId={projectId}
	            // minHeight="100vh"
	            options: {
	                appearance: {
	                    theme: "modern_light"
	                }
	            } })));
	}

	function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
	    return (React.createElement(EditorWrapper, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction }));
	}

	exports.ReactEmailEditor = ReactEmailEditor;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtZW1haWwtZWRpdG9yL2Rpc3QvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ub29sYmFyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvcldyYXBwZXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL1JlYWN0RW1haWxFZGl0b3IudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjEuNy4xMVwiO1xudmFyIGRlc2NyaXB0aW9uID0gXCJVbmxheWVyJ3MgRW1haWwgRWRpdG9yIENvbXBvbmVudCBmb3IgUmVhY3QuanNcIjtcbnZhciBtYWluID0gXCJkaXN0L2luZGV4LmpzXCI7XG52YXIgdHlwaW5ncyA9IFwiZGlzdC9pbmRleC5kLnRzXCI7XG52YXIgZmlsZXMgPSBbXG5cdFwiZGlzdFwiXG5dO1xudmFyIGVuZ2luZXMgPSB7XG5cdG5vZGU6IFwiPj0xMFwiXG59O1xudmFyIHNjcmlwdHMgPSB7XG5cdHN0YXJ0OiBcInRzZHggd2F0Y2hcIixcblx0YnVpbGQ6IFwidHNkeCBidWlsZFwiLFxuXHR0ZXN0OiBcInRzZHggdGVzdFwiLFxuXHRcInRlc3Q6d2F0Y2hcIjogXCJ0c2R4IHRlc3QgLS13YXRjaFwiLFxuXHRcInRlc3Q6Y292ZXJhZ2VcIjogXCJ0c2R4IHRlc3QgLS1jb3ZlcmFnZVwiLFxuXHRsaW50OiBcInRzZHggbGludFwiLFxuXHRwcmVwYXJlOiBcInRzZHggYnVpbGRcIixcblx0cmVsZWFzZTogXCJucG0gcnVuIGJ1aWxkICYmIG5wbSBwdWJsaXNoXCIsXG5cdFwibmV0bGlmeS1idWlsZFwiOiBcImNkIGRlbW8gJiYgbnBtIGluc3RhbGwgJiYgbnBtIHJ1biBidWlsZFwiXG59O1xudmFyIHBlZXJEZXBlbmRlbmNpZXMgPSB7XG5cdHJlYWN0OiBcIj49MTVcIlxufTtcbnZhciBodXNreSA9IHtcblx0aG9va3M6IHtcblx0XHRcInByZS1jb21taXRcIjogXCJ0c2R4IGxpbnRcIlxuXHR9XG59O1xudmFyIGRlcGVuZGVuY2llcyA9IHtcblx0XCJ1bmxheWVyLXR5cGVzXCI6IFwibGF0ZXN0XCJcbn07XG52YXIgZGV2RGVwZW5kZW5jaWVzID0ge1xuXHRcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjogXCJeNS4wLjJcIixcblx0XCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjEzLjQuMFwiLFxuXHRcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXG5cdFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4wLjEwXCIsXG5cdGh1c2t5OiBcIl44LjAuM1wiLFxuXHRyZWFjdDogXCJeMTguMi4wXCIsXG5cdFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuXHRcInJvbGx1cC1wbHVnaW4tY29weVwiOiBcIl4zLjQuMFwiLFxuXHR0c2R4OiBcIl4wLjE0LjFcIixcblx0dHNsaWI6IFwiXjIuNC4xXCIsXG5cdHR5cGVzY3JpcHQ6IFwiXjQuOS40XCJcbn07XG52YXIgYXV0aG9yID0gXCJcIjtcbnZhciBob21lcGFnZSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yI3JlYWRtZVwiO1xudmFyIGxpY2Vuc2UgPSBcIk1JVFwiO1xudmFyIHJlcG9zaXRvcnkgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvci5naXRcIjtcbnZhciBrZXl3b3JkcyA9IFtcblx0XCJyZWFjdC1jb21wb25lbnRcIlxuXTtcbnZhciBwa2cgPSB7XG5cdG5hbWU6IG5hbWUsXG5cdHZlcnNpb246IHZlcnNpb24sXG5cdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcblx0bWFpbjogbWFpbixcblx0dHlwaW5nczogdHlwaW5ncyxcblx0ZmlsZXM6IGZpbGVzLFxuXHRlbmdpbmVzOiBlbmdpbmVzLFxuXHRzY3JpcHRzOiBzY3JpcHRzLFxuXHRwZWVyRGVwZW5kZW5jaWVzOiBwZWVyRGVwZW5kZW5jaWVzLFxuXHRodXNreTogaHVza3ksXG5cdGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxuXHRkZXZEZXBlbmRlbmNpZXM6IGRldkRlcGVuZGVuY2llcyxcblx0YXV0aG9yOiBhdXRob3IsXG5cdGhvbWVwYWdlOiBob21lcGFnZSxcblx0bGljZW5zZTogbGljZW5zZSxcblx0cmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcblx0a2V5d29yZHM6IGtleXdvcmRzXG59O1xuXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9ICdodHRwczovL2VkaXRvci51bmxheWVyLmNvbS9lbWJlZC5qcz8yJztcbnZhciBjYWxsYmFja3MgPSBbXTtcbnZhciBsb2FkZWQgPSBmYWxzZTtcbnZhciBpc1NjcmlwdEluamVjdGVkID0gZnVuY3Rpb24gaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpIHtcbiAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcbiAgdmFyIGluamVjdGVkID0gZmFsc2U7XG4gIHNjcmlwdHMuZm9yRWFjaChmdW5jdGlvbiAoc2NyaXB0KSB7XG4gICAgaWYgKHNjcmlwdC5zcmMuaW5jbHVkZXMoc2NyaXB0VXJsKSkge1xuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBpbmplY3RlZDtcbn07XG52YXIgYWRkQ2FsbGJhY2sgPSBmdW5jdGlvbiBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG59O1xudmFyIHJ1bkNhbGxiYWNrcyA9IGZ1bmN0aW9uIHJ1bkNhbGxiYWNrcygpIHtcbiAgaWYgKGxvYWRlZCkge1xuICAgIHZhciBjYWxsYmFjaztcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn07XG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQoY2FsbGJhY2ssIHNjcmlwdFVybCkge1xuICBpZiAoc2NyaXB0VXJsID09PSB2b2lkIDApIHtcbiAgICBzY3JpcHRVcmwgPSBkZWZhdWx0U2NyaXB0VXJsO1xuICB9XG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgaWYgKCFpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkpIHtcbiAgICB2YXIgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNjcmlwdFVybCk7XG4gICAgZW1iZWRTY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbWJlZFNjcmlwdCk7XG4gIH0gZWxzZSB7XG4gICAgcnVuQ2FsbGJhY2tzKCk7XG4gIH1cbn07XG5cbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IHtcbiAgX191bmxheWVyX2xhc3RFZGl0b3JJZDogMFxufSA6IHdpbmRvdztcbndpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkID0gd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQgfHwgMDtcbnZhciBFbWFpbEVkaXRvciA9IC8qI19fUFVSRV9fKi9SZWFjdF9fZGVmYXVsdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gIHZhciBfcHJvcHMkYXBwZWFyYW5jZSwgX3Byb3BzJG9wdGlvbnMsIF9wcm9wcyRvcHRpb25zMiwgX3Byb3BzJGxvY2FsZSwgX3Byb3BzJG9wdGlvbnMzLCBfcHJvcHMkcHJvamVjdElkLCBfcHJvcHMkb3B0aW9uczQsIF9wcm9wcyR0b29scywgX3Byb3BzJG9wdGlvbnM1O1xuICB2YXIgb25Mb2FkID0gcHJvcHMub25Mb2FkLFxuICAgIG9uUmVhZHkgPSBwcm9wcy5vblJlYWR5LFxuICAgIHNjcmlwdFVybCA9IHByb3BzLnNjcmlwdFVybCxcbiAgICBfcHJvcHMkbWluSGVpZ2h0ID0gcHJvcHMubWluSGVpZ2h0LFxuICAgIG1pbkhlaWdodCA9IF9wcm9wcyRtaW5IZWlnaHQgPT09IHZvaWQgMCA/IDUwMCA6IF9wcm9wcyRtaW5IZWlnaHQsXG4gICAgX3Byb3BzJHN0eWxlID0gcHJvcHMuc3R5bGUsXG4gICAgc3R5bGUgPSBfcHJvcHMkc3R5bGUgPT09IHZvaWQgMCA/IHt9IDogX3Byb3BzJHN0eWxlO1xuICB2YXIgX3VzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUobnVsbCksXG4gICAgZWRpdG9yID0gX3VzZVN0YXRlWzBdLFxuICAgIHNldEVkaXRvciA9IF91c2VTdGF0ZVsxXTtcbiAgdmFyIF91c2VTdGF0ZTIgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksXG4gICAgaGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzBdLFxuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlsxXTtcbiAgdmFyIGVkaXRvcklkID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmVkaXRvcklkIHx8IFwiZWRpdG9yLVwiICsgKyt3aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZDtcbiAgfSwgW3Byb3BzLmVkaXRvcklkXSk7XG4gIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHByb3BzLm9wdGlvbnMgfHwge30sIHtcbiAgICBhcHBlYXJhbmNlOiAoX3Byb3BzJGFwcGVhcmFuY2UgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX3Byb3BzJGFwcGVhcmFuY2UgOiAoX3Byb3BzJG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMuYXBwZWFyYW5jZSxcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfcHJvcHMkb3B0aW9uczIgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMyLmRpc3BsYXlNb2RlKSB8fCAnZW1haWwnLFxuICAgIGxvY2FsZTogKF9wcm9wcyRsb2NhbGUgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfcHJvcHMkbG9jYWxlIDogKF9wcm9wcyRvcHRpb25zMyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczMubG9jYWxlLFxuICAgIHByb2plY3RJZDogKF9wcm9wcyRwcm9qZWN0SWQgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfcHJvcHMkcHJvamVjdElkIDogKF9wcm9wcyRvcHRpb25zNCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczQucHJvamVjdElkLFxuICAgIHRvb2xzOiAoX3Byb3BzJHRvb2xzID0gcHJvcHMudG9vbHMpICE9IG51bGwgPyBfcHJvcHMkdG9vbHMgOiAoX3Byb3BzJG9wdGlvbnM1ID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zNS50b29scyxcbiAgICBpZDogZWRpdG9ySWQsXG4gICAgc291cmNlOiB7XG4gICAgICBuYW1lOiBwa2cubmFtZSxcbiAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uXG4gICAgfVxuICB9KTtcbiAgUmVhY3QudXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWRpdG9yOiBlZGl0b3JcbiAgICB9O1xuICB9LCBbZWRpdG9yXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICB9O1xuICB9LCBbXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xuICAgIGxvYWRTY3JpcHQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpO1xuICAgIH0sIHNjcmlwdFVybCk7XG4gIH0sIFtzY3JpcHRVcmxdKTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcbiAgdmFyIG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICByZXR1cm4gL15vbi8udGVzdChwcm9wTmFtZSk7XG4gIH0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICghZWRpdG9yKSByZXR1cm47XG4gICAgb25Mb2FkID09IG51bGwgPyB2b2lkIDAgOiBvbkxvYWQoZWRpdG9yKTtcbiAgICAvLyBBbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIG9uW05hbWVdIGFyZSByZWdpc3RlcmVkIGFzIGV2ZW50IGxpc3RlbmVycy5cbiAgICBtZXRob2RQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RQcm9wKSB7XG4gICAgICBpZiAoL15vbi8udGVzdChtZXRob2RQcm9wKSAmJiBtZXRob2RQcm9wICE9PSAnb25Mb2FkJyAmJiBtZXRob2RQcm9wICE9PSAnb25SZWFkeScgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKG1ldGhvZFByb3AsIHByb3BzW21ldGhvZFByb3BdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAob25SZWFkeSkge1xuICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2VkaXRvcjpyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbZWRpdG9yLCBPYmplY3Qua2V5cyhtZXRob2RQcm9wcykuam9pbignLCcpXSk7XG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBzdHlsZToge1xuICAgICAgZmxleDogMSxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIG1pbkhlaWdodDogbWluSGVpZ2h0XG4gICAgfVxuICB9LCBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBpZDogZWRpdG9ySWQsXG4gICAgc3R5bGU6IF9leHRlbmRzKHt9LCBzdHlsZSwge1xuICAgICAgZmxleDogMVxuICAgIH0pXG4gIH0pKTtcbn0pO1xuXG5leHBvcnRzLkVtYWlsRWRpdG9yID0gRW1haWxFZGl0b3I7XG5leHBvcnRzLmRlZmF1bHQgPSBFbWFpbEVkaXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMubWFwXG4iLCJcbid1c2Ugc3RyaWN0J1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5wcm9kdWN0aW9uLm1pbi5qcycpXG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5kZXZlbG9wbWVudC5qcycpXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBFZGl0YWJsZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xyXG5pbXBvcnQgeyBFZGl0b3JSZWYgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRvb2xiYXJQcm9wcyB7XHJcbiAgICBIVE1MQm9keT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIGV4cG9ydEhUTUxBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG4gICAgZW1haWxSZWY6IFJlYWN0LlJlZk9iamVjdDxFZGl0b3JSZWYgfCBudWxsPjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRvb2xiYXIoe1xyXG4gICAgSFRNTEJvZHksXHJcbiAgICBKU09OVGVtcGxhdGUsXHJcbiAgICBleHBvcnRIVE1MQWN0aW9uLFxyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uLFxyXG4gICAgZW1haWxSZWZcclxufTogVG9vbGJhclByb3BzKTogUmVhY3RFbGVtZW50IHtcclxuICAgIGNvbnN0IGV4cG9ydEFjdGlvbiA9IChhY3Rpb246IEFjdGlvblZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuICAgICAgICB1bmxheWVyPy5leHBvcnRIdG1sKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3Rpb25WYWx1ZSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhY3Rpb25zLCBsaWtlIHRoZSBPbiBjbGljayBwcm9wZXJ0eSBvZiBhbiBhY3Rpb24gYnV0dG9uLiBGb3IgYW55IGFjdGlvbiBleGNlcHQgRG8gbm90aGluZywgeW91ciBjb21wb25lbnQgd2lsbCByZWNlaXZlIGEgdmFsdWUgYWRoZXJpbmcgdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuIEZvciBEbyBub3RoaW5nIGl0IHdpbGwgcmVjZWl2ZSB1bmRlZmluZWQuIFRoZSBBY3Rpb25WYWx1ZSBwcm9wIGFwcGVhcnMgbGlrZSB0aGlzOlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChIVE1MQm9keSAmJiBIVE1MQm9keS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQm9keS5zZXRWYWx1ZShodG1sKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZS5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShkZXNpZ24pKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cclxuICAgICAgICAgICAge2V4cG9ydEhUTUxBY3Rpb24gJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKGV4cG9ydEhUTUxBY3Rpb24pfT5cclxuICAgICAgICAgICAgICAgICAgICBFeHBvcnQgSFRNTFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2F2ZVRlbXBsYXRlQWN0aW9uICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0IHNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGV4cG9ydEFjdGlvbihzYXZlVGVtcGxhdGVBY3Rpb24pfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIFNhdmUgVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50LCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgRWRpdGFibGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcclxuaW1wb3J0IEVtYWlsRWRpdG9yLCB7IEVkaXRvciwgRWRpdG9yUmVmLCBFbWFpbEVkaXRvclByb3BzIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xyXG5pbXBvcnQgeyBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XHJcbiAgICBIVE1MQm9keT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIGV4cG9ydEhUTUxBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgdW5sYXllcj86IEVkaXRvciB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmICghSlNPTlRlbXBsYXRlIHx8ICFKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlIHx8IEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgPT09IFwiXCIpIHJldHVybjtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVubGF5ZXIgJiYgdW5sYXllci5sb2FkRGVzaWduKEpTT04ucGFyc2UoSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRWRpdG9yV3JhcHBlcih7IEhUTUxCb2R5LCBKU09OVGVtcGxhdGUsIGV4cG9ydEhUTUxBY3Rpb24sIHNhdmVUZW1wbGF0ZUFjdGlvbiB9OiBQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuICAgICAgICBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgdW5sYXllcik7XHJcbiAgICB9LCBbSlNPTlRlbXBsYXRlXSk7XHJcblxyXG4gICAgY29uc3Qgb25SZWFkeTogRW1haWxFZGl0b3JQcm9wc1tcIm9uUmVhZHlcIl0gPSB1bmxheWVyID0+IHtcclxuICAgICAgICBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgdW5sYXllcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCI+XHJcbiAgICAgICAgICAgIDxUb29sYmFyXHJcbiAgICAgICAgICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XHJcbiAgICAgICAgICAgICAgICBKU09OVGVtcGxhdGU9e0pTT05UZW1wbGF0ZX1cclxuICAgICAgICAgICAgICAgIGV4cG9ydEhUTUxBY3Rpb249e2V4cG9ydEhUTUxBY3Rpb259XHJcbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn1cclxuICAgICAgICAgICAgICAgIGVtYWlsUmVmPXtlbWFpbEVkaXRvclJlZn1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIDxFbWFpbEVkaXRvclxyXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cclxuICAgICAgICAgICAgICAgIG9uUmVhZHk9e29uUmVhZHl9XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cclxuICAgICAgICAgICAgICAgIC8vIG1pbkhlaWdodD1cIjEwMHZoXCJcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3tcclxuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcIm1vZGVybl9saWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBFZGl0b3JXcmFwcGVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyXCI7XHJcblxyXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcclxuXHJcbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvblxyXG59OiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RWRpdG9yV3JhcHBlclxyXG4gICAgICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XHJcbiAgICAgICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxyXG4gICAgICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxyXG4gICAgICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn1cclxuICAgICAgICAvPlxyXG4gICAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiZGVmYXVsdFNjcmlwdFVybCIsImNhbGxiYWNrcyIsImxvYWRlZCIsImlzU2NyaXB0SW5qZWN0ZWQiLCJzY3JpcHRVcmwiLCJzY3JpcHRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5qZWN0ZWQiLCJmb3JFYWNoIiwic2NyaXB0Iiwic3JjIiwiaW5jbHVkZXMiLCJhZGRDYWxsYmFjayIsImNhbGxiYWNrIiwicHVzaCIsInJ1bkNhbGxiYWNrcyIsInNoaWZ0IiwibG9hZFNjcmlwdCIsImVtYmVkU2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsIm9ubG9hZCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1vZHVsZSIsInJlcXVpcmUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFNQSxnQkFBZ0Is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
