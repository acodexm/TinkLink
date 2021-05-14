import { RequestHandler } from "express";

export const authorize: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};
