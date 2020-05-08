import { directive, html, Part } from "lit-html";

const camelCaseToHumanReadable = (camelCase: string): string => {
  return camelCase;
};

export const generateDiv = directive(
  (entity: any, metadata: any) => (part: Part) => {
    const contents = Object.keys(metadata).map((fieldName) => {
      return html`<span>${entity[fieldName]}</span> `;
    });

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

export const generateGridColumns = directive(
  (metadata: any) => (part: Part) => {
    const content = Object.keys(metadata).map((fieldName) => {
      return html` <vaadin-grid-column
        path="${fieldName}"
        header="${camelCaseToHumanReadable(fieldName)}"
      ></vaadin-grid-column>`;
    });

    part.setValue(html`${content}`);
  }
);
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
