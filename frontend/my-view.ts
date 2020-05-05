import { css, customElement, html, LitElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import Person from "./generated/com/example/app/data/Person";
import * as PersonEndpoint from "./generated/PersonEndpoint";

@customElement("my-view")
export class MyView extends LitElement {
  @property({ type: Array })
  items: Person[] = [];

  static get styles() {
    return css``;
  }
  render() {
    return html`
      <div>
        ${repeat(
          this.items,
          (item) => item.id,
          (item) =>
            html` <div>
              ${item.firstName} ${item.lastName} is ${item.age} year(s) old
              <button @click="${() => this.age(item)}">Age</button>
            </div>`
        )}
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();

    this.items = await PersonEndpoint.list();
  }
  async age(person: Person) {
    person.age++;
    await PersonEndpoint.update(person);
    this.items = this.items.map((p) => (p.id == person.id ? person : p));
  }
}
