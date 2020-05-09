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
    var contents = [lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])))];
    if (metadata) {
        contents = Object.keys(metadata).map(function (fieldName) {
            return lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<span>", "</span> "], ["<span>", "</span> "])), entity[fieldName]);
        });
    }
    part.setValue(lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<div>", "</div>"], ["<div>", "</div>"])), contents));
}; });
exports.generateDivCode = function (propertyName, metadata) {
    var content = Object.keys(metadata).map(function (fieldName) {
        return "<span>${" + propertyName + "." + fieldName + "}</span>";
    });
    return "<div>" + content.join("") + "</div>";
};
exports.generateTableRows = lit_html_1.directive(function (entity, metadata) { return function (part) {
    var contents = [lit_html_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])))];
    if (metadata) {
        contents = Object.keys(metadata).map(function (fieldName) {
            return lit_html_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<td>", "</td> "], ["<td>", "</td> "])), entity[fieldName]);
        });
    }
    part.setValue(lit_html_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<tr>\n        ", "\n      </tr>"], ["<tr>\n        ", "\n      </tr>"])), contents));
}; });
exports.generateTableRowsCode = function (propertyName, metadata) {
    var content = Object.keys(metadata).map(function (fieldName) {
        return "<td>${" + propertyName + "." + fieldName + "}</td>";
    });
    return "<tr>" + content.join("") + "</tr>";
};
exports.generateTableHeaders = lit_html_1.directive(function (metadata) { return function (part) {
    var contents = [lit_html_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject([""], [""])))];
    if (metadata) {
        contents = Object.keys(metadata).map(function (fieldName) {
            return lit_html_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<th>", "</th> "], ["<th>", "</th> "])), camelCaseToHumanReadable(fieldName));
        });
    }
    part.setValue(lit_html_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<tr>\n        ", "\n      </tr>"], ["<tr>\n        ", "\n      </tr>"])), contents));
}; });
exports.generateTableHeadersCode = function (metadata) {
    var content = Object.keys(metadata).map(function (fieldName) {
        return "<th>" + fieldName + "</th>";
    });
    return "<tr>" + content.join("") + "</tr>";
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
