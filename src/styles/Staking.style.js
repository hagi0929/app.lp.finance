import styled from "styled-components";

const StakingWrapper = styled.div`
  .Staking {
    .Staking_title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .Staking_subtitle {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: ${(props) => props.theme.BodyMainColor};
        font-size: 1.1rem;
      }
    }

    .staking_overview {
      .overview_title {
        p {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 1.6rem;
          font-weight: 900;
          font-style: normal;
          font-weight: 400;
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

        .details_card {
          .card_right {
            border-left: 3px solid ${(props) => props.theme.BodyMainColor};
          }

          .card_right,
          .card_left {
            .list_section {
              table {
                tr {
                  td {
                    color: ${(props) => props.theme.BodyMainColor};
                  }

                  .list_section_right {
                    padding-left: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .Staking {
      .staking_overview {
        .overview_title {
          p {
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
          .details_card {
            .card_right {
              border-left: none;
            }
          }
        }
      }
    }
  }
`;

export default StakingWrapper;
