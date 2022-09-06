import React from "react";
import ScreenLoaderWrapper from "./ScreenLoader.style";

const ScreenLoader = () => {
  return (
    <>
      <ScreenLoaderWrapper>
        <div className="snipper">
          <img src="/images/Logo.png" alt="Loading..." loading="lazy" />
        </div>
      </ScreenLoaderWrapper>
    </>
  );
};

export default ScreenLoader;
