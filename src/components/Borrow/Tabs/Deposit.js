import React, { memo, useState } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { DepositTokens } from "assets/registry/BorrowRegistry";
import TokenModel from "models/TokenModel";
import { TokenRegistry } from "assets/registry";

const Deposit = ({ publicKey }) => {
  const [isModel, setIsModel] = useState(false);
  const [selected, setSelected] = useState({
    img: TokenRegistry.SOL,
    name: "wSOL",
  });

  return (
    <>
      <div className="row deposit d-flex justify-content-center">
        <div className="col-lg-11 col-md-10 col-12 my-3">
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
                    <Button active={3} p="0.3rem 0.6rem" br="4px" size="0.7rem">
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <div className="model_btn">
                  <Button
                    active={2}
                    p="0.6rem 1rem"
                    br="10px"
                    onClick={() => setIsModel(true)}
                  >
                    {selected.img && (
                      <Image src={selected.img} alt={selected.name} h="2rem" />
                    )}

                    <p className="mx-1">{selected.name}</p>
                    <i className="zmdi zmdi-chevron-down pl-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 details mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className="btn_section">
                <Button
                  active={1}
                  p="0.6rem 1rem"
                  br="0px"
                  className="not-allowed"
                >
                  Deposit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModel && (
        <TokenModel
          isOpen={isModel}
          isClose={() => setIsModel(false)}
          List={DepositTokens}
          setSelected={setSelected}
        />
      )}
    </>
  );
};

export default memo(Deposit);
