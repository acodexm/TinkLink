export type ResponseError = {
  errorMessage: string;
  errorCode: number;
  errorKey?: string;
};
export type ValidResponse<T> = Promise<[T | undefined, ResponseError | undefined]>;
