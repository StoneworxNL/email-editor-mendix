/**
 * This file was generated from ReactEmailEditor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, Option, ListExpressionValue } from "mendix";

export type ThemeEnum = "modern_light" | "modern_dark" | "classic_light" | "classic_dark";

export type ImageUploadModeEnum = "unlayer" | "endpoint" | "disabled";

export interface ReactEmailEditorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    JSONTemplate: EditableValue<string>;
    HTMLBody?: EditableValue<string>;
    saveOnChange: boolean;
    projectId: number;
    editorHeight: string;
    theme: ThemeEnum;
    locale?: DynamicValue<string>;
    advancedOptions: string;
    isShowExportHtml: boolean;
    exportHtmlCaption?: DynamicValue<string>;
    exportHTMLAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
    isShowSaveTemplate: boolean;
    saveTemplateCaption?: DynamicValue<string>;
    saveTemplateAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
    mergeTags?: ListValue;
    mergeTagName?: ListExpressionValue<string>;
    mergeTagValue?: ListExpressionValue<string>;
    mergeTagSample?: ListExpressionValue<string>;
    imageUploadMode: ImageUploadModeEnum;
    imageUploadUrl: string;
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
    HTMLBody: string;
    saveOnChange: boolean;
    projectId: number | null;
    editorHeight: string;
    theme: ThemeEnum;
    locale: string;
    advancedOptions: string;
    isShowExportHtml: boolean;
    exportHtmlCaption: string;
    exportHTMLAction: {} | null;
    isShowSaveTemplate: boolean;
    saveTemplateCaption: string;
    saveTemplateAction: {} | null;
    mergeTags: {} | { caption: string } | { type: string } | null;
    mergeTagName: string;
    mergeTagValue: string;
    mergeTagSample: string;
    imageUploadMode: ImageUploadModeEnum;
    imageUploadUrl: string;
}
