import React, { memo } from "react";
import Card from "Layout/Card";

var AccountTable = [
  {
    id: 1,
    title: "Collateral",
    price: "$0",
    css: "3px solid rgba(255, 255, 255, 0.2)",
  },
  {
    id: 2,
    title: "Borrowed",
    price: "$0",
    css: "3px solid rgba(255, 255, 255, 0.2)",
  },
  {
    id: 3,
    title: "Borrow Limit",
    price: "$0",
    css: "3px solid rgba(255, 255, 255, 0.2)",
  },
  {
    id: 4,
    title: "Liquidation Threshold",
    price: "$0",
    css: "3px solid rgba(255, 255, 255, 0.2)",
  },
  {
    id: 5,
    title: "LTV",
    price: "0%",
  },
];

const Account = () => {
  return (
    <>
      <div className="row d-flex justify-content-center borrow_Account mt-lg-0 mt-5">
        <div className="col-lg-10 col-md-10 col-12">
          <div className="row my-2">
            <div className="col-lg-6 col-md-5 col-sm-6 col-12">
              <div className="Account_title">
                <p>Your Account</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-7 col-sm-6 col-12">
              <div className="right_arrow_img text-center">
                <hr />
                <img src="/images/figma/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="bottom_arrow_img text-center">
              <hr />
              <img src="/images/figma/diamond.png" alt="Loading..." />
            </div>

            <Card
              className="Account_card ml-lg-4 ml-md-4 ml-sm-3 ml-0"
              p="1rem 2rem"
              active={1}
              br="20px"
            >
              <div className="row">
                <div className="col-12 mt-3">
                  <div className="chart_miters">
                    {/* <div className="pie1">
                        <span className="pie1_tooltip">Borrowed: 0</span>
                      </div>
                      <div className="pie2">
                        <span className="pie2_tooltip">
                          Liquidation Threshold : 94%
                        </span>
                      </div>
                      <div className="pie3">
                        <span className="pie3_tooltip">Borrow Limit: 85%</span>
                      </div> */}
                  </div>
                </div>
              </div>
              <table width="100%" className="mt-3">
                <tbody>
                  {AccountTable &&
                    AccountTable.map((val, ind) => {
                      return (
                        <tr
                          key={ind}
                          style={
                            val.css
                              ? { borderBottom: val.css }
                              : { borderBottom: "" }
                          }
                        >
                          <td className="left">
                            <p>{val.title}</p>
                          </td>
                          <td className="right text-right">
                            <span>{val.price}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Account);
