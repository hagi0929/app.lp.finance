import styled from "styled-components";

const FooterWrapper = styled.div`
  .footer {
    max-width: 100% !important;
    margin: auto;
    padding: 1rem 0rem 0rem 0rem;
    min-height: 10rem;
    background: ${(props) => props.theme.BodySecondaryBg};
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

    hr {
      height: 1px;
      margin: 10px 0px;
      background: ${(props) => props.theme.BodyPrimaryBg};
    }

    .top_section {
      .footer_logo {
        img {
          height: 4.8rem;
          width: auto;
        }
      }
      ul {
        li {
          padding: 0rem 1rem;
          a {
            color: white;
            font-size: 1.7rem;

            .foot_icon {
              color: ${(props) => props.theme.BodyMainColor};
            }
          }
        }
      }
    }

    .bottom_section {
      padding: 0rem 0rem 1rem 0rem;

      .copyright {
        p {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 0.9rem;
          width: 230px;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .footer {
      .top_section {
        .footer_logo {
          display: flex;
          justify-content: flex-start;
        }
        ul {
          li {
            padding: 0rem 0.5rem;
          }
        }
      }
    }
  }
`;

export default FooterWrapper;
