import React from "react";
import ScreenLoaderWrapper from "./ScreenLoader.style";

const ScreenLoader = () => {
  return (
    <ScreenLoaderWrapper>
      <div className="ScreenLoader_overlay">
        <div className="ScreenLoader">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="icon_div">
                  <img
                    src="/images/Loaders/Loader.png"
                    alt="Loading..."
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenLoaderWrapper>
  );
};

export default ScreenLoader;
