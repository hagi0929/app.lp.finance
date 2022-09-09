import React from "react";
import DataLoaderWrapper from "./DataLoader.style";
import Image from "Layout/Image";

const DataLoader = (props) => {
  return (
    <DataLoaderWrapper {...props}>
      <div className="DataLoader_overlay">
        <div className="DataLoader">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="icon_div">
                  <Image
                    src="/images/Loader/Loader.png"
                    alt="Loader"
                    h={props?.size}
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
