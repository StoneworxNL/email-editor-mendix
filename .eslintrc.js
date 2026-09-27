const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    settings: {
        ...base.settings,
        // tsconfig.json compiles JSX to React.createElement, not the base config's bare createElement.
        react: { ...(base.settings && base.settings.react), pragma: "React" }
    }
};
