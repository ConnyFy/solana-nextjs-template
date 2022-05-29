/*
pub struct State {
    pub field: String,
}
*/
export type StateProperties = {
  field: string;
};

export class StateObject {
  field = "";
  constructor(properties: StateProperties | undefined = undefined) {
    if (properties) {
      (Object.keys(properties) as (keyof StateProperties)[]).forEach((key) => {
        this[key] = properties[key];
      });
    }
  }
}

export const StateSchema = new Map([
  [StateObject, { kind: "struct", fields: [["field", "string"]] }],
]);
