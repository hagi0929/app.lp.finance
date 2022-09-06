import React, { useEffect } from "react";
import SnackbarWrapper from "./Snackbar.style";
import { useSnackbar } from "contexts/SnackbarContext";

const Snackbar = () => {
  const { CloseSnackbar, isOpenSnackbar, SnackbarMess, SnackbarType } =
    useSnackbar();

  const handleClose = () => {
    const toast = document.querySelector(".Snackbar");
    const progress = document.querySelector(".progress_bar");
    toast.classList.remove("active");
    progress.classList.remove("active");
    CloseSnackbar();
  };

  useEffect(() => {
    if (isOpenSnackbar === true) {
      const toast = document.querySelector(".Snackbar");
      const progress = document.querySelector(".progress_bar");
      toast.classList.add("active");
      progress.classList.add("active");

      const timer = setTimeout(() => {
        toast.classList.remove("active");
        progress.classList.remove("active");
        CloseSnackbar();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpenSnackbar, CloseSnackbar]);

  return (
    <>
      {isOpenSnackbar && (
        <>
          <SnackbarWrapper>
            <div className="Snackbar">
              <div className="Snackbar_content">
                <div className="status_section">
                  <div className="status">
                    {SnackbarType === "Success" && (
                      <i className="zmdi zmdi-check-circle Success" />
                    )}
                    {SnackbarType === "Info" && (
                      <i className="zmdi zmdi-info-outline Info" />
                    )}
                    {SnackbarType === "Error" && (
                      <i className="zmdi zmdi-close-circle-o Error" />
                    )}
                    <span className={SnackbarType}>{SnackbarType}</span>
                  </div>
                  <div className="close_snackbar">
                    <i
                      className="zmdi zmdi-close"
                      onClick={() => handleClose()}
                    />
                  </div>
                </div>
                <div className="message_section">
                  <span>{SnackbarMess}</span>
                </div>

                <div className="progress_bar"></div>
              </div>
            </div>
          </SnackbarWrapper>
        </>
      )}
    </>
  );
};

export default Snackbar;
