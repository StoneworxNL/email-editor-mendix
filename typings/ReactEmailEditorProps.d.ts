/**
 * This file was generated from ReactEmailEditor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, Option } from "mendix";

export interface ReactEmailEditorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    JSONTemplate: EditableValue<string>;
    isShowExportHtml: boolean;
    isShowSaveTemplate: boolean;
    exportHTMLAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
    saveTemplateAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
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
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    JSONTemplate: string;
    isShowExportHtml: boolean;
    isShowSaveTemplate: boolean;
    exportHTMLAction: {} | null;
    saveTemplateAction: {} | null;
}
