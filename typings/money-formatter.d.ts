declare module "money-formatter" {
  export function format(
    currencyCode: string,
    amount: number,
    fractionSize?: number,
    useAlphaCode?: boolean,
  ): string;
}
