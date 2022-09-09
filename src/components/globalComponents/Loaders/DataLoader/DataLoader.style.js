import styled from "styled-components";

const DataLoaderWrapper = styled.div`
  .DataLoader_overlay {
    width: 100%;
    height: ${(props) => props.h};
    transition: all 0.1s;

    .DataLoader {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;

      .icon_div {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          animation: spin infinite 0.6s linear;
        }

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
  }
`;

export default DataLoaderWrapper;
