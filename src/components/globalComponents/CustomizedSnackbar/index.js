import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "Redux/actions";

const CustomizedSnackbar = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const snackbarOpen = useSelector(
    (state) => state.SnackbarReducer.snackbarOpen
  );
  const snackbarType = useSelector(
    (state) => state.SnackbarReducer.snackbarType
  );
  const snackbarMessage = useSelector(
    (state) => state.SnackbarReducer.snackbarMessage
  );

  const Message = () => {
    return (
      <>
        <div className="snackbar" style={{ padding: "2px 0px 0px 0px" }}>
          <p style={{ color: "black" }}>{snackbarMessage}</p>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (snackbarOpen) {
      enqueueSnackbar(<Message />, {
        variant: snackbarType,
        persist: false,
        autoHideDuration: 7000,
        preventDuplicate: false,
      });
    }

    return () => {
      dispatch(removeSnackbar(false, snackbarType, snackbarMessage));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarOpen]);

  return <></>;
};

export default CustomizedSnackbar;
