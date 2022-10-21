import React, { useState, memo, useMemo } from "react";
import Card from "Layout/Card";
import Button from "Layout/Button";
import { numFormatter } from "helper";
import { claim_reward } from "lp-program/lpfiStaking";

const Account = ({
  publicKey,
  wallet,
  lpfi_user_Info,
  OpenContractSnackbar,
}) => {
  const [List, setList] = useState([]);

  useMemo(() => {
    var AccountTable = [
      {
        id: 1,
        title: "Staked",
        price: `$${numFormatter(lpfi_user_Info.staked_amount)}`,
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
      {
        id: 2,
        title: "days",
        price: "0",
        css: "3px solid rgba(255, 255, 255, 0.2)",
      },
    ];

    setList(AccountTable);
  }, [lpfi_user_Info]);

  return (
    <>
      <div className="row d-flex justify-content-center Staking_Account mt-lg-0 mt-5">
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
                  {List &&
                    List.map((val, ind) => {
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
              <div className="mt-3">
                <Button
                  active={3}
                  p="0.4rem 0rem"
                  br="8px"
                  className={publicKey ? null : "not-allowed"}
                  disabled={publicKey ? false : true}
                  onClick={() => {
                    if (publicKey) {
                      claim_reward(wallet, OpenContractSnackbar);
                    }
                  }}
                >
                  Claim reward
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
