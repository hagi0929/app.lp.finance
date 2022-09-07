import styled from "styled-components";

const ImageWrapper = styled.img`
  border-radius: ${(props) => props.br};
  height: ${(props) => props.h};
  width: ${(props) => props.w};

  ${(props) =>
    props.active === 1 &&
    `
    cursor: pointer;
  `}
`;

export default ImageWrapper;
