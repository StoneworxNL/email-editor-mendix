/**
 * This file was generated from ReactEmailEditor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface ReactEmailEditorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    HTMLBody: EditableValue<string>;
    JSONTemplate: EditableValue<string>;
    exportHTMLAction?: ActionValue;
    saveTemplateAction?: ActionValue;
}

export interface ReactEmailEditorPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    HTMLBody: string;
    JSONTemplate: string;
    exportHTMLAction: {} | null;
    saveTemplateAction: {} | null;
}
