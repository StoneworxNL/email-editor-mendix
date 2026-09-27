import { EditorRef, EmailEditorProps } from "react-email-editor";
import { ImageUploadModeEnum, ThemeEnum } from "../../typings/ReactEmailEditorProps";

export type Editor = NonNullable<EditorRef["editor"]>;
export type EditorOptions = NonNullable<EmailEditorProps["options"]>;

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
    imageUploadMode: ImageUploadModeEnum
): EditorOptions {
    const options: EditorOptions = {
        ...advanced,
        appearance: { ...advanced.appearance, theme }
    };
    if (projectId > 0) {
        options.projectId = projectId;
    }
    if (imageUploadMode === "disabled") {
        options.features = { ...advanced.features, userUploads: false };
    }
    return options;
}

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
