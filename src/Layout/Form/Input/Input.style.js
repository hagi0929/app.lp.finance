import styled from "styled-components";

const InputWrapper = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  padding: ${(props) => props.p};
  border-radius: ${(props) => props.br};
  color: #0c0;
  -moz-appearance: textfield;
  font-size: ${(props) => props.size};
  display: flex;
  align-items: center;

  ${(props) =>
    props.active === 1 &&
    `
    border: 1px solid #0c0;
    text-align: right;
    direction: ltr;
  `}

  ${(props) =>
    props.active === 2 &&
    `
    border: 1px solid #0c0;
    text-align: left;
    direction: ltr;
  `}

  ${(props) =>
    props.active === 3 &&
    `
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}

  &::placeholder {
    color: #0c0;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default InputWrapper;
