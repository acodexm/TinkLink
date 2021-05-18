import * as React from "react";
import { Container, Row } from "styled-bootstrap-grid";

import { Header } from "../components/Header";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Row>{children}</Row>
      </Container>
    </>
  );
};

export default Layout;
