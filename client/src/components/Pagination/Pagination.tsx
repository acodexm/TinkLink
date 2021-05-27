import React, { useEffect, useReducer } from "react";
import { Row } from "styled-bootstrap-grid";

import { PaginationQuery } from "../../api/helpers/types";
import { QueryUpdater } from "../../helpers/hooks/useQueryAsState";
import { Button } from "../StyledComponents/Button";
import { reducer } from "./reducer";

const Pagination: React.FC<{ callback: QueryUpdater<PaginationQuery>; nextPageToken?: string }> = ({
  nextPageToken,
  callback,
}) => {
  const [{ page }, dispatch] = useReducer(reducer, { pages: {}, index: 0 });

  const onNextClick = () => {
    if (nextPageToken) {
      dispatch({ next: nextPageToken, type: "next" });
    }
  };
  const onPrevClick = () => {
    dispatch({ type: "prev" });
  };

  useEffect(() => {
    callback({ pageToken: page });
  }, [page]);

  return (
    <Row>
      <Button onClick={onPrevClick} rtl>
        {"<"}
      </Button>

      <Button onClick={onNextClick} disabled={!nextPageToken}>
        {">"}
      </Button>
    </Row>
  );
};

export default Pagination;
