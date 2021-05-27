import React, { FC } from "react";
import { useHistory, useLocation } from "react-router";

import paths from "../../const/paths";
import { Link } from "../StyledComponents/Link";
import { StyledHeader } from "./style";

const isMainPageOrAuth = (pathname: string) => {
  if (pathname === "" || pathname === paths.Auth) return true;
  return new RegExp(`${paths.Main}(/.*)?`).test(pathname);
};
const Header: FC = ({ children }) => {
  const { pathname } = useLocation();
  const { goBack } = useHistory();
  const renderBackButton = isMainPageOrAuth(pathname) ? null : <Link onClick={goBack}>{"<"}</Link>;

  return (
    <StyledHeader>
      {renderBackButton}
      {children}
    </StyledHeader>
  );
};

export default Header;
