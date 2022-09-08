// import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState, useContext, createContext, useEffect } from "react";
import { getTokenPrice } from "utils/crypto";
// getBalance
export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  // const wallet = useWallet();
  // const { publicKey } = wallet;
  const [PriceList, setPriceList] = useState([]);
  // const [BalanceList, setBalanceList] = useState();

  useEffect(() => {
    const handlePrice = async () => {
      const list = await getTokenPrice();
      setPriceList(list);
    };

    handlePrice();
    // let PriceInterval = setInterval(async () => {
    //   const list = await getTokenPrice();
    //   setPriceList(list);
    // }, 5000);
    // return () => {
    //   setPriceList([]);
    //   clearInterval(PriceInterval);
    // };
  }, []);

  // useEffect(() => {
  //   const handleBal = async () => {
  //     const balList = await getBalance(publicKey);
  //     console.log(balList);
  //   };

  //   handleBal();
  // }, [publicKey]);

  return (
    <CryptoContext.Provider value={{ PriceList }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
