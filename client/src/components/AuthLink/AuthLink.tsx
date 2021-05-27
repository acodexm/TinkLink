import qs from "qs";
import React from "react";

import { clientId, redirectUri } from "../../const/static";
import { scopeData } from "./const";
import { StyledLink } from "./styled";
import { Props } from "./types";

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

  return <StyledLink href={link}>{children}</StyledLink>;
};

export default AuthLink;
