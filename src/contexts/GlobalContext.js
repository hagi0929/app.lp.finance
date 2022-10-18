import React, { useContext, createContext, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetch_cbs_infos } from "utils/lp-protocol/get_cbs_info";
import { fetch_user_infos } from "utils/lp-protocol/get_user_info";
import { fetch_treasury_info } from "utils/treasury/get_treasury_info";
import api from "api";
import axios from "axios";
import { get_staker_account_info, get_config_info } from "utils/lpIncentives";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [treasuryChart, setTreasuryChart] = useState([]);
  const [cbsChartData, setCbsChartData] = useState([]);
  const [PsmChart, setPsmChart] = useState([]);
  const [CbsDepositData, setCbsDepositData] = useState([]);
  const [CbsBorrowData, setCbsBorrowData] = useState([]);

  const [cbsInfo, setCbsInfo] = useState({
    TotalSupply: 0,
    collateral_infos: [],
    borrowed_collateral_infos: [],
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

  const [treasuryInfo, setTreasuryInfo] = useState({
    TotalSupply: 0,
    TotalBorrowed: 0,
    NetLTV: 0,
    LiquidStakingInfos: [],
  });

  const [nLPInfo, setNLPInfo] = useState({
    total_staked_amount: 0,
  });

  const [nLPUserInfo, setNLPUserInfo] = useState({
    staked_amount: 0,
    RewardList: [],
  });

  const handleCbsInfo = async () => {
    const {
      TotalSupply,
      collateral_infos,
      TotalBorrowed,
      NET_LTV,
      TVL,
      borrowed_collateral_infos,
    } = await fetch_cbs_infos(wallet);

    setCbsInfo({
      TotalSupply,
      collateral_infos,
      borrowed_collateral_infos,
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

  const handleTreasuryInfo = async () => {
    const { TotalSupply, TotalBorrowed, LiquidStakingInfos, NetLTV } =
      await fetch_treasury_info(wallet);

    setTreasuryInfo({
      TotalSupply,
      TotalBorrowed,
      NetLTV,
      LiquidStakingInfos,
    });
  };

  const handle_nlp_user_info = async () => {
    const { staked_amount, RewardList } = await get_staker_account_info(wallet);

    setNLPUserInfo({
      staked_amount,
      RewardList,
    });
  };

  const handle_nlp_Info = async () => {
    const { total_staked_amount } = await get_config_info(wallet);

    setNLPInfo({
      total_staked_amount,
    });
  };

  const handleCbsChart = async () => {
    const response = await axios.get(api.getCbsOverviewData);
    if (response.status === 200) {
      setCbsChartData(response.data);
    }
  };

  const handleTreasuryChart = async () => {
    const response = await axios.get(api.getTreasuryData);
    if (response.status === 200) {
      setTreasuryChart(response.data);
    }
  };

  const handlePsmChart = async () => {
    const response = await axios.get(api.getDaySwapSize);
    if (response.status === 200) {
      setPsmChart(response.data);
    }
  };

  const handleCbsDepositChart = async () => {
    const response = await axios.get(api.getCbsDeposited);
    if (response.status === 200) {
      setCbsDepositData(response.data);
    }
  };

  const handleCbsBorrowChart = async () => {
    const response = await axios.get(api.getCbsBorrowed);
    if (response.status === 200) {
      setCbsBorrowData(response.data);
    }
  };

  useEffect(() => {
    if (wallet) {
      handleCbsInfo();
      handleTreasuryInfo();
      handle_nlp_Info();
    }

    handleTreasuryChart();
    handleCbsChart();
    handlePsmChart();
    handleCbsDepositChart();
    handleCbsBorrowChart();

    let TreasuryChartInterval = setInterval(async () => {
      handleTreasuryChart();
      handleCbsChart();
    }, 300000);

    return () => {
      clearInterval(TreasuryChartInterval);
      setTreasuryChart([]);
      setCbsChartData([]);
      setPsmChart([]);
      setCbsInfo({
        TotalSupply: 0,
        collateral_infos: [],
        borrowed_collateral_infos: [],
        TotalBorrowed: 0,
        NET_LTV: 0,
        TVL: 0,
      });

      setTreasuryInfo({
        TotalSupply: 0,
        TotalBorrowed: 0,
        NetLTV: 0,
        LiquidStakingInfos: [],
      });

      setNLPInfo({
        total_staked_amount: 0,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (publicKey) {
      handleCbsUserInfo();
      handle_nlp_user_info();
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

      setNLPUserInfo({
        staked_amount: 0,
        RewardList: [],
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <GlobalContext.Provider
      value={{
        cbsInfo,
        handleCbsInfo,
        cbsUserInfo,
        handleCbsUserInfo,
        handleTreasuryInfo,
        treasuryInfo,
        treasuryChart,
        cbsChartData,
        PsmChart,
        nLPUserInfo,
        setNLPUserInfo,
        handle_nlp_user_info,
        handle_nlp_Info,
        nLPInfo,
        CbsDepositData,
        CbsBorrowData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
