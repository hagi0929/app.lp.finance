import styled from "styled-components";

const TextareaWrapper = styled.textarea`
  outline: none;
  width: 100% !important;
  background: transparent;
  padding: ${(props) => props.p};
  border-radius: ${(props) => props.br};
  color: rgba(255, 255, 255, 0.8);
  font-size: ${(props) => props.size};

  ${(props) =>
    props.active === 1 &&
    `
    border: 1px solid rgba(255, 255, 255, 0.3);
  `}

  &::placeholder {
    color: #cccccc;
  }
`;

export default TextareaWrapper;
