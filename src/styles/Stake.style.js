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
        color: ${(props) => props.theme.BodyMainColor};
      }
    }

    .stake_section {
      .stake_left {
        .switch_section {
          width: 100%;

          .nav-tabs {
            width: 100%;
            border-bottom: 1px solid ${(props) => props.theme.BodyTraceryBg};
          }
          .nav-tabs .nav-item {
            width: 25%;
            text-align: center;
          }

          .nav-tabs .nav-item .nav-link {
            position: relative;
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.1rem;
            font-weight: 600;
            background-color: transparent;
            border: none;
            transition: hover 0.4s;
            padding: 0.6rem 2rem;
          }

          .nav-tabs .nav-item.show .nav-link,
          .nav-tabs .nav-link.active {
            &:before {
              content: "";
              position: absolute;
              left: 0px;
              bottom: 0;
              width: 100%;
              height: 2px;
              opacity: 1;
              background: ${(props) => props.theme.BodyTraceryBg};
              transition: 450ms all;
            }

            h1 {
              font-size: 1rem !important;
              letter-spacing: 0.4px !important;
              font-weight: 700 !important;
            }
          }

          .tab-content {
            padding: 1rem 0rem;

            .tab-pane {
              .switch_content {
                .switch_card {
                  .input_form {
                    position: relative;

                    .max_btn {
                      position: absolute;
                      top: 10px;
                      right: 8px;
                    }
                  }
                  tab-content .min_amount {
                    padding: 5px 0px 0px 12px;
                    p {
                      color: ${(props) => props.theme.BodyMainColor};
                      font-size: 0.8rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StakeWrapper;
