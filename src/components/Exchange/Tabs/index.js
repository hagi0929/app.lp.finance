import React, { useEffect } from "react";
import { ExchangeTabsRegistry } from "assets/registry/TabRegistry";
import DepositUsdc from "./DepositUsdc";
import WithdrawUsdc from "./WithdrawUsdc";
import WithdrawLPFi from "./WithdrawLPFi";
import LPFarmingTabWrapper from "styles/LPFarmingTab.style";

const Tabs = ({ publicKey }) => {
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
      <LPFarmingTabWrapper pieLTV={0}>
        <div className="row  LPFarming_tab_section d-flex justify-content-center">
          <div className="col-12">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-11 col-12">
                <div className="tabs_card">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {ExchangeTabsRegistry.map((val, ind) => {
                        return (
                          <p
                            key={ind}
                            className={`col-4 ${val.class}`}
                            id={val.id}
                            data-toggle="tab"
                            href={val.href}
                            role="tab"
                            aria-controls={val.ariaControls}
                            aria-selected={val.ariaSelected}
                            onClick={
                              ind === 2
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
                      id="nav-Deposit-usdc"
                      role="tabpanel"
                      aria-labelledby="nav-Deposit-usdc-tab"
                    >
                      <DepositUsdc publicKey={publicKey} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-Withdraw-usdc"
                      role="tabpanel"
                      aria-labelledby="nav-Withdraw-usdc-tab"
                    >
                      <WithdrawUsdc publicKey={publicKey} />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-Withdraw-lpfi"
                      role="tabpanel"
                      aria-labelledby="nav-Withdraw-lpfi-tab"
                    >
                      <WithdrawLPFi publicKey={publicKey} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LPFarmingTabWrapper>
    </>
  );
};

export default Tabs;
