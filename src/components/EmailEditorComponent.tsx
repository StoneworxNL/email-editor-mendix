// import { ReactElement, createElement } from "react";
import { ReactElement, useRef, createElement, /*useState,*/ useEffect } from "react";
import { ActionValue, EditableValue } from "mendix";
import EmailEditor, { Editor, EditorRef, EmailEditorProps } from "react-email-editor";
import { TopToolbar } from "./TopToolbar";
// import "../ui/ReactEmailEditor.css";

export interface EmailEditorSampleProps {
    HTMLBody?: EditableValue<string>;
    JSONTemplate?: EditableValue<string>;
    exportHTMLAction?: ActionValue;
    saveTemplateAction?: ActionValue;
}

function loadJSONTemplate(JSONTemplate?: EditableValue<string>, unlayer?: Editor | null | undefined): void {
    if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") return;
    else {
        unlayer && unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    }
}

export function EmailEditorComponent({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction
}: EmailEditorSampleProps): ReactElement {
    const emailEditorRef = useRef<EditorRef>(null);

    useEffect(() => {
        const unlayer = emailEditorRef.current?.editor;
        loadJSONTemplate(JSONTemplate, unlayer);
    }, [JSONTemplate]);

    const onReady: EmailEditorProps["onReady"] = unlayer => {
        loadJSONTemplate(JSONTemplate, unlayer);
    };

    return (
        <div className="react-email-editor-div">
            <TopToolbar
                HTMLBody={HTMLBody}
                JSONTemplate={JSONTemplate}
                exportHTMLAction={exportHTMLAction}
                saveTemplateAction={saveTemplateAction}
                emailRef={emailEditorRef}
            />

            <EmailEditor
                ref={emailEditorRef}
                onReady={onReady}
                // projectId={projectId}
                // minHeight="100vh"
                options={{
                    appearance: {
                        theme: "modern_light"
                    }
                }}
            />
        </div>
    );
}
