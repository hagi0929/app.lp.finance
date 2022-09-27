import React from "react";
import Tabs from "./Tabs";
import StakingWrapper from "styles/Staking.style";
import { useWallet } from "@solana/wallet-adapter-react";
import Overview from "./Overview";

const Staking = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  return (
    <>
      <StakingWrapper>
        <div className="container Staking">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="Staking_title text-center">
                <h1>LPFi Staking</h1>
              </div>
              <div className="Staking_subtitle text-center">
                <p>Stake LPFi to earn protocol fees</p>
              </div>
            </div>
          </div>
          <Overview />
          <Tabs publicKey={publicKey} />
        </div>
      </StakingWrapper>
    </>
  );
};

export default Staking;
