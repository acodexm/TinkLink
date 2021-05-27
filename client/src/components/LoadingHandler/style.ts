import styled from "styled-components";

export const ContentContainer = styled.div<{ visible?: boolean }>`
  width: 100%;
  height: 100%;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;
export const ErrorContainer = styled.div`
  display: inline-block;
  position: absolute;
  margin: 1rem;
  justify-content: center;
  align-items: center;
`;
export const LoadingWrapper = styled.div<{ size?: number }>`
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  position: relative;
  width: 100%;
  height: 100%;
`;
export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
