import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import PretendardRegular from "./assets/fonts/Pretendard-Regular.subset.woff2";
import PretendardBold from "./assets/fonts/Pretendard-Bold.subset.woff2";
import Transaction from "./pages/Transaction";

const GlobalStyles = createGlobalStyle`
${reset}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url(${PretendardRegular}) format('woff');
}

@font-face {
    font-family: 'Pretendard-Bold';
    src: url(${PretendardBold}) format('woff');
}

:root{
  --primary: #1968B3;
  --lightgray: #ced4da;
  --black: #333;
  --excel: #1B6F44;
  --error: red;
}

*{
    box-sizing: border-box;
}

html{
  font-size: 62.5%;
}

body{
  font-family: 'Pretendard-Regular';
  font-size: 1.6rem;
  line-height: 1.3;
  color:var(--black);
}


ul, li{
  list-style: none;
}

a{
  text-decoration: none;
  color: inherit;
}


button{
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
}

input{
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
}
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Transaction />
    </>
  );
}

export default App;
