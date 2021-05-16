import { AuthData } from "./../../models/Auth";

export type Credentials = {
  clientId: string;
  clientSecret: string;
};
export type ResponseTokenSuccess = AuthData;
export type ResponseTokenFailure = {
  errorDetails?: string;
  errorMessage: string;
  errorCode: string;
};
