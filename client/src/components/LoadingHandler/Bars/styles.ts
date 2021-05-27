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

export const BarsContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform-origin: 0 0;
  div {
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
export const LoadingBars = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
