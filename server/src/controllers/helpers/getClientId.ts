export const getClientId = (authHeader?: string) => {
  if (authHeader?.startsWith("Bearer")) {
    return authHeader.slice(7);
  }
};
