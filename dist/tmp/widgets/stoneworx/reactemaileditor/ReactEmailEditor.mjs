import React, { useRef, useEffect } from 'react';

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
	var React$1 = React;
	var React__default = _interopDefault(React$1);
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
	  var _useState = React$1.useState(null),
	    editor = _useState[0],
	    setEditor = _useState[1];
	  var _useState2 = React$1.useState(false),
	    hasLoadedEmbedScript = _useState2[0],
	    setHasLoadedEmbedScript = _useState2[1];
	  var editorId = React$1.useMemo(function () {
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
	  React$1.useImperativeHandle(ref, function () {
	    return {
	      editor: editor
	    };
	  }, [editor]);
	  React$1.useEffect(function () {
	    return function () {
	      editor == null ? void 0 : editor.destroy();
	    };
	  }, []);
	  React$1.useEffect(function () {
	    setHasLoadedEmbedScript(false);
	    loadScript(function () {
	      return setHasLoadedEmbedScript(true);
	    }, scriptUrl);
	  }, [scriptUrl]);
	  React$1.useEffect(function () {
	    if (!hasLoadedEmbedScript) return;
	    editor == null ? void 0 : editor.destroy();
	    setEditor(unlayer.createEditor(options));
	  }, [JSON.stringify(options), hasLoadedEmbedScript]);
	  var methodProps = Object.keys(props).filter(function (propName) {
	    return /^on/.test(propName);
	  });
	  React$1.useEffect(function () {
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
    const emailEditorRef = useRef(null);
    useEffect(() => {
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

export { ReactEmailEditor };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3RFbWFpbEVkaXRvci5tanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1lbWFpbC1lZGl0b3IvZGlzdC9yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWVtYWlsLWVkaXRvci9kaXN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9vbGJhci50c3giLCIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FZGl0b3JXcmFwcGVyLnRzeCIsIi4uLy4uLy4uLy4uLy4uL3NyYy9SZWFjdEVtYWlsRWRpdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0X19kZWZhdWx0ID0gX2ludGVyb3BEZWZhdWx0KFJlYWN0KTtcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBuYW1lID0gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcbnZhciB2ZXJzaW9uID0gXCIxLjcuMTFcIjtcbnZhciBkZXNjcmlwdGlvbiA9IFwiVW5sYXllcidzIEVtYWlsIEVkaXRvciBDb21wb25lbnQgZm9yIFJlYWN0LmpzXCI7XG52YXIgbWFpbiA9IFwiZGlzdC9pbmRleC5qc1wiO1xudmFyIHR5cGluZ3MgPSBcImRpc3QvaW5kZXguZC50c1wiO1xudmFyIGZpbGVzID0gW1xuXHRcImRpc3RcIlxuXTtcbnZhciBlbmdpbmVzID0ge1xuXHRub2RlOiBcIj49MTBcIlxufTtcbnZhciBzY3JpcHRzID0ge1xuXHRzdGFydDogXCJ0c2R4IHdhdGNoXCIsXG5cdGJ1aWxkOiBcInRzZHggYnVpbGRcIixcblx0dGVzdDogXCJ0c2R4IHRlc3RcIixcblx0XCJ0ZXN0OndhdGNoXCI6IFwidHNkeCB0ZXN0IC0td2F0Y2hcIixcblx0XCJ0ZXN0OmNvdmVyYWdlXCI6IFwidHNkeCB0ZXN0IC0tY292ZXJhZ2VcIixcblx0bGludDogXCJ0c2R4IGxpbnRcIixcblx0cHJlcGFyZTogXCJ0c2R4IGJ1aWxkXCIsXG5cdHJlbGVhc2U6IFwibnBtIHJ1biBidWlsZCAmJiBucG0gcHVibGlzaFwiLFxuXHRcIm5ldGxpZnktYnVpbGRcIjogXCJjZCBkZW1vICYmIG5wbSBpbnN0YWxsICYmIG5wbSBydW4gYnVpbGRcIlxufTtcbnZhciBwZWVyRGVwZW5kZW5jaWVzID0ge1xuXHRyZWFjdDogXCI+PTE1XCJcbn07XG52YXIgaHVza3kgPSB7XG5cdGhvb2tzOiB7XG5cdFx0XCJwcmUtY29tbWl0XCI6IFwidHNkeCBsaW50XCJcblx0fVxufTtcbnZhciBkZXBlbmRlbmNpZXMgPSB7XG5cdFwidW5sYXllci10eXBlc1wiOiBcImxhdGVzdFwiXG59O1xudmFyIGRldkRlcGVuZGVuY2llcyA9IHtcblx0XCJAcm9sbHVwL3BsdWdpbi1yZXBsYWNlXCI6IFwiXjUuMC4yXCIsXG5cdFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xMy40LjBcIixcblx0XCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxuXHRcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMFwiLFxuXHRodXNreTogXCJeOC4wLjNcIixcblx0cmVhY3Q6IFwiXjE4LjIuMFwiLFxuXHRcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcblx0XCJyb2xsdXAtcGx1Z2luLWNvcHlcIjogXCJeMy40LjBcIixcblx0dHNkeDogXCJeMC4xNC4xXCIsXG5cdHRzbGliOiBcIl4yLjQuMVwiLFxuXHR0eXBlc2NyaXB0OiBcIl40LjkuNFwiXG59O1xudmFyIGF1dGhvciA9IFwiXCI7XG52YXIgaG9tZXBhZ2UgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS91bmxheWVyL3JlYWN0LWVtYWlsLWVkaXRvciNyZWFkbWVcIjtcbnZhciBsaWNlbnNlID0gXCJNSVRcIjtcbnZhciByZXBvc2l0b3J5ID0gXCJodHRwczovL2dpdGh1Yi5jb20vdW5sYXllci9yZWFjdC1lbWFpbC1lZGl0b3IuZ2l0XCI7XG52YXIga2V5d29yZHMgPSBbXG5cdFwicmVhY3QtY29tcG9uZW50XCJcbl07XG52YXIgcGtnID0ge1xuXHRuYW1lOiBuYW1lLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG5cdG1haW46IG1haW4sXG5cdHR5cGluZ3M6IHR5cGluZ3MsXG5cdGZpbGVzOiBmaWxlcyxcblx0ZW5naW5lczogZW5naW5lcyxcblx0c2NyaXB0czogc2NyaXB0cyxcblx0cGVlckRlcGVuZGVuY2llczogcGVlckRlcGVuZGVuY2llcyxcblx0aHVza3k6IGh1c2t5LFxuXHRkZXBlbmRlbmNpZXM6IGRlcGVuZGVuY2llcyxcblx0ZGV2RGVwZW5kZW5jaWVzOiBkZXZEZXBlbmRlbmNpZXMsXG5cdGF1dGhvcjogYXV0aG9yLFxuXHRob21lcGFnZTogaG9tZXBhZ2UsXG5cdGxpY2Vuc2U6IGxpY2Vuc2UsXG5cdHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG5cdGtleXdvcmRzOiBrZXl3b3Jkc1xufTtcblxudmFyIGRlZmF1bHRTY3JpcHRVcmwgPSAnaHR0cHM6Ly9lZGl0b3IudW5sYXllci5jb20vZW1iZWQuanM/Mic7XG52YXIgY2FsbGJhY2tzID0gW107XG52YXIgbG9hZGVkID0gZmFsc2U7XG52YXIgaXNTY3JpcHRJbmplY3RlZCA9IGZ1bmN0aW9uIGlzU2NyaXB0SW5qZWN0ZWQoc2NyaXB0VXJsKSB7XG4gIHZhciBzY3JpcHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0Jyk7XG4gIHZhciBpbmplY3RlZCA9IGZhbHNlO1xuICBzY3JpcHRzLmZvckVhY2goZnVuY3Rpb24gKHNjcmlwdCkge1xuICAgIGlmIChzY3JpcHQuc3JjLmluY2x1ZGVzKHNjcmlwdFVybCkpIHtcbiAgICAgIGluamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW5qZWN0ZWQ7XG59O1xudmFyIGFkZENhbGxiYWNrID0gZnVuY3Rpb24gYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xufTtcbnZhciBydW5DYWxsYmFja3MgPSBmdW5jdGlvbiBydW5DYWxsYmFja3MoKSB7XG4gIGlmIChsb2FkZWQpIHtcbiAgICB2YXIgY2FsbGJhY2s7XG4gICAgd2hpbGUgKGNhbGxiYWNrID0gY2FsbGJhY2tzLnNoaWZ0KCkpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59O1xudmFyIGxvYWRTY3JpcHQgPSBmdW5jdGlvbiBsb2FkU2NyaXB0KGNhbGxiYWNrLCBzY3JpcHRVcmwpIHtcbiAgaWYgKHNjcmlwdFVybCA9PT0gdm9pZCAwKSB7XG4gICAgc2NyaXB0VXJsID0gZGVmYXVsdFNjcmlwdFVybDtcbiAgfVxuICBhZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gIGlmICghaXNTY3JpcHRJbmplY3RlZChzY3JpcHRVcmwpKSB7XG4gICAgdmFyIGVtYmVkU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgZW1iZWRTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBzY3JpcHRVcmwpO1xuICAgIGVtYmVkU2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZCA9IHRydWU7XG4gICAgICBydW5DYWxsYmFja3MoKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZW1iZWRTY3JpcHQpO1xuICB9IGVsc2Uge1xuICAgIHJ1bkNhbGxiYWNrcygpO1xuICB9XG59O1xuXG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyB7XG4gIF9fdW5sYXllcl9sYXN0RWRpdG9ySWQ6IDBcbn0gOiB3aW5kb3c7XG53aW4uX191bmxheWVyX2xhc3RFZGl0b3JJZCA9IHdpbi5fX3VubGF5ZXJfbGFzdEVkaXRvcklkIHx8IDA7XG52YXIgRW1haWxFZGl0b3IgPSAvKiNfX1BVUkVfXyovUmVhY3RfX2RlZmF1bHQuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICB2YXIgX3Byb3BzJGFwcGVhcmFuY2UsIF9wcm9wcyRvcHRpb25zLCBfcHJvcHMkb3B0aW9uczIsIF9wcm9wcyRsb2NhbGUsIF9wcm9wcyRvcHRpb25zMywgX3Byb3BzJHByb2plY3RJZCwgX3Byb3BzJG9wdGlvbnM0LCBfcHJvcHMkdG9vbHMsIF9wcm9wcyRvcHRpb25zNTtcbiAgdmFyIG9uTG9hZCA9IHByb3BzLm9uTG9hZCxcbiAgICBvblJlYWR5ID0gcHJvcHMub25SZWFkeSxcbiAgICBzY3JpcHRVcmwgPSBwcm9wcy5zY3JpcHRVcmwsXG4gICAgX3Byb3BzJG1pbkhlaWdodCA9IHByb3BzLm1pbkhlaWdodCxcbiAgICBtaW5IZWlnaHQgPSBfcHJvcHMkbWluSGVpZ2h0ID09PSB2b2lkIDAgPyA1MDAgOiBfcHJvcHMkbWluSGVpZ2h0LFxuICAgIF9wcm9wcyRzdHlsZSA9IHByb3BzLnN0eWxlLFxuICAgIHN0eWxlID0gX3Byb3BzJHN0eWxlID09PSB2b2lkIDAgPyB7fSA6IF9wcm9wcyRzdHlsZTtcbiAgdmFyIF91c2VTdGF0ZSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLFxuICAgIGVkaXRvciA9IF91c2VTdGF0ZVswXSxcbiAgICBzZXRFZGl0b3IgPSBfdXNlU3RhdGVbMV07XG4gIHZhciBfdXNlU3RhdGUyID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLFxuICAgIGhhc0xvYWRlZEVtYmVkU2NyaXB0ID0gX3VzZVN0YXRlMlswXSxcbiAgICBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCA9IF91c2VTdGF0ZTJbMV07XG4gIHZhciBlZGl0b3JJZCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9wcy5lZGl0b3JJZCB8fCBcImVkaXRvci1cIiArICsrd2luLl9fdW5sYXllcl9sYXN0RWRpdG9ySWQ7XG4gIH0sIFtwcm9wcy5lZGl0b3JJZF0pO1xuICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBwcm9wcy5vcHRpb25zIHx8IHt9LCB7XG4gICAgYXBwZWFyYW5jZTogKF9wcm9wcyRhcHBlYXJhbmNlID0gcHJvcHMuYXBwZWFyYW5jZSkgIT0gbnVsbCA/IF9wcm9wcyRhcHBlYXJhbmNlIDogKF9wcm9wcyRvcHRpb25zID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zLmFwcGVhcmFuY2UsXG4gICAgZGlzcGxheU1vZGU6IChwcm9wcyA9PSBudWxsID8gdm9pZCAwIDogcHJvcHMuZGlzcGxheU1vZGUpIHx8ICgoX3Byb3BzJG9wdGlvbnMyID0gcHJvcHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IF9wcm9wcyRvcHRpb25zMi5kaXNwbGF5TW9kZSkgfHwgJ2VtYWlsJyxcbiAgICBsb2NhbGU6IChfcHJvcHMkbG9jYWxlID0gcHJvcHMubG9jYWxlKSAhPSBudWxsID8gX3Byb3BzJGxvY2FsZSA6IChfcHJvcHMkb3B0aW9uczMgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnMzLmxvY2FsZSxcbiAgICBwcm9qZWN0SWQ6IChfcHJvcHMkcHJvamVjdElkID0gcHJvcHMucHJvamVjdElkKSAhPSBudWxsID8gX3Byb3BzJHByb2plY3RJZCA6IChfcHJvcHMkb3B0aW9uczQgPSBwcm9wcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogX3Byb3BzJG9wdGlvbnM0LnByb2plY3RJZCxcbiAgICB0b29sczogKF9wcm9wcyR0b29scyA9IHByb3BzLnRvb2xzKSAhPSBudWxsID8gX3Byb3BzJHRvb2xzIDogKF9wcm9wcyRvcHRpb25zNSA9IHByb3BzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfcHJvcHMkb3B0aW9uczUudG9vbHMsXG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHNvdXJjZToge1xuICAgICAgbmFtZTogcGtnLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvblxuICAgIH1cbiAgfSk7XG4gIFJlYWN0LnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRvcjogZWRpdG9yXG4gICAgfTtcbiAgfSwgW2VkaXRvcl0pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBlZGl0b3IgPT0gbnVsbCA/IHZvaWQgMCA6IGVkaXRvci5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHNldEhhc0xvYWRlZEVtYmVkU2NyaXB0KGZhbHNlKTtcbiAgICBsb2FkU2NyaXB0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzZXRIYXNMb2FkZWRFbWJlZFNjcmlwdCh0cnVlKTtcbiAgICB9LCBzY3JpcHRVcmwpO1xuICB9LCBbc2NyaXB0VXJsXSk7XG4gIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFoYXNMb2FkZWRFbWJlZFNjcmlwdCkgcmV0dXJuO1xuICAgIGVkaXRvciA9PSBudWxsID8gdm9pZCAwIDogZWRpdG9yLmRlc3Ryb3koKTtcbiAgICBzZXRFZGl0b3IodW5sYXllci5jcmVhdGVFZGl0b3Iob3B0aW9ucykpO1xuICB9LCBbSlNPTi5zdHJpbmdpZnkob3B0aW9ucyksIGhhc0xvYWRlZEVtYmVkU2NyaXB0XSk7XG4gIHZhciBtZXRob2RQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIC9eb24vLnRlc3QocHJvcE5hbWUpO1xuICB9KTtcbiAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWVkaXRvcikgcmV0dXJuO1xuICAgIG9uTG9hZCA9PSBudWxsID8gdm9pZCAwIDogb25Mb2FkKGVkaXRvcik7XG4gICAgLy8gQWxsIHByb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBvbltOYW1lXSBhcmUgcmVnaXN0ZXJlZCBhcyBldmVudCBsaXN0ZW5lcnMuXG4gICAgbWV0aG9kUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kUHJvcCkge1xuICAgICAgaWYgKC9eb24vLnRlc3QobWV0aG9kUHJvcCkgJiYgbWV0aG9kUHJvcCAhPT0gJ29uTG9hZCcgJiYgbWV0aG9kUHJvcCAhPT0gJ29uUmVhZHknICYmIHR5cGVvZiBwcm9wc1ttZXRob2RQcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihtZXRob2RQcm9wLCBwcm9wc1ttZXRob2RQcm9wXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG9uUmVhZHkpIHtcbiAgICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdlZGl0b3I6cmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9uUmVhZHkoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2VkaXRvciwgT2JqZWN0LmtleXMobWV0aG9kUHJvcHMpLmpvaW4oJywnKV0pO1xuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIGZsZXg6IDEsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBtaW5IZWlnaHQ6IG1pbkhlaWdodFxuICAgIH1cbiAgfSwgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgaWQ6IGVkaXRvcklkLFxuICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgc3R5bGUsIHtcbiAgICAgIGZsZXg6IDFcbiAgICB9KVxuICB9KSk7XG59KTtcblxuZXhwb3J0cy5FbWFpbEVkaXRvciA9IEVtYWlsRWRpdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gRW1haWxFZGl0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC1lbWFpbC1lZGl0b3IuY2pzLmRldmVsb3BtZW50LmpzLm1hcFxuIiwiXG4ndXNlIHN0cmljdCdcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMucHJvZHVjdGlvbi5taW4uanMnKVxufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3JlYWN0LWVtYWlsLWVkaXRvci5janMuZGV2ZWxvcG1lbnQuanMnKVxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25WYWx1ZSwgRWRpdGFibGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcclxuaW1wb3J0IHsgRWRpdG9yUmVmIH0gZnJvbSBcInJlYWN0LWVtYWlsLWVkaXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUb29sYmFyUHJvcHMge1xyXG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxuICAgIGVtYWlsUmVmOiBSZWFjdC5SZWZPYmplY3Q8RWRpdG9yUmVmIHwgbnVsbD47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUb29sYmFyKHtcclxuICAgIEhUTUxCb2R5LFxyXG4gICAgSlNPTlRlbXBsYXRlLFxyXG4gICAgZXhwb3J0SFRNTEFjdGlvbixcclxuICAgIHNhdmVUZW1wbGF0ZUFjdGlvbixcclxuICAgIGVtYWlsUmVmXHJcbn06IFRvb2xiYXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBleHBvcnRBY3Rpb24gPSAoYWN0aW9uOiBBY3Rpb25WYWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbFJlZi5jdXJyZW50Py5lZGl0b3I7XHJcbiAgICAgICAgdW5sYXllcj8uZXhwb3J0SHRtbCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGVzaWduLCBodG1sIH0gPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8gQWN0aW9uVmFsdWUgaXMgdXNlZCB0byByZXByZXNlbnQgYWN0aW9ucywgbGlrZSB0aGUgT24gY2xpY2sgcHJvcGVydHkgb2YgYW4gYWN0aW9uIGJ1dHRvbi4gRm9yIGFueSBhY3Rpb24gZXhjZXB0IERvIG5vdGhpbmcsIHlvdXIgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBhIHZhbHVlIGFkaGVyaW5nIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLiBGb3IgRG8gbm90aGluZyBpdCB3aWxsIHJlY2VpdmUgdW5kZWZpbmVkLiBUaGUgQWN0aW9uVmFsdWUgcHJvcCBhcHBlYXJzIGxpa2UgdGhpczpcclxuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24uY2FuRXhlY3V0ZSAmJiAhYWN0aW9uLmlzRXhlY3V0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSFRNTEJvZHkgJiYgSFRNTEJvZHkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSFRNTEJvZHkuc2V0VmFsdWUoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEpTT05UZW1wbGF0ZSAmJiBKU09OVGVtcGxhdGUuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OVGVtcGxhdGUuc2V0VmFsdWUoSlNPTi5zdHJpbmdpZnkoZGVzaWduKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2luZy1pbm5lci1ib3R0b20tbWVkaXVtXCI+XHJcbiAgICAgICAgICAgIHtleHBvcnRIVE1MQWN0aW9uICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IGV4cG9ydEFjdGlvbihleHBvcnRIVE1MQWN0aW9uKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgRXhwb3J0IEhUTUxcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAge3NhdmVUZW1wbGF0ZUFjdGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIG14LWJ1dHRvbiBidG4tZGVmYXVsdCBzcGFjaW5nLW91dGVyLWxlZnQtbWVkaXVtXCJcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBleHBvcnRBY3Rpb24oc2F2ZVRlbXBsYXRlQWN0aW9uKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBTYXZlIFRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCwgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XHJcbmltcG9ydCBFbWFpbEVkaXRvciwgeyBFZGl0b3IsIEVkaXRvclJlZiwgRW1haWxFZGl0b3JQcm9wcyB9IGZyb20gXCJyZWFjdC1lbWFpbC1lZGl0b3JcIjtcclxuaW1wb3J0IHsgVG9vbGJhciB9IGZyb20gXCIuL1Rvb2xiYXJcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMge1xyXG4gICAgSFRNTEJvZHk/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz47XHJcbiAgICBleHBvcnRIVE1MQWN0aW9uPzogQWN0aW9uVmFsdWU7XHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb24/OiBBY3Rpb25WYWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGU/OiBFZGl0YWJsZVZhbHVlPHN0cmluZz4sIHVubGF5ZXI/OiBFZGl0b3IgfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoIUpTT05UZW1wbGF0ZSB8fCAhSlNPTlRlbXBsYXRlLmRpc3BsYXlWYWx1ZSB8fCBKU09OVGVtcGxhdGUuZGlzcGxheVZhbHVlID09PSBcIlwiKSByZXR1cm47XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1bmxheWVyICYmIHVubGF5ZXIubG9hZERlc2lnbihKU09OLnBhcnNlKEpTT05UZW1wbGF0ZS5kaXNwbGF5VmFsdWUpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEVkaXRvcldyYXBwZXIoeyBIVE1MQm9keSwgSlNPTlRlbXBsYXRlLCBleHBvcnRIVE1MQWN0aW9uLCBzYXZlVGVtcGxhdGVBY3Rpb24gfTogUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xyXG4gICAgY29uc3QgZW1haWxFZGl0b3JSZWYgPSB1c2VSZWY8RWRpdG9yUmVmPihudWxsKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGF5ZXIgPSBlbWFpbEVkaXRvclJlZi5jdXJyZW50Py5lZGl0b3I7XHJcbiAgICAgICAgbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGUsIHVubGF5ZXIpO1xyXG4gICAgfSwgW0pTT05UZW1wbGF0ZV0pO1xyXG5cclxuICAgIGNvbnN0IG9uUmVhZHk6IEVtYWlsRWRpdG9yUHJvcHNbXCJvblJlYWR5XCJdID0gdW5sYXllciA9PiB7XHJcbiAgICAgICAgbG9hZEpTT05UZW1wbGF0ZShKU09OVGVtcGxhdGUsIHVubGF5ZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtZW1haWwtZWRpdG9yLWRpdlwiPlxyXG4gICAgICAgICAgICA8VG9vbGJhclxyXG4gICAgICAgICAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxyXG4gICAgICAgICAgICAgICAgSlNPTlRlbXBsYXRlPXtKU09OVGVtcGxhdGV9XHJcbiAgICAgICAgICAgICAgICBleHBvcnRIVE1MQWN0aW9uPXtleHBvcnRIVE1MQWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259XHJcbiAgICAgICAgICAgICAgICBlbWFpbFJlZj17ZW1haWxFZGl0b3JSZWZ9XHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICA8RW1haWxFZGl0b3JcclxuICAgICAgICAgICAgICAgIHJlZj17ZW1haWxFZGl0b3JSZWZ9XHJcbiAgICAgICAgICAgICAgICBvblJlYWR5PXtvblJlYWR5fVxyXG4gICAgICAgICAgICAgICAgLy8gcHJvamVjdElkPXtwcm9qZWN0SWR9XHJcbiAgICAgICAgICAgICAgICAvLyBtaW5IZWlnaHQ9XCIxMDB2aFwiXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogXCJtb2Rlcm5fbGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRWRpdG9yV3JhcHBlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvRWRpdG9yV3JhcHBlclwiO1xyXG5cclxuaW1wb3J0IHsgUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvUmVhY3RFbWFpbEVkaXRvclByb3BzXCI7XHJcblxyXG5pbXBvcnQgXCIuL3VpL1JlYWN0RW1haWxFZGl0b3IuY3NzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVhY3RFbWFpbEVkaXRvcih7XHJcbiAgICBIVE1MQm9keSxcclxuICAgIEpTT05UZW1wbGF0ZSxcclxuICAgIGV4cG9ydEhUTUxBY3Rpb24sXHJcbiAgICBzYXZlVGVtcGxhdGVBY3Rpb25cclxufTogUmVhY3RFbWFpbEVkaXRvckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEVkaXRvcldyYXBwZXJcclxuICAgICAgICAgICAgSFRNTEJvZHk9e0hUTUxCb2R5fVxyXG4gICAgICAgICAgICBKU09OVGVtcGxhdGU9e0pTT05UZW1wbGF0ZX1cclxuICAgICAgICAgICAgZXhwb3J0SFRNTEFjdGlvbj17ZXhwb3J0SFRNTEFjdGlvbn1cclxuICAgICAgICAgICAgc2F2ZVRlbXBsYXRlQWN0aW9uPXtzYXZlVGVtcGxhdGVBY3Rpb259XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImRlZmF1bHRTY3JpcHRVcmwiLCJjYWxsYmFja3MiLCJsb2FkZWQiLCJpc1NjcmlwdEluamVjdGVkIiwic2NyaXB0VXJsIiwic2NyaXB0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImluamVjdGVkIiwiZm9yRWFjaCIsInNjcmlwdCIsInNyYyIsImluY2x1ZGVzIiwiYWRkQ2FsbGJhY2siLCJjYWxsYmFjayIsInB1c2giLCJydW5DYWxsYmFja3MiLCJzaGlmdCIsImxvYWRTY3JpcHQiLCJlbWJlZFNjcmlwdCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJvbmxvYWQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUEsSUFBTUEsZ0JBQWdCLEdBQUcsdUNBQXVDLENBQUE7Q0FD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
