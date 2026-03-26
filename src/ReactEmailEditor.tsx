import React, { ReactElement } from "react";
import { EditorWrapper } from "./components/EditorWrapper";

import { ReactEmailEditorContainerProps } from "../typings/ReactEmailEditorProps";

import "./ui/ReactEmailEditor.css";

export function ReactEmailEditor({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction
}: ReactEmailEditorContainerProps): ReactElement {
    return (
        <EditorWrapper
            HTMLBody={HTMLBody}
            JSONTemplate={JSONTemplate}
            exportHTMLAction={exportHTMLAction}
            saveTemplateAction={saveTemplateAction}
        />
    );
}
