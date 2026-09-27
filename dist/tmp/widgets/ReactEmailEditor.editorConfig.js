'use strict';

/**
 * Parse the "Advanced options (JSON)" property. Returns an error message instead
 * of throwing, so a typo in Studio Pro shows up as a message, not a dead page.
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function parseAdvancedOptions(json) {
  if (!json || !json.trim()) {
    return {
      options: {}
    };
  }
  try {
    var parsed = JSON.parse(json);
    if (!parsed || _typeof(parsed) !== "object" || Array.isArray(parsed)) {
      return {
        options: {},
        error: "Advanced options must be a JSON object."
      };
    }
    return {
      options: parsed
    };
  } catch (e) {
    return {
      options: {},
      error: "Advanced options are not valid JSON: ".concat(e.message)
    };
  }
}
function getProperties(_values, defaultProperties /* , target: Platform*/) {
  if (!_values.isShowExportHtml) {
    hideProperties(defaultProperties, ["exportHtmlCaption", "exportHTMLAction"]);
  }
  if (!_values.isShowSaveTemplate) {
    hideProperties(defaultProperties, ["saveTemplateCaption", "saveTemplateAction"]);
  }
  if (!_values.mergeTags) {
    hideProperties(defaultProperties, ["mergeTagName", "mergeTagValue", "mergeTagSample"]);
  }
  if (_values.imageUploadMode !== "endpoint") {
    hideProperties(defaultProperties, ["imageUploadUrl"]);
  }
  return defaultProperties;
}
function hideProperties(propertyGroups, keys) {
  propertyGroups.forEach(function (group) {
    if (group.properties) {
      group.properties = group.properties.filter(function (p) {
        return !keys.includes(p.key);
      });
    }
    if (group.propertyGroups) {
      hideProperties(group.propertyGroups, keys);
    }
  });
}
function check(_values) {
  var errors = [];
  var _parseAdvancedOptions = parseAdvancedOptions(_values.advancedOptions),
    error = _parseAdvancedOptions.error;
  if (error) {
    errors.push({
      property: "advancedOptions",
      message: error
    });
  }
  if (_values.imageUploadMode === "endpoint" && !_values.imageUploadUrl.trim()) {
    errors.push({
      property: "imageUploadUrl",
      message: "Set the URL that receives uploaded images."
    });
  }
  if (_values.mergeTags) {
    if (!_values.mergeTagName) {
      errors.push({
        property: "mergeTagName",
        message: "Set the name of the merge tags."
      });
    }
    if (!_values.mergeTagValue) {
      errors.push({
        property: "mergeTagValue",
        message: "Set the value of the merge tags."
      });
    }
  }
  if (_values.projectId !== null && _values.projectId < 0) {
    errors.push({
      property: "projectId",
      message: "The Unlayer project ID cannot be negative."
    });
  }
  if (_values.isShowExportHtml && !_values.exportHTMLAction) {
    errors.push({
      property: "exportHTMLAction",
      severity: "warning",
      message: "The Export HTML button is only shown when an action is set."
    });
  }
  if (_values.isShowSaveTemplate && !_values.saveTemplateAction) {
    errors.push({
      property: "saveTemplateAction",
      severity: "warning",
      message: "The Save Template button is only shown when an action is set."
    });
  }
  return errors;
}
// export function getPreview(values: ReactEmailEditorPreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }
// export function getCustomCaption(values: ReactEmailEditorPreviewProps, platform: Platform): string {
//     return "ReactEmailEditor";
// }

exports.check = check;
exports.getProperties = getProperties;
