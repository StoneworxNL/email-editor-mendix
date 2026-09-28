import React, { ReactElement } from "react";
import { ActionValue, Option } from "mendix";
import classNames from "classnames";

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

export interface ToolbarProps {
    /** False until the editor has loaded; nothing can be exported before that. */
    ready: boolean;
    readOnly: boolean;
    /** False while the template attribute is loading, unavailable or could not be read. */
    canSave: boolean;
    exportHtml?: ToolbarButton;
    saveTemplate?: ToolbarButton;
}

function ActionButton({
    button,
    disabled,
    className
}: {
    button: ToolbarButton;
    disabled: boolean;
    className?: string;
}): ReactElement {
    const busy = button.action.isExecuting;
    return (
        <button
            type="button"
            className={classNames("btn mx-button btn-default", className)}
            disabled={disabled || busy || !button.action.canExecute}
            aria-busy={busy}
            onClick={button.onClick}
        >
            {button.caption}
        </button>
    );
}

export function Toolbar({ ready, readOnly, canSave, exportHtml, saveTemplate }: ToolbarProps): ReactElement | null {
    // Saving from a read-only editor would store nothing the user could change.
    const showSave = saveTemplate && !readOnly;
    if (!exportHtml && !showSave) {
        return null;
    }
    return (
        <div className="react-email-editor-toolbar spacing-inner-bottom-medium">
            {exportHtml && <ActionButton button={exportHtml} disabled={!ready} />}
            {showSave && (
                <ActionButton
                    button={saveTemplate}
                    disabled={!ready || !canSave}
                    className={exportHtml ? "spacing-outer-left-medium" : undefined}
                />
            )}
        </div>
    );
}
