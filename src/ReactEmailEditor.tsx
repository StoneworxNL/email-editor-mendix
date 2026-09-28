import React, { ReactElement } from "react";
import { EditorWrapper } from "./components/EditorWrapper";

import { ReactEmailEditorContainerProps } from "../typings/ReactEmailEditorProps";

import "./ui/ReactEmailEditor.css";

export function ReactEmailEditor(props: ReactEmailEditorContainerProps): ReactElement {
    return <EditorWrapper {...props} />;
}
