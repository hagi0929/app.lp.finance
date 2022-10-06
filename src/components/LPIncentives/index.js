import React from "react";
import Tabs from "./Tabs";
import LPIncentivesWrapper from "styles/LPIncentives.style";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCrypto } from "contexts/CryptoContext";
import Table from "./Table";

const LPIncentives = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { PriceList, BalanceList } = useCrypto();

  return (
    <>
      <LPIncentivesWrapper>
        <div className="container LPIncentives">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="LPIncentives_title text-center">
                <h1>LP Incentives</h1>
              </div>
              <div className="LPIncentives_subtitle text-center">
                <p>Provide Liquidity to earn rewards</p>
              </div>
            </div>
          </div>
          <Table />
          <Tabs
            publicKey={publicKey}
            PriceList={PriceList}
            BalanceList={BalanceList}
          />
        </div>
      </LPIncentivesWrapper>
    </>
  );
};

export default LPIncentives;
