import { RequestHandler } from "express";

export const getAccount: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};
