import styled from "styled-components";

const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: ${(props) => props.p};
  border-radius: ${(props) => props.br};
  font-size: ${(props) => props.size};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  ${(props) =>
    props.active === 1 &&
    `
    color:#0c0;
    background: none;
    border:1px solid #0c0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  `}

  ${(props) =>
    props.active === 2 &&
    `
    color:#0c0;
    background: none;
   
    &:hover {
      background: rgba(255, 255, 255, 0.2)
    }
    
  `}

  ${(props) =>
    props.active === 2 &&
    `
    color:#0c0;
    background: none;
   
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
  `}
  
  ${(props) =>
    props.active === 3 &&
    `
      color:#0c0;
      background: rgba(255, 255, 255, 0.2);
    }
    
  `}
`;

export default ButtonWrapper;
