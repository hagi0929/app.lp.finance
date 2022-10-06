import React, { useEffect, memo } from "react";
import PieChartWrapper from "./PieChart.style";
import { numFormatter } from "helper";
import DataLoader from "components/globalComponents/Loaders/DataLoader";
import { TokenImgRegistry } from "assets/registry";
import GlobalPieChart from "components/globalComponents/GlobalPieChart";

const CbsPieChartModel = ({ isOpen, isClose, List, TotalValue, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  return (
    <PieChartWrapper width="680px">
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid pieChart">
            <div className="row d-flex align-items-center pieChart_top_Section">
              <div className="col-lg-8 col-md-8 col-10 d-flex align-items-center">
                <div className="title">
                  <p>{title}</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-2 close d-flex justify-content-end">
                <i className="zmdi zmdi-close" onClick={CloseModel} />
              </div>
            </div>
            <div className="row pie_Section my-lg-4">
              {List?.length === 0 ? (
                <div className="col-12">
                  <DataLoader h="300px" size="2rem" />
                </div>
              ) : (
                <>
                  <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center mt-lg-0 mt-md-0 mt-3">
                    <GlobalPieChart List={List} TotalValue={TotalValue} />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
                    <div className="row d-flex justify-content-center">
                      <div
                        className={
                          title === "Borrowed Infos"
                            ? "col-lg-12 col-12"
                            : "col-lg-9 col-12"
                        }
                      >
                        <div className="collateral_list">
                          <div className="row">
                            {List.map((item) => {
                              return (
                                <div
                                  className="col-12 items mt-3"
                                  key={item.idx}
                                >
                                  <div className="collateral_cart d-flex align-items-center">
                                    <img
                                      src={TokenImgRegistry[item.symbol]}
                                      alt={item.symbol}
                                      loading="lazy"
                                    />
                                    <p className="px-2">{item.symbol}</p>
                                    <span>${numFormatter(item.value)}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PieChartWrapper>
  );
};

export default memo(CbsPieChartModel);
