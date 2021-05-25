import * as React from "react";
import { useQuery } from "react-query";
import { Container } from "styled-bootstrap-grid";

import { getAutoAuth } from "../api/auth/getAutoAuth";
import { Header } from "../components/Header";
import { Link } from "../components/StyledComponents/Link";
import AuthLink from "../pages/Auth/AuthLink";

const Layout: React.FC = ({ children }) => {
  const { data } = useQuery(["autoAuth"], getAutoAuth, { retry: false });

  return (
    <>
      <Header>
        <div>
          Tink Link connect by <Link href="https://github.com/acodexm/">Acodexm</Link>
        </div>
        <AuthLink>{data ? "Change" : "Connect"} Tink Link</AuthLink>
      </Header>
      <Container>{children}</Container>
      <br />
    </>
  );
};

export default Layout;
