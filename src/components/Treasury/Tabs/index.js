import React, { useEffect } from "react";
import { TreasuryTabsRegistry } from "assets/registry/TabRegistry";
import Deposit from "./Deposit";
import Borrow from "./Borrow";
import Withdraw from "./Withdraw";
import Repay from "./Repay";
import LPIncentivesTabWrapper from "styles/LPIncentivesTab.style";

const Tabs = ({
  wallet,
  publicKey,
  PriceList,
  BalanceList,
  BalanceHandler,
  PriceHandler,
  OpenContractSnackbar,
}) => {
  const changeRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle1");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (
        remove.classList.contains("tabContentToggle2") ||
        remove.classList.contains("tabContentToggle3")
      ) {
        remove.classList.remove("tabContentToggle2");
        remove.classList.remove("tabContentToggle3");
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
      if (
        remove.classList.contains("tabContentToggle1") ||
        remove.classList.contains("tabContentToggle3")
      ) {
        remove.classList.remove("tabContentToggle1");
        remove.classList.remove("tabContentToggle3");
      }
    }
  };

  const addRadius = () => {
    document
      .getElementById("nav-tabContent")
      .classList.add("tabContentToggle3");

    var content = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < content.length; i++) {
      var remove = content[i];
      if (
        remove.classList.contains("tabContentToggle2") ||
        remove.classList.contains("tabContentToggle1")
      ) {
        remove.classList.remove("tabContentToggle2");
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
      <LPIncentivesTabWrapper>
        <div className="row LPIncentives_tab_section d-flex justify-content-center">
          <div className="col-12">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-11 col-12">
                <div className="tabs_card">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {TreasuryTabsRegistry.map((val, ind) => {
                        return (
                          <p
                            key={ind}
                            className={`col-3 ${val.class}`}
                            id={val.id}
                            data-toggle="tab"
                            href={val.href}
                            role="tab"
                            aria-controls={val.ariaControls}
                            aria-selected={val.ariaSelected}
                            onClick={
                              ind === 3
                                ? changeRadius
                                : ind === 0
                                ? removeRadius
                                : addRadius
                            }
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
                      id="nav-Deposit"
                      role="tabpanel"
                      aria-labelledby="nav-Deposit-tab"
                    >
                      <Deposit
                        {...{
                          wallet,
                          publicKey,
                          PriceList,
                          BalanceList,
                          BalanceHandler,
                          PriceHandler,
                          OpenContractSnackbar,
                        }}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-Borrow"
                      role="tabpanel"
                      aria-labelledby="nav-Borrow-tab"
                    >
                      <Borrow
                        {...{
                          wallet,
                          publicKey,
                          PriceList,
                          BalanceList,
                          BalanceHandler,
                          PriceHandler,
                          OpenContractSnackbar,
                        }}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-Withdraw"
                      role="tabpanel"
                      aria-labelledby="nav-Withdraw-tab"
                    >
                      <Withdraw
                        {...{
                          wallet,
                          publicKey,
                          PriceList,
                          BalanceList,
                          BalanceHandler,
                          PriceHandler,
                          OpenContractSnackbar,
                        }}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-Repay"
                      role="tabpanel"
                      aria-labelledby="nav-Repay-tab"
                    >
                      <Repay
                        {...{
                          wallet,
                          publicKey,
                          PriceList,
                          BalanceList,
                          BalanceHandler,
                          PriceHandler,
                          OpenContractSnackbar,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LPIncentivesTabWrapper>
    </>
  );
};

export default Tabs;
