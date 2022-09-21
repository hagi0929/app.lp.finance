import styled from "styled-components";

const ContractContractSnackbarWrapper = styled.div`
  .ContractSnackbar {
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: translateY(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 0;

    .ContractSnackbar_content {
      position: absolute;
      bottom: 10px;
      left: 10px;
      display: flex;
      flex-direction: column;
      max-width: 380px;
      min-width: 380px;
      background: rgba(255, 255, 255, 0.2);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      border-left: 2px solid #0c0;
      backdrop-filter: blur(5px);
      overflow: hidden;

      .status_section {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        border-bottom: 1px solid #0c0;
        padding-bottom: 7px;

        .status {
          width: 80%;
          span {
            margin-left: 10px;
            font-weight: 700;
          }

          img {
            width: auto;
            height: 1.2rem;
            animation: spin infinite 0.6s linear;
          }

          @keyframes spin {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          i {
            font-size: 1.3rem;
          }

          .Success,
          .Processing {
            color: #0c0;
          }
          .Info {
            color: #e7a61a;
          }
          .Error {
            color: #cc4f4f;
          }
        }

        .close_ContractSnackbar {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          i {
            color: #0c0;
            font-size: 1.2rem;
            cursor: pointer;
          }
        }
      }

      .message_section {
        margin-top: 15px;
        padding-left: 29px;

        span {
          color: #0c0;
          font-size: 0.9rem;
        }
      }

      .progress_bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
      }

      .progress_bar:before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0px;
        height: 100%;
        width: 100%;
        background-color: #0c0;
      }
    }
  }

  .ContractSnackbar.show {
    transform: translateY(0%);
    z-index: 1100;
  }

  .ContractSnackbar .ContractSnackbar_content .progress_bar.active:before {
    animation: progress 7s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
    .ContractSnackbar {
      .ContractSnackbar_content {
        max-width: 97%;
        min-width: 97%;
        bottom: 5px;
        left: 5px;
      }
    }
  }
`;

export default ContractContractSnackbarWrapper;
