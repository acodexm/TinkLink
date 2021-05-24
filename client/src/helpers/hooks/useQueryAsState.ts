import qs from "qs";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export type QueryUpdater<S> = (updatedParams: Partial<S>) => void;

function useQueryAsState<S extends Record<string, string | string[] | number | number[] | boolean>>(
  initState: S,
): [S, (updatedParams: Partial<S>) => void] {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const params = qs.parse(search, { ignoreQueryPrefix: true, interpretNumericEntities: true });

  useEffect(() => {
    const newParams = { ...initState, ...params };

    history.replace(
      `${pathname}${qs.stringify(newParams, {
        skipNulls: true,
        addQueryPrefix: true,
      })}`,
    );
  }, []);
  const updateQuery = useCallback(
    (updatedParams: Partial<S>) => {
      const newParams = { ...params, ...updatedParams };

      history.replace(
        `${pathname}${qs.stringify(newParams, {
          skipNulls: true,
          addQueryPrefix: true,
        })}`,
      );
    },
    [params],
  );
  const state = useMemo(() => ({ ...initState, ...params }), [initState, params]);

  return [state, updateQuery];
}

export { useQueryAsState };
