import React, { FunctionComponent } from "react";

import Bars from "./Bars/Bars";
import Spinner from "./Spinner/Spinner";
import { ContentContainer, ErrorContainer, LoadingContainer, LoadingWrapper } from "./style";
import { Props } from "./types";

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
      <ContentContainer data-testid="content" visible={!loading && !error}>
        {renderChildren()}
      </ContentContainer>
      {loading && <LoadingContainer>{spinner ? <Spinner /> : <Bars />}</LoadingContainer>}
      {error && <ErrorContainer data-testid="error">Failed to load content</ErrorContainer>}
    </LoadingWrapper>
  );
};

export default LoadingHandler;
