import React, { useContext, createContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetch_cbs_infos } from "utils/lp-protocol/get_cbs_info";
import { useEffect } from "react";

export const CbsContext = createContext();

export const CbsProvider = ({ children }) => {
  const wallet = useWallet();
  const [cbsInfo, setCbsInfo] = useState({
    TotalSupply: 0,
    collateral_infos: [],
    TotalBorrowed: 0,
    NET_LTV: 0,
    TVL: 0,
  });

  const handleCbsInfo = async () => {
    const { TotalSupply, collateral_infos, TotalBorrowed, NET_LTV, TVL } =
      await fetch_cbs_infos(wallet);

    setCbsInfo({
      TotalSupply,
      collateral_infos,
      TotalBorrowed,
      NET_LTV,
      TVL,
    });
  };

  useEffect(() => {
    if (wallet) {
      handleCbsInfo();
    }

    return () => {
      setCbsInfo({
        TotalSupply: 0,
        collateral_infos: [],
        TotalBorrowed: 0,
        NET_LTV: 0,
        TVL: 0,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CbsContext.Provider value={{ cbsInfo, handleCbsInfo }}>
      {children}
    </CbsContext.Provider>
  );
};

export const useCbs = () => useContext(CbsContext);
