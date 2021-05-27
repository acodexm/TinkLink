import { Response } from "express";

import { ResponseError } from "../../api/types";

export const sendError = (res: Response, error: ResponseError) => {
  return res.status(error.errorCode).json(error);
};
