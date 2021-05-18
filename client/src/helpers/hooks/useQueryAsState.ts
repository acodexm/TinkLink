import { assign } from "lodash";
import qs from "qs";
import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export type QueryUpdater<S> = (updatedParams: Partial<S>) => void;

function useQueryAsState<S extends Record<string, string | string[] | number | number[] | boolean>>(
  initState: S,
): [S, (updatedParams: Partial<S>) => void] {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const params = qs.parse(search);

  const updateQuery = useCallback(
    (updatedParams: Partial<S>) => {
      assign(params, updatedParams);
      history.replace(
        `${pathname}?${qs.stringify(params, {
          skipNulls: true,
        })}`,
      );
    },
    [params, pathname, history],
  );
  const queryWithDefault = useMemo(() => assign({}, initState, params), [params, initState]);

  return [queryWithDefault, updateQuery];
}

export { useQueryAsState };
