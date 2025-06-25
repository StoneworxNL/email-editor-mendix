// import { ReactElement, createElement } from "react";
import { ReactElement, useRef, createElement, /*useState,*/ useEffect } from "react";
import { ActionValue, EditableValue } from "mendix";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import "../ui/ReactEmailEditor.css";

export interface EmailEditorSampleProps {
    HTMLBody?: EditableValue<string>;
    JSONTemplate?: EditableValue<string>;
    exportHTMLAction?: ActionValue;
    saveTemplateAction?: ActionValue;
}

export function EmailEditorComponent({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction
}: EmailEditorSampleProps): ReactElement {
    const emailEditorRef = useRef<EditorRef>(null);
    // const [JSONDesign, setJSONDesign] = useState(JSONTemplate);

    useEffect(() => {
        const unlayer = emailEditorRef.current?.editor;
        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") return;
        if (unlayer) unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    }, [JSONTemplate]);

    const onReady: EmailEditorProps["onReady"] = unlayer => {
        // editor is ready
        // you can load your template here;
        // the design json can be obtained by calling
        // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") return;

        unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    };

    const exportAction = (action: ActionValue) => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.exportHtml(data => {
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
        <div className="react-email-editor-div">
            <div className="spacing-inner-bottom-medium">
                {exportHTMLAction && (
                    <button className="btn mx-button btn-default" onClick={() => exportAction(exportHTMLAction)}>
                        Export HTML
                    </button>
                )}

                {saveTemplateAction && (
                    <button className="btn mx-button btn-default spacing-outer-left-medium" onClick={() => exportAction(saveTemplateAction)}>
                        Save Template
                    </button>
                )}
            </div>

            <EmailEditor ref={emailEditorRef} onReady={onReady} />
        </div>
    );
}
