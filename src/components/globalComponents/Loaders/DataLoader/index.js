import React from "react";
import DataLoaderWrapper from "./DataLoader.style";

const DataLoader = () => {
  return (
    <DataLoaderWrapper>
      <div className="DataLoader_overlay">
        <div className="DataLoader">
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
    </DataLoaderWrapper>
  );
};

export default DataLoader;
