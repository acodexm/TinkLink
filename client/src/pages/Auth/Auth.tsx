import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAutoAuth } from "../../api/auth/getAutoAuth";
import paths from "../../const/paths";
import AuthLink from "./AuthLink";

export interface AuthProps {}

const Auth: React.VFC<AuthProps> = () => {
  const { data } = useQuery(["autoAuth"], getAutoAuth, { retry: false });
  const { push } = useHistory();

  return (
    <>
      {data && (
        <button
          onClick={() => {
            push(paths.Main);
          }}
        >
          see your account
        </button>
      )}
      <AuthLink
        scope={[
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
        ].join(",")}
        market={"UK"}
        locale={"en_US"}
      >
        Use Tink Link
      </AuthLink>
    </>
  );
};

export default Auth;
