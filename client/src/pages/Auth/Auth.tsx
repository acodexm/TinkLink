import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAutoAuth } from "../../api/fetchAutoAuth";
import AuthLink from "../../components/AuthLink/AuthLink";
import paths from "../../const/paths";

export interface AuthProps {}

const Auth: React.VFC<AuthProps> = () => {
  const { data } = useQuery(["autoAuth"], getAutoAuth, { retry: false });
  const { push } = useHistory();
  const [success, error] = data ?? [];

  useEffect(() => {
    console.info(success);
    if (success) {
      push(paths.Main);
    }
  }, [success, push]);

  return (
    <>
      <h1>Welcome to Tink Link connected app</h1>
      <main>
        <h2>You can get access to all your connected Accounts and:</h2>
        <ul>
          <li>see your accounts details</li>
          <li>check all transactions</li>
          <li>see all favorites merchants</li>
        </ul>
        <h3>
          Go ahead and click on <AuthLink>Connect Tink Link</AuthLink>
        </h3>
      </main>
    </>
  );
};

export default Auth;
