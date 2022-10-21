import React, { memo, useState, useMemo } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import WalletButton from "components/globalComponents/WalletButton";
import { blockInvalidChar } from "helper";
import { stake_lpfi } from "lp-program/lpfiStaking";

const Stake = ({
  PriceHandler,
  BalanceHandler,
  publicKey,
  wallet,
  OpenContractSnackbar,
}) => {
  const [message, setMessage] = useState("Stake");
  const [amount, setAmount] = useState("");
  const [Required, setRequired] = useState(false);

  const [selected, setSelected] = useState({
    logoURI: "/favicon.ico",
    symbol: "LPFi",
    balance: 0,
    price: 0,
  });

  useMemo(() => {
    setSelected({
      ...selected,
      balance: BalanceHandler[selected.symbol],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BalanceHandler]);

  useMemo(() => {
    setSelected({
      ...selected,
      price: PriceHandler[selected.symbol],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PriceHandler]);

  const handleAmount = (e) => {
    setAmount(e.target.value);

    if (e.target.value) {
      if (e.target.value <= selected.balance) {
        setMessage("Stake");
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
        await stake_lpfi(
          wallet,
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
        <div className="col-lg-12 col-md-12 col-12 my-3">
          <div className="deposit_card">
            <div className="row pt-1">
              <div className="col-8 d-flex align-items-center">
                <div className="input_form d-flex align-items-center flex-row">
                  <Input
                    name="amount"
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmount(e)}
                    onKeyDown={blockInvalidChar}
                    className={publicKey ? null : "not-allowed"}
                    disabled={publicKey ? false : true}
                    placeholder="0.0"
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
                      disabled={!publicKey ? true : false}
                      className={`
                        ${!publicKey ? "not-allowed" : null}`}
                      onClick={() => {
                        setAmount(selected.balance);
                        setRequired(true);
                        setMessage("Stake");
                      }}
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
    </>
  );
};

export default memo(Stake);
