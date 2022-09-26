import styled from "styled-components";

const PieChartWrapper = styled.div`
  .popup {
    position: fixed;
    top: -100vh;
    left: 0px;
    width: 100%;
    height: 100%;
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
    max-width: 680px !important;
    min-width: 680px !important;
    padding: 1rem 1.5rem;
    border-radius: 18px;
    opacity: 0.5;
    overflow: hidden;
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
    .pieChart {
      padding: 0.2rem 0rem;

      .pieChart_top_Section {
        border-bottom: 3px solid ${(props) => props.theme.BodyPrimaryBg};

        .title {
          p {
            font-size: 1.3rem;
            color: ${(props) => props.theme.BodyMainColor};
            font-weight: bold;
          }
        }
        .close {
          i {
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            cursor: pointer;
          }
        }
      }

      .pie_Section {
        display: flex;
        align-items: center;
        justify-content: center;

        .collateral_list {
          .items {
            background: ${(props) => props.theme.BodyPrimaryBg};
            border-radius: 4px;

            .collateral_cart {
              padding: 0.5rem 1rem;
              width: 100%;

              img {
                width: auto;
                height: 2rem;
              }
              p,
              span {
                color: ${(props) => props.theme.BodyMainColor};
              }
              span {
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 95% !important;
      max-width: auto !important;
      min-width: auto !important;
      min-height: 60%;
      max-height: 98%;
    }

    .popup {
      .pieChart {
        padding: 1rem 0.3rem;

        .pie_Section {
          .collateral_list {
            max-height: 190px;
            min-height: 100px;
            overflow-y: scroll;
            overflow-x: hidden;

            &::-webkit-scrollbar {
              width: 6px;
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
          }
        }
      }
    }
  }
`;

export default PieChartWrapper;
