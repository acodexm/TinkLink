import * as React from "react";

import { makeEncodedBody } from "../../helpers/makeEncodedBody";

type Props = {
  scope: string;
  market: string;
  locale: string;
};
const AuthLink: React.FC<Props> = ({ children, scope, locale, market }) => {
  const link = `https://link.tink.com/1.0/transactions/connect-accounts/?${makeEncodedBody({
    scope,
    locale,
    market,
    theme: "light",
    test: true,
    client_id: process.env.REACT_APP_TINK_CLIENT_ID || "",
    redirect_uri: "http://localhost:3000/callback",
  })}`;

  return (
    <a href={link}>
      <button>{children}</button>
    </a>
  );
};

export default AuthLink;
