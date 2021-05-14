import mongoose, { Document } from "mongoose";

type TransactionData = {
  //todo
};
type AccountData = {
  //todo
};
export interface Account extends Document {
  transactions: TransactionData[];
  account: AccountData;
  accountId: string;
}
export interface Auth extends Document {
  token: string;
  clientId: string;
}

const Schema = new mongoose.Schema({ transactions: Array, account: Object, accountId: String });
const Account = mongoose.model<Account>("account", Schema);
const Authorize = mongoose.model<Auth>("auth", Schema);

export { Account, Authorize };
