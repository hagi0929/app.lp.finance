import React, { useContext, createContext, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [SnackbarMess, setSnackbarMess] = useState("");
  const [SnackbarType, setSnackbarType] = useState("");

  const OpenSnackbar = (isOpen, type, message) => {
    setIsOpenSnackbar(isOpen);
    setSnackbarType(type);
    setSnackbarMess(message);
  };

  const CloseSnackbar = () => {
    setIsOpenSnackbar(false);
    setSnackbarMess(false);
    setSnackbarType("");
  };

  return (
    <SnackbarContext.Provider
      value={{
        OpenSnackbar,
        CloseSnackbar,
        isOpenSnackbar,
        SnackbarMess,
        SnackbarType,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
