import React, { useContext, createContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetch_cbs_infos } from "utils/lp-protocol/get_cbs_info";
import { fetch_user_infos } from "utils/lp-protocol/get_user_info";
import { useEffect } from "react";

export const CbsContext = createContext();

export const CbsProvider = ({ children }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [cbsInfo, setCbsInfo] = useState({
    TotalSupply: 0,
    collateral_infos: [],
    TotalBorrowed: 0,
    NET_LTV: 0,
    TVL: 0,
  });

  const [cbsUserInfo, setCbsUserInfo] = useState({
    TotalDeposited: 0,
    CollateralInfos: [],
    TotalBorrowed: 0,
    BorrowedInfos: [],
    BorrowLimit: 0,
    LTV: 0,
    LiquidationThreshold: 0,
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

  const handleCbsUserInfo = async () => {
    const {
      TotalDeposited,
      CollateralInfos,
      TotalBorrowed,
      BorrowedInfos,
      BorrowLimit,
      LTV,
      LiquidationThreshold,
    } = await fetch_user_infos(wallet);

    setCbsUserInfo({
      TotalDeposited,
      CollateralInfos,
      TotalBorrowed,
      BorrowedInfos,
      BorrowLimit,
      LTV,
      LiquidationThreshold,
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

  useEffect(() => {
    if (publicKey) {
      handleCbsUserInfo();
    }

    return () => {
      setCbsUserInfo({
        TotalDeposited: 0,
        CollateralInfos: [],
        TotalBorrowed: 0,
        BorrowedInfos: [],
        BorrowLimit: 0,
        LTV: 0,
        LiquidationThreshold: 0,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <CbsContext.Provider
      value={{ cbsInfo, handleCbsInfo, cbsUserInfo, handleCbsUserInfo }}
    >
      {children}
    </CbsContext.Provider>
  );
};

export const useCbs = () => useContext(CbsContext);
