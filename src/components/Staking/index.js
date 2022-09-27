import React from "react";
import StakeWrapper from "styles/Stake.style";
import { useWallet } from "@solana/wallet-adapter-react";
import { StakeTabsRegistry } from "assets/registry/TabRegistry";
import Stake from "./Stake";
import UnStake from "./UnStake";

const Staking = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  return (
    <StakeWrapper>
      <div className="container Stake">
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center flex-column">
            <div className="stake_title text-center">
              <h1>LPFi Staking</h1>
            </div>
            <div className="stake_subtitle text-center">
              <p>Stake LPFi to earn protocol fees</p>
            </div>
          </div>
        </div>
        <div className="row stake_section d-flex justify-content-center">
          <div className="col-lg-6 col-md-12 col-12 stake_right"></div>
          <div className="col-lg-8 col-md-12 col-12  stake_left pb-lg-3 my-lg-4 my-md-5 my-4 my-2">
            <div className="row">
              <div className="col-12">
                <div className="switch_section">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {StakeTabsRegistry.map((val, ind) => {
                      return (
                        <li className="nav-item" role="presentation">
                          <a
                            key={ind}
                            className={`${val.class}`}
                            id={val.id}
                            data-toggle="tab"
                            href={val.href}
                            role="tab"
                            aria-controls={val.ariaControls}
                            aria-selected={val.ariaSelected}
                          >
                            <p> {val.name}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-Stake"
                      role="tabpanel"
                      aria-labelledby="nav-Stake-tab"
                    >
                      <Stake {...{ publicKey }} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-UnStake"
                      role="tabpanel"
                      aria-labelledby="nav-UnStake-tab"
                    >
                      <UnStake {...{ publicKey }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StakeWrapper>
  );
};

export default Staking;
