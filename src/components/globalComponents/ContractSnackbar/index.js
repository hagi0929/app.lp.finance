import React, { useEffect } from "react";
import ContractSnackbarWrapper from "./ContractSnackbar.style";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";

const ContractSnackbar = () => {
  const {
    CloseContractSnackbar,
    isOpenContractSnackbar,
    ContractSnackbarMess,
    ContractSnackbarType,
  } = useContractSnackbar();

  const handleClose = () => {
    const toast = document.querySelector(".ContractSnackbar");
    const progress = document.querySelector(".progress_bar");
    toast.classList.remove("active");
    progress.classList.remove("active");
    CloseContractSnackbar();
  };

  useEffect(() => {
    if (isOpenContractSnackbar === true) {
      const toast = document.querySelector(".ContractSnackbar");
      toast.classList.add("show");
    }
  }, [isOpenContractSnackbar]);

  useEffect(() => {
    if (
      isOpenContractSnackbar === true &&
      ContractSnackbarType !== "Progressing"
    ) {
      const toast = document.querySelector(".ContractSnackbar");
      const progress = document.querySelector(".progress_bar");
      progress.classList.add("active");

      const timer = setTimeout(() => {
        toast.classList.remove("show");
        progress.classList.remove("active");
        CloseContractSnackbar();
      }, 10000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContractSnackbarType !== "Progressing"]);

  return (
    <>
      {isOpenContractSnackbar && (
        <>
          <ContractSnackbarWrapper>
            <div className="ContractSnackbar">
              <div className="ContractSnackbar_content">
                <div className="status_section">
                  <div className="status">
                    {ContractSnackbarType === "Progressing" && (
                      <img
                        src="/images/Loader/Loader.png"
                        alt="progressing"
                        loading="lazy"
                      />
                    )}
                    {ContractSnackbarType === "Success" && (
                      <i className="zmdi zmdi-check-circle Success" />
                    )}
                    {ContractSnackbarType === "Info" && (
                      <i className="zmdi zmdi-info-outline Info" />
                    )}
                    {ContractSnackbarType === "Error" && (
                      <i className="zmdi zmdi-close-circle-o Error" />
                    )}
                    <span className={ContractSnackbarType}>
                      {ContractSnackbarType}
                    </span>
                  </div>
                  {ContractSnackbarType !== "Progressing" && (
                    <div className="close_ContractSnackbar">
                      <i
                        className="zmdi zmdi-close"
                        onClick={() => handleClose()}
                      />
                    </div>
                  )}
                </div>
                <div className="message_section">
                  <span>{ContractSnackbarMess}</span>
                </div>

                <div className="progress_bar"></div>
              </div>
            </div>
          </ContractSnackbarWrapper>
        </>
      )}
    </>
  );
};

export default ContractSnackbar;
