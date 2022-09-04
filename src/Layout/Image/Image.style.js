import styled from "styled-components";

const ImageWrapper = styled.img`
  border-radius: ${(props) => props.br};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
`;

export default ImageWrapper;
