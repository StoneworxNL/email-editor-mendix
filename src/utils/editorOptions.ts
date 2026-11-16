import { EditorRef, EmailEditorProps } from "react-email-editor";
import { DisplayModeEnum, ImageUploadModeEnum, ThemeEnum } from "../../typings/ReactEmailEditorProps";

export type Editor = NonNullable<EditorRef<DisplayModeEnum>["editor"]>;
export type EditorOptions = NonNullable<EmailEditorProps<DisplayModeEnum>["options"]>;

/**
 * Parse the "Advanced options (JSON)" property. Returns an error message instead
 * of throwing, so a typo in Studio Pro shows up as a message, not a dead page.
 */
export function parseAdvancedOptions(json: string | undefined): { options: EditorOptions; error?: string } {
    if (!json || !json.trim()) {
        return { options: {} };
    }
    try {
        const parsed = JSON.parse(json);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return { options: {}, error: "Advanced options must be a JSON object." };
        }
        return { options: parsed };
    } catch (e) {
        return { options: {}, error: `Advanced options are not valid JSON: ${(e as Error).message}` };
    }
}

/**
 * Everything in here must be stable: react-email-editor destroys and recreates
 * the editor, losing unsaved work, whenever the serialized options change. Values
 * that can change at runtime (locale, merge tags) go through the editor API.
 */
export function buildOptions(
    advanced: EditorOptions,
    projectId: number,
    theme: ThemeEnum,
    imageUploadMode: ImageUploadModeEnum,
    displayMode: DisplayModeEnum = "email",
    version = "",
    controlsPreview = false
): EditorOptions {
    // Display mode and version come before the advanced options, so apps that
    // already set them there keep what they had.
    const options: EditorOptions = {
        displayMode,
        ...(version.trim() ? { version: version.trim() } : {}),
        ...advanced,
        appearance: { ...advanced.appearance, theme }
    };
    if (projectId > 0) {
        options.projectId = projectId;
    }
    if (imageUploadMode === "disabled") {
        options.features = { ...advanced.features, userUploads: false };
    }
    if (controlsPreview) {
        options.features = { ...options.features, preview: false };
        const own = advanced.customCSS ?? [];
        options.customCSS = [...(Array.isArray(own) ? own : [own]), HIDE_PREVIEW_CONTROLS_CSS];
    }
    return options;
}

/**
 * Unlayer tells nobody when its own preview button or the preview's close
 * button is used, so the widget hides them while it drives the preview.
 */
export const HIDE_PREVIEW_CONTROLS_CSS = "#close-preview, .toolbar-button:has(.fa-eye) { display: none !important; }";

export type ParsedDesign = { design?: object; error?: string };

export function parseDesign(json: string): ParsedDesign {
    try {
        const design = JSON.parse(json);
        if (!design || typeof design !== "object") {
            return { error: "The saved template is not a JSON object." };
        }
        return { design };
    } catch (e) {
        return { error: `The saved template could not be read: ${(e as Error).message}` };
    }
}
