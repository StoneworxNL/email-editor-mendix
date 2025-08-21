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

function Toolbar({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction, emailRef }) {
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
function EditorWrapper({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }) {
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
        createElement(Toolbar, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction, emailRef: emailEditorRef }),
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
    return (createElement(EditorWrapper, { HTMLBody: HTMLBody, JSONTemplate: JSONTemplate, exportHTMLAction: exportHTMLAction, saveTemplateAction: saveTemplateAction }));
}

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5cclxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xyXG5cclxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XHJcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcclxuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH07XHJcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxudmFyIHZlcnNpb24gPSBcIjEuNy45XCI7XHJcbnZhciBkZXNjcmlwdGlvbiA9IFwiVW5sYXllcidzIEVtYWlsIEVkaXRvciBDb21wb25lbnQgZm9yIFJlYWN0LmpzXCI7XHJcbnZhciBtYWluID0gXCJkaXN0L2luZGV4LmpzXCI7XHJcbnZhciB0eXBpbmdzID0gXCJkaXN0L2luZGV4LmQudHNcIjtcclxudmFyIGZpbGVzID0gW1xyXG5cdFwiZGlzdFwiXHJcbl07XHJcbnZhciBlbmdpbmVzID0ge1xyXG5cdG5vZGU6IFwiPj0xMFwiXHJcbn07XHJcbnZhciBzY3JpcHRzID0ge1xyXG5cdHN0YXJ0OiBcInRzZHggd2F0Y2hcIixcclxuXHRidWlsZDogXCJ0c2R4IGJ1aWxkXCIsXHJcblx0dGVzdDogXCJ0c2R4IHRlc3RcIixcclxuXHRcInRlc3Q6d2F0Y2hcIjogXCJ0c2R4IHRlc3QgLS13YXRjaFwiLFxyXG5cdFwidGVzdDpjb3ZlcmFnZVwiOiBcInRzZHggdGVzdCAtLWNvdmVyYWdlXCIsXHJcblx0bGludDogXCJ0c2R4IGxpbnRcIixcclxuXHRwcmVwYXJlOiBcInRzZHggYnVpbGRcIixcclxuXHRyZWxlYXNlOiBcIm5wbSBydW4gYnVpbGQgJiYgbnBtIHB1Ymxpc2hcIixcclxuXHRcIm5ldGxpZnktYnVpbGRcIjogXCJjZCBkZW1vICYmIG5wbSBpbnN0YWxsICYmIG5wbSBydW4gYnVpbGRcIlxyXG59O1xyXG52YXIgcGVlckRlcGVuZGVuY2llcyA9IHtcclxuXHRyZWFjdDogXCI+PTE1XCJcclxufTtcclxudmFyIGh1c2t5ID0ge1xyXG5cdGhvb2tzOiB7XHJcblx0XHRcInByZS1jb21taXRcIjogXCJ0c2R4IGxpbnRcIlxyXG5cdH1cclxufTtcclxudmFyIGRlcGVuZGVuY2llcyA9IHtcclxuXHRcInVubGF5ZXItdHlwZXNcIjogXCJsYXRlc3RcIlxyXG59O1xyXG52YXIgZGV2RGVwZW5kZW5jaWVzID0ge1xyXG5cdFwiQHJvbGx1cC9wbHVnaW4tcmVwbGFjZVwiOiBcIl41LjAuMlwiLFxyXG5cdFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xMy40LjBcIixcclxuXHRcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXHJcblx0XCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcclxuXHRodXNreTogXCJeOC4wLjNcIixcclxuXHRyZWFjdDogXCJeMTguMi4wXCIsXHJcblx0XCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXHJcblx0XCJyb2xsdXAtcGx1Z2luLWNvcHlcIjogXCJeMy40LjBcIixcclxuXHR0c2R4OiBcIl4wLjE0LjFcIixcclxuXHR0c2xpYjogXCJeMi40LjFcIixcclxuXHR0eXBlc2NyaXB0OiBcIl40LjkuNFwiXHJcbn07XHJcbnZhciBhdXRob3IgPSBcIlwiO1xyXG52YXIgaG9tZXBhZ2UgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvciNyZWFkbWVcIjtcclxudmFyIGxpY2Vuc2UgPSBcIk1JVFwiO1xyXG52YXIgcmVwb3NpdG9yeSA9IFwiaHR0cHM6Ly9naXRodWIuY29tL3VubGF5ZXIvcmVhY3QtZW1haWwtZWRpdG9yLmdpdFwiO1xyXG52YXIga2V5d29yZHMgPSBbXHJcblx0XCJyZWFjdC1jb21wb25lbnRcIlxyXG5dO1xyXG52YXIgcGtnID0ge1xyXG5cdG5hbWU6IG5hbWUsXHJcblx0dmVyc2lvbjogdmVyc2lvbixcclxuXHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcblx0bWFpbjogbWFpbixcclxuXHR0eXBpbmdzOiB0eXBpbmdzLFxyXG5cdGZpbGVzOiBmaWxlcyxcclxuXHRlbmdpbmVzOiBlbmdpbmVzLFxyXG5cdHNjcmlwdHM6IHNjcmlwdHMsXHJcblx0cGVlckRlcGVuZGVuY2llczogcGVlckRlcGVuZGVuY2llcyxcclxuXHRodXNreTogaHVza3ksXHJcblx0ZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXMsXHJcblx0ZGV2RGVwZW5kZW5jaWVzOiBkZXZEZXBlbmRlbmNpZXMsXHJcblx0YXV0aG9yOiBhdXRob3IsXHJcblx0aG9tZXBhZ2U6IGhvbWVwYWdlLFxyXG5cdGxpY2Vuc2U6IGxpY2Vuc2UsXHJcblx0cmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcclxuXHRrZXl3b3Jkczoga2V5d29yZHNcclxufTtcclxuXHJcbnZhciBkZWZhdWx0U2NyaXB0VXJsID0gJ2h0dHBzOi8vZWRpdG9yLnVubGF5ZXIuY29tL2VtYmVkLmpzPzInO1xyXG52YXIgY2FsbGJhY2tzID0gW107XHJcbnZhciBsb2FkZWQgPSBmYWxzZTtcclxudmFyIGlzU2NyaXB0SW5qZWN0ZWQgPSBmdW5jdGlvbiBpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkge1xyXG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XHJcbiAgdmFyIGluamVjdGVkID0gZmFsc2U7XHJcbiAgc2NyaXB0cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JpcHQpIHtcclxuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcclxuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBpbmplY3RlZDtcclxufTtcclxudmFyIGFkZENhbGxiYWNrID0gZnVuY3Rpb24gYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcclxuICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbn07XHJcbnZhciBydW5DYWxsYmFja3MgPSBmdW5jdGlvbiBydW5DYWxsYmFja3MoKSB7XHJcbiAgaWYgKGxvYWRlZCkge1xyXG4gICAgdmFyIGNhbGxiYWNrO1xyXG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbnZhciBsb2FkU2NyaXB0ID0gZnVuY3Rpb24gbG9hZFNjcmlwdChjYWxsYmFjaywgc2NyaXB0VXJsKSB7XHJcbiAgaWYgKHNjcmlwdFVybCA9PT0gdm9pZCAwKSB7XHJcbiAgICBzY3JpcHRVcmwgPSBkZWZhdWx0U2NyaXB0VXJsO1xyXG4gIH1cclxuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XHJcbiAgaWYgKCFpc1NjcmlwdEluamVjdGVkKHNjcmlwdFVybCkpIHtcclxuICAgIHZhciBlbWJlZFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgZW1iZWRTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBzY3JpcHRVcmwpO1xyXG4gICAgZW1iZWRTY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICBydW5DYWxsYmFja3MoKTtcclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVtYmVkU2NyaXB0KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcnVuQ2FsbGJhY2tzKCk7XHJcbiAgfVxyXG59O1xyXG5cclxud2luZG93Ll9fdW5sYXllcl9sYXN0RWRpdG9ySWQgPSB3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZCB8fCAwO1xyXG52YXIgRW1haWxFZGl0b3IgPSAvKiNfX1BVUkVfXyovUmVhY3RfX2RlZmF1bHQuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xyXG4gIHZhciBfcHJvcHMkYXBwZWFyYW5jZSwgX3Byb3BzJG9wdGlvbnMsIF9wcm9wcyRvcHRpb25zMiwgX3Byb3BzJGxvY2FsZSwgX3Byb3BzJG9wdGlvbnMzLCBfcHJvcHMkcHJvamVjdElkLCBfcHJvcHMkb3B0aW9uczQsIF9wcm9wcyR0b29scywgX3Byb3BzJG9wdGlvbnM1O1xyXG4gIHZhciBvbkxvYWQgPSBwcm9wcy5vbkxvYWQsXHJcbiAgICBvblJlYWR5ID0gcHJvcHMub25SZWFkeSxcclxuICAgIHNjcmlwdFVybCA9IHByb3BzLnNjcmlwdFVybCxcclxuICAgIF9wcm9wcyRtaW5IZWlnaHQgPSBwcm9wcy5taW5IZWlnaHQsXHJcbiAgICBtaW5IZWlnaHQgPSBfcHJvcHMkbWluSGVpZ2h0ID09PSB2b2lkIDAgPyA1MDAgOiBfcHJvcHMkbWluSGVpZ2h0LFxyXG4gICAgX3Byb3BzJHN0eWxlID0gcHJvcHMuc3R5bGUsXHJcbiAgICBzdHlsZSA9IF9wcm9wcyRzdHlsZSA9PT0gdm9pZCAwID8ge30gOiBfcHJvcHMkc3R5bGU7XHJcbiAgdmFyIF91c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLFxyXG4gICAgZWRpdG9yID0gX3VzZVN0YXRlWzBdLFxyXG4gICAgc2V0RWRpdG9yID0gX3VzZVN0YXRlWzFdO1xyXG4gIHZhciBfdXNlU3RhdGUyID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLFxyXG4gICAgaGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzBdLFxyXG4gICAgc2V0SGFzTG9hZGVkRW1iZWRTY3JpcHQgPSBfdXNlU3RhdGUyWzFdO1xyXG4gIHZhciBlZGl0b3JJZCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHByb3BzLmVkaXRvcklkIHx8IFwiZWRpdG9yLVwiICsgKyt3aW5kb3cuX191bmxheWVyX2xhc3RFZGl0b3JJZDtcclxuICB9LCBbcHJvcHMuZWRpdG9ySWRdKTtcclxuICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBwcm9wcy5vcHRpb25zIHx8IHt9LCB7XHJcbiAgICBhcHBlYXJhbmNlOiAoX3Byb3BzJGFwcGVhcmFuY2UgPSBwcm9wcy5hcHBlYXJhbmNlKSAhPSBudWxsID8gX3Byb3BzJGFwcGVhcmFuY2UgOiAoX3Byb3BzJG9wdGlvbnMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMuYXBwZWFyYW5jZSxcclxuICAgIGRpc3BsYXlNb2RlOiAocHJvcHMgPT0gbnVsbCA/IHZvaWQgMCA6IHByb3BzLmRpc3BsYXlNb2RlKSB8fCAoKF9wcm9wcyRvcHRpb25zMiA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczIuZGlzcGxheU1vZGUpIHx8ICdlbWFpbCcsXHJcbiAgICBsb2NhbGU6IChfcHJvcHMkbG9jYWxlID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX3Byb3BzJGxvY2FsZSA6IChfcHJvcHMkb3B0aW9uczMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMzLmxvY2FsZSxcclxuICAgIHByb2plY3RJZDogKF9wcm9wcyRwcm9qZWN0SWQgPSBwcm9wcy5wcm9qZWN0SWQpICE9IG51bGwgPyBfcHJvcHMkcHJvamVjdElkIDogKF9wcm9wcyRvcHRpb25zNCA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczQucHJvamVjdElkLFxyXG4gICAgdG9vbHM6IChfcHJvcHMkdG9vbHMgPSBwcm9wcy50b29scykgIT0gbnVsbCA/IF9wcm9wcyR0b29scyA6IChfcHJvcHMkb3B0aW9uczUgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM1LnRvb2xzLFxyXG4gICAgaWQ6IGVkaXRvcklkLFxyXG4gICAgc291cmNlOiB7XHJcbiAgICAgIG5hbWU6IHBrZy5uYW1lLFxyXG4gICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvblxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFJlYWN0LnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlZGl0b3I6IGVkaXRvclxyXG4gICAgfTtcclxuICB9LCBbZWRpdG9yXSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdChmYWxzZSk7XHJcbiAgICBsb2FkU2NyaXB0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KHRydWUpO1xyXG4gICAgfSwgc2NyaXB0VXJsKTtcclxuICB9LCBbc2NyaXB0VXJsXSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghaGFzTG9hZGVkRW1iZWRTY3JpcHQpIHJldHVybjtcclxuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcclxuICAgIHNldEVkaXRvcih1bmxheWVyLmNyZWF0ZUVkaXRvcihvcHRpb25zKSk7XHJcbiAgfSwgW0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpLCBoYXNMb2FkZWRFbWJlZFNjcmlwdF0pO1xyXG4gIHZhciBtZXRob2RQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKHByb3BOYW1lKSB7XHJcbiAgICByZXR1cm4gL15vbi8udGVzdChwcm9wTmFtZSk7XHJcbiAgfSk7XHJcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghZWRpdG9yKSByZXR1cm47XHJcbiAgICBvbkxvYWQgPT0gbnVsbCA/IHZvaWQgMCA6IG9uTG9hZChlZGl0b3IpO1xyXG4gICAgLy8gQWxsIHByb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBvbltOYW1lXSBhcmUgcmVnaXN0ZXJlZCBhcyBldmVudCBsaXN0ZW5lcnMuXHJcbiAgICBtZXRob2RQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2RQcm9wKSB7XHJcbiAgICAgIGlmICgvXm9uLy50ZXN0KG1ldGhvZFByb3ApICYmIG1ldGhvZFByb3AgIT09ICdvbkxvYWQnICYmIG1ldGhvZFByb3AgIT09ICdvblJlYWR5JyAmJiB0eXBlb2YgcHJvcHNbbWV0aG9kUHJvcF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKG9uUmVhZHkpIHtcclxuICAgICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2VkaXRvcjpyZWFkeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBvblJlYWR5KGVkaXRvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sIFtlZGl0b3IsIE9iamVjdC5rZXlzKG1ldGhvZFByb3BzKS5qb2luKCcsJyldKTtcclxuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XHJcbiAgICBzdHlsZToge1xyXG4gICAgICBmbGV4OiAxLFxyXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgIG1pbkhlaWdodDogbWluSGVpZ2h0XHJcbiAgICB9XHJcbiAgfSwgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XHJcbiAgICBpZDogZWRpdG9ySWQsXHJcbiAgICBzdHlsZTogX2V4dGVuZHMoe30sIHN0eWxlLCB7XHJcbiAgICAgIGZsZXg6IDFcclxuICAgIH0pXHJcbiAgfSkpO1xyXG59KTtcclxuXHJcbmV4cG9ydHMuRW1haWxFZGl0b3IgPSBFbWFpbEVkaXRvcjtcclxuZXhwb3J0cy5kZWZhdWx0ID0gRW1haWxFZGl0b3I7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMubWFwXHJcbiIsIlxyXG4ndXNlIHN0cmljdCdcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMucHJvZHVjdGlvbi5taW4uanMnKVxyXG59IGVsc2Uge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzJylcclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XHJcbmltcG9ydCB7IEVkaXRvclJlZiB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVG9vbGJhclByb3BzIHtcclxuICAgIEhUTUxCb2R5PzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xyXG4gICAgSlNPTlRlbXBsYXRlPzogRWRpdGFibGVWYWx1ZTxzdHJpbmc+O1xyXG4gICAgZXhwb3J0SFRNTEFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBlbWFpbFJlZjogUmVhY3QuUmVmT2JqZWN0PEVkaXRvclJlZj47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUb29sYmFyKHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbixcclxuICAgIGVtYWlsUmVmXHJcbn06IFRvb2xiYXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBleHBvcnRBY3Rpb24gPSAoYWN0aW9uOiBBY3Rpb25WYWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbFJlZi5jdXJyZW50Py5lZGl0b3I7XHJcbiAgICAgICAgdW5sYXllcj8uZXhwb3J0SHRtbChkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBkZXNpZ24sIGh0bWwgfSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3Rpb25WYWx1ZSBpcyB1c2VkIHRvIHJlcHJlc2VudCBhY3Rpb25zLCBsaWtlIHRoZSBPbiBjbGljayBwcm9wZXJ0eSBvZiBhbiBhY3Rpb24gYnV0dG9uLiBGb3IgYW55IGFjdGlvbiBleGNlcHQgRG8gbm90aGluZywgeW91ciBjb21wb25lbnQgd2lsbCByZWNlaXZlIGEgdmFsdWUgYWRoZXJpbmcgdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuIEZvciBEbyBub3RoaW5nIGl0IHdpbGwgcmVjZWl2ZSB1bmRlZmluZWQuIFRoZSBBY3Rpb25WYWx1ZSBwcm9wIGFwcGVhcnMgbGlrZSB0aGlzOlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChIVE1MQm9keSAmJiBIVE1MQm9keS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBIVE1MQm9keS5zZXRWYWx1ZShodG1sKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTlRlbXBsYXRlICYmIEpTT05UZW1wbGF0ZS5zdGF0dXMgPT09IFwiYXZhaWxhYmxlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UZW1wbGF0ZS5zZXRWYWx1ZShKU09OLnN0cmluZ2lmeShkZXNpZ24pKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjaW5nLWlubmVyLWJvdHRvbS1tZWRpdW1cIj5cclxuICAgICAgICAgICAge2V4cG9ydEhUTUxBY3Rpb24gJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gZXhwb3J0QWN0aW9uKGV4cG9ydEhUTUxBY3Rpb24pfT5cclxuICAgICAgICAgICAgICAgICAgICBFeHBvcnQgSFRNTFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7c2F2ZVRlbXBsYXRlQWN0aW9uICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gbXgtYnV0dG9uIGJ0bi1kZWZhdWx0IHNwYWNpbmctb3V0ZXItbGVmdC1tZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGV4cG9ydEFjdGlvbihzYXZlVGVtcGxhdGVBY3Rpb24pfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIFNhdmUgVGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iLCIvLyBpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgUmVhY3RFbGVtZW50LCB1c2VSZWYsIGNyZWF0ZUVsZW1lbnQsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgRWRpdGFibGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcclxuaW1wb3J0IEVtYWlsRWRpdG9yLCB7IEVkaXRvciwgRWRpdG9yUmVmLCBFbWFpbEVkaXRvclByb3BzIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xyXG5pbXBvcnQgeyBUb29sYmFyIH0gZnJvbSBcIi4vVG9vbGJhclwiO1xyXG4vLyBpbXBvcnQgXCIuLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XHJcbiAgICBIVE1MQm9keT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPjtcclxuICAgIGV4cG9ydEhUTUxBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj86IEFjdGlvblZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZT86IEVkaXRhYmxlVmFsdWU8c3RyaW5nPiwgdW5sYXllcj86IEVkaXRvciB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmICghSlNPTlRlbXBsYXRlIHx8ICFKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlIHx8IEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUgPT09IFwiXCIpIHJldHVybjtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVubGF5ZXIgJiYgdW5sYXllci5sb2FkRGVzaWduKEpTT04ucGFyc2UoSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRWRpdG9yV3JhcHBlcih7IEhUTUxCb2R5LCBKU09OVGVtcGxhdGUsIGV4cG9ydEhUTUxBY3Rpb24sIHNhdmVUZW1wbGF0ZUFjdGlvbiB9OiBQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBlbWFpbEVkaXRvclJlZiA9IHVzZVJlZjxFZGl0b3JSZWY+KG51bGwpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5sYXllciA9IGVtYWlsRWRpdG9yUmVmLmN1cnJlbnQ/LmVkaXRvcjtcclxuICAgICAgICBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgdW5sYXllcik7XHJcbiAgICB9LCBbSlNPTlRlbXBsYXRlXSk7XHJcblxyXG4gICAgY29uc3Qgb25SZWFkeTogRW1haWxFZGl0b3JQcm9wc1tcIm9uUmVhZHlcIl0gPSB1bmxheWVyID0+IHtcclxuICAgICAgICBsb2FkSlNPTlRlbXBsYXRlKEpTT05UZW1wbGF0ZSwgdW5sYXllcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWFjdC1lbWFpbC1lZGl0b3ItZGl2XCI+XHJcbiAgICAgICAgICAgIDxUb29sYmFyXHJcbiAgICAgICAgICAgICAgICBIVE1MQm9keT17SFRNTEJvZHl9XHJcbiAgICAgICAgICAgICAgICBKU09OVGVtcGxhdGU9e0pTT05UZW1wbGF0ZX1cclxuICAgICAgICAgICAgICAgIGV4cG9ydEhUTUxBY3Rpb249e2V4cG9ydEhUTUxBY3Rpb259XHJcbiAgICAgICAgICAgICAgICBzYXZlVGVtcGxhdGVBY3Rpb249e3NhdmVUZW1wbGF0ZUFjdGlvbn1cclxuICAgICAgICAgICAgICAgIGVtYWlsUmVmPXtlbWFpbEVkaXRvclJlZn1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIDxFbWFpbEVkaXRvclxyXG4gICAgICAgICAgICAgICAgcmVmPXtlbWFpbEVkaXRvclJlZn1cclxuICAgICAgICAgICAgICAgIG9uUmVhZHk9e29uUmVhZHl9XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9qZWN0SWQ9e3Byb2plY3RJZH1cclxuICAgICAgICAgICAgICAgIC8vIG1pbkhlaWdodD1cIjEwMHZoXCJcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3tcclxuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBcIm1vZGVybl9saWdodFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEVkaXRvcldyYXBwZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL0VkaXRvcldyYXBwZXJcIjtcclxuXHJcbmltcG9ydCB7IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1JlYWN0RW1haWxFZGl0b3JQcm9wc1wiO1xyXG5cclxuaW1wb3J0IFwiLi91aS9SZWFjdEVtYWlsRWRpdG9yLmNzc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlYWN0RW1haWxFZGl0b3Ioe1xyXG4gICAgSFRNTEJvZHksXHJcbiAgICBKU09OVGVtcGxhdGUsXHJcbiAgICBleHBvcnRIVE1MQWN0aW9uLFxyXG4gICAgc2F2ZVRlbXBsYXRlQWN0aW9uXHJcbn06IFJlYWN0RW1haWxFZGl0b3JDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxFZGl0b3JXcmFwcGVyXHJcbiAgICAgICAgICAgIEhUTUxCb2R5PXtIVE1MQm9keX1cclxuICAgICAgICAgICAgSlNPTlRlbXBsYXRlPXtKU09OVGVtcGxhdGV9XHJcbiAgICAgICAgICAgIGV4cG9ydEhUTUxBY3Rpb249e2V4cG9ydEhUTUxBY3Rpb259XHJcbiAgICAgICAgICAgIHNhdmVUZW1wbGF0ZUFjdGlvbj17c2F2ZVRlbXBsYXRlQWN0aW9ufVxyXG4gICAgICAgIC8+XHJcbiAgICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJkZWZhdWx0U2NyaXB0VXJsIiwiY2FsbGJhY2tzIiwibG9hZGVkIiwiaXNTY3JpcHRJbmplY3RlZCIsInNjcmlwdFVybCIsInNjcmlwdHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmplY3RlZCIsImZvckVhY2giLCJzY3JpcHQiLCJzcmMiLCJpbmNsdWRlcyIsImFkZENhbGxiYWNrIiwiY2FsbGJhY2siLCJwdXNoIiwicnVuQ2FsbGJhY2tzIiwic2hpZnQiLCJsb2FkU2NyaXB0IiwiZW1iZWRTY3JpcHQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwib25sb2FkIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibW9kdWxlIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBLElBQU1BLGdCQUFnQixHQUFHLHVDQUF1QyxDQUFBO0NBQ2hFLElBQU1DLFNBQVMsR0FBZSxFQUFFLENBQUE7Q0FDaEMsSUFBSUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtBQUVsQixDQUFBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlDLFNBQWlCLEVBQUE7R0FDekMsSUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBQ25ELElBQUlDLFFBQVEsR0FBRyxLQUFLLENBQUE7QUFFcEJILEdBQUFBLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDLFVBQUNDLE1BQU0sRUFBQTtLQUNyQixJQUFJQSxNQUFNLENBQUNDLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDUixTQUFTLENBQUMsRUFBRTtPQUNsQ0ksUUFBUSxHQUFHLElBQUksQ0FBQTs7SUFFbEIsQ0FBQyxDQUFBO0dBRUYsT0FBT0EsUUFBUSxDQUFBO0FBQ2pC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
