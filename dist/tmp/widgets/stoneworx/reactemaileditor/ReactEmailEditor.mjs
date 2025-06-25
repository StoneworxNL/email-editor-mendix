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
        createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady })));
}

function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
    return createElement(EmailEditorComponent, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction });
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRW1haWxFZGl0b3JDb21wb25lbnQudHN4IiwiLi4vLi4vLi4vLi4vLi4vc3JjL1JlYWN0RW1haWxFZGl0b3IudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxudmFyIG5hbWUgPSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xudmFyIHZlcnNpb24gPSBcIjEuNy45XCI7XG52YXIgZGVzY3JpcHRpb24gPSBcIlVubGF5ZXIncyBFbWFpbCBFZGl0b3IgQ29tcG9uZW50IGZvciBSZWFjdC5qc1wiO1xudmFyIG1haW4gPSBcImRpc3QvaW5kZXguanNcIjtcbnZhciB0eXBpbmdzID0gXCJkaXN0L2luZGV4LmQudHNcIjtcbnZhciBmaWxlcyA9IFtcblx0XCJkaXN0XCJcbl07XG52YXIgZW5naW5lcyA9IHtcblx0bm9kZTogXCI+PTEwXCJcbn07XG52YXIgc2NyaXB0cyA9IHtcblx0c3RhcnQ6IFwidHNkeCB3YXRjaFwiLFxuXHRidWlsZDogXCJ0c2R4IGJ1aWxkXCIsXG5cdHRlc3Q6IFwidHNkeCB0ZXN0XCIsXG5cdFwidGVzdDp3YXRjaFwiOiBcInRzZHggdGVzdCAtLXdhdGNoXCIsXG5cdFwidGVzdDpjb3ZlcmFnZVwiOiBcInRzZHggdGVzdCAtLWNvdmVyYWdlXCIsXG5cdGxpbnQ6IFwidHNkeCBsaW50XCIsXG5cdHByZXBhcmU6IFwidHNkeCBidWlsZFwiLFxuXHRyZWxlYXNlOiBcIm5wbSBydW4gYnVpbGQgJiYgbnBtIHB1Ymxpc2hcIixcblx0XCJuZXRsaWZ5LWJ1aWxkXCI6IFwiY2QgZGVtbyAmJiBucG0gaW5zdGFsbCAmJiBucG0gcnVuIGJ1aWxkXCJcbn07XG52YXIgcGVlckRlcGVuZGVuY2llcyA9IHtcblx0cmVhY3Q6IFwiPj0xNVwiXG59O1xudmFyIGh1c2t5ID0ge1xuXHRob29rczoge1xuXHRcdFwicHJlLWNvbW1pdFwiOiBcInRzZHggbGludFwiXG5cdH1cbn07XG52YXIgZGVwZW5kZW5jaWVzID0ge1xuXHRcInVubGF5ZXItdHlwZXNcIjogXCJsYXRlc3RcIlxufTtcbnZhciBkZXZEZXBlbmRlbmNpZXMgPSB7XG5cdFwiQHJvbGx1cC9wbHVnaW4tcmVwbGFjZVwiOiBcIl41LjAuMlwiLFxuXHRcIkB0ZXN0aW5nLWxpYnJhcnkvcmVhY3RcIjogXCJeMTMuNC4wXCIsXG5cdFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjAuMjdcIixcblx0XCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcblx0aHVza3k6IFwiXjguMC4zXCIsXG5cdHJlYWN0OiBcIl4xOC4yLjBcIixcblx0XCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG5cdFwicm9sbHVwLXBsdWdpbi1jb3B5XCI6IFwiXjMuNC4wXCIsXG5cdHRzZHg6IFwiXjAuMTQuMVwiLFxuXHR0c2xpYjogXCJeMi40LjFcIixcblx0dHlwZXNjcmlwdDogXCJeNC45LjRcIlxufTtcbnZhciBhdXRob3IgPSBcIlwiO1xudmFyIGhvbWVwYWdlID0gXCJodHRwczovL2dpdGh1Yi5jb20vdW5sYXllci9yZWFjdC1lbWFpbC1lZGl0b3IjcmVhZG1lXCI7XG52YXIgbGljZW5zZSA9IFwiTUlUXCI7XG52YXIgcmVwb3NpdG9yeSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yLmdpdFwiO1xudmFyIGtleXdvcmRzID0gW1xuXHRcInJlYWN0LWNvbXBvbmVudFwiXG5dO1xudmFyIHBrZyA9IHtcblx0bmFtZTogbmFtZSxcblx0dmVyc2lvbjogdmVyc2lvbixcblx0ZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuXHRtYWluOiBtYWluLFxuXHR0eXBpbmdzOiB0eXBpbmdzLFxuXHRmaWxlczogZmlsZXMsXG5cdGVuZ2luZXM6IGVuZ2luZXMsXG5cdHNjcmlwdHM6IHNjcmlwdHMsXG5cdHBlZXJEZXBlbmRlbmNpZXM6IHBlZXJEZXBlbmRlbmNpZXMsXG5cdGh1c2t5OiBodXNreSxcblx0ZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXMsXG5cdGRldkRlcGVuZGVuY2llczogZGV2RGVwZW5kZW5jaWVzLFxuXHRhdXRob3I6IGF1dGhvcixcblx0aG9tZXBhZ2U6IGhvbWVwYWdlLFxuXHRsaWNlbnNlOiBsaWNlbnNlLFxuXHRyZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxuXHRrZXl3b3Jkczoga2V5d29yZHNcbn07XG5cbnZhciBkZWZhdWx0U2NyaXB0VXJsID0gJ2h0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzInO1xudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIGxvYWRlZCA9IGZhbHNlO1xudmFyIGlzU2NyaXB0SW5qZWN0ZWQgPSBmdW5jdGlvbiBpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkge1xuICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO1xuICB2YXIgaW5qZWN0ZWQgPSBmYWxzZTtcbiAgc2NyaXB0cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JpcHQpIHtcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XG4gICAgICBpbmplY3RlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGluamVjdGVkO1xufTtcbnZhciBhZGRDYWxsYmFjayA9IGZ1bmN0aW9uIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbn07XG52YXIgcnVuQ2FsbGJhY2tzID0gZnVuY3Rpb24gcnVuQ2FsbGJhY2tzKCkge1xuICBpZiAobG9hZGVkKSB7XG4gICAgdmFyIGNhbGxiYWNrO1xuICAgIHdoaWxlIChjYWxsYmFjayA9IGNhbGxiYWNrcy5zaGlmdCgpKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufTtcbnZhciBsb2FkU2NyaXB0ID0gZnVuY3Rpb24gbG9hZFNjcmlwdChjYWxsYmFjaywgc2NyaXB0VXJsKSB7XG4gIGlmIChzY3JpcHRVcmwgPT09IHZvaWQgMCkge1xuICAgIHNjcmlwdFVybCA9IGRlZmF1bHRTY3JpcHRVcmw7XG4gIH1cbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICBpZiAoIWlzU2NyaXB0SW5qZWN0ZWQoc2NyaXB0VXJsKSkge1xuICAgIHZhciBlbWJlZFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgc2NyaXB0VXJsKTtcbiAgICBlbWJlZFNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgICAgcnVuQ2FsbGJhY2tzKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcbiAgfSBlbHNlIHtcbiAgICBydW5DYWxsYmFja3MoKTtcbiAgfVxufTtcblxud2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xudmFyIEVtYWlsRWRpdG9yID0gLyojX19QVVJFX18qL1JlYWN0X19kZWZhdWx0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgdmFyIF9wcm9wcyRhcHBlYXJhbmNlLCBfcHJvcHMkb3B0aW9ucywgX3Byb3BzJG9wdGlvbnMyLCBfcHJvcHMkbG9jYWxlLCBfcHJvcHMkb3B0aW9uczMsIF9wcm9wcyRwcm9qZWN0SWQsIF9wcm9wcyRvcHRpb25zNCwgX3Byb3BzJHRvb2xzLCBfcHJvcHMkb3B0aW9uczU7XG4gIHZhciBvbkxvYWQgPSBwcm9wcy5vbkxvYWQsXG4gICAgb25SZWFkeSA9IHByb3BzLm9uUmVhZHksXG4gICAgc2NyaXB0VXJsID0gcHJvcHMuc2NyaXB0VXJsLFxuICAgIF9wcm9wcyRtaW5IZWlnaHQgPSBwcm9wcy5taW5IZWlnaHQsXG4gICAgbWluSGVpZ2h0ID0gX3Byb3BzJG1pbkhlaWdodCA9PT0gdm9pZCAwID8gNTAwIDogX3Byb3BzJG1pbkhlaWdodCxcbiAgICBfcHJvcHMkc3R5bGUgPSBwcm9wcy5zdHlsZSxcbiAgICBzdHlsZSA9IF9wcm9wcyRzdHlsZSA9PT0gdm9pZCAwID8ge30gOiBfcHJvcHMkc3R5bGU7XG4gIHZhciBfdXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShudWxsKSxcbiAgICBlZGl0b3IgPSBfdXNlU3RhdGVbMF0sXG4gICAgc2V0RWRpdG9yID0gX3VzZVN0YXRlWzFdO1xuICB2YXIgX3VzZVN0YXRlMiA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSxcbiAgICBoYXNMb2FkZWRFbWJlZFNjcmlwdCA9IF91c2VTdGF0ZTJbMF0sXG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzFdO1xuICB2YXIgZWRpdG9ySWQgPSBSZWFjdC51c2VNZW1vKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvcHMuZWRpdG9ySWQgfHwgXCJlZGl0b3ItXCIgKyArK3dpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkO1xuICB9LCBbcHJvcHMuZWRpdG9ySWRdKTtcbiAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMub3B0aW9ucyB8fCB7fSwge1xuICAgIGFwcGVhcmFuY2U6IChfcHJvcHMkYXBwZWFyYW5jZSA9IHByb3BzLmFwcGVhcmFuY2UpICE9IG51bGwgPyBfcHJvcHMkYXBwZWFyYW5jZSA6IChfcHJvcHMkb3B0aW9ucyA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9ucy5hcHBlYXJhbmNlLFxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9wcm9wcyRvcHRpb25zMiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczIuZGlzcGxheU1vZGUpIHx8ICdlbWFpbCcsXG4gICAgbG9jYWxlOiAoX3Byb3BzJGxvY2FsZSA9IHByb3BzLmxvY2FsZSkgIT0gbnVsbCA/IF9wcm9wcyRsb2NhbGUgOiAoX3Byb3BzJG9wdGlvbnMzID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zMy5sb2NhbGUsXG4gICAgcHJvamVjdElkOiAoX3Byb3BzJHByb2plY3RJZCA9IHByb3BzLnByb2plY3RJZCkgIT0gbnVsbCA/IF9wcm9wcyRwcm9qZWN0SWQgOiAoX3Byb3BzJG9wdGlvbnM0ID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zNC5wcm9qZWN0SWQsXG4gICAgdG9vbHM6IChfcHJvcHMkdG9vbHMgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9wcm9wcyR0b29scyA6IChfcHJvcHMkb3B0aW9uczUgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM1LnRvb2xzLFxuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIG5hbWU6IHBrZy5uYW1lLFxuICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb25cbiAgICB9XG4gIH0pO1xuICBSZWFjdC51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlZGl0b3I6IGVkaXRvclxuICAgIH07XG4gIH0sIFtlZGl0b3JdKTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZWRpdG9yID09IG51bGwgPyB2b2lkIDAgOiBlZGl0b3IuZGVzdHJveSgpO1xuICAgIH07XG4gIH0sIFtdKTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdChmYWxzZSk7XG4gICAgbG9hZFNjcmlwdChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQodHJ1ZSk7XG4gICAgfSwgc2NyaXB0VXJsKTtcbiAgfSwgW3NjcmlwdFVybF0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICghaGFzTG9hZGVkRW1iZWRTY3JpcHQpIHJldHVybjtcbiAgICBlZGl0b3IgPT0gbnVsbCA/IHZvaWQgMCA6IGVkaXRvci5kZXN0cm95KCk7XG4gICAgc2V0RWRpdG9yKHVubGF5ZXIuY3JlYXRlRWRpdG9yKG9wdGlvbnMpKTtcbiAgfSwgW0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpLCBoYXNMb2FkZWRFbWJlZFNjcmlwdF0pO1xuICB2YXIgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xuICAgIHJldHVybiAvXm9uLy50ZXN0KHByb3BOYW1lKTtcbiAgfSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFlZGl0b3IpIHJldHVybjtcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xuICAgIC8vIEFsbCBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggb25bTmFtZV0gYXJlIHJlZ2lzdGVyZWQgYXMgZXZlbnQgbGlzdGVuZXJzLlxuICAgIG1ldGhvZFByb3BzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZFByb3ApIHtcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09ICdvbkxvYWQnICYmIG1ldGhvZFByb3AgIT09ICdvblJlYWR5JyAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChvblJlYWR5KSB7XG4gICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignZWRpdG9yOnJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvblJlYWR5KGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtlZGl0b3IsIE9iamVjdC5rZXlzKG1ldGhvZFByb3BzKS5qb2luKCcsJyldKTtcbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIHN0eWxlOiB7XG4gICAgICBmbGV4OiAxLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgbWluSGVpZ2h0OiBtaW5IZWlnaHRcbiAgICB9XG4gIH0sIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGlkOiBlZGl0b3JJZCxcbiAgICBzdHlsZTogX2V4dGVuZHMoe30sIHN0eWxlLCB7XG4gICAgICBmbGV4OiAxXG4gICAgfSlcbiAgfSkpO1xufSk7XG5cbmV4cG9ydHMuRW1haWxFZGl0b3IgPSBFbWFpbEVkaXRvcjtcbmV4cG9ydHMuZGVmYXVsdCA9IEVtYWlsRWRpdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtZW1haWwtZWRpdG9yLmNqcy5kZXZlbG9wbWVudC5qcy5tYXBcbiIsIlxuJ3VzZSBzdHJpY3QnXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLnByb2R1Y3Rpb24ubWluLmpzJylcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzJylcbn1cbiIsIi8vIGltcG9ydCB7IFJlYWN0RWxlbWVudCwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3RFbGVtZW50LCB1c2VSZWYsIGNyZWF0ZUVsZW1lbnQsIC8qdXNlU3RhdGUsKi8gdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgRWRpdGFibGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XG5pbXBvcnQgXCIuLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMge1xuICAgIEhUTUxCb2R5PzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uPzogQWN0aW9uVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbWFpbEVkaXRvckNvbXBvbmVudCh7XG4gICAgSFRNTEJvZHksXG4gICAgSlNPTlRlbXBsYXRlLFxuICAgIGV4cG9ydEhUTUxBY3Rpb24sXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uXG59OiBFbWFpbEVkaXRvclNhbXBsZVByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xuICAgIC8vIGNvbnN0IFtKU09ORGVzaWduLCBzZXRKU09ORGVzaWduXSA9IHVzZVN0YXRlKEpTT05UZW1wbGF0ZSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxheWVyID0gZW1haWxFZGl0b3JSZWYuY3VycmVudD8uZWRpdG9yO1xuICAgICAgICBpZiAoIUpTT05UZW1wbGF0ZSB8fCAhSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSB8fCBKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlID09PSBcIlwiKSByZXR1cm47XG4gICAgICAgIGlmICh1bmxheWVyKSB1bmxheWVyLmxvYWREZXNpZ24oSlNPTi5wYXJzZShKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlKSk7XG4gICAgfSwgW0pTT05UZW1wbGF0ZV0pO1xuXG4gICAgY29uc3Qgb25SZWFkeTogRW1haWxFZGl0b3JQcm9wc1tcIm9uUmVhZHlcIl0gPSB1bmxheWVyID0+IHtcbiAgICAgICAgLy8gZWRpdG9yIGlzIHJlYWR5XG4gICAgICAgIC8vIHlvdSBjYW4gbG9hZCB5b3VyIHRlbXBsYXRlIGhlcmU7XG4gICAgICAgIC8vIHRoZSBkZXNpZ24ganNvbiBjYW4gYmUgb2J0YWluZWQgYnkgY2FsbGluZ1xuICAgICAgICAvLyB1bmxheWVyLmxvYWREZXNpZ24oY2FsbGJhY2spIG9yIHVubGF5ZXIuZXhwb3J0SHRtbChjYWxsYmFjaylcbiAgICAgICAgaWYgKCFKU09OVGVtcGxhdGUgfHwgIUpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgfHwgSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSA9PT0gXCJcIikgcmV0dXJuO1xuXG4gICAgICAgIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZXhwb3J0QWN0aW9uID0gKGFjdGlvbjogQWN0aW9uVmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcblxuICAgICAgICB1bmxheWVyPy5leHBvcnRIdG1sKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XG5cbiAgICAgICAgICAgIC8vIEFjdGlvblZhbHVlIGlzIHVzZWQgdG8gcmVwcmVzZW50IGFjdGlvbnMsIGxpa2UgdGhlIE9uIGNsaWNrIHByb3BlcnR5IG9mIGFuIGFjdGlvbiBidXR0b24uIEZvciBhbnkgYWN0aW9uIGV4Y2VwdCBEbyBub3RoaW5nLCB5b3VyIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYSB2YWx1ZSBhZGhlcmluZyB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS4gRm9yIERvIG5vdGhpbmcgaXQgd2lsbCByZWNlaXZlIHVuZGVmaW5lZC4gVGhlIEFjdGlvblZhbHVlIHByb3AgYXBwZWFycyBsaWtlIHRoaXM6XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoSFRNTEJvZHkgJiYgSFRNTEJvZHkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIEhUTUxCb2R5LnNldFZhbHVlKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OVGVtcGxhdGUuc2V0VmFsdWUoSlNPTi5zdHJpbmdpZnkoZGVzaWduKSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5leGVjdXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNpbmctaW5uZXItYm90dG9tLW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgIHtleHBvcnRIVE1MQWN0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKGV4cG9ydEhUTUxBY3Rpb24pfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIEV4cG9ydCBIVE1MXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7c2F2ZVRlbXBsYXRlQWN0aW9uICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0IHNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIiBvbkNsaWNrPXsoKSA9PiBleHBvcnRBY3Rpb24oc2F2ZVRlbXBsYXRlQWN0aW9uKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBTYXZlIFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yIHJlZj17ZW1haWxFZGl0b3JSZWZ9IG9uUmVhZHk9e29uUmVhZHl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVtYWlsRWRpdG9yQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9FbWFpbEVkaXRvckNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcblxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RFbWFpbEVkaXRvcih7IEhUTUxCb2R5LCBKU09OVGVtcGxhdGUsIGV4cG9ydEhUTUxBY3Rpb24sIHNhdmVUZW1wbGF0ZUFjdGlvbiB9OiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiA8RW1haWxFZGl0b3JDb21wb25lbnRcbiAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxuICAgICAgICBKU09OVGVtcGxhdGU9e0pTT05UZW1wbGF0ZX1cbiAgICAgICAgZXhwb3J0SFRNTEFjdGlvbj17ZXhwb3J0SFRNTEFjdGlvbn1cbiAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259IC8+O1xufVxuIl0sIm5hbWVzIjpbImRlZmF1bHRTY3JpcHRVcmwiLCJjYWxsYmFja3MiLCJsb2FkZWQiLCJpc1NjcmlwdEluamVjdGVkIiwic2NyaXB0VXJsIiwic2NyaXB0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImluamVjdGVkIiwiZm9yRWFjaCIsInNjcmlwdCIsInNyYyIsImluY2x1ZGVzIiwiYWRkQ2FsbGJhY2siLCJjYWxsYmFjayIsInB1c2giLCJydW5DYWxsYmFja3MiLCJzaGlmdCIsImxvYWRTY3JpcHQiLCJlbWJlZFNjcmlwdCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJvbmxvYWQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEsSUFBTUEsZ0JBQWdCLEdBQUcsdUNBQXVDLENBQUE7Q0FDaEUsSUFBTUMsU0FBUyxHQUFlLEVBQUUsQ0FBQTtDQUNoQyxJQUFJQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBRWxCLENBQUEsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsU0FBaUIsRUFBQTtHQUN6QyxJQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7R0FDbkQsSUFBSUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtBQUVwQkgsR0FBQUEsT0FBTyxDQUFDSSxPQUFPLENBQUMsVUFBQ0MsTUFBTSxFQUFBO0tBQ3JCLElBQUlBLE1BQU0sQ0FBQ0MsR0FBRyxDQUFDQyxRQUFRLENBQUNSLFNBQVMsQ0FBQyxF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
