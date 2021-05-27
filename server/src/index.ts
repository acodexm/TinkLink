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
import { address, clientSecret, domain, mongoAddress, port, tinkBaseUrl } from "./static";

if (!clientSecret) throw new Error("CLIENT SECRET NOT IN ENV");

const app = express();

app.use(express.json());

const allowedOrigins = [
  address,
  tinkBaseUrl,
  "https://autocomplete.clearbit.com",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://0.0.0.0:3000",
  "http://0.0.0.0:8080",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg = `The CORS policy for this site does not allow access from the ${origin}`;

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  }),
);

app.post("/api/authorize", authorize);
app.post("/api/search", search);

app.get("/api/transactions", getTransactions);
app.get("/api/accounts", getAccountList);
app.get("/api/account", getAccount);
app.get("/api/autoAuth", autoAuth);
app.get("/api/aggregate", getAggregatedTransactions);
app.get("/api", (req, res) => {
  res.send(
    `available api: ${[
      "/api/authorize",
      "/api/search",
      "/api/transactions",
      "/api/accounts",
      "/api/account",
      "/api/autoAuth",
      "/api/aggregate",
    ].join(", ")}`,
  );
});
const buildDir = path.join(`${process.cwd()}/build`);

app.use(express.static(buildDir));
app.get("*", function (req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

mongoose.connect(
  mongoAddress,
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
