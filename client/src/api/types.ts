export type ApiVersion = `v${"1" | "2"}`;

export type Endpoint = `${"/guest" | ""}/channels/list` | "/user";
export type Pagination = {
  pageSize: number;
  pageToken?: string;
};
