import React, { memo, useState, useMemo, useEffect } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { DepositTokens } from "assets/registry/BorrowRegistry";
import TokenModel from "models/TokenModel";
import { TokenImgRegistry } from "assets/registry";
import { deposit_cbs } from "lp-program/borrow";
import { blockInvalidChar } from "helper";
import WalletButton from "components/globalComponents/WalletButton";
import { CalcFiveDigit } from "helper";
import { calculateMaxAmount } from "utils/lp-protocol/get_user_info";

const Deposit = ({
  publicKey,
  PriceList,
  BalanceList,
  BalanceHandler,
  wallet,
  OpenContractSnackbar,
  PriceHandler,
}) => {
  const [selected, setSelected] = useState({
    logoURI: TokenImgRegistry.SOL,
    symbol: "SOL",
    balance: 0,
    price: 0,
  });
  const [isModel, setIsModel] = useState(false);
  const [message, setMessage] = useState("Deposit");
  const [amount, setAmount] = useState("");
  const [MaxLoading, setMaxLoading] = useState(false);
  const [Required, setRequired] = useState(false);

  useMemo(() => {
    setSelected({
      ...selected,
      balance: BalanceHandler.SOL,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BalanceHandler]);

  useMemo(() => {
    setSelected({
      ...selected,
      price: PriceHandler.SOL,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PriceHandler]);

  useEffect(() => {
    setMessage("Deposit");
    setAmount("");
    setRequired(false);
  }, [selected]);

  const handleAmount = (e) => {
    setAmount(e.target.value);

    if (e.target.value) {
      if (e.target.value <= selected.balance) {
        if (e.target.value >= CalcFiveDigit(10 / selected.price)) {
          setMessage("Deposit");
          setRequired(true);
        } else {
          setMessage("Required minimum amount");
          setRequired(false);
        }
      } else {
        setMessage("Insufficient Balance");
        setRequired(false);
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  const CalculateMax = async () => {
    setMaxLoading(true);
    const getMaxAmount = await calculateMaxAmount(
      wallet,
      selected.symbol,
      "Deposit"
    );
    if (getMaxAmount) {
      setAmount(CalcFiveDigit(getMaxAmount));
      setMaxLoading(false);
    } else {
      setAmount(0);
      setMaxLoading(false);
    }
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        await deposit_cbs(
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
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => handleAmount(e)}
                    onKeyDown={blockInvalidChar}
                    active={2}
                    disabled={!publicKey ? true : MaxLoading ? true : false}
                    className={
                      !publicKey
                        ? "not-allowed"
                        : MaxLoading
                        ? "not-allowed"
                        : null
                    }
                    p="0.7rem 0rem 0.7rem 3.5rem"
                    br="10px"
                  />

                  <div className="max_btn d-flex align-items-center">
                    <Button
                      active={3}
                      p="0.3rem 0.6rem"
                      br="4px"
                      size="0.8rem"
                      disabled={!publicKey ? true : MaxLoading ? true : false}
                      className={
                        !publicKey
                          ? "not-allowed"
                          : MaxLoading
                          ? "not-allowed"
                          : null
                      }
                      onClick={CalculateMax}
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
            <div className="row min_amount">
              <div className="col-12">
                {selected.price !== 0 && (
                  <p>Minimum amount- {CalcFiveDigit(10 / selected.price)}</p>
                )}
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
                    disabled={!publicKey ? true : MaxLoading ? true : false}
                    className={
                      !publicKey
                        ? "not-allowed"
                        : MaxLoading
                        ? "not-allowed"
                        : null
                    }
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
          List={DepositTokens}
          setSelected={setSelected}
          PriceList={PriceList}
          BalanceList={BalanceList}
        />
      )}
    </>
  );
};

export default memo(Deposit);
