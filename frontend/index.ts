import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router } from "@vaadin/router";
import { MockDataType } from "./mocker";

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
    path: "preview",
    component: "my-view",
    action: async (_context: any, _commands: any) => {
      await import("./my-view-preview");
      const view = _commands.component(_context.route.component);
      view.entityMetadata = meta;
      return view;
    },
  },
  {
    path: "final",
    component: "my-view",
    action: async (_context: any, _commands: any) => {
      await import("./my-view-final");
      const view = _commands.component(_context.route.component);
      view.entityMetadata = meta;
      return view;
    },
  },
  // fallback to server-side Flow routes if no client-side routes match
  ...serverSideRoutes,
];

const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
