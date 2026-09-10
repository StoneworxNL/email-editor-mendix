import React, { ReactElement } from "react";
import { EditorWrapper } from "./components/EditorWrapper";

import { ReactEmailEditorContainerProps } from "../typings/ReactEmailEditorProps";

import "./ui/ReactEmailEditor.css";

export function ReactEmailEditor({
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction,
    isShowExportHtml,
    isShowSaveTemplate
}: ReactEmailEditorContainerProps): ReactElement {
    return (
        <EditorWrapper
            JSONTemplate={JSONTemplate}
            exportHTMLAction={exportHTMLAction}
            saveTemplateAction={saveTemplateAction}
            isShowExportHtml={isShowExportHtml}
            isShowSaveTemplate={isShowSaveTemplate}
        />
    );
}
