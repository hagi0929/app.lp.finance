import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  BodyMainBg: "black", // body bg color
  BodyPrimaryBg: "rgba(255, 255, 255, 0.2)", // for text, hover , bg, button
  BodySecondaryBg: "linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%)", //card, button bg color
  BodyTraceryBg:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.89) 0%, #009DD9 60.17%, #18A9B2 97.08%)", // footer , card,model bg
  BodyBoxBg:
    "linear-gradient(90deg, rgba(139, 72, 152, 0.4) 0%, rgba(0, 157, 217, 0.4) 47.53%, rgba(24, 178, 152, 0.4) 97.08%)", // card box color
  BodyMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)", // card mask
  BodyFilter: "blur(0px)", // card , model bg blur
  BodyMainLine:
    "linear-gradient(90deg, #8b4898 0%, #009dd9 47.53%, #18b298 97.08%) border-box", // card line
  BodySecondaryLine:
    "linear-gradient(to left, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)", // navbar link active & hover, use eny
  BodyOverlay: "rgba(0, 0, 0, 0.8)", // use model, card for bg overlay
  BodyMainColor: "white", // text color
  BodySecondaryColor: "rgba(255, 255, 255, 0.8)",
  BodyTraceryColor: "#41bbe5",
  HeaderMain:
    "linear-gradient(90deg, #18B298 0%, #009DD9 47.53%, #8B4898 97.08%)", // for text, bg
  HeaderSecondary: "#cccccc",
  ButtonLine: "#009dd9",
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
}

body {
  background:${(props) => props.theme.BodyMainBg};
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: normal;
  padding-right: 0px;
  padding-left: 0px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
}


::-webkit-scrollbar {
  height: 6px;
  width: 6px;
  background: ${(props) => props.theme.BodySecondary};;
}

::-webkit-scrollbar-corner {
  background: ${(props) => props.theme.BodySecondary};
}

::-webkit-scrollbar-thumb {
  background: #a8a8a8;
  border-radius: 10px;
  -webkit-border-radius: 1ex;
}

h1,
h2,
h3,
h4,
h5,
h6 {   
  letter-spacing: 0.8px;
    font-weight: 1000;
    color: black;
    font-style: normal;
    font-size: 1.9rem;
    background-image:  ${(props) => props.theme.HeaderMain};
    background-repeat: repeat;
    background-size: 100%;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-stroke-width: 0.18px;
    -moz-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-stroke-width: 0.18px;
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
