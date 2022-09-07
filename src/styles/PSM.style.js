import styled from "styled-components";

const PSMWrapper = styled.div`
  .PSM {
    .PSM_title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .PSM_subtitle {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: ${(props) => props.theme.BodyMainColor};
      }
    }

    .PSM_section {
      .Pay_section,
      .Receive_section {
        .title {
          font-size: 1.05rem;
          font-weight: 500;
          color: ${(props) => props.theme.BodyMainColor};
        }
        .balance {
          p {
            font-size: 0.89rem;
            color: ${(props) => props.theme.BodySecondaryColor};
          }
        }

        .model_btn {
          button {
            img {
              width: auto;
              height: 1.8rem;
              border-radius: 50%;
            }
            p {
              font-size: 1.1rem;
              color: ${(props) => props.theme.BodyMainColor};
              font-weight: 500;
            }
            i {
              font-size: 1rem;
              color: ${(props) => props.theme.BodyMainColor};
            }

            &:hover {
              background: ${(props) => props.theme.BodyPrimaryBg};
            }
          }
        }

        .input_form {
          span {
            color: ${(props) => props.theme.BodyPrimaryBg};
            font-size: 0.8rem;
          }
        }

        .value {
          span {
            color: ${(props) => props.theme.BodySecondaryColor};
            font-size: 0.8rem;
          }
        }
      }

      .switch_section {
        .switch_icon_section {
          height: 2.4rem;
          width: 2.4rem;
          border: 1px solid ${(props) => props.theme.BodyPrimaryBg};
          padding: 0rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
`;

export default PSMWrapper;
