import styled from "styled-components";

const LPFarmingTabWrapper = styled.div`
  .LPFarming_tab_section {
    .tabs_card {
      .nav,
      .nav-tabs {
        padding: 0rem;
        border-bottom: 0px;
        width: 100% !important;

        .nav-link {
          padding: 1.4rem 0rem;
          width: 100%;
          text-align: center;
          font-size: 1.2rem;
          color: ${(props) => props.theme.BodyMainColor};
          margin-bottom: none;
          border: 0px solid transparent;
          border-top-left-radius: none;
          border-top-right-radius: none;
          cursor: pointer;
          top: 1px;

          &.active {
            color: ${(props) => props.theme.BodyMainColor};
            background: ${(props) => props.theme.BodySecondaryBg};
            border: 1px solid ${(props) => props.theme.BodyMainColor};
            border-radius: 20px 20px 0px 0px;
          }
        }
      }

      .tabContentToggle1 {
        border-radius: 20px 0px 20px 20px;

        &::before {
          border-radius: 20px 0px 20px 20px;
        }
      }

      .tabContentToggle2 {
        border-radius: 0px 20px 20px 20px;

        &::before {
          border-radius: 0px 20px 20px 20px;
        }
      }

      .tabContentToggle3 {
        border-radius: 20px;

        &::before {
          border-radius: 20px;
        }
      }

      .tab-content {
        position: relative;
        width: 100%;
        min-height: 115px;
        background: ${(props) => props.theme.BodySecondaryBg};
        border: 1px solid ${(props) => props.theme.BodyMainColor};
        padding: 2rem 2.5rem;

        .deposit,
        .withdraw {
          .deposit_card,
          .withdraw_card {
            .input_form {
              position: relative;

              .max_btn {
                position: absolute;
                top: 10px;
                left: 10px;
              }
            }

            .model_btn {
              button {
                position: relative;
                .toggle {
                  position: absolute;
                  left: 22px;
                }
              }
            }
          }
        }
      }
    }

    .LPFarming_Account {
      .Account_title {
        p {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 1.6rem;
          font-weight: 900;
          font-style: normal;
          font-weight: 400;
        }
      }

      .right_arrow_img {
        position: relative;

        hr {
          border: 1px solid ${(props) => props.theme.BodyMainColor};
          width: 100%;
        }

        img {
          position: absolute;
          transform: rotate(-90deg);
          right: -10px;
          top: -4px;
          width: auto;
          height: 0.6rem;
        }
      }

      .bottom_arrow_img {
        position: relative;
        margin-top: 30px;

        hr {
          position: relative;
          border: 1px solid ${(props) => props.theme.BodyMainColor};
          width: auto;
          height: 100%;
          top: 0px;
          margin-top: 0rem !important;
          margin-bottom: 0rem !important;
        }

        img {
          position: absolute;
          transform: translate(-50%, 50%);
          bottom: 0px;
          width: auto;
          height: 0.6rem;
        }
      }

      .Account_card {
        table {
          tr {
            td {
              padding: 0.5rem 0rem;
            }

            .left {
              vertical-align: top;

              p {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 1.3rem;
              }

              span {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 0.8rem;
              }
            }

            .right {
              span {
                color: ${(props) => props.theme.BodyMainColor};
              }

              .Collateral_list {
                .Collateral_list_details {
                  img {
                    height: 1, 7rem;
                    width: 1.7rem;
                  }
                }
                .Collateral_list_Price,
                .Collateral_list_APY {
                  p {
                    font-size: 0.8rem;

                    img {
                      height: 1rem;
                      width: auto;
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

  @media only screen and (max-width: 1200px) {
    .LPFarming_tab_section {
      .tabs_card {
        .tab-content {
          padding: 2.5rem 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .LPFarming_tab_section {
      .tabs_card {
        .nav-tabs {
          .nav-link {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .LPFarming_tab_section {
      .tabs_card {
        .nav,
        .nav-tabs {
          .nav-link {
            padding: 1rem 0rem;
          }
        }
      }

      .LPFarming_Account {
        .Account_title {
          p {
            text-align: center;
          }
        }

        .right_arrow_img {
          display: none;
        }

        .bottom_arrow_img {
          display: none;
        }
      }
    }
  }
`;

export default LPFarmingTabWrapper;
