import React, { useState, memo, useMemo, useEffect } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { BorrowTokens } from "assets/registry/BorrowRegistry";
import TokenModel from "models/TokenModel";
import { TokenImgRegistry } from "assets/registry";
import { borrow_cbs } from "lp-program/borrow";
import { blockInvalidChar } from "helper";

const Borrow = ({
  publicKey,
  PriceList,
  BalanceList,
  BalanceHandler,
  wallet,
}) => {
  const [isModel, setIsModel] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Borrow");
  const [Required, setRequired] = useState(false);
  const [selected, setSelected] = useState({
    logoURI: TokenImgRegistry.zSOL,
    symbol: "zSOL",
    balance: 0,
  });

  useMemo(() => {
    setSelected({ ...selected, balance: BalanceHandler.zSOL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BalanceHandler]);

  const handleAmount = (e) => {
    setAmount(e.target.value);

    if (e.target.value) {
      if (e.target.value <= selected.balance) {
        setMessage("Deposit");
        setRequired(true);
      } else {
        setMessage("Insufficient Balance");
        setRequired(false);
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        await borrow_cbs(wallet, selected.symbol, amount);
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  useEffect(() => {
    setMessage("Borrow");
    setAmount("");
    setRequired(false);

    return () => {};
  }, [selected]);

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
                    value={amount}
                    onChange={handleAmount}
                    onKeyDown={blockInvalidChar}
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
                  <Button
                    active={2}
                    p="0.6rem 1rem"
                    br="10px"
                    onClick={() => setIsModel(true)}
                  >
                    {selected.logoURI && (
                      <Image
                        src={selected.logoURI}
                        alt={selected.symbol}
                        h="2rem"
                      />
                    )}

                    <p className="mx-1">{selected.symbol}</p>
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
                  p="0.6rem 2rem"
                  br="6px"
                  className="not-allowed"
                  onClick={() => handleProgram()}
                >
                  {!publicKey ? "Connect wallet" : message}
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
          List={BorrowTokens}
          setSelected={setSelected}
          PriceList={PriceList}
          BalanceList={BalanceList}
        />
      )}
    </>
  );
};

export default memo(Borrow);
