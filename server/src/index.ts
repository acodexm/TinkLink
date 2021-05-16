import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { authorize, getAccount, getTransaction, getTransactions } from "./controllers";
import { address, client, domain, port, tinkBaseUrl } from "./static";

const app = express();

app.use(express.json());

const allowedOrigins = [client, tinkBaseUrl, "https://autocomplete.clearbit.com"];

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
