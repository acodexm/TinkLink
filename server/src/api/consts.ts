export const v1 = "/api/v1";
export const v2 = "/data/v2";
export const encodedCT = "application/x-www-form-urlencoded;charset=UTF-8";
export const genericError = {
  errorCode: 500,
  errorKey: "error.unexpected",
  errorMessage: "Unhandled error",
};
export const dataNotFound = {
  errorCode: 404,
  errorKey: "data.not.found",
  errorMessage: "Data not found",
};
export const clientUnauthorized = {
  errorCode: 401,
  errorKey: "client.not.authorized",
  errorMessage: "Client is unauthorized",
};
export const noClientIdError = {
  errorCode: 400,
  errorKey: "client.not.authorized",
  errorMessage: "Unauthorized, no clientId found",
};
