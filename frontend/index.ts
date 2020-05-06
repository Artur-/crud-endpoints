import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import "./my-view";
import { MockDataType } from "./mocker";

const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports"),
});

const routes = [
  { component: "my-view", path: "" },
  // fallback to server-side Flow routes if no client-side routes match
  ...serverSideRoutes,
];

window.addEventListener("vaadin-router-location-changed", (e) => {
  const meta = {
    firstName: { type: "String", mockdata: MockDataType.FIRST_NAME },
    lastName: { type: "String", mockdata: MockDataType.LAST_NAME },
    age: { type: "Integer", mockdata: MockDataType.AGE },
  };
  debugger;
});
const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
