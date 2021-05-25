export const clientId = process.env.REACT_APP_TINK_CLIENT_ID;
export const isDev = process.env.NODE_ENV === "development";
export const serverPort = process.env.REACT_APP_SERVER_PORT || 8080;
export const serverDomain = process.env.REACT_APP_SERVER_DOMAIN || "localhost";
export const redirectUri = `http://${serverDomain}:${isDev ? serverPort : 3000}/callback`;
