import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useContext, createContext, useEffect } from "react";
import { getTokenPrice, getBalance } from "utils/crypto";
import { getConnection } from "utils/contract";
import { TokenBalRegistry } from "assets/registry";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [PriceList, setPriceList] = useState([]);
  const [BalanceList, setBalanceList] = useState([]);
  const [PriceHandler, setPriceHandler] = useState({
    SAMO: 0,
    SOL: 0,
    SRM: 0,
    UXD: 0,
    mSOL: 0,
    stSOL: 0,
    zSOL: 0,
  });
  const [BalanceHandler, setBalanceHandler] = useState({
    SAMO: 0,
    SOL: 0,
    SRM: 0,
    UXD: 0,
    mSOL: 0,
    stSOL: 0,
    zSOL: 0,
  });

  const storePrice = async () => {
    const { PriceList, PriceListObj } = await getTokenPrice();
    setPriceList(PriceList);
    setPriceHandler(PriceListObj);
  };

  const storeBal = async () => {
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

  useEffect(() => {
    storePrice();

    let PriceInterval = setInterval(async () => {
      storePrice();
    }, 60000);

    return () => {
      clearInterval(PriceInterval);
      setPriceList([]);
      setPriceHandler({
        SAMO: 0,
        SOL: 0,
        SRM: 0,
        UXD: 0,
        mSOL: 0,
        stSOL: 0,
        zSOL: 0,
      });
    };
  }, []);

  useEffect(() => {
    storeBal();

    return () => {
      setBalanceList([]);
      setBalanceHandler({
        SAMO: 0,
        SOL: 0,
        SRM: 0,
        UXD: 0,
        mSOL: 0,
        stSOL: 0,
        zSOL: 0,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <CryptoContext.Provider
      value={{
        PriceList,
        BalanceList,
        PriceHandler,
        BalanceHandler,
        storePrice,
        storeBal,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
