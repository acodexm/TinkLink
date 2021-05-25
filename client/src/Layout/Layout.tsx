import * as React from "react";
import { Container, Row } from "styled-bootstrap-grid";
import styled from "styled-components";

import { Header } from "../components/Header";

export interface LayoutProps {}
const Link = styled.a`
  text-decoration: none;
  color: orange;
  margin-left: 5px;
`;
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        Tink Link connect by <Link href="https://github.com/acodexm/">Acodexm</Link>
      </Header>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
