import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Borrow from "components/Borrow";
import Swap from "components/Swap";
import Treasury from "components/Treasury";
// import StakeSolana from "components/StakeSolana";
import PSM from "components/PSM";
import LPFarming from "components/LPFarming";
import Layout from "components/globalComponents/Layout";
import WalletWrapper from "lib/WalletWrapper";
import JupiterWrapper from "lib/JupiterWrapper";
import ScreenLoader from "components/globalComponents/ScreenLoader";
import { CryptoProvider } from "contexts/CryptoContext";

const App = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let LoadingTimeOut = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(LoadingTimeOut);
    };
  }, []);

  if (Loading) {
    return <ScreenLoader />;
  }

  return (
    <WalletWrapper>
      <CryptoProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Borrow />} />
            <Route exact path="/treasury" element={<Treasury />} />
            {/* <Route exact path="/stake" element={<StakeSolana />} /> */}
            <Route exact path="/psm" element={<PSM />} />
            <Route exact path="/lp-farming" element={<LPFarming />} />
            <Route
              exact
              path="/swap"
              element={
                <JupiterWrapper>
                  <Swap />
                </JupiterWrapper>
              }
            />
          </Routes>
        </Layout>
      </CryptoProvider>
    </WalletWrapper>
  );
};

export default App;
