export const v1 = "/api/v1";
export const v2 = "/data/v2";
export const encodedCT = "application/x-www-form-urlencoded;charset=UTF-8";
export const genericError = { errorCode: "error.unexpected", message: "Unhandled error" };
export const noClientIdError = {
  errorCode: "client.not.authorized",
  errorMessage: "Unauthorized, no clientId found",
};
