import { AuthData } from "../models/Auth";

export type ResponseTokenSuccess = AuthData;
export type ResponseTokenFailure = {
  errorDetails?: string;
  errorMessage: string;
  errorCode: string;
};
