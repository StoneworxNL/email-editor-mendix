import { createElement, useRef, useEffect } from 'react';

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
    return (createElement("div", { className: "spacing-inner-bottom-medium" },
        exportHTMLAction && (createElement("button", { className: "btn mx-button btn-default", onClick: () => exportAction(exportHTMLAction) }, "Export HTML")),
        saveTemplateAction && (createElement("button", { className: "btn mx-button btn-default spacing-outer-left-medium", onClick: () => exportAction(saveTemplateAction) }, "Save Template"))));
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
    const emailEditorRef = useRef(null);
    useEffect(() => {
        var _a;
        const unlayer = (_a = emailEditorRef.current) === null || _a === void 0 ? void 0 : _a.editor;
        loadJSONTemplate(JSONTemplate, unlayer);
    }, [JSONTemplate]);
    const onReady = unlayer => {
        loadJSONTemplate(JSONTemplate, unlayer);
    };
    return (createElement("div", { className: "react-email-editor-div" },
        createElement(TopToolbar, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction, emailRef: emailEditorRef }),
        createElement(EmailEditor, { ref: emailEditorRef, onReady: onReady, 
            // projectId={projectId}
            // minHeight="100vh"
            options: {
                appearance: {
                    theme: "modern_light"
                }
            } })));
}

