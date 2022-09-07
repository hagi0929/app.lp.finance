import styled from "styled-components";

const RoutesWrapper = styled.div`
  .Routes_Popup {
    position: fixed;
    top: -100vh;
    left: 0px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.8);
    transition: top 0ms ease-in-out 200ms;
    z-index: 0;
  }

  .Routes_Popup.active {
    transition: top 0ms ease-in-out;
    top: 0vh;
    z-index: 1000;
  }

  .Routes_Popup .Routes-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    min-width: 360px !important;
    max-width: 360px !important;
    min-height: 100px;
    padding: 1.5rem 0.2rem;
    border-radius: 18px;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.BodySecondaryBg};
    border: 1px solid ${(props) => props.theme.BodyMainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .Routes_Popup.active .Routes-container {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .Routes_Popup {
    .Routes_section {
      height: auto !important;
      width: 100% !important;

      .Routes_title {
        position: relative;
        width: 100%;

        p {
          font-size: 1.3rem;
          color: ${(props) => props.theme.BodyMainColor};
          font-weight: bold;
        }

        i {
          position: absolute;
          right: 25px;
          top: 0px;
          font-size: 1.3rem;
          cursor: pointer;
          color: ${(props) => props.theme.BodyMainColor};
        }
      }

      .Token_top_Section {
        .Routes_title {
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

      .Token_bottom_Section {
        .route_list {
          min-height: 100px;
          max-height: 350px;
          width: 100%;
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

          .active {
            border: 1px solid ${(props) => props.theme.BodyMainColor};
          }

          .routes_card {
            cursor: pointer;
            padding: 0.5rem 1rem;
            transition: 0.4s all;
            border-radius: 8px;
            background: ${(props) => props.theme.BodyPrimaryBg};

            .routes_details {
              .names {
                .fullName {
                  overflow: hidden;
                  width: 100%;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  color: ${(props) => props.theme.BodyMainColor};

                  span {
                    font-size: 1.1rem;
                    font-weight: 500;
                  }
                }
              }

              .tokens {
                span {
                  font-size: 0.78rem;
                  color: ${(props) => props.theme.BodyTraceryBg};
                }
              }
            }

            .amount_section {
              p {
                font-size: 1rem;
                color: ${(props) => props.theme.BodyTraceryBg};
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .Routes_Popup .Routes-container {
      width: 98% !important;
    }
    .Routes_Popup .Routes_section {
      padding: 1rem 0.8rem;
    }
  }
`;

export default RoutesWrapper;
