import { buildOptions, parseAdvancedOptions } from "../editorOptions";

describe("buildOptions", () => {
    it("sets the display mode, version, theme and project ID", () => {
        expect(buildOptions({}, 42, "modern_dark", "unlayer", "web", " latest ")).toEqual({
            displayMode: "web",
            version: "latest",
            appearance: { theme: "modern_dark" },
            projectId: 42
        });
    });

    it("lets the advanced options override the display mode and version", () => {
        const { options } = parseAdvancedOptions('{"displayMode": "popup", "version": "1.157.0"}');
        const built = buildOptions(options, 0, "modern_light", "unlayer", "email", "latest");
        expect(built.displayMode).toBe("popup");
        expect(built.version).toBe("1.157.0");
        expect(built.projectId).toBeUndefined();
    });

    it("turns off uploads when they are disabled, keeping other features", () => {
        const { options } = parseAdvancedOptions('{"features": {"stockImages": false}}');
        expect(buildOptions(options, 0, "modern_light", "disabled").features).toEqual({
            stockImages: false,
            userUploads: false
        });
    });
});

describe("parseAdvancedOptions", () => {
    it.each([
        ["", undefined],
        ["[1]", "Advanced options must be a JSON object."],
        ["{oops", "Advanced options are not valid JSON"]
    ])("parses %j", (json, error) => {
        const result = parseAdvancedOptions(json);
        if (error) {
            expect(result.error).toContain(error);
        } else {
            expect(result).toEqual({ options: {} });
        }
    });
});
