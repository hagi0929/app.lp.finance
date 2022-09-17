import styled from "styled-components";

const SettingModelWrapper = styled.div`
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
    max-width: 390px !important;
    min-width: 390px !important;
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
    .setting_section {
      height: auto !important;
      width: 100% !important;

      .top_Section,
      .theme_Section {
        .title_section {
          position: relative;
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.BodyMainColor};
            font-weight: bold;
          }
          i {
            position: absolute;
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            cursor: pointer;
          }
        }
      }

      .top_Section {
        i {
          right: 20px;
        }
      }
      .theme_Section {
        i {
          left: 20px;
          top: 7px;
        }
      }

      .bottom_Section {
        .setting_card {
          background: ${(props) => props.theme.BodyPrimaryBg};
          padding: 1rem;
          border-radius: 10px;
          cursor: pointer;

          p {
            color: ${(props) => props.theme.BodyMainColor};
            font-weight: 600;
          }
        }

        .tabs_list {
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
              font-size: 1rem;
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
      width: 95% !important;
      height: 98% !important;
      max-width: auto !important;
      min-width: auto !important;
    }
    .popup .setting_section {
      padding: 1rem 0.3rem;
    }
  }
`;

export default SettingModelWrapper;
