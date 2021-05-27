import { css as styledCss } from "styled-components";

export const hoverEffect = styledCss`
  cursor: pointer;
  :hover {
    box-shadow: 7px 3px 3px ${({ theme }) => theme.colors.textSecondary};
  }
`;
