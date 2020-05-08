import { css, customElement, html, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { generateDiv } from "./generator";
import { Entity, PreviewElement } from "./PreviewElement";

@customElement("my-view")
export class MyView extends PreviewElement {
  @property({ type: Array })
  items: Entity[] = [];

  static get styles() {
    return css``;
  }
  render() {
    return html`
      <div>
        ${repeat(
          this.items,
          (item) => item.id,
          (item) => html`${generateDiv(item, this.entityMetadata)}`
        )}
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();

    this.items = await this.Endpoint.list();
  }
}
