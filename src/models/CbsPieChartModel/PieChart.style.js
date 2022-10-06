import styled from "styled-components";

const PieChartWrapper = styled.div`
  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    transition: all 0ms ease-in-out 200ms;
    z-index: -1;
    visibility: hidden;
    overflow-y: scroll;
    padding: 1rem 0rem;

    &::-webkit-scrollbar {
      display: none;
      background: inherit;
    }
  }

  .popup.active {
    transition: all 0ms ease-in-out;
    z-index: 1000;
    visibility: visible;
  }

  .popup .popup-container {
    position: relative;
    transform: scale(0);
    max-width: ${(props) => props.width} !important;
    min-width: ${(props) => props.width} !important;
    padding: 1rem 1.5rem;
    margin: auto;
    height: auto !important;
    border-radius: 18px;
    opacity: 0.5;
    transition: all 300ms ease-in-out;
    background: ${(props) => props.theme.BodySecondaryBg};
    border: 1px solid ${(props) => props.theme.BodyMainColor};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .popup.active .popup-container {
    opacity: 1;
    transform: scale(1);
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

        .message {
          p {
            color: ${(props) => props.theme.BodyMainColor};
          }
        }

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

  @media only screen and (max-width: 800px) {
    .popup .popup-container {
      width: 95% !important;
      max-width: auto !important;
      min-width: auto !important;
      padding: 0.5rem 1rem;
    }

    .popup {
      .pieChart {
        padding: 1rem 0.3rem;
      }
    }
  }
`;

export default PieChartWrapper;
