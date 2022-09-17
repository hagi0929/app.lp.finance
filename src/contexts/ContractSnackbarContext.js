import React, { useContext, createContext, useState } from "react";

export const ContractSnackbarContext = createContext();

export const ContractSnackbarProvider = ({ children }) => {
  const [isOpenContractSnackbar, setIsOpenContractSnackbar] = useState(false);
  const [ContractSnackbarMess, setContractSnackbarMess] = useState("");
  const [ContractSnackbarType, setContractSnackbarType] = useState("");

  const OpenContractSnackbar = (isOpen, type, message) => {
    if (isOpenContractSnackbar) {
      setContractSnackbarType(type);
      setContractSnackbarMess(message);
    } else {
      setIsOpenContractSnackbar(isOpen);
      setContractSnackbarType(type);
      setContractSnackbarMess(message);
    }
  };

  const CloseContractSnackbar = () => {
    setIsOpenContractSnackbar(false);
    setContractSnackbarMess(false);
    setContractSnackbarType("");
  };

  return (
    <ContractSnackbarContext.Provider
      value={{
        OpenContractSnackbar,
        CloseContractSnackbar,
        isOpenContractSnackbar,
        ContractSnackbarMess,
        ContractSnackbarType,
      }}
    >
      {children}
    </ContractSnackbarContext.Provider>
  );
};

export const useContractSnackbar = () => useContext(ContractSnackbarContext);
