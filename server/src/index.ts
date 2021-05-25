import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import {
  authorize,
  autoAuth,
  getAccount,
  getAccountList,
  getAggregatedTransactions,
  getTransactions,
  search,
} from "./controllers";
import { address, client, clientSecret, domain, port, tinkBaseUrl } from "./static";

if (!clientSecret) throw new Error("CLIENT SECRET NOT IN ENV");

const app = express();

app.use(express.json());

const allowedOrigins = [address, client, tinkBaseUrl, "https://autocomplete.clearbit.com"];

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

app.get("/api", (req, res) => {
  res.send(
    "available api: /api/search, /api/transactions, /api/account, /api/accounts, /api/authorize, ",
  );
});
app.post("/api/search", search);
app.get("/api/transactions", getTransactions);
app.get("/api/accounts", getAccountList);
app.get("/api/account", getAccount);
app.post("/api/authorize", authorize);
app.get("/api/autoAuth", autoAuth);
app.get("/api/aggregate", getAggregatedTransactions);
const buildDir = path.join(`${process.cwd()}/build`);

app.use(express.static(buildDir));
app.get("/*", function (req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

mongoose.connect(
  "mongodb://localhost:27017/tink-link",
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
