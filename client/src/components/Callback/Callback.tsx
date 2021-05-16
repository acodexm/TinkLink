import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

import { handleRequest } from "../../api/handleRequest";
import paths from "../../const/paths";
import useQuerySearch from "../../helpers/hooks/useQuerySearch";
import { LoadingHandler } from "../LoadingHandler";

const clientId = process.env.REACT_APP_TINK_CLIENT_ID;
const clientSecret = process.env.REACT_APP_TINK_CLIENT_SECRET;
const Callback: React.VFC = () => {
  const code = useQuerySearch("code");
  const { push } = useHistory();

  const { isSuccess, isLoading, isError } = useQuery(["code", code], () =>
    handleRequest("/authorize", {
      method: "POST",
      body: JSON.stringify({ clientId, clientSecret, code }),
      headers: { "Content-Type": "application/json" },
    }),
  );

  useEffect(() => {
    console.info("redirect", paths.Main);
    // push(paths.Main);
  }, [isSuccess, push]);
  return (
    <LoadingHandler loading={isLoading} error={isError}>
      <h1>Success</h1>
    </LoadingHandler>
  );
};

export default Callback;
