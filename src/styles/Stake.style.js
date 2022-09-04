import styled from "styled-components";

const StakeWrapper = styled.div`
  .Stake {
    .stake_title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .stake_subtitle {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: ${(props) => props.theme.HeaderSecondary};
      }
    }

    .switch {
      background: ${(props) => props.theme.BodyPrimaryBg};
      border-radius: 50px;
      padding: 0.2rem;

      p {
        color: ${(props) => props.theme.HeaderSecondary};
        padding: 0.5rem 2rem;
        cursor: pointer;
      }

      .active {
        color: ${(props) => props.theme.BodyMainColor};
        background: ${(props) => props.theme.BodySecondaryBg};
        border-radius: 50px;
      }
    }

    .stake_section {
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
    }
  }
`;

export default StakeWrapper;
