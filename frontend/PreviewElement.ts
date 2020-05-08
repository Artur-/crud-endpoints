import { LitElement, property } from "lit-element";
import { createMockEndpoint } from "./mocker";

export type Entity = any;

/* Element only used inside the wizard preview */
export class PreviewElement extends LitElement {
  @property({ type: Object })
  _entityMetadata: any;

  Endpoint: any = createMockEndpoint(this);

  set entityMetadata(entityMetadata: any) {
    this._entityMetadata = entityMetadata;
    this.Endpoint.reset();
  }
  get entityMetadata() {
    return this._entityMetadata;
  }
}
