import React, { useEffect, memo } from "react";
import PieChartWrapper from "./PieChart.style";
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);

const CbsPieChartModel = ({ isOpen, isClose, List }) => {
  console.log(List);
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

  const startPriceChart = () => {
    let myTotalSupplyChart = null;

    const chart = () => {
      const type = "pie";

      const ConfigPieChart = {
        type: type,

        data: {
          labels: List,
          datasets: [
            {
              label: "Total Supply",
              data: List.map((items) => {
                return (items.value / items.amount) * 100;
              }),
              backgroundColor: [
                "#7BB6B3",
                "#5dd4a8",
                "#A3A2A5",
                "#77DAD1",
                "#3F8C86",
              ],
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              yAlign: "bottom",
              callbacks: {
                label: (context) => {
                  return ` ${context.label.amount} ${context.label.symbol}`;
                },
              },
            },
          },
          scales: {
            ticks: {
              display: false,
            },
          },
        },
      };

      if (myTotalSupplyChart !== null) {
        myTotalSupplyChart.destroy();
      }
      myTotalSupplyChart = new Chart("pie-chart", ConfigPieChart);
    };

    chart();
  };

  useEffect(() => {
    startPriceChart();
  }, []);

  return (
    <PieChartWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid pieChart">
            <div className="row">
              <div className="col-12">
                <div className="pie_Section">
                  <canvas id="pie-chart" width="250"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PieChartWrapper>
  );
};

export default memo(CbsPieChartModel);
