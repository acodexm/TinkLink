export type ApiVersion = `v${"1" | "2"}`;

export type Endpoint = `${"/guest" | ""}/channels/list` | "/user";
export type PaginationQuery = {
  pageSize: number;
  pageToken?: string;
};
export type ResponseError = {
  errorMessage: string;
  errorCode: number;
  errorKey?: string;
};
export type ValidResponse<T> = [T | undefined, ResponseError | undefined];
