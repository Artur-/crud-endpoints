"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var lit_html_1 = require("lit-html");
var camelCaseToHumanReadable = function (camelCase) {
    return camelCase;
};
exports.generateDiv = lit_html_1.directive(function (entity, metadata) { return function (part) {
    var contents = Object.keys(metadata).map(function (fieldName) {
        return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<span>", "</span> "], ["<span>", "</span> "])), entity[fieldName]);
    });
    part.setValue(lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), contents));
}; });
exports.generateDivCode = function (propertyName, metadata) {
    var content = Object.keys(metadata).map(function (fieldName) {
        return "<span>${" + propertyName + "." + fieldName + "}</span>";
    });
    return "<div>" + content.join("") + "</div>";
};
exports.generateGridColumns = lit_html_1.directive(function (metadata) { return function (part) {
    var content = Object.keys(metadata).map(function (fieldName) {
        return lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject([" <vaadin-grid-column\n        path=\"", "\"\n        header=\"", "\"\n      ></vaadin-grid-column>"], [" <vaadin-grid-column\n        path=\"", "\"\n        header=\"", "\"\n      ></vaadin-grid-column>"])), fieldName, camelCaseToHumanReadable(fieldName));
    });
    part.setValue(lit_html_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", ""], ["", ""])), content));
}; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
/*
export const generateFormColumns = directive(
  (metadata: any, entity: any) => (part: Part) => {
    const content = Object.keys(metadata).map((fieldName) => {
      return html`<vaadin-form-item>
        <label slot="label">${camelCaseToHumanReadable(fieldName)}</label>
        <vaadin-text-field
          class="full-width"
          value="${this.firstName}"
        ></vaadin-text-field>
      </vaadin-form-item> `;
    });

    part.setValue(html`${content}`);
  }
);
*/
