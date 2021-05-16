import dotenv from "dotenv";
dotenv.config();

export const domain = process.env.DOMAIN || "localhost";
export const port = process.env.PORT ? Number(process.env.PORT) : 8080;
export const address = `http://${domain}:${port}`;
export const client = `http://${domain}:3000`;
export const tinkBaseUrl = process.env.TINK_BASE || "https://api.tink.se";
