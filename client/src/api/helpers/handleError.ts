import paths from "../../const/paths";
import { ValidResponse } from "./types";

export const handleError = <T>(response: ValidResponse<T>) => {
  const [data, error] = response;

  if (error) {
    switch (error.errorCode) {
      case 401: {
        window.location.replace(paths.Auth);
        return;
      }
      case 403: {
        console.error(error);
        return;
      }
      case 404: {
        console.error(error);
        return;
      }
      case 400: {
        console.error(error);
        return;
      }
      default: {
        console.error(error);
        return;
      }
    }
  }

  return data;
};
