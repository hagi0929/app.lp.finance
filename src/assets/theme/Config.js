import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  BodyMainBg: "black", // body bg color ,#222
  BodyPrimaryBg: "rgba(255, 255, 255, 0.2)", // for text, hover , bg, button
  BodySecondaryBg: "#080808", //card, button bg color,
  BodyTraceryBg: "#0f0",
  BodyMainColor: "#0c0", // text color
  BodySecondaryColor: "rgba(255, 255, 255, 0.8)",
  BodyTraceryColor: "",
  BodyTextColor: "white", // text color
  BodyMainLine: "#3c3c3c",
};

export const darkTheme = {};

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;  
}

html {
  scroll-behavior: smooth;
  font-family:sans-serif;
  -ms-text-size-adjust:100%;
  -webkit-text-size-adjust:100%
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}

body {
  margin:0;
  font-family:Monospace;
  background:${(props) => props.theme.BodyMainBg};
  padding-right: 0px;
  padding-left: 0px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
}

h1,
h2,
h3,
h4,
h5,
h6 {   
  font-family:Monospace;
  font-weight:500;
  color: ${(props) => props.theme.BodyMainColor};
  font-size:1.8rem;
}

p {
  margin-bottom: 0 !important;
}

.container {
  max-width: 1352px !important;
  padding-left:100px;
  padding-right:100px;
}


.not-allowed {
  cursor: not-allowed! important;
}
 

@media only screen and (max-width: 1200px) { 
  .container {
    padding-left:30px;
    padding-right:30px;
  }  
}

@media only screen and (max-width: 900px) { 
  .container {
    padding-left:15px;
    padding-right:15px;
  } 
}

@media only screen and (max-width: 600px) {
  .container {
    padding-left:15px;
    padding-right:15px;
  }
}
`;
