import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { authorize, getAccount, getTransaction, getTransactions } from "./controllers";

dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const domain = process.env.DOMAIN || "localhost";
const address = `http://${domain}:${port}`;
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://api.tink.se",
  "https://autocomplete.clearbit.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  }),
);

app.get("/", (req, res) => {
  res.send(
    "available api: /api/transactions, /api/transaction/{id}, /api/account, /api/authorize, ",
  );
});
app.get("/api/transactions", getTransactions);
app.get("/api/transaction/{id}", getTransaction);
app.get("/api/account", getAccount);
app.post("/api/authorize", authorize);

mongoose.connect(
  "mongodb://localhost:27017/hn-jobs",
  {
    useNewUrlParser: true,
  },
  () => {
    console.info("connected to database");
  },
);

app.listen(port, domain, () => {
  console.info(">>> 🌎 Open %s/ in your browser.", address);
});
