// Mendix lists externals as regexes (/^react$/, /^mendix($|\/)/, …), which is
// also how its commonjs `ignore` callback tests them. Match that exactly rather
// than trying to recover module names from the patterns.
const REQUIRE_CALL = /\brequire\(\s*["']([^"']+)["']\s*\)/g;

function externalMatcher(externals) {
    const matchers = externals.map(value => (value instanceof RegExp ? value : new RegExp(value)));
    return id => matchers.some(matcher => matcher.test(id));
}

/**
 * Fail this build rather than the app's.
 *
 * Mendix configures @rollup/plugin-commonjs to leave `require()` of externals
 * (react, mendix) untouched. That is fatal in the ESM bundle the Mendix React
 * client loads: it dies with `ReferenceError: require is not defined` and takes
 * the whole page with it. react-email-editor 1.x only shipped CommonJS and
 * needed a patched commonjs plugin; 2.x ships ESM, so this guard is all that is
 * left, to catch any CommonJS dependency added later.
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
        config.plugins = [...(config.plugins || []), guardBundleOutput(externals)];
        return config;
    });
