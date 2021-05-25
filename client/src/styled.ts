import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html{
    height:100%;
}  
body {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-family: "Lota Grotesque", Avenir, Arial, sans-serif;
    color: white;
 }
`;
