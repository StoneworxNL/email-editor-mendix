/**
 * This file was generated from ReactEmailEditor.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, ListExpressionValue, ListValue, Option } from "mendix";
import { CSSProperties } from "react";

export type ThemeEnum = "modern_light" | "modern_dark" | "classic_light" | "classic_dark";

export type DisplayModeEnum = "email" | "web" | "popup" | "document";

export type PreviewDeviceEnum = "desktop" | "tablet" | "mobile";

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
    displayMode: DisplayModeEnum;
    locale?: DynamicValue<string>;
    editorVersion: string;
    scriptUrl: string;
    advancedOptions: string;
    isShowPreview: boolean;
    previewDevice: PreviewDeviceEnum;
    showPreviewCaption?: DynamicValue<string>;
    hidePreviewCaption?: DynamicValue<string>;
    isShowExportHtml: boolean;
    exportHtmlCaption?: DynamicValue<string>;
    exportHTMLAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
    isShowSaveTemplate: boolean;
    saveTemplateCaption?: DynamicValue<string>;
    saveTemplateAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
    onReadyAction?: ActionValue;
    onDesignLoadAction?: ActionValue;
    onDesignChangeAction?: ActionValue<{ html__: Option<string>; json__: Option<string> }>;
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
    displayMode: DisplayModeEnum;
    locale: string;
    editorVersion: string;
    scriptUrl: string;
    advancedOptions: string;
    isShowPreview: boolean;
    previewDevice: PreviewDeviceEnum;
    showPreviewCaption: string;
    hidePreviewCaption: string;
    isShowExportHtml: boolean;
    exportHtmlCaption: string;
    exportHTMLAction: {} | null;
    isShowSaveTemplate: boolean;
    saveTemplateCaption: string;
    saveTemplateAction: {} | null;
    onReadyAction: {} | null;
    onDesignLoadAction: {} | null;
    onDesignChangeAction: {} | null;
    mergeTags: {} | { caption: string } | { type: string } | null;
    mergeTagName: string;
    mergeTagValue: string;
    mergeTagSample: string;
    imageUploadMode: ImageUploadModeEnum;
    imageUploadUrl: string;
}
