import * as React from "react";

import { Link } from "../../components/StyledComponents/Link";
import { makeEncodedBody } from "../../helpers/makeEncodedBody";

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
  const link = `https://link.tink.com/1.0/transactions/connect-accounts/?${makeEncodedBody({
    scope,
    locale,
    market,
    theme: "light",
    test: true,
    client_id: process.env.REACT_APP_TINK_CLIENT_ID || "",
    redirect_uri: "http://localhost:8080/callback",
  })}`;

  return <Link href={link}>{children}</Link>;
};

export default AuthLink;
