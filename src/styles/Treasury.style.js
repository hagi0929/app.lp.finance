import styled from "styled-components";

const TreasuryWrapper = styled.div`
  .Treasury {
    .Treasury_section {
      .Liquid_Staking,
      .Treasury_Details {
        .Liquid_title {
          p {
            color: ${(props) => props.theme.BodyMainColor};
            font-size: 1.3rem;
            font-weight: 500;
          }
        }

        .overview_img {
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

        .card_section {
          .details {
            .balance,
            .Earnings {
              p {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 0.95rem;
                font-weight: 600;
              }
              span {
                color: ${(props) => props.theme.BodyMainColor};
                font-size: 0.8rem;
              }
            }
          }
        }

        .overview_card {
          .bottom_borrow_img {
            position: relative;
            margin-top: 30px;

            hr {
              border: 1px solid ${(props) => props.theme.BodyMainColor};
              width: 0px;
              height: 100%;
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

          .details_cart_section {
            padding: 2rem 2rem;

            .details_cart_section_left {
              .cart {
                @property --p {
                  syntax: "<number>";
                  inherits: true;
                  initial-value: 0;
                }

                .pie {
                  --c: ${(props) => props.theme.BodyTraceryColor};
                  --b: 16px;
                  --w: 150px;
                  --p: ${(props) => props.pie};

                  width: 120px;
                  aspect-ratio: 1;
                  position: relative;
                  display: inline-block;
                  margin: 5px;
                  place-content: center;
                  transform: rotate(90deg);
                  cursor: pointer;
                }

                .pie:before,
                .pie:after {
                  content: "";
                  position: absolute;
                  border-radius: 50%;
                }

                .pie:before {
                  inset: 0;
                  background: radial-gradient(
                        farthest-side,
                        var(--c) 98%,
                        #0000
                      )
                      top/var(--b) var(--b) no-repeat,
                    conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
                  -webkit-mask: radial-gradient(
                    farthest-side,
                    #0000 calc(99% - var(--b)),
                    #000 calc(100% - var(--b))
                  );
                  mask: radial-gradient(
                    farthest-side,
                    #0000 calc(99% - var(--b)),
                    #000 calc(100% - var(--b))
                  );
                }

                .pie:after {
                  inset: calc(50% - var(--b) / 2);
                  background: var(--c);
                  transform: rotate(calc(var(--p) * 3.6deg))
                    translateY(calc(50% - var(--w) / 2));
                }

                .animate {
                  animation: ani 1s 0.5s both;
                }

                .no-round:before {
                  background-size: 0 0, auto;
                }

                .no-round:after {
                  content: none;
                }

                .totalSupplyPie {
                  position: absolute;
                  display: inline-block;
                  top: 22px;
                  left: 37px;
                  cursor: pointer;

                  img {
                    height: 85px;
                    width: auto;
                    border-radius: 50%;
                    z-index: -1;
                  }
                }

                @keyframes ani {
                  from {
                    --p: 0;
                  }
                }
              }

              .miter1,
              .miter2 {
                position: absolute;

                p {
                  color: ${(props) => props.theme.BodyMainColor};
                }
              }

              .miter1 {
                top: -10px;
                left: 119px;

                p {
                  line-height: 20px;
                }

                img {
                  width: 130px;
                }
              }

              .miter2 {
                left: 120px;
                top: 88px;

                p {
                  line-height: 0px;
                }

                img {
                  width: 130px;
                }
              }
            }

            .details_cart_section_right {
              .cart_details {
                p,
                span {
                  color: ${(props) => props.theme.BodyMainColor};
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .Treasury {
      .Treasury_section {
        .Liquid_Staking,
        .Treasury_Details {
          .Liquid_title {
            p {
              color: ${(props) => props.theme.BodyMainColor};
              font-size: 1.3rem;
              font-weight: 500;
              text-align: center;
            }
          }

          .overview_img {
            display: none;
          }

          .overview_card {
            .bottom_borrow_img {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export default TreasuryWrapper;
