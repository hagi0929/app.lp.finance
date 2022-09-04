import styled from "styled-components";

const BorrowTabWrapper = styled.div`
  .borrow_tab_section {
    .tabs_card {
      .nav,
      .nav-tabs {
        padding: 0rem;
        border-bottom: 0px;
        width: 100% !important;

        .nav-link {
          position: relative;
          padding: 1.4rem 0rem;
          width: 100%;
          text-align: center;
          font-size: 1.2rem;
          color: ${(props) => props.theme.BodyMainColor};
          margin-bottom: none;
          border: 0px solid transparent;
          border-top-left-radius: none;
          border-top-right-radius: none;
          z-index: 100;
          cursor: pointer;

          &.active {
            color: ${(props) => props.theme.BodyMainColor};
            background: ${(props) => props.theme.BodySecondaryBg};
            backdrop-filter: ${(props) => props.theme.BodyFilter};
            border-radius: 20px 20px 0px 0px;
            top: 1px;

            &::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 20px 20px 0px 0px;
              border-top: 2px solid transparent;
              border-right: 2px solid transparent;
              border-left: 2px solid transparent;
              border-bottom: 0px solid transparent;
              background: ${(props) => props.theme.BodyMainLine};
              -webkit-mask: ${(props) => props.theme.BodyMask};
              -webkit-mask-composite: destination-out;
              -moz-mask: ${(props) => props.theme.BodyMask};
              -moz-mask-composite: destination-out;
              -o-mask: ${(props) => props.theme.BodyMask};
              -o-mask-composite: destination-out;
              mask-composite: exclude;
            }
          }

          &:hover {
            border: none;
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
        padding: 2rem 2rem;
        z-index: 500;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          background: ${(props) => props.theme.BodyMainLine};
          -webkit-mask: ${(props) => props.theme.BodyMask};
          -webkit-mask-composite: destination-out;
          -moz-mask: ${(props) => props.theme.BodyMask};
          -moz-mask-composite: destination-out;
          -o-mask: ${(props) => props.theme.BodyMask};
          -o-mask-composite: destination-out;
          mask-composite: exclude;
        }

        .deposit {
          .deposit_card {
            .input_form {
              position: relative;

              .max_btn {
                position: absolute;
                top: 10px;
                left: 10px;
              }
            }
          }

          .details {
            .btn_section {
              button {
                color: ${(props) => props.theme.BodyMainColor};
                border: none;
                background: ${(props) => props.theme.BodySecondaryBg};
                padding: 0.6rem 3.5rem;
              }
            }
          }
        }
      }
    }

    .borrow_Account {
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
          border: 1px solid white;
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
        .chart_miters {
          border: 1px solid ${(props) => props.theme.BodyMainColor};
          height: 0.8rem;
          position: relative;
          width: 100%;

          .pie1 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: ${(props) => props.pieLTV}%;
            background: #884b99;
            left: 0;
            cursor: pointer;
          }

          .pie2 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: 2%;
            background: #e3319c;
            right: 15px;
            cursor: pointer;
          }

          .pie3 {
            position: absolute;
            display: inline-block;
            height: 100%;
            width: 2%;
            background: #41bbe5;
            right: 48px;
            cursor: pointer;
          }

          .pie1 .pie1_tooltip,
          .pie2 .pie2_tooltip,
          .pie3 .pie3_tooltip {
            visibility: hidden;
            min-width: 150px;
            background: ${(props) => props.theme.BodySecondaryBg};
            color: ${(props) => props.theme.BodyMainColor};
            text-align: center;
            border-radius: 6px;
            padding: 0.5rem 0.5rem;
            position: absolute;
            z-index: 1;
            bottom: 195%;
            left: 50%;
            font-size: 0.8rem;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.5s;
          }

          .pie1 .pie1_tooltip::after,
          .pie2 .pie2_tooltip::after,
          .pie3 .pie3_tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-bottom: 10px;
            border-width: 5px;
            border-style: solid;
            border-color: #009dd9 transparent transparent transparent;
          }

          .pie1 .pie1_tooltip::after {
            margin-left: -5px;
          }

          .pie2 .pie2_tooltip::after {
            margin-left: -20px;
          }

          .pie3 .pie3_tooltip::after {
            margin-left: -20px;
          }

          .pie1:hover .pie1_tooltip,
          .pie2:hover .pie2_tooltip,
          .pie3:hover .pie3_tooltip {
            visibility: visible;
            opacity: 1;
          }
        }

        table {
          tr {
            td {
              padding: 0.5rem 0rem;
            }

            .left {
              vertical-align: top;

              p {
                color: ${(props) => props.theme.BodyTraceryColor};
                font-weight: bold;
                font-size: 1.5rem;
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
    .borrow_tab_section {
      .tabs_card {
        .tab-content {
          padding: 2.5rem 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .borrow_tab_section {
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
    .borrow_tab_section {
      .tabs_card {
        .nav,
        .nav-tabs {
          .nav-link {
            padding: 1rem 0rem;
          }
        }
      }

      .borrow_Account {
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

        .Account_card {
          .chart_miters {
            .pie2 {
              right: 10px;
            }

            .pie3 {
              right: 25px;
            }

            .pie1 .pie1_tooltip,
            .pie2 .pie2_tooltip,
            .pie3 .pie3_tooltip {
              margin-left: -120px;
            }

            .pie2 .pie2_tooltip::after {
              margin-left: 40px;
            }

            .pie3 .pie3_tooltip::after {
              margin-left: 40px;
            }
          }
        }
      }
    }
  }
`;

export default BorrowTabWrapper;
