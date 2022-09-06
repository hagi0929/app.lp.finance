import styled from "styled-components";

const TokenWrapper = styled.div`
  .popup {
    position: fixed;
    top: -100vh;
    left: 0px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    transition: top 0ms ease-in-out 200ms;
    z-index: 1000;
  }

  .popup.active {
    transition: top 0ms ease-in-out;
    top: 0vh;
    z-index: 1000;
  }

  .popup .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    max-width: 380px !important;
    min-width: 380px !important;
    padding: 1rem 0.2rem;
    border-radius: 18px;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.BodySecondaryBg};
    border: 1px solid ${(props) => props.theme.BodyMainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .popup {
    .Coin_section {
      height: auto !important;
      width: 100% !important;

      .Coin_top_Section {
        .title_section {
          position: relative;
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.BodyMainColor};
            font-weight: bold;
          }
          i {
            position: absolute;
            right: 20px;
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            cursor: pointer;
          }
        }
      }

      .Coin_bottom_Section {
        .token_list {
          max-height: 350px;
          min-height: 100px;
          overflow-y: scroll;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            width: 7px;
            background: inherit;
          }

          &::-webkit-scrollbar-track {
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb {
            background: ${(props) => props.theme.BodyPrimaryBg};
            backdrop-filter: blur(5px);
            border-radius: 10px;
          }

          .details {
            cursor: pointer;
            padding: 1rem;
            transition: 0.4s all;
            border-radius: 16px;

            &:hover {
              background: ${(props) => props.theme.BodyPrimaryBg};
            }

            img {
              height: 1.9rem;
              width: auto;
              border-radius: 50%;
            }

            p {
              color: ${(props) => props.theme.BodyMainColor};
              font-size: 0.9rem;
            }
            span {
              color: ${(props) => props.theme.BodyMainColor};
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 98% !important;
    }
    .popup .Coin_section {
      padding: 1rem 0.8rem;
    }
  }
`;

export default TokenWrapper;
