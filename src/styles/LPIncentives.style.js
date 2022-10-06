import styled from "styled-components";

const LPIncentivesWrapper = styled.div`
  .LPIncentives {
    .LPIncentives_title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .LPIncentives_subtitle {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: ${(props) => props.theme.BodyMainColor};
        font-size: 1.1rem;
      }
    }

    .LPIncentives_table_section {
      .table_card {
        border: 1px solid ${(props) => props.theme.BodyMainColor};
        background: transparent;
        border-radius: 18px;
        max-height: auto;
        padding: 0rem 0.5rem;
        overflow-y: scroll;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          width: 7px;
          border-radius: 10px;
          background: inherit;
        }
        &::-webkit-scrollbar-track {
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 10px;
        }

        table {
          width: 100%;
          margin-bottom: 0rem;

          th {
            vertical-align: middle !important;
            border-top: none !important;
          }

          thead {
            tr {
              th {
                border-bottom: 3px solid ${(props) => props.theme.BodyPrimaryBg} !important;
                padding: 1.5rem 1.5rem;
                color: ${(props) => props.theme.BodyTraceryBg};
                font-size: 0.95rem;

                .icon_section {
                  position: relative;
                }
              }
            }
          }
          tbody {
            border-radius: 10px;
            tr {
              td {
                padding: 1rem 1.5rem;
                font-size: 0.98rem;
                border-bottom: 1px solid ${(props) => props.theme.BodyPrimaryBg};

                .details {
                  position: relative;

                  a {
                    text-decoration: none;
                    color: ${(props) => props.theme.BodyMainColor};
                    font-weight: inherit;
                    font-size: 1.05;
                    position: relative;
                  }

                  .toggle {
                    position: absolute;
                    left: 18px;
                  }
                }

                p {
                  color: ${(props) => props.theme.BodyMainColor};
                  font-size: 0.9rem;
                  display: flex;
                  align-items: center;
                }
                span {
                  font-size: 0.7rem;
                  color: ${(props) => props.theme.BodyMainColor};
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default LPIncentivesWrapper;
