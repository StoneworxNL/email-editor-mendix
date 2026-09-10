import React, { ReactElement, useRef, useEffect } from "react";
import { ActionValue, EditableValue } from "mendix";
import EmailEditor, { Editor, EditorRef, EmailEditorProps } from "react-email-editor";
import { Toolbar } from "./Toolbar";

export interface Props {
    JSONTemplate?: EditableValue<string>;
    exportHTMLAction?: ActionValue<{ html__: string; json__: string }>;
    saveTemplateAction?: ActionValue<{ html__: string; json__: string }>;
    isShowExportHtml: boolean;
    isShowSaveTemplate: boolean;
}

function loadJSONTemplate(JSONTemplate?: EditableValue<string>, unlayer?: Editor | null | undefined): void {
    if (!JSONTemplate || !JSONTemplate.displayValue || JSONTemplate.displayValue === "") return;
    else {
        unlayer && unlayer.loadDesign(JSON.parse(JSONTemplate.displayValue));
    }
}

export function EditorWrapper({
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction,
    isShowExportHtml,
    isShowSaveTemplate
}: Props): ReactElement {
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
            <Toolbar
                exportHTMLAction={exportHTMLAction}
                saveTemplateAction={saveTemplateAction}
                emailRef={emailEditorRef}
                isShowExportHtml={isShowExportHtml}
                isShowSaveTemplate={isShowSaveTemplate}
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
