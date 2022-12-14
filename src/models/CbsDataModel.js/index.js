import React, { useEffect, memo } from "react";
import PieChartWrapper from "../CbsPieChartModel/PieChart.style";
import GlobalChart from "components/globalComponents/GlobalChart";
import {
  totalSupplyChartList,
  totalBorrowedChartList,
  totalDepositTokenChartList,
  totalBorrowedTokenChartList,
} from "assets/registry/BorrowRegistry";

const CbsDataModel = ({
  isOpen,
  isClose,
  List,
  CbsDepositData,
  CbsBorrowData,
}) => {
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
    <PieChartWrapper width="880px">
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid pieChart">
            <div className="row d-flex align-items-center pieChart_top_Section">
              <div className="col-lg-8 col-md-8 col-10 d-flex align-items-center">
                <div className="title">
                  <p>Data</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-2 close d-flex justify-content-end">
                <i className="zmdi zmdi-close" onClick={CloseModel} />
              </div>
            </div>
            <div className="row pie_Section my-lg-4">
              {List?.length === 0 ? (
                <div className="col-12 message d-flex justify-content-center">
                  <p>Data is not available</p>
                </div>
              ) : (
                <>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-md-0 mt-3">
                    <GlobalChart
                      list={List}
                      filterList={totalSupplyChartList}
                      height="260px"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-md-0 mt-3">
                    <GlobalChart
                      list={List}
                      filterList={totalBorrowedChartList}
                      height="260px"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-md-0 mt-3">
                    <GlobalChart
                      list={CbsDepositData}
                      filterList={totalDepositTokenChartList}
                      height="260px"
                    />
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-0 mt-md-0 mt-3">
                    <GlobalChart
                      list={CbsBorrowData}
                      filterList={totalBorrowedTokenChartList}
                      height="260px"
                    />
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

export default memo(CbsDataModel);
