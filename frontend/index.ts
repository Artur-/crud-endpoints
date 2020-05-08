import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import { MockDataType } from "./mocker";
import "./my-view.src";

const meta = {
  firstName: { type: "String", mockdata: MockDataType.FIRST_NAME },
  lastName: { type: "String", mockdata: MockDataType.LAST_NAME },
  age: { type: "Integer", mockdata: MockDataType.AGE },
};

const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports"),
});

const routes = [
  {
    path: "",
    component: "my-view",
    action: (_context: any, _commands: any) => {
      const view = _commands.component(_context.route.component);
      view._entityMetadata = meta;
      return view;
    },
  },
  // fallback to server-side Flow routes if no client-side routes match
  ...serverSideRoutes,
];

const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
