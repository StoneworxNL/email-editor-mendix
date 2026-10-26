import React, { ReactElement } from "react";
import { ActionValue, Option } from "mendix";

/**
 * The action arguments, exactly as ReactEmailEditor.xml generates them into
 * typings/ReactEmailEditorProps.d.ts. Spelling them out once keeps this file and
 * the generated props from drifting apart.
 */
export type TemplateActionArgs = { html__: Option<string>; json__: Option<string> };

export interface ToolbarButton {
    caption: string;
    action: ActionValue<TemplateActionArgs>;
    onClick: () => void;
}

export interface PreviewToggle {
    /** Caption for the current state: "Show Preview" while editing, "Hide Preview" while previewing. */
    caption: string;
    previewing: boolean;
    onClick: () => void;
}

export interface ToolbarProps {
    /** False until the editor has loaded; nothing can be exported before that. */
    ready: boolean;
    readOnly: boolean;
    /** False while the template attribute is loading, unavailable or could not be read. */
    canSave: boolean;
    preview?: PreviewToggle;
    exportHtml?: ToolbarButton;
    saveTemplate?: ToolbarButton;
}

function ActionButton({ button, disabled }: { button: ToolbarButton; disabled: boolean }): ReactElement {
    const busy = button.action.isExecuting;
    return (
        <button
            type="button"
            className="btn mx-button btn-default"
            disabled={disabled || busy || !button.action.canExecute}
            aria-busy={busy}
            onClick={button.onClick}
        >
            {button.caption}
        </button>
    );
}

export function Toolbar({
    ready,
    readOnly,
    canSave,
    preview,
    exportHtml,
    saveTemplate
}: ToolbarProps): ReactElement | null {
    // A read-only editor always previews, and saving from it would store nothing
    // the user could change.
    const showPreview = preview && !readOnly;
    const showSave = saveTemplate && !readOnly;
    if (!showPreview && !exportHtml && !showSave) {
        return null;
    }
    return (
        <div className="react-email-editor-toolbar spacing-inner-bottom-medium">
            {showPreview && (
                <button
                    type="button"
                    className="btn mx-button btn-default"
                    disabled={!ready}
                    aria-pressed={preview.previewing}
                    onClick={preview.onClick}
                >
                    {preview.caption}
                </button>
            )}
            {exportHtml && <ActionButton button={exportHtml} disabled={!ready} />}
            {showSave && <ActionButton button={saveTemplate} disabled={!ready || !canSave} />}
        </div>
    );
}
