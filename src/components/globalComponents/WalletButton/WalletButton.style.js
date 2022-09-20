import styled from "styled-components";

const WalletButtonWrapper = styled.div`
  .wallet-adapter-button-trigger {
    background: ${(props) => props.theme.BodySecondaryBg};
    border: 1px solid ${(props) => props.theme.BodyMainColor};
    color: ${(props) => props.theme.BodyMainColor};
    font-style: normal;
    font-weight: ${(props) => props.fw};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.size};
    padding: ${(props) => props.p};
    border-radius: ${(props) => props.br};
    width: 100%;

    ${(props) =>
      props.active === 1 &&
      `
      &:hover {
        background-color: transparent !important;
      }
    `}
  }
`;

export default WalletButtonWrapper;
