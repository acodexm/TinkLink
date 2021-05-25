import React, { VFC } from "react";
import { Container, Row } from "styled-bootstrap-grid";
import styled from "styled-components";

const NoContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.bigger};
  margin: 5rem;
`;

const NotFound: VFC = () => (
  <Container>
    <Row justifyContent={"center"} alignItems={"center"}>
      <NoContent>Page not found</NoContent>
    </Row>
  </Container>
);

export default NotFound;
