import React, { FunctionComponent } from "react";
import styled from "styled-components";

import Bars from "./Bars/Bars";
import Spinner from "./Spinner/Spinner";

const Content = styled.div<{ visible?: boolean }>`
  width: 100%;
  height: 100%;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;
const Error = styled.div<{ error: boolean }>`
  display: inline-block;
  position: absolute;
  margin: 1rem;
  justify-content: center;
  align-items: center;
  visibility: ${({ error }) => (error ? "visible" : "hidden")};
`;
const LoadingWrapper = styled.div<{ size?: number }>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

interface OwnProps {
  loading: boolean;
  error: boolean;
  preventDisplayContent?: boolean;
  spinner?: boolean;
  className?: string;
  size?: number;
}

type Props = OwnProps;
const LoadingHandler: FunctionComponent<Props> = ({
  children,
  loading,
  error,
  preventDisplayContent,
  className,
  size = 50,
  spinner = true,
}) => {
  const renderChildren = () => {
    if (preventDisplayContent && !error && !loading) return children;
    else if (preventDisplayContent) return null;
    return children;
  };

  return (
    <LoadingWrapper className={className} size={size}>
      <Content data-testid="content" visible={!loading && !error}>
        {renderChildren()}
      </Content>
      {spinner ? <Spinner loading={loading} /> : <Bars loading={loading} />}
      <Error error={error} data-testid="error">
        Failed to load content
      </Error>
    </LoadingWrapper>
  );
};

export default LoadingHandler;
