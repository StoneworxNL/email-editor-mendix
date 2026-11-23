import { buildOptions, checkScriptUrl, parseAdvancedOptions, parseDesign } from "../editorOptions";

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

describe("parseDesign", () => {
    it("accepts a JSON object", () => {
        expect(parseDesign('{"body": {}}')).toEqual({ design: { body: {} } });
    });

    it.each(["[]", '[{"body": {}}]', "null", "42", '"text"'])("refuses %s, which is no design", json => {
        expect(parseDesign(json)).toEqual({ error: "The saved template is not a JSON object." });
    });

    it("reports invalid JSON", () => {
        expect(parseDesign("{oops").error).toMatch(/^The saved template could not be read/);
    });
});

describe("checkScriptUrl", () => {
    it.each([
        "",
        "  ",
        undefined,
        "https://cdn.example.com/embed.js",
        "HTTPS://cdn.example.com/embed.js",
        "widgets/embed.js",
        "/embed.js"
    ])("accepts %j", url => {
        expect(checkScriptUrl(url)).toBeUndefined();
    });

    it.each([
        "http://cdn.example.com/embed.js",
        "//cdn.example.com/embed.js",
        "/\\cdn.example.com/embed.js",
        "javascript:alert(1)",
        "data:text/javascript,alert(1)"
    ])("refuses %j", url => {
        expect(checkScriptUrl(url)).toBe("The embed script URL must start with https:// or be a path in the app.");
    });
});
