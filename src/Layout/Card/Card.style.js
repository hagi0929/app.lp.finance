import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  border-radius: ${(props) => props.br};
  padding: ${(props) => props.p};

  ${(props) =>
    props.active === 1 &&
    `
    background: linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%);
  `}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${(props) => props.br};
    border: 2px solid transparent;
    background: linear-gradient(
        90deg,
        #8b4898 0%,
        #009dd9 47.53%,
        #18b298 97.08%
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    -moz-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -moz-mask-composite: destination-out;
    mask-composite: exclude;
  }

  @media only screen and (max-width: 600px) {
    padding: 0.5rem 0.5rem;
  }
`;

export default CardWrapper;
