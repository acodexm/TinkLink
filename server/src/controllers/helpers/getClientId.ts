export const getClientId = (authHeader?: string) => {
  if (authHeader?.startsWith("Basic")) {
    return authHeader.slice(6);
  }
};
