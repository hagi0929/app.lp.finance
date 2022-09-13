import React, { useEffect, memo } from "react";
import TokenWrapper from "./MainModel.style";
import Image from "Layout/Image";
import Button from "Layout/Button";

const MainModel = ({ isOpen, isClose }) => {
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
          <div className="container-fluid Main_section">
            <div className="row">
              <div className="col-12">
                <div className="card_Section">
                  <div className="logo">
                    <Image src="/logo192.png" alt="logo" h="5rem" />
                    <p>Welcome User!</p>
                  </div>
                  <div className="content text-center">
                    <p>
                      Mainnet application is currently in construction. Visit{" "}
                      <a
                        href="https://test.lp.finance/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        test.lp.finance
                      </a>{" "}
                      for devnet application. For more questions, reach out to
                      Thank you.
                    </p>
                    <p className="my-3">
                      <a
                        href="mailto:contact@lp.finance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="main_link mt-5"
                      >
                        contact@lp.finance
                      </a>
                    </p>
                    <p> Thank you.</p>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-10">
                      <Button
                        active={1}
                        br="10px"
                        p="0.5rem"
                        onClick={() => CloseModel()}
                      >
                        Ok
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenWrapper>
  );
};

export default memo(MainModel);
