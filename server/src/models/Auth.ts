import mongoose, { Document } from "mongoose";

export type AuthData = V1.Auth.Response;
export interface AuthModel extends Document {
  clientId: string;
  token: AuthData;
  timestamp: Date;
}

const AuthSchema = new mongoose.Schema({
  clientId: String,
  token: Object,
  timestamp: Date,
});

export const Auth = mongoose.model<AuthModel>("auth", AuthSchema);
