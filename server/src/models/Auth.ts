import mongoose, { Document } from "mongoose";

export type AuthData = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  scope: string;
  id_hint: string;
};

interface Auth extends Document {
  clientId: string;
  token: AuthData;
}

const AuthSchema = new mongoose.Schema({ auth: Object });

export const Authorize = mongoose.model<Auth>("auth", AuthSchema);
