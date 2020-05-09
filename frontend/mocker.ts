import { StarterView } from "./StarterView";

const options = {
  firstName: [
    "Rowena",
    "Alvinia",
    "Leodora",
    "Karen",
    "Mariele",
    "Grata",
    "Donna",
    "Tommi",
    "Tonya",
    "Steffen",
    "Consalve",
    "Jeanelle",
    "Odelia",
    "Briano",
    "Tarrance",
    "Torrence",
    "Augie",
    "Marillin",
    "Jacquelyn",
    "Glenn",
    "Isidoro",
    "Cchaddie",
  ],
  lastName: [
    "Leeming",
    "Delong",
    "Burry",
    "Oaten",
    "Huke",
    "Widdowes",
    "Roadknight",
    "Nowland",
    "Teresia",
    "Yon",
    "Willes",
    "Lambertz",
    "Loker",
    "Shawell",
    "Mainston",
    "Gehring",
    "Pionter",
    "Aveson",
    "Moreby",
    "Bangley",
    "Glave",
    "Spatarul",
  ],
};

export enum MockDataType {
  FIRST_NAME,
  LAST_NAME,
  AGE,
}

const random = (options: string[]) => {
  const idx = Math.random() * options.length;
  return options[Math.floor(idx)];
};

const createValue = (type: MockDataType) => {
  if (type == MockDataType.FIRST_NAME) {
    return random(options.firstName);
  } else if (type == MockDataType.LAST_NAME) {
    return random(options.lastName);
  } else if (type == MockDataType.AGE) {
    return Math.ceil(Math.random() * 80) + 10;
  } else {
    throw "Unknown mockdata type: " + type;
  }
};
const createEntity = (metadata: any) => {
  const entity: any = {};
  Object.keys(metadata).forEach((field) => {
    const info = metadata[field];
    const value = createValue(info.mockdata);
    if (info.type == "String") {
      entity[field] = "" + value;
    } else if (info.type == "Integer") {
      entity[field] = Number(value);
    } else {
      throw "Unknown field type " + info.type;
    }
  });
  return entity;
};

const createMockData = (metadata: any) => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push(createEntity(metadata));
  }

  return data;
};

export const createMockEndpoint = (view: StarterView) => {
  let entities: any[] = [];
  return {
    list: async () => {
      if (entities.length == 0) {
        entities = createMockData(view.entityMetadata);
      }
      return entities;
    },
    update: async (entity: any) => {
      entities = entities.map((e) => (e.id == entity.id ? entity : e));
    },
    reset: () => {
      entities = [];
    },
  };
};
