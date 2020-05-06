import { createMockEndpoint, MockDataType } from "./mocker";
import { css, customElement, html, LitElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";

import Entity from "./generated/com/example/app/data/entity/Person";
import * as Endpoint from "./generated/PersonEndpoint";

// const Endpoint = createMockEndpoint(EntityMetadata);

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
          (item) => html`${generateDiv(item, this)}`
        )}
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();

    this.items = await Endpoint.list();
  }
  async age(person: Entity) {
    person.age++;
    await Endpoint.update(person);
    this.items = this.items.map((p) => (p.id == person.id ? person : p));
  }
}
