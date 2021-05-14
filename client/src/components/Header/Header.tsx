import React, { FC } from "react";
import styled from "styled-components";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeader = styled.header`
  h1 {
    z-index: 1;
    color: #00d8ff;
    text-align: center;
    font-style: italic;
  }
  div {
    padding: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: #8e8e8e;
    clip-path: polygon(0 20px, 20px 100%, 100% 100%, 100% 0, 0 0);
    a {
      margin-left: 5px;
      color: #00d8ff;
      text-decoration: unset;
    }
  }
`;

const Header: FC = ({ children }) => (
  <StyledHeader>
    <div>
      <FontAwesomeIcon icon={faGithub} />
      <a href="https://github.com/acodexm">By acodexm</a>
      {children}
    </div>
  </StyledHeader>
);

export default Header;
