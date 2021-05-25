import React from "react";
import styled, { keyframes } from "styled-components";

const keyframes1 = keyframes`
  0% {
    top: 36px;
    height: 128px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const keyframes2 = keyframes`
  0% {
    top: 42px;
    height: 116px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const keyframes3 = keyframes`
  0% {
    top: 48px;
    height: 104px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const BarsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  div {
    position: absolute;
    width: 30px;
    border-radius: 1rem;
    box-sizing: content-box;
  }
  div:nth-child(1) {
    left: 35px;
    background: #f79100;
    animation: ${keyframes1} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.2s;
  }
  div:nth-child(2) {
    left: 85px;
    background: #00d8ff;
    animation: ${keyframes2} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.1s;
  }
  div:nth-child(3) {
    left: 135px;
    background: #8e8e8e;
    animation: ${keyframes3} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
`;
const LoadingBars = styled.div<{ loading?: boolean }>`
  width: 200px;
  height: 200px;
  overflow: hidden;
  background: none;
  position: absolute;
  display: flex;
  flex: 1;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  visibility: ${({ loading }) => (loading ? "visible" : "hidden")};
`;
const Bars: React.VFC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <LoadingBars data-testid="loading" loading={loading}>
      <BarsContainer>
        <div />
        <div />
        <div />
      </BarsContainer>
    </LoadingBars>
  );
};

export default Bars;
