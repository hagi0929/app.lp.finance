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
    .pieChart {
      height: auto !important;
      width: 100% !important;

      .card_Section {
        .content {
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .popup .popup-container {
      width: 95% !important;
      max-width: auto !important;
      min-width: auto !important;
    }
    .popup {
      .pieChart {
        padding: 1rem 0.3rem;
      }
    }
  }
`;

export default PieChartWrapper;
