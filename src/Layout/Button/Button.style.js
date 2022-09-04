import styled from "styled-components";

const ButtonWrapper = styled.button`
  position: relative;
  border: none;
  outline: none;
  width: 100%;
  padding: ${(props) => props.p};
  border-radius: ${(props) => props.br};
  font-size: ${(props) => props.size};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;

  ${(props) =>
    props.active === 1 &&
    `
    color:white;
    background: linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  `}

  ${(props) =>
    props.active === 2 &&
    `
    color:white;
    background: none;
   
    &:hover {
      background: rgba(255, 255, 255, 0.2)
    }
    
  `}

  ${(props) =>
    props.active === 2 &&
    `
    color:white;
    background: none;
   
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
  `}
  
  ${(props) =>
    props.active === 3 &&
    `
      color:white;
      background: rgba(255, 255, 255, 0.2);
    }
    
  `}

  span {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    pointer-event: none;
    width: 100%;
    animation: ripples 0.6s linear infinite;
  }

  @keyframes ripples {
    0% {
      width: 0px;
      height: 0px;
      opacity: 0.5s;
    }

    100% {
      height: 500px;
      width: 500px;
      opacity: 0;
    }
  }
`;

export default ButtonWrapper;
