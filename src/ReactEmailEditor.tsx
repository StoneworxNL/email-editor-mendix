import { ReactElement, createElement } from "react";
import { EmailEditorComponent } from "./components/EmailEditorComponent";

import { ReactEmailEditorContainerProps } from "../typings/ReactEmailEditorProps";

import "./ui/ReactEmailEditor.css";

export function ReactEmailEditor({
    HTMLBody,
    JSONTemplate,
    exportHTMLAction,
    saveTemplateAction
}: ReactEmailEditorContainerProps): ReactElement {
    return (
        <EmailEditorComponent
            HTMLBody={HTMLBody}
            JSONTemplate={JSONTemplate}
            exportHTMLAction={exportHTMLAction}
            saveTemplateAction={saveTemplateAction}
        />
    );
}
