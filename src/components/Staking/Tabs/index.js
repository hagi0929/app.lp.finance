import React, { useEffect } from "react";
import { StakeTabsRegistry } from "assets/registry/TabRegistry";
import Stake from "./Stake";
import Account from "./Account";
import UnStake from "./UnStake";
import StakingTabWrapper from "styles/StakingTab.style";

const Tabs = ({
  PriceHandler,
  BalanceHandler,
  publicKey,
  wallet,
  OpenContractSnackbar,
  lpfi_user_Info,
}) => {
  const changeRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle1");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (remove.classList.contains("tabContentToggle2")) {
        remove.classList.remove("tabContentToggle2");
      }
    }
  };

  const removeRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle2");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (remove.classList.contains("tabContentToggle1")) {
        remove.classList.remove("tabContentToggle1");
      }
    }
  };

  useEffect(() => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle2");
  }, []);

  return (
    <>
      <StakingTabWrapper pieLTV={0}>
        <div className="row my-lg-5 my-md-5 my-sm-4 my-5 pb-lg-4 pb-md-4 pb-sm-3 pb-3 pt-lg-2 pt-md-2 pt-sm-2 pt-0 Staking_tab_section d-flex justify-content-center">
          <div className="col-lg-6 col-md-10 col-12">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-11 col-12">
                <div className="tabs_card">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {StakeTabsRegistry.map((val, ind) => {
                        return (
                          <p
                            key={ind}
                            className={`col-6 ${val.class}`}
                            id={val.id}
                            data-toggle="tab"
                            href={val.href}
                            role="tab"
                            aria-controls={val.ariaControls}
                            aria-selected={val.ariaSelected}
                            onClick={ind === 1 ? changeRadius : removeRadius}
                          >
                            {val.name}
                          </p>
                        );
                      })}
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-Stake"
                      role="tabpanel"
                      aria-labelledby="nav-Stake-tab"
                    >
                      <Stake
                        {...{
                          PriceHandler,
                          BalanceHandler,
                          publicKey,
                          wallet,
                          OpenContractSnackbar,
                        }}
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-UnStake"
                      role="tabpanel"
                      aria-labelledby="nav-UnStake-tab"
                    >
                      <UnStake
                        {...{
                          publicKey,
                          wallet,
                          OpenContractSnackbar,
                          lpfi_user_Info,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <Account
              {...{ publicKey, wallet, lpfi_user_Info, OpenContractSnackbar }}
            />
          </div>
        </div>
      </StakingTabWrapper>
    </>
  );
};

export default Tabs;
