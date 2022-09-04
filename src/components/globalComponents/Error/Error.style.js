import styled from "styled-components";

const ErrorWrapper = styled.div`
  .Error_Page {
    .Error {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        max-width: 60%;
      }
    }
  }

  @media only screen and (max-width: 800px) {
    .Error_Page {
      .Error {
        img {
          max-width: 100%;
        }
      }
    }
  }
`;

export default ErrorWrapper;
