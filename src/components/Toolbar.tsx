import React, { ReactElement } from "react";
import { ActionValue, Option } from "mendix";
import { EditorRef } from "react-email-editor";

/**
 * The action arguments, exactly as ReactEmailEditor.xml generates them into
 * typings/ReactEmailEditorProps.d.ts. Spelling them out once keeps this file and
 * the generated props from drifting apart.
 */
export type TemplateActionArgs = { html__: Option<string>; json__: Option<string> };

export interface ToolbarProps {
    exportHTMLAction?: ActionValue<TemplateActionArgs>;
    saveTemplateAction?: ActionValue<TemplateActionArgs>;
    emailRef: React.RefObject<EditorRef | null>;
    isShowExportHtml: boolean;
    isShowSaveTemplate: boolean;
}

export function Toolbar({
    exportHTMLAction,
    saveTemplateAction,
    emailRef,
    isShowExportHtml,
    isShowSaveTemplate
}: ToolbarProps): ReactElement {
    const exportAction = (action: ActionValue<TemplateActionArgs>) => {
        const unlayer = emailRef.current?.editor;
        unlayer?.exportHtml((data: any) => {
            const { design, html } = data;

            if (action && action.canExecute && !action.isExecuting) {
                action.execute({
                    html__: html,
                    json__: JSON.stringify(design)
                });
            }
        });
    };

    return (
        <div className="spacing-inner-bottom-medium">
            {isShowExportHtml && exportHTMLAction && (
                <button className="btn mx-button btn-default" onClick={() => exportAction(exportHTMLAction)}>
                    Export HTML
                </button>
            )}

            {isShowSaveTemplate && saveTemplateAction && (
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
