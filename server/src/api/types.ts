export type ResponseError = {
  errorMessage: string;
  errorCode: number;
  errorKey?: string;
};
export type ValidResponse<T> = [T | undefined, ResponseError | undefined];
export type ValidResponsePromise<T> = Promise<ValidResponse<T>>;
