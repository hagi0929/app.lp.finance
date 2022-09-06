import styled from "styled-components";

const SwapWrapper = styled.div`
  .swap {
    .swap_section {
      width: 100%;

      .title {
        display: flex;
        justify-content: center;

        h1 {
          font-size: 1.6rem;
        }
      }

      .swap_card {
        .swap_form {
          .swapPay_section,
          .swapReceive_section {
            .title {
              font-size: 0.92rem;
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
                  font-size: 1rem;
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

          .switch_swap_section {
            .switch_icon_section {
              height: 2rem;
              width: 2rem;
              background: ${(props) => props.theme.BodyPrimaryBg};
              padding: 0.1rem;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;

              .switch_icon {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 1.4rem;
              }
            }
          }

          .routes_section {
            .route_card {
              border: 1px solid ${(props) => props.theme.BodyPrimaryBg};
              border-radius: 10px;
              position: relative;

              .bestSwap {
                position: absolute;
                color: ${(props) => props.theme.BodyMainColor};
                background: ${(props) => props.theme.BodyPrimaryBg};
                padding: 0.1rem 0.3rem;
                border-radius: 5px;
                font-size: 0.6rem;
                top: -10px;
              }

              .routes_details {
                .names {
                  .fullName {
                    overflow: hidden;
                    width: 100%;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    color: ${(props) => props.theme.BodyMainColor};
                    line-height: 10px;

                    span {
                      font-size: 0.78rem;
                      font-weight: 500;
                    }
                  }
                }

                .tokens {
                  span {
                    font-size: 0.73rem;
                    color: ${(props) => props.theme.BodySecondaryColor};
                  }
                }
              }
            }
          }

          .swap_details {
            padding: 0 0.8rem;

            .title_section {
              .title {
                font-size: 0.85rem;
                font-size: 500;
                color: ${(props) => props.theme.BodyMainColor};
              }

              .settings {
                .refresh,
                .slippage {
                  background: ${(props) => props.theme.BodyPrimaryBg};
                  border-radius: 50%;
                  cursor: pointer;

                  i {
                    color: ${(props) => props.theme.BodyMainColor};
                  }
                }

                .refresh {
                  i {
                    font-size: 0.95rem;
                    padding: 2px 5.5px;
                  }

                  .animate {
                    animation: spin infinite 1.5s linear;

                    @keyframes spin {
                      0% {
                        transform: rotate(0);
                      }

                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  }
                }
                .slippage {
                  i {
                    font-size: 0.85rem;
                    padding: 2px 6px;
                  }
                }
              }
            }

            .swap_details_card {
              .details_title {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 0.8rem;
              }
              .details_subtitle {
                p {
                  color: ${(props) => props.theme.BodyMainColor};
                  font-size: 0.8rem;

                  .switch {
                    color: ${(props) => props.theme.BodyMainColor};
                    font-size: 0.9rem;
                    transform: rotate(90deg);
                    cursor: pointer;
                  }
                }
              }
              .other_details {
                p,
                span {
                  color: ${(props) => props.theme.BodyMainColor};
                  font-size: 0.8rem;
                }
                .text-green {
                  color: green;
                }
                .text-red {
                  color: red;
                }
              }
            }
          }
        }
      }

      .TradingView_section {
        width: 100%;
        .nav-tabs {
          width: 100%;
          border-bottom: 1px solid ${(props) => props.theme.BodyTraceryBg};
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
          position: relative;
          color: ${(props) => props.theme.BodyMainColor} !important;
          font-size: 1.2rem;
          font-weight: 600;
          background-color: transparent;
          border: none;
          transition: hover 0.4s;
          padding-bottom: 10px;
          padding: 0.4rem 2rem 0.4rem 2rem;

          &:before {
            content: "";
            position: absolute;
            left: 0px;
            bottom: 0;
            width: 100%;
            height: 2px;
            opacity: 1;
            background: ${(props) => props.theme.BodyMainColor};
            transition: 450ms all;
          }

          h1 {
            font-size: 1rem !important;
            letter-spacing: 0.4px !important;
            font-weight: 700 !important;
          }
        }

        .tab-content {
          .tab-pane {
            .TradingView_chart {
              .trading_name {
                color: ${(props) => props.theme.BodyMainColor};
                opacity: 0.8;
                font-size: 0.9rem;
              }

              .trading_Details {
                .price {
                  font-size: 1.2rem;
                  font-weight: 600;
                  color: ${(props) => props.theme.BodyMainColor};

                  .text-green {
                    color: #57ab73;
                    opacity: 0.8;
                  }

                  .text-red {
                    color: #cc4f4f;
                    opacity: 0.8;
                  }

                  span {
                    font-size: 0.8rem;
                  }
                }

                .time {
                  color: ${(props) => props.theme.BodyMainColor};
                  opacity: 0.8;
                  font-size: 0.78rem;
                }
              }

              .trading_timers {
                button {
                  border: none;
                  background: transparent;
                  font-weight: 600;
                  font-size: 0.8rem;
                }

                .active {
                  color: ${(props) => props.theme.BodyMainColor};
                  border: 1px solid ${(props) => props.theme.BodyMainColor};
                  border-radius: 10px;
                  padding: 0.2rem 0.6rem;
                }

                .notActive {
                  color: ${(props) => props.theme.BodyMainColor};
                }
              }

              .accordion {
                width: 100%;
              }

              .accordion-tab {
                border-top: 1px solid ${(props) => props.theme.BodyTraceryBg};
                border-bottom: 1px solid ${(props) => props.theme.BodyTraceryBg};
              }

              .accordion-tab .accordion-toggle {
                display: none;
              }

              .accordion-tab > label {
                font-size: 1rem;
                position: relative;
                margin-bottom: 0rem;
                display: block;
                padding: 1.2rem 1rem;
                cursor: pointer;
                transition: all 0.4s;

                .TokenInfo {
                  .TokenInfo_left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .img_section img {
                      height: 1.7rem;
                      width: auto;
                      border-radius: 50%;
                    }

                    .name {
                      display: flex;
                      flex-direction: column;
                      text-align: start;

                      p {
                        color: ${(props) => props.theme.BodyMainColor};
                        opacity: 0.9;
                        font-size: 1rem;
                        font-weight: 600;
                      }

                      span {
                        font-size: 0.7rem;
                        color: ${(props) => props.theme.BodyMainColor};
                        opacity: 0.6;
                      }
                    }
                  }

                  .TokenInfo_right {
                    .details {
                      display: flex;
                      flex-direction: row;
                      align-items: center;

                      p,
                      span {
                        color: ${(props) => props.theme.BodyMainColor};
                        opacity: 0.8;
                        font-size: 0.9rem;
                      }

                      .text-green {
                        color: #57ab73;
                      }

                      .text-red {
                        color: #cc4f4f;
                      }
                    }
                  }
                }
              }

              .accordion-tab > label:hover {
                background: rgba(255, 255, 255, 0.1);
              }

              .accordion-tab > label:after {
                content: "\f2f9";
                position: absolute;
                display: inline-block;
                color: white;
                font-size: 1.2rem;
                font-family: "Material-Design-Iconic-Font";
                top: 24.5px;
                right: 25px;
                transform: rotate(0deg);
                transition: transform 0.4s;
              }

              .accordion-tab > .accordion-toggle:checked ~ label:after {
                transform: rotate(180deg);
                transition: transform 0.4s;
              }

              .accordion-tab > .accordion-content {
                max-height: 0px;
                transition: max-height 0.4s;
                overflow: hidden;

                .accordion-content-section {
                  padding: 0.6rem 1rem 1.3rem 0.6rem;
                }

                .accordion-content-Header {
                  p {
                    color: ${(props) => props.theme.BodyMainColor};
                    opacity: 0.8;
                    font-size: 1.15rem;
                    font-weight: 600;
                  }
                }

                .accordion-content-list {
                  .list_card {
                    border: 1px solid #333333;
                    border-radius: 10px;
                    padding: 0.5rem 1rem;

                    .accordion_title {
                      p {
                        color: ${(props) => props.theme.BodyMainColor};
                        opacity: 0.7;
                        font-size: 0.8rem;
                      }
                    }

                    .value {
                      span {
                        margin-top: 3px;
                        color: ${(props) => props.theme.BodyMainColor};
                        font-size: 1.2rem;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        flex-direction: row;

                        p {
                          font-size: 0.8rem;
                        }

                        .text-green {
                          color: #57ab73;
                          opacity: 0.7;
                        }

                        .text-red {
                          color: #cc4f4f;
                          opacity: 0.8;
                        }
                      }
                      p {
                        color: ${(props) => props.theme.BodyMainColor};
                        opacity: 0.7;
                        font-size: 0.7rem;
                      }
                    }
                  }
                }
              }

              .accordion-tab > .accordion-toggle:checked ~ .accordion-content {
                max-height: 100vh;
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 907px) {
    .swap {
      .swap_section {
        .TradingView_section {
          .tab-content {
            .tab-pane {
              .TradingView_chart {
                .accordion-tab > label {
                  padding: 1.2rem 0.5rem;
                }

                .accordion-tab > label:after {
                  right: 20px;
                }
                .accordion-tab > .accordion-content {
                  .accordion-content-section {
                    padding: 0.6rem 0.5rem 1.3rem 0.5rem;
                  }
                }

                .accordion-tab
                  > .accordion-toggle:checked
                  ~ .accordion-content {
                  max-height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default SwapWrapper;
