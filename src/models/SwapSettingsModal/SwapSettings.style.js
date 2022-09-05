import styled from "styled-components";

const SwapSettingsWrapper = styled.div`
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
    max-width: 400px !important;
    min-width: 400px !important;
    min-height: 150px;
    padding: 1.5rem 0.5rem;
    border-radius: 18px;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.BodySecondaryBg};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid ${(props) => props.theme.BodyPrimaryBg};
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .popup {
    .setting_section {
      height: auto !important;
      width: 100% !important;

      .setting_top_Section {
        .title_section {
          position: relative;
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.BodyMainColor};
            font-weight: 500;
          }
          i {
            position: absolute;
            right: 20px;
            top: -10px;
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            cursor: pointer;
          }
        }
      }

      .setting_custom {
        p,
        span {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 0.95rem;
        }
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .setting__top_Section {
        .slippage_list {
          background: ${(props) => props.theme.BodyPrimaryBg};
          border-radius: 5px;

          .nav,
          .nav-tabs {
            padding: 0rem;
            border-bottom: 0px;
            width: 100% !important;

            .nav-link {
              padding: 0.6rem 1rem;
              width: 100%;
              text-align: center;
              font-size: 0.9rem;
              border-radius: 5px;
              color: ${(props) => props.theme.BodyMainColor};
              margin-bottom: none;
              border: 0px solid transparent;
              border-top-left-radius: none;
              border-top-right-radius: none;
              z-index: 100;
              background: transparent;
              cursor: pointer;
              transition: 0.4s all;

              &.active {
                color: ${(props) => props.theme.BodyMainColor};
                background: rgba(255, 255, 255, 0.1);
              }

              &:hover {
                border: none;
              }
            }
          }

          .input_section {
            position: relative;

            input {
              outline: none;
              border: none;
              border-radius: 15px;
              width: 100%;
              text-indent: 10px;
              padding: 0.6rem 0.5rem;
              color: ${(props) => props.theme.BodyMainColor};
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
              }
            }
            p {
              position: absolute;
              color: ${(props) => props.theme.BodyMainColor};
              right: 20px;
              top: 11px;
              font-size: 1rem;
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

export default SwapSettingsWrapper;
