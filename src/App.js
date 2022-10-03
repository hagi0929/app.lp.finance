import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Borrow from "components/Borrow";
import Swap from "components/Swap";
import Treasury from "components/Treasury";
import PSM from "components/PSM";
import Staking from "components/Staking";
import LPFarming from "components/LPFarming";
import Exchange from "components/Exchange";
import Layout from "components/globalComponents/Layout";
import WalletWrapper from "lib/WalletWrapper";
import ScreenLoader from "components/globalComponents/ScreenLoader";
import { CryptoProvider } from "contexts/CryptoContext";
import MainModel from "models/MainModel";
import { CbsProvider } from "contexts/CbsContext";

const App = () => {
  const [Loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);

  useEffect(() => {
    setLoading(true);
    let LoadingTimeOut = setTimeout(() => {
      setLoading(false);
      setModel(true);
    }, 1500);

    return () => {
      clearTimeout(LoadingTimeOut);
    };
  }, []);

  if (Loading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <WalletWrapper>
        <CryptoProvider>
          <CbsProvider>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Borrow />} />
                <Route exact path="/treasury" element={<Treasury />} />
                <Route exact path="/psm" element={<PSM />} />
                <Route exact path="/lp-farming" element={<LPFarming />} />
                <Route exact path="/swap" element={<Swap />} />
                <Route exact path="/staking" element={<Staking />} />
                <Route exact path="/exchange" element={<Exchange />} />
              </Routes>
            </Layout>
          </CbsProvider>
        </CryptoProvider>
      </WalletWrapper>
      {model ? (
        <MainModel isOpen={model} isClose={() => setModel(false)} />
      ) : null}
    </>
  );
};

export default App;
