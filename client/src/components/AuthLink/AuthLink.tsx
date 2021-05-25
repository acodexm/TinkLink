import qs from "qs";
import React from "react";

import { clientId, redirectUri } from "../../const/static";
import { Link } from "../StyledComponents/Link";

const scopeData = [
  // "account-verification-reports:read",
  // "account-verification-reports:write",
  "accounts:read",
  "authorization:grant",
  "balances:read",
  // "credentials:read",
  // "identity:read",
  // "link-session:read",
  // "link-session:write",
  // "payment:read",
  // "payment:write",
  // "provider-consents:read",
  // "providers:read",
  "transactions:read",
  // "transfer:execute",
  // "transfer:read",
  "user:read",
  // "user:web_hooks"
].join(",");

type Props = {
  scope?: string;
  market?: string;
  locale?: string;
};
const AuthLink: React.FC<Props> = ({
  children,
  scope = scopeData,
  locale = "en_US",
  market = "UK",
}) => {
  const link = `https://link.tink.com/1.0/transactions/connect-accounts/${qs.stringify(
    {
      scope,
      locale,
      market,
      theme: "light",
      test: true,
      client_id: clientId,
      redirect_uri: redirectUri,
    },
    { addQueryPrefix: true, skipNulls: true },
  )}`;

  return <Link href={link}>{children}</Link>;
};

export default AuthLink;
