import { LitElement } from "lit-element";
import { directive, html, Part } from "lit-html";

export const generateDiv = directive(
  (entity: any, view: LitElement) => (part: Part) => {
    const metadata = (view as any)._entityMetadata;
    if (metadata) {
      const contents = Object.keys(metadata).map((fieldName) => {
        return html`<span>${entity[fieldName]}</span> `;
      });

      part.setValue(html`<div>${contents}</div>`);
    }
  }
);
