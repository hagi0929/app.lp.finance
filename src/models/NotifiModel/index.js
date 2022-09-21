import React, { useEffect, memo } from "react";
import NotifiWrapper from "./NotifiModel.style";
import Notifi from "components/Notifi";

const NotifiModel = ({ isOpen, isClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  return (
    <NotifiWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid Notifi_section">
            <div className="row Notifi_top_Section">
              <div className="col-8 d-flex align-items-center">
                <div className="title">
                  <p>Get Notification</p>
                </div>
              </div>
              <div className="col-4 close d-flex justify-content-end">
                <i className="zmdi zmdi-close" onClick={CloseModel} />
              </div>
            </div>
            <div className="row Notifi_bottom_Section mt-3">
              <Notifi />
            </div>
          </div>
        </div>
      </div>
    </NotifiWrapper>
  );
};

export default memo(NotifiModel);
