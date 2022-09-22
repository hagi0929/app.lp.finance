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
    BorrowLimit: 0,
    LTV: 0,
    LiquidationThreshold: 0,
    MaxBorrowedAmount: 0,
    MaxWithdrawAmount: 0,
    MaxDepositedAmount: 0,
    MaxRepayAmount: 0,
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
      BorrowLimit,
      LTV,
      LiquidationThreshold,
      MaxBorrowedAmount,
      MaxWithdrawAmount,
      MaxDepositedAmount,
      MaxRepayAmount,
    } = await fetch_user_infos(wallet);

    setCbsUserInfo({
      TotalDeposited,
      CollateralInfos,
      TotalBorrowed,
      BorrowLimit,
      LTV,
      LiquidationThreshold,
      MaxBorrowedAmount,
      MaxWithdrawAmount,
      MaxDepositedAmount,
      MaxRepayAmount,
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
        BorrowLimit: 0,
        LTV: 0,
        LiquidationThreshold: 0,
        MaxBorrowedAmount: 0,
        MaxWithdrawAmount: 0,
        MaxDepositedAmount: 0,
        MaxRepayAmount: 0,
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
