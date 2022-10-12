import React, { memo, useMemo, useState } from "react";
import Card from "Layout/Card";
import Button from "Layout/Button";
import { numFormatter } from "helper";
import { TokenImgRegistry } from "assets/registry";

const Account = ({ nLPUserInfo }) => {
  const [List, setList] = useState([]);

  useMemo(() => {
    var AccountTable = [
      {
        id: 1,
        title: "Staked",
        value: `$${numFormatter(nLPUserInfo.staked_amount)}`,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 2,
        title: "Rewards",
        value: "$0",
        RewardList: nLPUserInfo.RewardList,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
    ];
    setList(AccountTable);
  }, [nLPUserInfo]);

  return (
    <>
      <div className="row d-flex justify-content-center LPIncentives_Account mt-lg-0 mt-5">
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
              <table width="100%" className="mt-3">
                <tbody>
                  {List?.map((val, ind) => {
                    return (
                      <tr
                        key={val.id + 10}
                        style={val.css ? { borderBottom: val.css } : null}
                      >
                        <td className="left">
                          <p>{val.title}</p>
                        </td>
                        <td className="right text-right d-flex flex-column">
                          {ind === 1 ? (
                            <>
                              {val?.RewardList?.length > 0 ? (
                                <>
                                  {val.RewardList.map((item, index) => {
                                    if (item.amount) {
                                      return (
                                        <label key={item.id}>
                                          <p
                                            className="d-flex flex-row align-items-center justify-content-end"
                                            style={
                                              index !== 0
                                                ? { paddingTop: "15px" }
                                                : null
                                            }
                                          >
                                            <span>
                                              {numFormatter(item.amount)}
                                              <span className="ml-1">
                                                {item.token}
                                              </span>
                                            </span>

                                            <img
                                              src={TokenImgRegistry[item.token]}
                                              alt="Loading..."
                                              className="ml-2"
                                            />
                                          </p>
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
              <div className="mt-3">
                <Button active={3} p="0.4rem 0rem" br="8px">
                  Claim
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Account);
