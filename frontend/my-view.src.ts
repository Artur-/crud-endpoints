import { css, customElement, html, LitElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import Entity from "./ViewEntity";
import * as Endpoint from "./ViewEndpoint";

import { generateDiv } from "./generator";

@customElement("my-view")
export class MyView extends LitElement {
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
          (item) => html`${generateDiv(item, (this as any)._entityMetadata)}`
        )}
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();

    this.items = await Endpoint.list();
  }
}
