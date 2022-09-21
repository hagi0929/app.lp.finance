import styled from "styled-components";

const SnackbarWrapper = styled.div`
  .Snackbar {
    position: fixed;
    top: 25px;
    right: 30px;
    background: rgba(255, 255, 255, 0.3);
    padding: 1rem;
    max-width: 340px;
    min-width: 300px;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    backdrop-filter: blur(5px);
    border-left: 2px solid #0c0;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 0;

    .Snackbar_content {
      display: flex;
      flex-direction: column;
      width: 100%;

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

          i {
            font-size: 1.3rem;
          }

          .Success {
            color: #0c0;
          }
          .Info {
            color: #e7a61a;
          }
          .Error {
            color: #cc4f4f;
          }
        }

        .close_snackbar {
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
        right: 20px;
        height: 100%;
        width: 100%;
        background-color: #0c0;
      }
    }
  }

  .Snackbar.active {
    transform: translateX(0%);
    z-index: 1100;
  }

  .Snackbar .Snackbar_content .progress_bar.active:before {
    animation: progress 10s linear forwards;
  }

  @keyframes progress {
    100% {
      right: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
    .Snackbar {
      max-width: 300px;
      min-width: 300px;
      top: 5px;
      right: 0px;
    }
  }
`;

export default SnackbarWrapper;
