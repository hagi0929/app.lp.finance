import styled from "styled-components";

const ScreenLoaderWrapper = styled.div`
  .snipper {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;s
    background: ${(props) => props.theme.BodyMainBg};

    img {
      position: relative;
      width: auto;
      height: 6rem;
      animation: animate 4s infinite;
    }
    
    @keyframes animate {
      0% {
        transform: scale(1);
      }
      20% {
        transform: scale(1.1);
      }
      40% {
        transform: scale(1);
      }
      60% {
        transform: scale(1.1);
      }
      80% {
        transform: scale(1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

export default ScreenLoaderWrapper;
