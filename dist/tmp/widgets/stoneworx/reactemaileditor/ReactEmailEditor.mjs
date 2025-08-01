import { useRef, useEffect, createElement } from 'react';

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
    const emailEditorRef = useRef(null);
    // const [JSONDesign, setJSONDesign] = useState(JSONTemplate);
    useEffect(() => {
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
    return (createElement("div", { className: "react-email-editor-div" },
        createElement("div", { className: "spacing-inner-bottom-medium" },
            exportHTMLAction && (createElement("button", { className: "btn mx-button btn-default", onClick: () => exportAction(exportHTMLAction) }, "Export HTML")),
            saveTemplateAction && (createElement("button", { className: "btn mx-button btn-default spacing-outer-left-medium", onClick: () => exportAction(saveTemplateAction) }, "Save Template"))),
        createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady, minHeight: 1000, 
            // projectId={projectId}
            options: {
                appearance: {
                    theme: "modern_light"
                }
            } })));
}

function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
    return createElement(EmailEditorComponent, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction });
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRW1haWxFZGl0b3JDb21wb25lbnQudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL1JlYWN0RW1haWxFZGl0b3IudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XHJcblxyXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBSZWFjdF9fZGVmYXVsdCA9IF9pbnRlcm9wRGVmYXVsdChSZWFjdCk7XHJcblxyXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcclxuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgfTtcclxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xyXG52YXIgdmVyc2lvbiA9IFwiMS43LjlcIjtcclxudmFyIGRlc2NyaXB0aW9uID0gXCJVbmxheWVyJ3MgRW1haWwgRWRpdG9yIENvbXBvbmVudCBmb3IgUmVhY3QuanNcIjtcclxudmFyIG1haW4gPSBcImRpc3QvaW5kZXguanNcIjtcclxudmFyIHR5cGluZ3MgPSBcImRpc3QvaW5kZXguZC50c1wiO1xyXG52YXIgZmlsZXMgPSBbXHJcblx0XCJkaXN0XCJcclxuXTtcclxudmFyIGVuZ2luZXMgPSB7XHJcblx0bm9kZTogXCI+PTEwXCJcclxufTtcclxudmFyIHNjcmlwdHMgPSB7XHJcblx0c3RhcnQ6IFwidHNkeCB3YXRjaFwiLFxyXG5cdGJ1aWxkOiBcInRzZHggYnVpbGRcIixcclxuXHR0ZXN0OiBcInRzZHggdGVzdFwiLFxyXG5cdFwidGVzdDp3YXRjaFwiOiBcInRzZHggdGVzdCAtLXdhdGNoXCIsXHJcblx0XCJ0ZXN0OmNvdmVyYWdlXCI6IFwidHNkeCB0ZXN0IC0tY292ZXJhZ2VcIixcclxuXHRsaW50OiBcInRzZHggbGludFwiLFxyXG5cdHByZXBhcmU6IFwidHNkeCBidWlsZFwiLFxyXG5cdHJlbGVhc2U6IFwibnBtIHJ1biBidWlsZCAmJiBucG0gcHVibGlzaFwiLFxyXG5cdFwibmV0bGlmeS1idWlsZFwiOiBcImNkIGRlbW8gJiYgbnBtIGluc3RhbGwgJiYgbnBtIHJ1biBidWlsZFwiXHJcbn07XHJcbnZhciBwZWVyRGVwZW5kZW5jaWVzID0ge1xyXG5cdHJlYWN0OiBcIj49MTVcIlxyXG59O1xyXG52YXIgaHVza3kgPSB7XHJcblx0aG9va3M6IHtcclxuXHRcdFwicHJlLWNvbW1pdFwiOiBcInRzZHggbGludFwiXHJcblx0fVxyXG59O1xyXG52YXIgZGVwZW5kZW5jaWVzID0ge1xyXG5cdFwidW5sYXllci10eXBlc1wiOiBcImxhdGVzdFwiXHJcbn07XHJcbnZhciBkZXZEZXBlbmRlbmNpZXMgPSB7XHJcblx0XCJAcm9sbHVwL3BsdWdpbi1yZXBsYWNlXCI6IFwiXjUuMC4yXCIsXHJcblx0XCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI6IFwiXjEzLjQuMFwiLFxyXG5cdFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjAuMjdcIixcclxuXHRcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMFwiLFxyXG5cdGh1c2t5OiBcIl44LjAuM1wiLFxyXG5cdHJlYWN0OiBcIl4xOC4yLjBcIixcclxuXHRcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcclxuXHRcInJvbGx1cC1wbHVnaW4tY29weVwiOiBcIl4zLjQuMFwiLFxyXG5cdHRzZHg6IFwiXjAuMTQuMVwiLFxyXG5cdHRzbGliOiBcIl4yLjQuMVwiLFxyXG5cdHR5cGVzY3JpcHQ6IFwiXjQuOS40XCJcclxufTtcclxudmFyIGF1dGhvciA9IFwiXCI7XHJcbnZhciBob21lcGFnZSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yI3JlYWRtZVwiO1xyXG52YXIgbGljZW5zZSA9IFwiTUlUXCI7XHJcbnZhciByZXBvc2l0b3J5ID0gXCJodHRwczovL2dpdGh1Yi5jb20vdW5sYXllci9yZWFjdC1lbWFpbC1lZGl0b3IuZ2l0XCI7XHJcbnZhciBrZXl3b3JkcyA9IFtcclxuXHRcInJlYWN0LWNvbXBvbmVudFwiXHJcbl07XHJcbnZhciBwa2cgPSB7XHJcblx0bmFtZTogbmFtZSxcclxuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxyXG5cdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuXHRtYWluOiBtYWluLFxyXG5cdHR5cGluZ3M6IHR5cGluZ3MsXHJcblx0ZmlsZXM6IGZpbGVzLFxyXG5cdGVuZ2luZXM6IGVuZ2luZXMsXHJcblx0c2NyaXB0czogc2NyaXB0cyxcclxuXHRwZWVyRGVwZW5kZW5jaWVzOiBwZWVyRGVwZW5kZW5jaWVzLFxyXG5cdGh1c2t5OiBodXNreSxcclxuXHRkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY2llcyxcclxuXHRkZXZEZXBlbmRlbmNpZXM6IGRldkRlcGVuZGVuY2llcyxcclxuXHRhdXRob3I6IGF1dGhvcixcclxuXHRob21lcGFnZTogaG9tZXBhZ2UsXHJcblx0bGljZW5zZTogbGljZW5zZSxcclxuXHRyZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxyXG5cdGtleXdvcmRzOiBrZXl3b3Jkc1xyXG59O1xyXG5cclxudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSAnaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/Mic7XHJcbnZhciBjYWxsYmFja3MgPSBbXTtcclxudmFyIGxvYWRlZCA9IGZhbHNlO1xyXG52YXIgaXNTY3JpcHRJbmplY3RlZCA9IGZ1bmN0aW9uIGlzU2NyaXB0SW5qZWN0ZWQoc2NyaXB0VXJsKSB7XHJcbiAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKTtcclxuICB2YXIgaW5qZWN0ZWQgPSBmYWxzZTtcclxuICBzY3JpcHRzLmZvckVhY2goZnVuY3Rpb24gKHNjcmlwdCkge1xyXG4gICAgaWYgKHNjcmlwdC5zcmMuaW5jbHVkZXMoc2NyaXB0VXJsKSkge1xyXG4gICAgICBpbmplY3RlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGluamVjdGVkO1xyXG59O1xyXG52YXIgYWRkQ2FsbGJhY2sgPSBmdW5jdGlvbiBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xyXG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxufTtcclxudmFyIHJ1bkNhbGxiYWNrcyA9IGZ1bmN0aW9uIHJ1bkNhbGxiYWNrcygpIHtcclxuICBpZiAobG9hZGVkKSB7XHJcbiAgICB2YXIgY2FsbGJhY2s7XHJcbiAgICB3aGlsZSAoY2FsbGJhY2sgPSBjYWxsYmFja3Muc2hpZnQoKSkge1xyXG4gICAgICBjYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxudmFyIGxvYWRTY3JpcHQgPSBmdW5jdGlvbiBsb2FkU2NyaXB0KGNhbGxiYWNrLCBzY3JpcHRVcmwpIHtcclxuICBpZiAoc2NyaXB0VXJsID09PSB2b2lkIDApIHtcclxuICAgIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmw7XHJcbiAgfVxyXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKTtcclxuICBpZiAoIWlzU2NyaXB0SW5qZWN0ZWQoc2NyaXB0VXJsKSkge1xyXG4gICAgdmFyIGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICBlbWJlZFNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNjcmlwdFVybCk7XHJcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgIHJ1bkNhbGxiYWNrcygpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBydW5DYWxsYmFja3MoKTtcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XHJcbnZhciBFbWFpbEVkaXRvciA9IC8qI19fUFVSRV9fKi9SZWFjdF9fZGVmYXVsdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XHJcbiAgdmFyIF9wcm9wcyRhcHBlYXJhbmNlLCBfcHJvcHMkb3B0aW9ucywgX3Byb3BzJG9wdGlvbnMyLCBfcHJvcHMkbG9jYWxlLCBfcHJvcHMkb3B0aW9uczMsIF9wcm9wcyRwcm9qZWN0SWQsIF9wcm9wcyRvcHRpb25zNCwgX3Byb3BzJHRvb2xzLCBfcHJvcHMkb3B0aW9uczU7XHJcbiAgdmFyIG9uTG9hZCA9IHByb3BzLm9uTG9hZCxcclxuICAgIG9uUmVhZHkgPSBwcm9wcy5vblJlYWR5LFxyXG4gICAgc2NyaXB0VXJsID0gcHJvcHMuc2NyaXB0VXJsLFxyXG4gICAgX3Byb3BzJG1pbkhlaWdodCA9IHByb3BzLm1pbkhlaWdodCxcclxuICAgIG1pbkhlaWdodCA9IF9wcm9wcyRtaW5IZWlnaHQgPT09IHZvaWQgMCA/IDUwMCA6IF9wcm9wcyRtaW5IZWlnaHQsXHJcbiAgICBfcHJvcHMkc3R5bGUgPSBwcm9wcy5zdHlsZSxcclxuICAgIHN0eWxlID0gX3Byb3BzJHN0eWxlID09PSB2b2lkIDAgPyB7fSA6IF9wcm9wcyRzdHlsZTtcclxuICB2YXIgX3VzZVN0YXRlID0gUmVhY3QudXNlU3RhdGUobnVsbCksXHJcbiAgICBlZGl0b3IgPSBfdXNlU3RhdGVbMF0sXHJcbiAgICBzZXRFZGl0b3IgPSBfdXNlU3RhdGVbMV07XHJcbiAgdmFyIF91c2VTdGF0ZTIgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksXHJcbiAgICBoYXNMb2FkZWRFbWJlZFNjcmlwdCA9IF91c2VTdGF0ZTJbMF0sXHJcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCA9IF91c2VTdGF0ZTJbMV07XHJcbiAgdmFyIGVkaXRvcklkID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gcHJvcHMuZWRpdG9ySWQgfHwgXCJlZGl0b3ItXCIgKyArK3dpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkO1xyXG4gIH0sIFtwcm9wcy5lZGl0b3JJZF0pO1xyXG4gIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIHByb3BzLm9wdGlvbnMgfHwge30sIHtcclxuICAgIGFwcGVhcmFuY2U6IChfcHJvcHMkYXBwZWFyYW5jZSA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfcHJvcHMkYXBwZWFyYW5jZSA6IChfcHJvcHMkb3B0aW9ucyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9ucy5hcHBlYXJhbmNlLFxyXG4gICAgZGlzcGxheU1vZGU6IChwcm9wcyA9PSBudWxsID8gdm9pZCAwIDogcHJvcHMuZGlzcGxheU1vZGUpIHx8ICgoX3Byb3BzJG9wdGlvbnMyID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zMi5kaXNwbGF5TW9kZSkgfHwgJ2VtYWlsJyxcclxuICAgIGxvY2FsZTogKF9wcm9wcyRsb2NhbGUgPSBwcm9wcy5sb2NhbGUpICE9IG51bGwgPyBfcHJvcHMkbG9jYWxlIDogKF9wcm9wcyRvcHRpb25zMyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczMubG9jYWxlLFxyXG4gICAgcHJvamVjdElkOiAoX3Byb3BzJHByb2plY3RJZCA9IHByb3BzLnByb2plY3RJZCkgIT0gbnVsbCA/IF9wcm9wcyRwcm9qZWN0SWQgOiAoX3Byb3BzJG9wdGlvbnM0ID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zNC5wcm9qZWN0SWQsXHJcbiAgICB0b29sczogKF9wcm9wcyR0b29scyA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX3Byb3BzJHRvb2xzIDogKF9wcm9wcyRvcHRpb25zNSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczUudG9vbHMsXHJcbiAgICBpZDogZWRpdG9ySWQsXHJcbiAgICBzb3VyY2U6IHtcclxuICAgICAgbmFtZTogcGtnLm5hbWUsXHJcbiAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgUmVhY3QudXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVkaXRvcjogZWRpdG9yXHJcbiAgICB9O1xyXG4gIH0sIFtlZGl0b3JdKTtcclxuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcclxuICAgIGxvYWRTY3JpcHQoZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSk7XHJcbiAgICB9LCBzY3JpcHRVcmwpO1xyXG4gIH0sIFtzY3JpcHRVcmxdKTtcclxuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xyXG4gICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xyXG4gICAgc2V0RWRpdG9yKHVubGF5ZXIuY3JlYXRlRWRpdG9yKG9wdGlvbnMpKTtcclxuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XHJcbiAgdmFyIG1ldGhvZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcihmdW5jdGlvbiAocHJvcE5hbWUpIHtcclxuICAgIHJldHVybiAvXm9uLy50ZXN0KHByb3BOYW1lKTtcclxuICB9KTtcclxuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcclxuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XHJcbiAgICAvLyBBbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIG9uW05hbWVdIGFyZSByZWdpc3RlcmVkIGFzIGV2ZW50IGxpc3RlbmVycy5cclxuICAgIG1ldGhvZFByb3BzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZFByb3ApIHtcclxuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gJ29uTG9hZCcgJiYgbWV0aG9kUHJvcCAhPT0gJ29uUmVhZHknICYmIHR5cGVvZiBwcm9wc1ttZXRob2RQcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKG1ldGhvZFByb3AsIHByb3BzW21ldGhvZFByb3BdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAob25SZWFkeSkge1xyXG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignZWRpdG9yOnJlYWR5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSwgW2VkaXRvciwgT2JqZWN0LmtleXMobWV0aG9kUHJvcHMpLmpvaW4oJywnKV0pO1xyXG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIGZsZXg6IDEsXHJcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgbWluSGVpZ2h0OiBtaW5IZWlnaHRcclxuICAgIH1cclxuICB9LCBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcclxuICAgIGlkOiBlZGl0b3JJZCxcclxuICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgc3R5bGUsIHtcclxuICAgICAgZmxleDogMVxyXG4gICAgfSlcclxuICB9KSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0cy5FbWFpbEVkaXRvciA9IEVtYWlsRWRpdG9yO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBFbWFpbEVkaXRvcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtZW1haWwtZWRpdG9yLmNqcy5kZXZlbG9wbWVudC5qcy5tYXBcclxuIiwiXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5wcm9kdWN0aW9uLm1pbi5qcycpXHJcbn0gZWxzZSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMnKVxyXG59XHJcbiIsIi8vIGltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZWFjdEVsZW1lbnQsIHVzZVJlZiwgY3JlYXRlRWxlbWVudCwgLyp1c2VTdGF0ZSwqLyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XHJcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XHJcbmltcG9ydCBcIi4uL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMge1xyXG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEVtYWlsRWRpdG9yQ29tcG9uZW50KHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvblxyXG59OiBFbWFpbEVkaXRvclNhbXBsZVByb3BzKTogUmVhY3RFbGVtZW50IHtcclxuICAgIGNvbnN0IGVtYWlsRWRpdG9yUmVmID0gdXNlUmVmPEVkaXRvclJlZj4obnVsbCk7XHJcbiAgICAvLyBjb25zdCBbSlNPTkRlc2lnbiwgc2V0SlNPTkRlc2lnbl0gPSB1c2VTdGF0ZShKU09OVGVtcGxhdGUpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuICAgICAgICBpZiAoIUpTT05UZW1wbGF0ZSB8fCAhSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSB8fCBKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlID09PSBcIlwiKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHVubGF5ZXIpIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcclxuICAgIH0sIFtKU09OVGVtcGxhdGVdKTtcclxuXHJcbiAgICBjb25zdCBvblJlYWR5OiBFbWFpbEVkaXRvclByb3BzW1wib25SZWFkeVwiXSA9IHVubGF5ZXIgPT4ge1xyXG4gICAgICAgIC8vIGVkaXRvciBpcyByZWFkeVxyXG4gICAgICAgIC8vIHlvdSBjYW4gbG9hZCB5b3VyIHRlbXBsYXRlIGhlcmU7XHJcbiAgICAgICAgLy8gdGhlIGRlc2lnbiBqc29uIGNhbiBiZSBvYnRhaW5lZCBieSBjYWxsaW5nXHJcbiAgICAgICAgLy8gdW5sYXllci5sb2FkRGVzaWduKGNhbGxiYWNrKSBvciB1bmxheWVyLmV4cG9ydEh0bWwoY2FsbGJhY2spXHJcbiAgICAgICAgaWYgKCFKU09OVGVtcGxhdGUgfHwgIUpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgfHwgSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSA9PT0gXCJcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICB1bmxheWVyLmxvYWREZXNpZ24oSlNPTi5wYXJzZShKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGV4cG9ydEFjdGlvbiA9IChhY3Rpb246IEFjdGlvblZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuXHJcbiAgICAgICAgdW5sYXllcj8uZXhwb3J0SHRtbChkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3Rpb25WYWx1ZSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhY3Rpb25zLCBsaWtlIHRoZSBPbiBjbGljayBwcm9wZXJ0eSBvZiBhbiBhY3Rpb24gYnV0dG9uLiBGb3IgYW55IGFjdGlvbiBleGNlcHQgRG8gbm90aGluZywgeW91ciBjb21wb25lbnQgd2lsbCByZWNlaXZlIGEgdmFsdWUgYWRoZXJpbmcgdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuIEZvciBEbyBub3RoaW5nIGl0IHdpbGwgcmVjZWl2ZSB1bmRlZmluZWQuIFRoZSBBY3Rpb25WYWx1ZSBwcm9wIGFwcGVhcnMgbGlrZSB0aGlzOlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChIVE1MQm9keSAmJiBIVE1MQm9keS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQm9keS5zZXRWYWx1ZShodG1sKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZS5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShkZXNpZ24pKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2luZy1pbm5lci1ib3R0b20tbWVkaXVtXCI+XHJcbiAgICAgICAgICAgICAgICB7ZXhwb3J0SFRNTEFjdGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKGV4cG9ydEhUTUxBY3Rpb24pfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRXhwb3J0IEhUTUxcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAge3NhdmVUZW1wbGF0ZUFjdGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0IHNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBleHBvcnRBY3Rpb24oc2F2ZVRlbXBsYXRlQWN0aW9uKX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNhdmUgVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXHJcbiAgICAgICAgICAgICAgICByZWY9e2VtYWlsRWRpdG9yUmVmfVxyXG4gICAgICAgICAgICAgICAgb25SZWFkeT17b25SZWFkeX1cclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodD17MTAwMH1cclxuICAgICAgICAgICAgICAgIC8vIHByb2plY3RJZD17cHJvamVjdElkfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17e1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IFwibW9kZXJuX2xpZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRW1haWxFZGl0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VtYWlsRWRpdG9yQ29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcclxuXHJcbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHsgSFRNTEJvZHksIEpTT05UZW1wbGF0ZSwgZXhwb3J0SFRNTEFjdGlvbiwgc2F2ZVRlbXBsYXRlQWN0aW9uIH06IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gPEVtYWlsRWRpdG9yQ29tcG9uZW50XHJcbiAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxyXG4gICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxyXG4gICAgICAgIGV4cG9ydEhUTUxBY3Rpb249e2V4cG9ydEhUTUxBY3Rpb259XHJcbiAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259IC8+O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJkZWZhdWx0U2NyaXB0VXJsIiwiY2FsbGJhY2tzIiwibG9hZGVkIiwiaXNTY3JpcHRJbmplY3RlZCIsInNjcmlwdFVybCIsInNjcmlwdHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmplY3RlZCIsImZvckVhY2giLCJzY3JpcHQiLCJzcmMiLCJpbmNsdWRlcyIsImFkZENhbGxiYWNrIiwiY2FsbGJhY2siLCJwdXNoIiwicnVuQ2FsbGJhY2tzIiwic2hpZnQiLCJsb2FkU2NyaXB0IiwiZW1iZWRTY3JpcHQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwib25sb2FkIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibW9kdWxlIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBLElBQU1BLGdCQUFnQixHQUFHLHVDQUF1QyxDQUFBO0NBQ2hFLElBQU1DLFNBQVMsR0FBZSxFQUFFLENBQUE7Q0FDaEMsSUFBSUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtBQUVsQixDQUFBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLFNBQWlCLEVBQUE7R0FDekMsSUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBQ25ELElBQUlDLFFB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
