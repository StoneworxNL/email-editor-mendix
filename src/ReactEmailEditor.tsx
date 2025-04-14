import { ReactElement, createElement } from "react";
import { EmailEditorReact } from "./components/EmailEditorReact";

import { ReactEmailEditorContainerProps } from "../typings/ReactEmailEditorProps";

import "./ui/ReactEmailEditor.css";

export function ReactEmailEditor({ HTMLBody, JSONTemplate, exportHTMLAction, saveTemplateAction }: ReactEmailEditorContainerProps): ReactElement {
    return <EmailEditorReact 
        HTMLBody={HTMLBody}
        JSONTemplate={JSONTemplate}
        exportHTMLAction={exportHTMLAction}
        saveTemplateAction={saveTemplateAction} />;
}
