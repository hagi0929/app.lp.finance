import styled from "styled-components";

const NotifiWrapper = styled.div`
  .notifi {
    .notifi_section {
      .form_card {
        .title {
          h1 {
            font-size: 1.2rem;
          }
        }

        input[type="checkbox"] {
          position: relative;
          accent-color: white;
          height: 1rem;
          width: 1rem;
          background: transparent;
          color: black;
          cursor: pointer;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: none;
          left: 0px;
          top: 3px;
        }

        input[type="checkbox"]:before {
          content: "\f26b";
          font-family: Material-Design-Iconic-Font;
          font-size: 0.8rem;
          border: 1px solid #0c0;
          text-rendering: auto;
          border-radius: 3px;
          display: inline-block;
          height: 1.2rem;
          width: 1.2rem;
        }

        input[type="checkbox"]:checked:before {
          content: "\f26b";
          text-align: center;
          background-color: none;
          color: #0c0;
          padding: 0rem 0.2rem 0rem 0.2rem;
        }

        p {
          color: ${(props) => props.theme.BodyMainColor};
          font-size: 0.8rem;
        }
      }

      .notify_footer {
        span {
          a {
            color: ${(props) => props.theme.BodyTraceryBg};
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`;

export default NotifiWrapper;
