import styled from "styled-components";

const MainWrapper = styled.div`
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
    .Main_section {
      height: auto !important;
      width: 100% !important;

      .card_Section {
        .logo {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;

          p {
            color: ${(props) => props.theme.BodyTraceryBg};
            font-weight: bold;
            font-size: 1.2rem;
          }
        }

        .content {
          padding: 1rem;
          p {
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 0.95rem;

            a {
              text-decoration: none;
            }
          }
          .main_link {
            border: 1px solid ${(props) => props.theme.BodyMainColor};
            padding: 0.5rem;
            font-size: 1.1rem;
            border-radius: 50px;
            color: ${(props) => props.theme.BodyMainColor};
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
    }
    .popup {
      .Main_section {
        padding: 1rem 0.3rem;
      }
    }
  }
`;

export default MainWrapper;
