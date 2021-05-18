import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

function getLocalState<S>(key: string, init: S) {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value) as S;
  }

  return init;
}

function useLocalState<S>(key: string, initialState: S): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(getLocalState(key, initialState));

  const setLocalState = useCallback(<S>(key: string, state: S) => {
    localStorage.setItem(key, JSON.stringify(state));
  }, []);

  useEffect(() => {
    setLocalState(key, state);
  }, [state, setLocalState, key]);
  return [state, setState];
}

export default useLocalState;
