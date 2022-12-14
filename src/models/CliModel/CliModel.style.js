import styled from "styled-components";

const CliWrapper = styled.div`
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
    max-width: 800px !important;
    min-width: 800px !important;
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
    .terminal_section {
      height: auto !important;
      width: 100% !important;

      .terminal_title {
        border-bottom: 1px solid ${(props) => props.theme.BodyMainColor};
        line-height: 40px;
        width: 100%;

        p {
          font-size: 1rem;
          color: ${(props) => props.theme.BodyMainColor};
          font-weight: bold;
        }
        .close {
          i {
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1rem;
            cursor: pointer;
            background: ${(props) => props.theme.BodyPrimaryBg};
            border-radius: 50%;
            padding: 0.3rem 0.5rem;
          }
        }
      }

      .terminal_content {
        max-height: 200px;
        min-height: 400px;
        overflow-y: scroll;
        overflow-x: scroll;

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

        .terminal_card {
          padding: 1rem 0rem;

          .command {
            display: flex;
            align-items: center;

            p {
              color: ${(props) => props.theme.BodyMainColor};
              font-size: 0.9rem;
            }

            input {
              width: 100%;
              outline: none;
              border: none;
              background: transparent;
              color: ${(props) => props.theme.BodyTextColor};
              -moz-appearance: textfield;
              display: flex;
              align-items: center;
              font-size: 0.9rem;
            }
          }

          p {
            color: ${(props) => props.theme.BodyTextColor};
            font-size: 0.9rem;
          }

          table {
            tr {
              color: ${(props) => props.theme.BodyTextColor} !important;
              font-size: 0.85rem;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    .popup .popup-container {
      width: 95% !important;
      max-width: auto !important;
      min-width: auto !important;
    }
    .popup {
      .terminal_section {
        padding: 1rem 0.3rem;
      }
    }
  }
`;

export default CliWrapper;
