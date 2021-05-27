import React, { Component, ErrorInfo } from "react";
import { Container, Row } from "styled-bootstrap-grid";

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;

    if (!error) return this.props.children;
    console.error(info, error);
    return (
      <Container>
        <Row justifyContent={"center"} alignItems={"center"}>
          Error occurred :(
        </Row>
      </Container>
    );
  }
}

export default ErrorBoundary;
