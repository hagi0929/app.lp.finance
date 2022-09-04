import React from "react";
import { Route, Routes } from "react-router-dom";
import Borrow from "components/Borrow";
import Swap from "components/Swap";
import Treasury from "components/Treasury";
import StakeSolana from "components/StakeSolana";
import Layout from "components/globalComponents/Layout";
import JupiterWrapper from "utils/JupiterWrapper";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Borrow />} />
          <Route exact path="/treasury" element={<Treasury />} />
          <Route exact path="/stake" element={<StakeSolana />} />
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
    </>
  );
};

export default App;
