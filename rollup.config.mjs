import commonjs from "@rollup/plugin-commonjs";

// Mendix lists externals as regexes (/^react$/, /^mendix($|\/)/, …), which is
// also how its commonjs `ignore` callback tests them. Match that exactly rather
// than trying to recover module names from the patterns.
const REQUIRE_CALL = /\brequire\(\s*["']([^"']+)["']\s*\)/g;

function externalMatcher(externals) {
    const matchers = externals.map(value => (value instanceof RegExp ? value : new RegExp(value)));
    return id => matchers.some(matcher => matcher.test(id));
}

/**
 * Let @rollup/plugin-commonjs convert `require()` of external modules.
 *
 * Mendix configures the plugin with
 *
 *   ignore: id => (config.external || []).some(v => new RegExp(v).test(id))
 *
 * so `require("react")` inside a CommonJS dependency is left in the output
 * verbatim. That is right for the AMD bundle, where a `require` exists, and
 * fatal for the ESM bundle the Mendix React client actually loads, which fails
 * on load with `ReferenceError: require is not defined` and takes the whole
 * page with it. react-email-editor ships CJS, so its `var React =
 * require('react')` lands in the bundle untouched.
 *
 * So rebuild the plugin with the same options minus that one. They are copied
 * from configs/rollup.config.mjs, where `extensions` is a fixed constant rather
 * than anything derived from this widget.
 *
 * Rewriting the dependency instead — injecting an ESM import and pointing the
 * require at it — looks simpler and is wrong: it makes the plugin treat the
 * file as a mixed ES module, so it stops wrapping it in a CommonJS scope, and
 * the bundle trades `require is not defined` for `exports is not defined`.
 */
function useCommonjsThatConvertsExternals(plugins) {
    const index = plugins.findIndex(plugin => plugin && plugin.name === "commonjs");
    if (index === -1) {
        throw new Error(
            "rollup.config.mjs expected a plugin named 'commonjs' in the Mendix config and found " +
                "none. Check configs/rollup.config.mjs in @mendix/pluggable-widgets-tools."
        );
    }

    const patched = [...plugins];
    patched[index] = commonjs({
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        transformMixedEsModules: true,
        requireReturnsDefault: "auto"
    });
    return patched;
}

/**
 * Fail this build rather than the app's.
 *
 * An unconverted require() is invisible in the widget build's own output: it
 * surfaces later as a blank page and a stack trace pointing into a minified
 * Mendix page chunk that names no widget. Only in ESM output — the Studio Pro
 * preview bundle is CommonJS, where require("react") is just how rollup emits
 * an external.
 */
function guardBundleOutput(externals) {
    const isExternal = externalMatcher(externals);

    return {
        name: "guard-bundle-output",

        renderChunk(code, chunk, options) {
            if (!["es", "esm", "module"].includes(options.format)) {
                return null;
            }
            const leftover = new Set();
            REQUIRE_CALL.lastIndex = 0;
            for (const [, module_] of code.matchAll(REQUIRE_CALL)) {
                if (isExternal(module_)) {
                    leftover.add(module_);
                }
            }
            if (leftover.size) {
                this.error(
                    `${chunk.fileName} contains unconverted require() call(s) for external module(s): ` +
                        `${[...leftover].join(", ")}. There is no require in the ESM bundle the Mendix ` +
                        "React client loads, so the page dies on load with 'ReferenceError: require is " +
                        "not defined'."
                );
            }
            return null;
        }
    };
}

export default args =>
    args.configDefaultConfig.map(config => {
        const externals = Array.isArray(config.external) ? config.external : [];
        config.plugins = [
            ...useCommonjsThatConvertsExternals(config.plugins || []),
            guardBundleOutput(externals)
        ];
        return config;
    });
