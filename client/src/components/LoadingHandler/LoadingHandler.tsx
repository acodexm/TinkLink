import React, { FunctionComponent } from "react";
import styled, { keyframes } from "styled-components";

import Bars from "./Bars/Bars";
import Spinner from "./Spinner/Spinner";

const Content = styled.div<{ "data-visible"?: boolean }>`
  width: 100%;
  height: 100%;
  visibility: ${props => (props["data-visible"] ? "visible" : "hidden")};
`;
const Error = styled.div<{ "data-error": boolean }>`
  display: inline-block;
  position: absolute;
  visibility: ${props => (props["data-error"] ? "visible" : "hidden")};
`;
const LoadingWrapper = styled.div<{ "data-loading": boolean }>`
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
  style?: React.CSSProperties;
  spinner?: boolean;
}

type Props = OwnProps;
const LoadingHandler: FunctionComponent<Props> = ({
  children,
  loading,
  error,
  preventDisplayContent,
  style,
  spinner = true,
}) => {
  const renderChildren = () => {
    if (preventDisplayContent && !error && !loading) return children;
    else if (preventDisplayContent) return null;
    return children;
  };

  return (
    <LoadingWrapper data-loading={loading} style={style}>
      <Content data-testid="content" data-visible={!loading && !error}>
        {renderChildren()}
      </Content>
      {spinner ? <Spinner width={50} loading={loading} /> : <Bars loading={loading} />}
      <Error data-error={error} data-testid="error">
        Failed to load content
      </Error>
    </LoadingWrapper>
  );
};

export default LoadingHandler;
