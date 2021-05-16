import mongoose, { Document } from "mongoose";

export type AuthData = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  scope: string;
  id_hint: string;
};

export interface AuthModel extends Document {
  clientId: string;
  token: AuthData;
  timestamp: Date;
}

const AuthSchema = new mongoose.Schema({ clientId: String, token: Object, timestamp: Date });

export const Auth = mongoose.model<AuthModel>("auth", AuthSchema);
