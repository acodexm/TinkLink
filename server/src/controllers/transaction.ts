import { RequestHandler } from "express";

export const getTransaction: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};

export const getTransactions: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};
