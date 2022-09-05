import React, { useState } from "react";
import StakeWrapper from "styles/Stake.style";
import Card from "Layout/Card";
import Stake from "./Stake";
import Unstake from "./Unstake";
import { useWallet } from "@solana/wallet-adapter-react";

const StakeSolana = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [active, setActive] = useState(false);

  return (
    <StakeWrapper>
      <div className="container Stake mb-5 mt-lg-4 mt-md-4 mt-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-center flex-column">
            <div className="stake_title text-center">
              <h1>Stake Solana</h1>
            </div>
            <div className="stake_subtitle text-center">
              <p>Stake SOL and use mSOL while earning rewards</p>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mt-3">
            <div className="switch d-flex align-items-center">
              <p
                className={!active ? "active" : null}
                onClick={() => setActive(false)}
              >
                Stake
              </p>
              <p
                className={active ? "active" : null}
                onClick={() => setActive(true)}
              >
                Unstake
              </p>
            </div>
          </div>
          <div className="col-12 stake_section mt-4">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-5 col-md-6 col-12">
                <Card
                  active={1}
                  p="2rem 2.5rem 1rem 2.5rem"
                  br="18px"
                  className="stake_card"
                >
                  {active ? (
                    <Unstake publicKey={publicKey} />
                  ) : (
                    <Stake publicKey={publicKey} />
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StakeWrapper>
  );
};

export default StakeSolana;
