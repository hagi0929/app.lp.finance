import styled from "styled-components";

const HeaderWrapper = styled.div`
  .sideNav {
    position: fixed;
    height: 100%;
    width: 0px;
    z-index: 1000;
    top: 0;
    left: 0;
    border-radius: 0px 12px 12px 0px;
    background: ${(props) => props.theme.BodySecondaryBg};
    border: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    overflow-x: hidden;
    transition: 0.2s;
    padding-bottom: 13rem;

    .small_logo {
      height: 3.8rem;
      width: auto;
    }

    .closeBtn {
      font-size: 40px;
      cursor: pointer;

      .close_icon {
        font-size: 1.8rem;
        color: ${(props) => props.theme.BodyMainColor};
      }
    }

    ul {
      list-style-type: none;

      li {
        a,
        p {
          padding: 10px 8px 10px 0px;
          text-decoration: none;
          font-size: 0.9rem;
          color: ${(props) => props.theme.BodyMainColor};
          display: block;
          transition: all 0.2s;
        }
      }
    }

    .Wallet {
      position: relative;

      button {
        background: ${(props) => props.theme.BodySecondaryBg};
        border: 1px solid ${(props) => props.theme.BodyMainColor};
        color: ${(props) => props.theme.BodyMainColor};
        font-style: normal;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        height: 48px;
        width: 220px;
        padding: 0.5rem 2rem;
        border-radius: 50px;
      }
    }
  }

  .navbar_component {
    background: inherit !important;

    nav {
      padding: 0.3rem 0.8rem;
      justify-content: inherit !important;

      .navbar-brand {
        flex-grow: 0 !important;

        img {
          height: 5rem;
          width: auto;
        }
      }

      .navbar-icon {
        color: ${(props) => props.theme.BodyMainColor};
        display: none;
        font-size: 1.6rem;
        cursor: pointer;
      }

      .left_ui_block {
        display: flex !important;

        .left_ui_block_hide {
          display: flex !important;

          li {
            padding-left: 0.1rem;
            padding-right: 0.1rem;

            .nav-link {
              position: relative;
              color: ${(props) => props.theme.BodyMainColor};
              font-weight: 500;
              font-size: 1rem;
              text-align: center;
              padding: 0.4rem 1rem 0.4rem 1rem;
              transition: hover 0.4s;
              padding-bottom: 10px;

              &:before {
                content: "";
                position: absolute;
                left: 0px;
                bottom: 0;
                width: 100%;
                height: 2px;
                opacity: 0;
                background: ${(props) => props.theme.BodyMainColor};
                transition: 450ms all;
              }

              &:hover {
                color: ${(props) => props.theme.BodyMainColor};

                &:before {
                  opacity: 1;
                }
              }
            }

            .active {
              position: relative;
              color: ${(props) => props.theme.BodyMainColor} !important;
              font-weight: 500;
              font-size: 1rem;
              text-align: center;
              padding: 0.4rem 1rem 0.4rem 1rem;
              transition: hover 0.4s;
              padding-bottom: 10px;
              text-decoration: none;

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
            }

            .img_section {
              background: linear-gradient(90deg, #8b4898 0%, #009dd9 102.51%);
              padding: 0.5rem 2rem;
              border-radius: 16px;
              cursor: pointer;

              .network_img {
                width: auto;
                height: 1.5rem;
              }
            }

            .Wallet_section {
              position: relative;
              margin-left: 0.5rem;

              button {
                background: ${(props) => props.theme.BodySecondaryBg};
                border: 1px solid ${(props) => props.theme.BodyMainColor};
                color: ${(props) => props.theme.BodyMainColor};
                font-style: normal;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                height: 48px;
                padding: 0.5rem 0rem;
                border-radius: 50px;
                width: 180px;
              }
            }

            .btn-group {
              width: 100%;

              .dropdown_btn {
                background: transparent;
                margin-left: 10px;

                .setting {
                  color: ${(props) => props.theme.BodyMainColor};
                  font-size: 1.3rem;
                }
              }

              .dropdown-menu {
                position: absolute !important;
                background: ${(props) => props.theme.BodySecondaryBg};
                border: 1px solid ${(props) => props.theme.BodyTraceryBg};
                margin: 1.7rem 0 0;
                padding: 0rem;
                border-radius: 8px;
                transition: all 0.2s;
                opacity: 1;
                overflow: hidden;
                transform-origin: top center;
                transform: scale(1, 0);
                display: block;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                width: 350px;

                .dropdown-item {
                  padding: 1rem;
                  margin: 0rem 0rem;
                  width: 100%;
                  transition: all 0.2s;

                  .title {
                    p {
                      color: ${(props) => props.theme.BodyMainColor};
                      font-size: 1.1rem;
                      font-weight: 600;
                      border-bottom: 2px solid
                        ${(props) => props.theme.BodyMainColor};
                      padding-bottom: 7px;
                    }

                    span {
                      color: ${(props) => props.theme.BodyMainColor};
                      font-size: 1rem;
                    }
                  }

                  .networks_card {
                    background: ${(props) => props.theme.BodyPrimaryBg};
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .name,
                    .checked {
                      p,
                      i {
                        color: ${(props) => props.theme.BodyMainColor};
                      }
                    }

                    .checked {
                      width: 100%;
                      text-align: end;
                    }
                  }

                  &:hover {
                    background: ${(props) => props.theme.BodyPrimaryBg};
                  }
                  $:focus {
                    background: ${(props) => props.theme.BodyPrimaryBg};
                  }
                }
                .dropdown-item:hover > span,
                .dropdown-item:hover > profile_icon {
                  color: ${(props) => props.theme.BodyMainColor};
                }
              }
              &.show {
                .dropdown-menu {
                  transform: scale(1);
                }
              }
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1216px) {
    .navbar_component {
      nav {
        padding: 0.2rem 0rem;

        .navbar-brand {
          img {
            height: 4.3rem;
            width: auto;
          }
        }

        .navbar-icon {
          display: block;
        }

        .left_ui_block {
          .Network_section {
            display: flex;
          }

          .left_ui_block_hide {
            display: none !important;
          }
        }

        button {
          display: none;
        }
      }
    }
  }
`;

export default HeaderWrapper;
