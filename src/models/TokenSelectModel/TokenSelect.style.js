import styled from "styled-components";

const TokenSelectWrapper = styled.div`
  .popup {
    position: fixed !important;
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
    max-width: 360px !important;
    min-width: 360px !important;
    padding: 1rem 0.2rem;
    border-radius: 18px;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.BodySecondaryBg};
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
            top: -2px;
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            cursor: pointer;
          }
        }
      }

      .Coin_bottom_Section {
        .search_box {
          input {
            position: relative;
            display: flex;
            align-items: center;
            -webkit-box-align: center;
            outline: none;
            border: none;
            border: 1px solid ${(props) => props.theme.BodyPrimaryBg};
            border-radius: 15px;
            overflow-y: scroll;
            width: 100%;
            outline: none;
            text-indent: 10px;
            padding: 0.8rem 0.5rem;
            color: ${(props) => props.theme.BodyMainColor};
            opacity: 0.9;
            background: none;
            white-space: nowrap;
            appearance: none;
            font-size: 1rem;
            transition: border 100ms ease 0s;
            &:hover,
            &:focus {
              outline: none;
            }
            &::placeholder {
              color: ${(props) => props.theme.BodyMainColor};
              opacity: 0.9;
            }
          }
        }

        .token_list {
          max-height: 350px;
          min-height: 100px;
          overflow-y: scroll;
          overflow-x: hidden;
          width: 100%;

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
              height: 1.8rem;
              width: auto;
              border-radius: 50%;
            }

            p {
              color: ${(props) => props.theme.BodyMainColor};
              font-size: 0.9rem;
            }
            span {
              color: rgba(255, 255, 255, 0.8);
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

export default TokenSelectWrapper;
