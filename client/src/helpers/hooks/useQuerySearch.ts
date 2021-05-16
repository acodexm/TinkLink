import { useLocation } from "react-router-dom";

const useQuerySearch = (key: string) => {
  return new URLSearchParams(useLocation().search).get(key);
};

export default useQuerySearch;
