import React, { memo, useMemo, useState } from "react";
import Card from "Layout/Card";
import { CalcOneDigit, numFormatter, CalcThreeDigit } from "helper";
import { TokenImgRegistry } from "assets/registry";

const Account = ({
  TotalDeposited,
  TotalBorrowed,
  BorrowLimit,
  LiquidationThreshold,
  LTV,
  CollateralInfos,
  publicKey,
}) => {
  const [List, setList] = useState([]);

  useMemo(() => {
    var AccountTable = [
      {
        id: 1,
        title: "Collateral",
        value: "$0",
        CollateralInfos,
        TotalDeposited: `$${numFormatter(TotalDeposited)}`,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 2,
        title: "Borrowed",
        TotalBorrowed: `$${numFormatter(TotalBorrowed)}`,
        value: "$0",
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 3,
        title: "Borrow Limit",
        value: `$${numFormatter(BorrowLimit)}`,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 4,
        title: "Liquidation Threshold",
        value: `$${numFormatter(LiquidationThreshold)}`,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 5,
        title: "LTV",
        value: `${CalcOneDigit(LTV)}%`,
      },
    ];

    setList(AccountTable);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TotalDeposited, TotalBorrowed, BorrowLimit, LiquidationThreshold, LTV]);

  return (
    <>
      <div className="row d-flex justify-content-center borrow_Account mt-lg-0 mt-4">
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
                    <div className="pie1">
                      <span className="pie1_tooltip">
                        Borrowed: ${numFormatter(TotalBorrowed)}$ (
                        {CalcOneDigit(LTV)}%)
                      </span>
                    </div>
                    <div className="pie2">
                      <span className="pie2_tooltip">
                        Liquidation Threshold : 94%
                      </span>
                    </div>
                    <div className="pie3">
                      <span className="pie3_tooltip">Borrow Limit: 85%</span>
                    </div>
                  </div>
                </div>
              </div>
              <table width="100%" className="mt-3">
                <tbody>
                  {List.map((val, ind) => {
                    return (
                      <tr
                        key={val.id + 10}
                        style={val.css ? { borderBottom: val.css } : null}
                      >
                        <td className="left">
                          <p className="d-flex flex-column">
                            {val.title}
                            {publicKey && <span>{val.TotalDeposited} </span>}
                            {publicKey && <span>{val.TotalBorrowed} </span>}
                          </p>
                        </td>
                        <td className="right text-right">
                          {ind === 0 ? (
                            <>
                              {val.CollateralInfos.length > 0 ? (
                                <>
                                  {val.CollateralInfos.map((list, index) => {
                                    if (list.amount) {
                                      return (
                                        <label key={list.idx}>
                                          <p
                                            className="d-flex flex-row align-items-center justify-content-end"
                                            style={
                                              index !== 0
                                                ? { paddingTop: "15px" }
                                                : null
                                            }
                                          >
                                            <span>
                                              {CalcThreeDigit(list.amount)}
                                              <span className="ml-1">
                                                {list.name}
                                              </span>
                                            </span>

                                            <img
                                              src={TokenImgRegistry[list.name]}
                                              alt="Loading..."
                                              className="ml-2"
                                            />
                                          </p>
                                          <span className="pr-1">
                                            ${numFormatter(list.value)}
                                          </span>
                                        </label>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })}
                                </>
                              ) : (
                                <p>{val.value}</p>
                              )}
                            </>
                          ) : (
                            <p>{val.value}</p>
                          )}
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
