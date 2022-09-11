import React, { useEffect, memo } from "react";
import TokenWrapper from "./CliModel.style";
import Input from "Layout/Form/Input";

const CliModel = ({ isOpen, isClose }) => {
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
    <TokenWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid terminal_section">
            <div className="row">
              <div className="col-12">
                <div className="terminal_title">
                  <div className="row">
                    <div className="col-6">
                      <p>Terminal</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center close">
                      <i className="zmdi zmdi-close" onClick={CloseModel} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row terminal_content">
              <div className="col-12">
                <div className="terminal_card d-flex align-items-center">
                  <p>app.lp.finance:~$</p>
                  <Input type="text" className="pl-1" autoFocus />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenWrapper>
  );
};

export default memo(CliModel);
