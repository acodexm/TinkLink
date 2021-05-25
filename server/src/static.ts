import dotenv from "dotenv";
dotenv.config();

export const clientSecret = process.env.TINK_CLIENT_SECRET;
export const domain = process.env.DOMAIN || "localhost";
export const port = process.env.PORT ? Number(process.env.PORT) : 8080;
export const address = `http://${domain}:${port}`;
export const tinkBaseUrl = process.env.TINK_BASE || "https://api.tink.com";
export const mongoAddress = process.env.MONGO_URL || `mongodb://${domain}:27017/tink-link`;
