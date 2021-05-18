import mongoose, { Document } from "mongoose";

export type AccountData = TinkLinkApi.Accounts;

const AccountSchema = new mongoose.Schema({
  account: Object,
});

interface AccountModel extends Document {
  account: AccountData;
  accountId: string;
}

export const Accounts = mongoose.model<AccountModel>("accounts", AccountSchema);
