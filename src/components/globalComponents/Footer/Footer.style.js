import styled from "styled-components";

const FooterWrapper = styled.div`
  .footer {
    max-width: 100% !important;
    margin: auto;
    padding: 1rem 0rem 0rem 0rem;
    min-height: 10rem;
    background: ${(props) => props.theme.BodyMainBg};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;

    .top_section {
      border-top: 1px solid ${(props) => props.theme.BodyMainColor};
      border-bottom: 1px solid ${(props) => props.theme.BodyMainColor};
      padding: 0.8rem 0rem;

      .footer_logo {
        img {
          height: 5rem;
          width: auto;
        }
      }

      ul {
        li {
          padding: 0rem 1rem;
          display: flex;
          align-items: center;

          a {
            display: flex;
            align-items: center;
            color: white;
            font-size: 1.7rem;
          }
        }
      }
    }

    .bottom_section {
      padding: 0.5rem 0rem 1rem 0rem;

      .copyright {
        p {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 0.9rem;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .footer {
      padding: 0rem 0rem 0rem 0rem;

      .top_section {
        .footer_logo {
          display: flex;
          justify-content: center;
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
