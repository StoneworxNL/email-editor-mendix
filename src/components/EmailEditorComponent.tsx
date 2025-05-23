// import { ReactElement, createElement } from "react";
import { ReactElement, useRef, createElement, /*useState,*/ useEffect } from "react";
import { ActionValue, EditableValue } from "mendix";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import "../ui/ReactEmailEditor.css"

export interface EmailEditorSampleProps {
    HTMLBody?: EditableValue<string>;
    JSONTemplate?: EditableValue<string>;
    exportHTMLAction?: ActionValue;
    saveTemplateAction?: ActionValue;
}

export function EmailEditorComponent({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction /*, saveTemplateAction*/
}: EmailEditorSampleProps): ReactElement {

    const emailEditorRef = useRef<EditorRef>(null);
    // const [JSONDesign, setJSONDesign] = useState(JSONTemplate);

    useEffect(() => {
        const unlayer = emailEditorRef.current?.editor;
        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") 
            return;
        if (unlayer)
            unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    }, [JSONTemplate]);

    const onReady: EmailEditorProps["onReady"] = unlayer => {
        // editor is ready
        // you can load your template here;
        // the design json can be obtained by calling
        // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
        if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") 
            return;

        unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    };

    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.exportHtml(data => {
            const { design, html } = data;

            // ActionValue is used to represent actions, like the On click property of an action button. For any action except Do nothing, your component will receive a value adhering to the following interface. For Do nothing it will receive undefined. The ActionValue prop appears like this:
            if (exportHTMLAction && exportHTMLAction.canExecute && !exportHTMLAction.isExecuting) {
                if (HTMLBody && HTMLBody.status === "available") {
                    HTMLBody.setValue(html);
                    if (JSONTemplate && JSONTemplate.status === "available")
                        JSONTemplate.setValue(JSON.stringify(design));
                    exportHTMLAction.execute();
                }
            }
        });
    };

    // const saveDesign = () => {
    //     const unlayer = emailEditorRef.current?.editor;

    //     unlayer?.saveDesign(design => {
    //         console.log('saveDesign', design);
    //         alert('Design JSON has been logged in your developer console.');
    //     });
    // };

    return (
        <div className="react-email-editor-div">
            <div className="spacing-inner-bottom-medium">
                <button className="btn mx-button btn-default" onClick={exportHtml}>
                    Export HTML
                </button>
            </div>

            <EmailEditor ref={emailEditorRef} onReady={onReady} />
        </div>
    );
}
