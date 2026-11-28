import { CSSProperties, ReactElement } from "react";
import classNames from "classnames";

import { ReactEmailEditorPreviewProps } from "../typings/ReactEmailEditorProps";

const placeholderStyle: CSSProperties = {
    alignItems: "center",
    background: "#f9f9f9",
    border: "1px dashed #c4c7cc",
    color: "#6c717e",
    display: "flex",
    fontSize: 13,
    justifyContent: "center"
};

/**
 * Studio Pro design mode: the toolbar as configured above a placeholder for the
 * editor. Unlayer itself only loads in the running app.
 */
export function preview(props: ReactEmailEditorPreviewProps): ReactElement {
    const buttons = [
        props.isShowPreview ? props.showPreviewCaption || "Show Preview" : null,
        props.isShowExportHtml && props.exportHTMLAction ? props.exportHtmlCaption || "Export HTML" : null,
        props.isShowSaveTemplate && props.saveTemplateAction ? props.saveTemplateCaption || "Save Template" : null
    ].filter((caption): caption is string => caption !== null);
    const height = /^\d+px$/.test(props.editorHeight) ? props.editorHeight : "700px";

    return (
        <div className={classNames("react-email-editor-div", props.class)} style={props.styleObject}>
            {buttons.length > 0 && (
                <div className="react-email-editor-toolbar spacing-inner-bottom-medium">
                    {buttons.map(caption => (
                        <button key={caption} type="button" className="btn mx-button btn-default" disabled>
                            {caption}
                        </button>
                    ))}
                </div>
            )}
            <div style={{ ...placeholderStyle, minHeight: `min(${height}, 400px)` }}>
                Unlayer email editor ({props.displayMode}, {props.theme.replace("_", " ")})
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactEmailEditor.css");
}
