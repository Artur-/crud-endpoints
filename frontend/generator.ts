import { directive, html, Part } from "lit-html";

const camelCaseToHumanReadable = (camelCase: string): string => {
  return camelCase;
};

export const generateDiv = directive(
  (entity: any, metadata: any) => (part: Part) => {
    let contents = [html``];
    if (metadata) {
      contents = Object.keys(metadata).map((fieldName) => {
        return html`<span>${entity[fieldName]}</span> `;
      });
    }
    part.setValue(html`<div>${contents}</div>`);
  }
);

export const generateDivCode = (
  propertyName: string,
  metadata: any
): string => {
  const content = Object.keys(metadata).map((fieldName) => {
    return "<span>${" + propertyName + "." + fieldName + "}</span>";
  });

  return `<div>${content.join("")}</div>`;
};
export const generateTableRows = directive(
  (entity: any, metadata: any) => (part: Part) => {
    let contents = [html``];
    if (metadata) {
      contents = Object.keys(metadata).map((fieldName) => {
        return html`<td>${entity[fieldName]}</td> `;
      });
    }
    part.setValue(
      html`<tr>
        ${contents}
      </tr>`
    );
  }
);

export const generateTableRowsCode = (
  propertyName: string,
  metadata: any
): string => {
  const content = Object.keys(metadata).map((fieldName) => {
    return "<td>${" + propertyName + "." + fieldName + "}</td>";
  });

  return `<tr>${content.join("")}</tr>`;
};
export const generateTableHeaders = directive(
  (metadata: any) => (part: Part) => {
    let contents = [html``];
    if (metadata) {
      contents = Object.keys(metadata).map((fieldName) => {
        return html`<th>${camelCaseToHumanReadable(fieldName)}</th> `;
      });
    }
    part.setValue(
      html`<tr>
        ${contents}
      </tr>`
    );
  }
);

export const generateTableHeadersCode = (metadata: any): string => {
  const content = Object.keys(metadata).map((fieldName) => {
    return "<th>" + fieldName + "</th>";
  });

  return `<tr>${content.join("")}</tr>`;
};
