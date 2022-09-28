import React, { memo, useState } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import WalletButton from "components/globalComponents/WalletButton";

const UnStake = ({ publicKey }) => {
  const [selected] = useState({
    logoURI: "/favicon.ico",
    symbol: "LPFi",
    balance: 0,
  });

  return (
    <>
      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-12 col-md-12 col-12 my-3">
          <div className="deposit_card">
            <div className="row pt-1">
              <div className="col-8 d-flex align-items-center">
                <div className="input_form d-flex align-items-center flex-row">
                  <Input
                    name="amount"
                    id="amount"
                    type="number"
                    className={publicKey ? null : "not-allowed"}
                    placeholder="0.0"
                    disabled={publicKey ? false : true}
                    active={2}
                    p="0.7rem 0rem 0.7rem 3.5rem"
                    br="10px"
                  />

                  <div className="max_btn d-flex align-items-center">
                    <Button
                      active={3}
                      p="0.3rem 0.6rem"
                      br="4px"
                      size="0.8rem"
                      className="not-allowed"
                    >
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <div className="model_btn">
                  <Button active={2} p="0.6rem 1rem" br="10px">
                    {selected.logoURI && (
                      <Image
                        src={selected.logoURI}
                        alt={selected.symbol}
                        h="2rem"
                        w="2rem"
                      />
                    )}
                    <p className="pl-2">{selected.symbol}</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              {!publicKey ? (
                <WalletButton br="10px" fw="400" active={1} />
              ) : (
                <div className="btn_section">
                  <Button
                    active={1}
                    p="0.6rem 2rem"
                    br="10px"
                    className="not-allowed"
                  >
                    UnStake
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UnStake);
