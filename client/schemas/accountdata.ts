import { serialize } from "borsh";

/*
pub struct AccountData {
    pub field: u32,
}
*/
export type AccountDataProperties = {
  field: number;
};

export class AccountDataObject {
  constructor(properties: AccountDataProperties | undefined = undefined) {
    if (properties) {
      Object.keys(properties).forEach((key) => {
        this[key] = properties[key];
      });
    }
  }
}

export const AccountDataSchema = new Map([
  [AccountDataObject, { kind: "struct", fields: [["field", "u32"]] }],
]);

export const ACCOUNTDATA_SEED = "account_data_seed";
export const ACCOUNTDATA_SIZE = serialize(
  AccountDataSchema,
  new AccountDataObject()
).length;
