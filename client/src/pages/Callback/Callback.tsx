import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { getAuthorized } from "../../api/auth/getAuthorized";
import { LoadingHandler } from "../../components/LoadingHandler";
import paths from "../../const/paths";
import useQuerySearch from "../../helpers/hooks/useQuerySearch";

const Callback: React.VFC = () => {
  const code = useQuerySearch("code");
  const { push } = useHistory();

  const { isLoading, isError } = useQuery(["code", code], () => getAuthorized(code));

  return (
    <LoadingHandler loading={isLoading} error={isError}>
      <h1>Success</h1>
      <button
        onClick={() => {
          push(paths.Main);
        }}
      >
        Check your accounts
      </button>
    </LoadingHandler>
  );
};

export default Callback;
