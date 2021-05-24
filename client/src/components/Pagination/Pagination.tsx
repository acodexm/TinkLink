import React, { useEffect, useReducer } from "react";

import { PaginationQuery } from "../../api/types";
import { QueryUpdater } from "../../helpers/hooks/useQueryAsState";

type State = {
  pages: Record<string, number>;
  page?: string;
  prevPage?: string;
  index: number;
};
type Action = { type: "next"; next: string } | { type: "prev" };
function getKeyByValue(object: Record<string, number>, value: number) {
  return Object.keys(object).find(key => object[key] === value);
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "next": {
      if (state.pages[action.next])
        return {
          ...state,
          prevPage: state.page,
          page: action.next,
        };
      const index = state.index + 1;

      return {
        ...state,
        pages: { ...state.pages, [action.next]: index },
        prevPage: state.page,
        page: action.next,
        index,
      };
    }
    case "prev": {
      const index = state.pages[state.page || ""];

      return { ...state, page: state.prevPage, prevPage: getKeyByValue(state.pages, index - 1) };
    }
    default:
      return state;
  }
}
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
    <>
      <button onClick={onPrevClick}>prev</button>
      <button onClick={onNextClick} disabled={!nextPageToken}>
        next
      </button>
    </>
  );
};

export default Pagination;
