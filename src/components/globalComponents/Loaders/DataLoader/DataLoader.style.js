import styled from "styled-components";

const DataLoaderWrapper = styled.div`
  .DataLoader_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;

    .DataLoader {
      position: relative;
      height: auto !important;
      width: auto !important;
      margin: auto;
      z-index: 1;

      .icon_div {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: auto;
          height: 2rem;
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
