import styled from "styled-components";

const ScreenLoaderWrapper = styled.div`
  .ScreenLoader_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.BodyMainBg};
    visibility: visible;
    opacity: 0.6;
    z-index: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
      background: inherit;
    }
    .ScreenLoader {
      position: relative;
      visibility: visible;
      z-index: 1;
      opacity: 1;
      height: auto !important;
      width: auto !important;
      margin: auto;
      border-radius: 15px;

      .icon_div {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: auto;
          height: 3rem;
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

export default ScreenLoaderWrapper;
