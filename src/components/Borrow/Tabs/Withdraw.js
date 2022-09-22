import React, { useState, memo, useMemo, useEffect } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { WithdrawTokens } from "assets/registry/BorrowRegistry";
import TokenModel from "models/TokenModel";
import { TokenImgRegistry } from "assets/registry";
import { withdraw_cbs } from "lp-program/borrow";
import { blockInvalidChar } from "helper";
import WalletButton from "components/globalComponents/WalletButton";

const Withdraw = ({
  publicKey,
  PriceList,
  BalanceList,
  BalanceHandler,
  wallet,
  OpenContractSnackbar,
}) => {
  const [isModel, setIsModel] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Withdraw");
  const [Required, setRequired] = useState(false);
  const [selected, setSelected] = useState({
    logoURI: TokenImgRegistry.SOL,
    symbol: "SOL",
    balance: 0,
  });

  useMemo(() => {
    setSelected({ ...selected, balance: BalanceHandler.SOL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BalanceHandler]);

  const handleAmount = (e) => {
    setAmount(e.target.value);

    if (e.target.value > 0) {
      setMessage("Withdraw");
      setRequired(true);
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        await withdraw_cbs(
          wallet,
          selected.symbol,
          amount,
          setMessage,
          setRequired,
          setAmount,
          OpenContractSnackbar
        );
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  useEffect(() => {
    setMessage("Withdraw");
    setAmount("");
    setRequired(false);
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
                    active={2}
                    value={amount}
                    onChange={handleAmount}
                    onKeyDown={blockInvalidChar}
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
              {!publicKey ? (
                <WalletButton br="10px" fw="400" active={1} />
              ) : (
                <div className="btn_section">
                  <Button
                    active={1}
                    p="0.6rem 2rem"
                    br="10px"
                    disabled={!publicKey ? true : false}
                    className={!publicKey ? "not-allowed" : null}
                    onClick={() => handleProgram()}
                  >
                    {message}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModel && (
        <TokenModel
          isOpen={isModel}
          isClose={() => setIsModel(false)}
          List={WithdrawTokens}
          setSelected={setSelected}
          PriceList={PriceList}
          BalanceList={BalanceList}
        />
      )}
    </>
  );
};

export default memo(Withdraw);
