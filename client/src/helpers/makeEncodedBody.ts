export const makeEncodedBody = (
  obj: Record<string, string | number | boolean>,
): string =>
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
