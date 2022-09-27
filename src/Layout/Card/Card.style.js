import styled from "styled-components";

const CardWrapper = styled.div`
  width: 100%;
  border-radius: ${(props) => props.br};
  padding: ${(props) => props.p};
  border: 1px solid #0c0;

  ${(props) =>
    props.active === 1 &&
    `
    background:#080808;
  `}

  @media only screen and (max-width: 600px) {
    padding: 0.5rem 0.5rem;
  }
`;

export default CardWrapper;
