import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useContext, createContext, useEffect } from "react";
import { getTokenPrice, getBalance } from "utils/crypto";
import { getConnection } from "utils/connection";
import { TokenBalRegistry } from "assets/registry";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [PriceList, setPriceList] = useState([]);
  const [BalanceList, setBalanceList] = useState([]);
  const [PriceHandler, setPriceHandler] = useState({
    GMT: 0,
    SAMO: 0,
    SLND: 0,
    SOL: 0,
    SRM: 0,
    UXD: 0,
    mSOL: 0,
    stSOL: 0,
    zSOL: 0,
  });
  const [BalanceHandler, setBalanceHandler] = useState({
    GMT: 0,
    SAMO: 0,
    SLND: 0,
    SOL: 0,
    SRM: 0,
    UXD: 0,
    mSOL: 0,
    stSOL: 0,
    zSOL: 0,
  });

  useEffect(() => {
    const handlePrice = async () => {
      const { PriceList, PriceListObj } = await getTokenPrice();
      setPriceList(PriceList);
      setPriceHandler(PriceListObj);
    };

    handlePrice();
    let PriceInterval = setInterval(async () => {
      const list = await getTokenPrice();
      setPriceList(list);
    }, 60000);

    return () => {
      clearInterval(PriceInterval);
      setPriceList([]);
      setBalanceHandler({
        GMT: 0,
        SAMO: 0,
        SLND: 0,
        SOL: 0,
        SRM: 0,
        UXD: 0,
        mSOL: 0,
        stSOL: 0,
      });
    };
  }, []);

  useEffect(() => {
    const handleBal = async () => {
      const connection = getConnection();
      let BalList = [];
      let BalListObj = {};

      for (let i = 0; i < TokenBalRegistry.length; i++) {
        const element = TokenBalRegistry[i];
        const bal = await getBalance(element, publicKey, connection);
        BalList.push({ bal, symbol: element });
        BalListObj = { ...BalListObj, [element]: bal };
      }
      setBalanceList(BalList);
      setBalanceHandler(BalListObj);
    };

    handleBal();
    return () => {
      setBalanceList([]);
      setPriceHandler({
        GMT: 0,
        SAMO: 0,
        SLND: 0,
        SOL: 0,
        SRM: 0,
        UXD: 0,
        mSOL: 0,
        stSOL: 0,
      });
    };
  }, [publicKey]);

  return (
    <CryptoContext.Provider
      value={{ PriceList, BalanceList, PriceHandler, BalanceHandler }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
