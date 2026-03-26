import React, { ReactElement } from "react";
import { ActionValue, EditableValue } from "mendix";
import { EditorRef } from "react-email-editor";

export interface ToolbarProps {
    HTMLBody?: EditableValue<string>;
    JSONTemplate?: EditableValue<string>;
    exportHTMLAction?: ActionValue;
    saveTemplateAction?: ActionValue;
    emailRef: React.RefObject<EditorRef | null>;
}

export function Toolbar({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction,
    emailRef
}: ToolbarProps): ReactElement {
    const exportAction = (action: ActionValue) => {
        const unlayer = emailRef.current?.editor;
        unlayer?.exportHtml((data: any) => {
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

    return (
        <div className="spacing-inner-bottom-medium">
            {exportHTMLAction && (
                <button className="btn mx-button btn-default" onClick={() => exportAction(exportHTMLAction)}>
                    Export HTML
                </button>
            )}

            {saveTemplateAction && (
                <button
                    className="btn mx-button btn-default spacing-outer-left-medium"
                    onClick={() => exportAction(saveTemplateAction)}
                >
                    Save Template
                </button>
            )}
        </div>
    );
}
