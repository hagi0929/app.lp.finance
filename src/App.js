import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Borrow from "components/Borrow";
import Swap from "components/Swap";
import Treasury from "components/Treasury";
import PSM from "components/PSM";
import Staking from "components/Staking";
import LPIncentives from "components/LPIncentives";
import Layout from "components/globalComponents/Layout";
import WalletWrapper from "lib/WalletWrapper";
import ScreenLoader from "components/globalComponents/ScreenLoader";
import { CryptoProvider } from "contexts/CryptoContext";
import MainModel from "models/MainModel";
import { GlobalProvider } from "contexts/GlobalContext";

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
          <GlobalProvider>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Borrow />} />
                <Route exact path="/treasury" element={<Treasury />} />
                <Route exact path="/psm" element={<PSM />} />
                <Route exact path="/lp-incentives" element={<LPIncentives />} />
                <Route exact path="/swap" element={<Swap />} />
                <Route exact path="/staking" element={<Staking />} />
              </Routes>
            </Layout>
          </GlobalProvider>
        </CryptoProvider>
      </WalletWrapper>
      {model ? (
        <MainModel isOpen={model} isClose={() => setModel(false)} />
      ) : null}
    </>
  );
};

export default App;
