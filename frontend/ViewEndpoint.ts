import ViewEntity from "./ViewEntity";

async function _delete(id: number): Promise<void> {
  return undefined;
}
export { _delete as delete };

async function _get(id: number): Promise<ViewEntity | undefined> {
  return { id: id, age: 12, firstName: "John", lastName: "Doe" };
}
export { _get as get };

async function _list(): Promise<Array<ViewEntity>> {
  return [];
}
export { _list as list };

async function _update(entity: ViewEntity): Promise<ViewEntity> {
  return entity;
}
export { _update as update };
