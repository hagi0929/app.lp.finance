import React, { useEffect, memo } from "react";
import PieChartWrapper from "./PieChart.style";

const CbsPieChartModel = ({ isOpen, isClose }) => {
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
    <PieChartWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid pieChart ">
            <div className="row">
              <div className="col-12">
                <div className="pie_Section"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PieChartWrapper>
  );
};

export default memo(CbsPieChartModel);