function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
    return (createElement(EmailEditorComponent, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction }));
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9wVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FbWFpbEVkaXRvckNvbXBvbmVudC50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvUmVhY3RFbWFpbEVkaXRvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuXHJcbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFJlYWN0X19kZWZhdWx0ID0gX2ludGVyb3BEZWZhdWx0KFJlYWN0KTtcclxuXHJcbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xyXG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XHJcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxuICB9O1xyXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG52YXIgbmFtZSA9IFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XHJcbnZhciB2ZXJzaW9uID0gXCIxLjcuOVwiO1xyXG52YXIgZGVzY3JpcHRpb24gPSBcIlVubGF5ZXIncyBFbWFpbCBFZGl0b3IgQ29tcG9uZW50IGZvciBSZWFjdC5qc1wiO1xyXG52YXIgbWFpbiA9IFwiZGlzdC9pbmRleC5qc1wiO1xyXG52YXIgdHlwaW5ncyA9IFwiZGlzdC9pbmRleC5kLnRzXCI7XHJcbnZhciBmaWxlcyA9IFtcclxuXHRcImRpc3RcIlxyXG5dO1xyXG52YXIgZW5naW5lcyA9IHtcclxuXHRub2RlOiBcIj49MTBcIlxyXG59O1xyXG52YXIgc2NyaXB0cyA9IHtcclxuXHRzdGFydDogXCJ0c2R4IHdhdGNoXCIsXHJcblx0YnVpbGQ6IFwidHNkeCBidWlsZFwiLFxyXG5cdHRlc3Q6IFwidHNkeCB0ZXN0XCIsXHJcblx0XCJ0ZXN0OndhdGNoXCI6IFwidHNkeCB0ZXN0IC0td2F0Y2hcIixcclxuXHRcInRlc3Q6Y292ZXJhZ2VcIjogXCJ0c2R4IHRlc3QgLS1jb3ZlcmFnZVwiLFxyXG5cdGxpbnQ6IFwidHNkeCBsaW50XCIsXHJcblx0cHJlcGFyZTogXCJ0c2R4IGJ1aWxkXCIsXHJcblx0cmVsZWFzZTogXCJucG0gcnVuIGJ1aWxkICYmIG5wbSBwdWJsaXNoXCIsXHJcblx0XCJuZXRsaWZ5LWJ1aWxkXCI6IFwiY2QgZGVtbyAmJiBucG0gaW5zdGFsbCAmJiBucG0gcnVuIGJ1aWxkXCJcclxufTtcclxudmFyIHBlZXJEZXBlbmRlbmNpZXMgPSB7XHJcblx0cmVhY3Q6IFwiPj0xNVwiXHJcbn07XHJcbnZhciBodXNreSA9IHtcclxuXHRob29rczoge1xyXG5cdFx0XCJwcmUtY29tbWl0XCI6IFwidHNkeCBsaW50XCJcclxuXHR9XHJcbn07XHJcbnZhciBkZXBlbmRlbmNpZXMgPSB7XHJcblx0XCJ1bmxheWVyLXR5cGVzXCI6IFwibGF0ZXN0XCJcclxufTtcclxudmFyIGRldkRlcGVuZGVuY2llcyA9IHtcclxuXHRcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjogXCJeNS4wLjJcIixcclxuXHRcIkB0ZXN0aW5nLWxpYnJhcnkvcmVhY3RcIjogXCJeMTMuNC4wXCIsXHJcblx0XCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxyXG5cdFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4wLjEwXCIsXHJcblx0aHVza3k6IFwiXjguMC4zXCIsXHJcblx0cmVhY3Q6IFwiXjE4LjIuMFwiLFxyXG5cdFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxyXG5cdFwicm9sbHVwLXBsdWdpbi1jb3B5XCI6IFwiXjMuNC4wXCIsXHJcblx0dHNkeDogXCJeMC4xNC4xXCIsXHJcblx0dHNsaWI6IFwiXjIuNC4xXCIsXHJcblx0dHlwZXNjcmlwdDogXCJeNC45LjRcIlxyXG59O1xyXG52YXIgYXV0aG9yID0gXCJcIjtcclxudmFyIGhvbWVwYWdlID0gXCJodHRwczovL2dpdGh1Yi5jb20vdW5sYXllci9yZWFjdC1lbWFpbC1lZGl0b3IjcmVhZG1lXCI7XHJcbnZhciBsaWNlbnNlID0gXCJNSVRcIjtcclxudmFyIHJlcG9zaXRvcnkgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvci5naXRcIjtcclxudmFyIGtleXdvcmRzID0gW1xyXG5cdFwicmVhY3QtY29tcG9uZW50XCJcclxuXTtcclxudmFyIHBrZyA9IHtcclxuXHRuYW1lOiBuYW1lLFxyXG5cdHZlcnNpb246IHZlcnNpb24sXHJcblx0ZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG5cdG1haW46IG1haW4sXHJcblx0dHlwaW5nczogdHlwaW5ncyxcclxuXHRmaWxlczogZmlsZXMsXHJcblx0ZW5naW5lczogZW5naW5lcyxcclxuXHRzY3JpcHRzOiBzY3JpcHRzLFxyXG5cdHBlZXJEZXBlbmRlbmNpZXM6IHBlZXJEZXBlbmRlbmNpZXMsXHJcblx0aHVza3k6IGh1c2t5LFxyXG5cdGRlcGVuZGVuY2llczogZGVwZW5kZW5jaWVzLFxyXG5cdGRldkRlcGVuZGVuY2llczogZGV2RGVwZW5kZW5jaWVzLFxyXG5cdGF1dGhvcjogYXV0aG9yLFxyXG5cdGhvbWVwYWdlOiBob21lcGFnZSxcclxuXHRsaWNlbnNlOiBsaWNlbnNlLFxyXG5cdHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXHJcblx0a2V5d29yZHM6IGtleXdvcmRzXHJcbn07XHJcblxyXG52YXIgZGVmYXVsdFNjcmlwdFVybCA9ICdodHRwczovL2VkaXRvci51bmxheWVyLmNvbS9lbWJlZC5qcz8yJztcclxudmFyIGNhbGxiYWNrcyA9IFtdO1xyXG52YXIgbG9hZGVkID0gZmFsc2U7XHJcbnZhciBpc1NjcmlwdEluamVjdGVkID0gZnVuY3Rpb24gaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpIHtcclxuICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpO1xyXG4gIHZhciBpbmplY3RlZCA9IGZhbHNlO1xyXG4gIHNjcmlwdHMuZm9yRWFjaChmdW5jdGlvbiAoc2NyaXB0KSB7XHJcbiAgICBpZiAoc2NyaXB0LnNyYy5pbmNsdWRlcyhzY3JpcHRVcmwpKSB7XHJcbiAgICAgIGluamVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gaW5qZWN0ZWQ7XHJcbn07XHJcbnZhciBhZGRDYWxsYmFjayA9IGZ1bmN0aW9uIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XHJcbiAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG59O1xyXG52YXIgcnVuQ2FsbGJhY2tzID0gZnVuY3Rpb24gcnVuQ2FsbGJhY2tzKCkge1xyXG4gIGlmIChsb2FkZWQpIHtcclxuICAgIHZhciBjYWxsYmFjaztcclxuICAgIHdoaWxlIChjYWxsYmFjayA9IGNhbGxiYWNrcy5zaGlmdCgpKSB7XHJcbiAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG52YXIgbG9hZFNjcmlwdCA9IGZ1bmN0aW9uIGxvYWRTY3JpcHQoY2FsbGJhY2ssIHNjcmlwdFVybCkge1xyXG4gIGlmIChzY3JpcHRVcmwgPT09IHZvaWQgMCkge1xyXG4gICAgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybDtcclxuICB9XHJcbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xyXG4gIGlmICghaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpKSB7XHJcbiAgICB2YXIgZW1iZWRTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIGVtYmVkU2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgc2NyaXB0VXJsKTtcclxuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgcnVuQ2FsbGJhY2tzKCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbWJlZFNjcmlwdCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJ1bkNhbGxiYWNrcygpO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy5fX3VubGF5ZXJfbGFzdEVkaXRvcklkID0gd2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQgfHwgMDtcclxudmFyIEVtYWlsRWRpdG9yID0gLyojX19QVVJFX18qL1JlYWN0X19kZWZhdWx0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcclxuICB2YXIgX3Byb3BzJGFwcGVhcmFuY2UsIF9wcm9wcyRvcHRpb25zLCBfcHJvcHMkb3B0aW9uczIsIF9wcm9wcyRsb2NhbGUsIF9wcm9wcyRvcHRpb25zMywgX3Byb3BzJHByb2plY3RJZCwgX3Byb3BzJG9wdGlvbnM0LCBfcHJvcHMkdG9vbHMsIF9wcm9wcyRvcHRpb25zNTtcclxuICB2YXIgb25Mb2FkID0gcHJvcHMub25Mb2FkLFxyXG4gICAgb25SZWFkeSA9IHByb3BzLm9uUmVhZHksXHJcbiAgICBzY3JpcHRVcmwgPSBwcm9wcy5zY3JpcHRVcmwsXHJcbiAgICBfcHJvcHMkbWluSGVpZ2h0ID0gcHJvcHMubWluSGVpZ2h0LFxyXG4gICAgbWluSGVpZ2h0ID0gX3Byb3BzJG1pbkhlaWdodCA9PT0gdm9pZCAwID8gNTAwIDogX3Byb3BzJG1pbkhlaWdodCxcclxuICAgIF9wcm9wcyRzdHlsZSA9IHByb3BzLnN0eWxlLFxyXG4gICAgc3R5bGUgPSBfcHJvcHMkc3R5bGUgPT09IHZvaWQgMCA/IHt9IDogX3Byb3BzJHN0eWxlO1xyXG4gIHZhciBfdXNlU3RhdGUgPSBSZWFjdC51c2VTdGF0ZShudWxsKSxcclxuICAgIGVkaXRvciA9IF91c2VTdGF0ZVswXSxcclxuICAgIHNldEVkaXRvciA9IF91c2VTdGF0ZVsxXTtcclxuICB2YXIgX3VzZVN0YXRlMiA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSxcclxuICAgIGhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlswXSxcclxuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlsxXTtcclxuICB2YXIgZWRpdG9ySWQgPSBSZWFjdC51c2VNZW1vKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBwcm9wcy5lZGl0b3JJZCB8fCBcImVkaXRvci1cIiArICsrd2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQ7XHJcbiAgfSwgW3Byb3BzLmVkaXRvcklkXSk7XHJcbiAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMub3B0aW9ucyB8fCB7fSwge1xyXG4gICAgYXBwZWFyYW5jZTogKF9wcm9wcyRhcHBlYXJhbmNlID0gcHJvcHMuYXBwZWFyYW5jZSkgIT0gbnVsbCA/IF9wcm9wcyRhcHBlYXJhbmNlIDogKF9wcm9wcyRvcHRpb25zID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zLmFwcGVhcmFuY2UsXHJcbiAgICBkaXNwbGF5TW9kZTogKHByb3BzID09IG51bGwgPyB2b2lkIDAgOiBwcm9wcy5kaXNwbGF5TW9kZSkgfHwgKChfcHJvcHMkb3B0aW9uczIgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMyLmRpc3BsYXlNb2RlKSB8fCAnZW1haWwnLFxyXG4gICAgbG9jYWxlOiAoX3Byb3BzJGxvY2FsZSA9IHByb3BzLmxvY2FsZSkgIT0gbnVsbCA/IF9wcm9wcyRsb2NhbGUgOiAoX3Byb3BzJG9wdGlvbnMzID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zMy5sb2NhbGUsXHJcbiAgICBwcm9qZWN0SWQ6IChfcHJvcHMkcHJvamVjdElkID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX3Byb3BzJHByb2plY3RJZCA6IChfcHJvcHMkb3B0aW9uczQgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM0LnByb2plY3RJZCxcclxuICAgIHRvb2xzOiAoX3Byb3BzJHRvb2xzID0gcHJvcHMudG9vbHMpICE9IG51bGwgPyBfcHJvcHMkdG9vbHMgOiAoX3Byb3BzJG9wdGlvbnM1ID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zNS50b29scyxcclxuICAgIGlkOiBlZGl0b3JJZCxcclxuICAgIHNvdXJjZToge1xyXG4gICAgICBuYW1lOiBwa2cubmFtZSxcclxuICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb25cclxuICAgIH1cclxuICB9KTtcclxuICBSZWFjdC51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZWRpdG9yOiBlZGl0b3JcclxuICAgIH07XHJcbiAgfSwgW2VkaXRvcl0pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICBlZGl0b3IgPT0gbnVsbCA/IHZvaWQgMCA6IGVkaXRvci5kZXN0cm95KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQoZmFsc2UpO1xyXG4gICAgbG9hZFNjcmlwdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCh0cnVlKTtcclxuICAgIH0sIHNjcmlwdFVybCk7XHJcbiAgfSwgW3NjcmlwdFVybF0pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWhhc0xvYWRlZEVtYmVkU2NyaXB0KSByZXR1cm47XHJcbiAgICBlZGl0b3IgPT0gbnVsbCA/IHZvaWQgMCA6IGVkaXRvci5kZXN0cm95KCk7XHJcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xyXG4gIH0sIFtKU09OLnN0cmluZ2lmeShvcHRpb25zKSwgaGFzTG9hZGVkRW1iZWRTY3JpcHRdKTtcclxuICB2YXIgbWV0aG9kUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKGZ1bmN0aW9uIChwcm9wTmFtZSkge1xyXG4gICAgcmV0dXJuIC9eb24vLnRlc3QocHJvcE5hbWUpO1xyXG4gIH0pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xyXG4gICAgb25Mb2FkID09IG51bGwgPyB2b2lkIDAgOiBvbkxvYWQoZWRpdG9yKTtcclxuICAgIC8vIEFsbCBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggb25bTmFtZV0gYXJlIHJlZ2lzdGVyZWQgYXMgZXZlbnQgbGlzdGVuZXJzLlxyXG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kUHJvcCkge1xyXG4gICAgICBpZiAoL15vbi8udGVzdChtZXRob2RQcm9wKSAmJiBtZXRob2RQcm9wICE9PSAnb25Mb2FkJyAmJiBtZXRob2RQcm9wICE9PSAnb25SZWFkeScgJiYgdHlwZW9mIHByb3BzW21ldGhvZFByb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kUHJvcCwgcHJvcHNbbWV0aG9kUHJvcF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChvblJlYWR5KSB7XHJcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdlZGl0b3I6cmVhZHknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgb25SZWFkeShlZGl0b3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LCBbZWRpdG9yLCBPYmplY3Qua2V5cyhtZXRob2RQcm9wcykuam9pbignLCcpXSk7XHJcbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xyXG4gICAgc3R5bGU6IHtcclxuICAgICAgZmxleDogMSxcclxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICBtaW5IZWlnaHQ6IG1pbkhlaWdodFxyXG4gICAgfVxyXG4gIH0sIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xyXG4gICAgaWQ6IGVkaXRvcklkLFxyXG4gICAgc3R5bGU6IF9leHRlbmRzKHt9LCBzdHlsZSwge1xyXG4gICAgICBmbGV4OiAxXHJcbiAgICB9KVxyXG4gIH0pKTtcclxufSk7XHJcblxyXG5leHBvcnRzLkVtYWlsRWRpdG9yID0gRW1haWxFZGl0b3I7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEVtYWlsRWRpdG9yO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzLm1hcFxyXG4iLCJcclxuJ3VzZSBzdHJpY3QnXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLnByb2R1Y3Rpb24ubWluLmpzJylcclxufSBlbHNlIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vcmVhY3QtZW1haWwtZWRpdG9yLmNqcy5kZXZlbG9wbWVudC5qcycpXHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50IC8qdXNlU3RhdGUsKi8gfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XHJcbmltcG9ydCB7IEVkaXRvclJlZiB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhclByb3BzIHtcclxuICAgIEhUTUxCb2R5PzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xyXG4gICAgSlNPTlRlbXBsYXRlPzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xyXG4gICAgZXhwb3J0SFRNTEFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBlbWFpbFJlZjogUmVhY3QuUmVmT2JqZWN0PEVkaXRvclJlZj47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUb3BUb29sYmFyKHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbixcclxuICAgIGVtYWlsUmVmXHJcbn06IFRvb2xiYXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBleHBvcnRBY3Rpb24gPSAoYWN0aW9uOiBBY3Rpb25WYWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbFJlZi5jdXJyZW50Py5lZGl0b3I7XHJcbiAgICAgICAgdW5sYXllcj8uZXhwb3J0SHRtbChkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3Rpb25WYWx1ZSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhY3Rpb25zLCBsaWtlIHRoZSBPbiBjbGljayBwcm9wZXJ0eSBvZiBhbiBhY3Rpb24gYnV0dG9uLiBGb3IgYW55IGFjdGlvbiBleGNlcHQgRG8gbm90aGluZywgeW91ciBjb21wb25lbnQgd2lsbCByZWNlaXZlIGEgdmFsdWUgYWRoZXJpbmcgdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuIEZvciBEbyBub3RoaW5nIGl0IHdpbGwgcmVjZWl2ZSB1bmRlZmluZWQuIFRoZSBBY3Rpb25WYWx1ZSBwcm9wIGFwcGVhcnMgbGlrZSB0aGlzOlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChIVE1MQm9keSAmJiBIVE1MQm9keS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQm9keS5zZXRWYWx1ZShodG1sKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZS5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShkZXNpZ24pKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cclxuICAgICAgICAgICAge2V4cG9ydEhUTUxBY3Rpb24gJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKGV4cG9ydEhUTUxBY3Rpb24pfT5cclxuICAgICAgICAgICAgICAgICAgICBFeHBvcnQgSFRNTFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2F2ZVRlbXBsYXRlQWN0aW9uICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0IHNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGV4cG9ydEFjdGlvbihzYXZlVGVtcGxhdGVBY3Rpb24pfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIFNhdmUgVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCIvLyBpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgUmVhY3RFbGVtZW50LCB1c2VSZWYsIGNyZWF0ZUVsZW1lbnQsIC8qdXNlU3RhdGUsKi8gdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFjdGlvblZhbHVlLCBFZGl0YWJsZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xyXG5pbXBvcnQgRW1haWxFZGl0b3IsIHsgRWRpdG9yLCBFZGl0b3JSZWYsIEVtYWlsRWRpdG9yUHJvcHMgfSBmcm9tIFwicmVhY3QtZW1haWwtZWRpdG9yXCI7XHJcbmltcG9ydCB7IFRvcFRvb2xiYXIgfSBmcm9tIFwiLi9Ub3BUb29sYmFyXCI7XHJcbi8vIGltcG9ydCBcIi4uL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsRWRpdG9yU2FtcGxlUHJvcHMge1xyXG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz4sIHVubGF5ZXI/OiBFZGl0b3IgfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoIUpTT05UZW1wbGF0ZSB8fCAhSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSB8fCBKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlID09PSBcIlwiKSByZXR1cm47XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1bmxheWVyICYmIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEVtYWlsRWRpdG9yQ29tcG9uZW50KHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvblxyXG59OiBFbWFpbEVkaXRvclNhbXBsZVByb3BzKTogUmVhY3RFbGVtZW50IHtcclxuICAgIGNvbnN0IGVtYWlsRWRpdG9yUmVmID0gdXNlUmVmPEVkaXRvclJlZj4obnVsbCk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxheWVyID0gZW1haWxFZGl0b3JSZWYuY3VycmVudD8uZWRpdG9yO1xyXG4gICAgICAgIGxvYWRKU09OVGVtcGxhdGUoSlNPTlRlbXBsYXRlLCB1bmxheWVyKTtcclxuICAgIH0sIFtKU09OVGVtcGxhdGVdKTtcclxuXHJcbiAgICBjb25zdCBvblJlYWR5OiBFbWFpbEVkaXRvclByb3BzW1wib25SZWFkeVwiXSA9IHVubGF5ZXIgPT4ge1xyXG4gICAgICAgIGxvYWRKU09OVGVtcGxhdGUoSlNPTlRlbXBsYXRlLCB1bmxheWVyKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlYWN0LWVtYWlsLWVkaXRvci1kaXZcIj5cclxuICAgICAgICAgICAgPFRvcFRvb2xiYXJcclxuICAgICAgICAgICAgICAgIEhUTUxCb2R5PXtIVE1MQm9keX1cclxuICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZT17SlNPTlRlbXBsYXRlfVxyXG4gICAgICAgICAgICAgICAgZXhwb3J0SFRNTEFjdGlvbj17ZXhwb3J0SFRNTEFjdGlvbn1cclxuICAgICAgICAgICAgICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj17c2F2ZVRlbXBsYXRlQWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgZW1haWxSZWY9e2VtYWlsRWRpdG9yUmVmfVxyXG4gICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgPEVtYWlsRWRpdG9yXHJcbiAgICAgICAgICAgICAgICByZWY9e2VtYWlsRWRpdG9yUmVmfVxyXG4gICAgICAgICAgICAgICAgb25SZWFkeT17b25SZWFkeX1cclxuICAgICAgICAgICAgICAgIC8vIHByb2plY3RJZD17cHJvamVjdElkfVxyXG4gICAgICAgICAgICAgICAgLy8gbWluSGVpZ2h0PVwiMTAwdmhcIlxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17e1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IFwibW9kZXJuX2xpZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRW1haWxFZGl0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VtYWlsRWRpdG9yQ29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9SZWFjdEVtYWlsRWRpdG9yUHJvcHNcIjtcclxuXHJcbmltcG9ydCBcIi4vdWkvUmVhY3RFbWFpbEVkaXRvci5jc3NcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWFjdEVtYWlsRWRpdG9yKHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvblxyXG59OiBSZWFjdEVtYWlsRWRpdG9yQ29udGFpbmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RW1haWxFZGl0b3JDb21wb25lbnRcclxuICAgICAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxyXG4gICAgICAgICAgICBKU09OVGVtcGxhdGU9e0pTT05UZW1wbGF0ZX1cclxuICAgICAgICAgICAgZXhwb3J0SFRNTEFjdGlvbj17ZXhwb3J0SFRNTEFjdGlvbn1cclxuICAgICAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImRlZmF1bHRTY3JpcHRVcmwiLCJjYWxsYmFja3MiLCJsb2FkZWQiLCJpc1NjcmlwdEluamVjdGVkIiwic2NyaXB0VXJsIiwic2NyaXB0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImluamVjdGVkIiwiZm9yRWFjaCIsInNjcmlwdCIsInNyYyIsImluY2x1ZGVzIiwiYWRkQ2FsbGJhY2siLCJjYWxsYmFjayIsInB1c2giLCJydW5DYWxsYmFja3MiLCJzaGlmdCIsImxvYWRTY3JpcHQiLCJlbWJlZFNjcmlwdCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJvbmxvYWQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEsSUFBTUEsZ0JBQWdCLEdBQUcsdUNBQXVDLENBQUE7Q0FDaEUsSUFBTUMsU0FBUyxHQUFlLEVBQUUsQ0FBQTtDQUNoQyxJQUFJQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0FBRWxCLENBQUEsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsU0FBaUIsRUFBQTtHQUN6QyxJQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7R0FDbkQsSUFBSUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtBQUVwQkgsR0FBQUEsT0FBTyxDQUFDSSxPQUFPLENBQUMsVUFB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
