import React, { useState, memo, useMemo } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { TokenImgRegistry } from "assets/registry";
import WalletButton from "components/globalComponents/WalletButton";
import { withdraw_usdc } from "lp-program/exchange";

const WithdrawUsdc = ({
  wallet,
  publicKey,
  BalanceHandler,
  PriceHandler,
  OpenContractSnackbar,
}) => {
  const [message, setMessage] = useState("Withdraw USDC");
  const [amount, setAmount] = useState("");
  const [Required, setRequired] = useState(false);

  const [selected, setSelected] = useState({
    logoURI: TokenImgRegistry.USDC,
    symbol: "USDC",
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
      setMessage("Withdraw USDC");
      setRequired(true);
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        await withdraw_usdc(
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
      <div className="row withdraw d-flex justify-content-center">
        <div className="col-lg-12 col-md-12 col-12 my-3">
          <div className="withdraw_card">
            <div className="row pt-3">
              <div className="col-7 d-flex align-items-center">
                <div className="input_form d-flex align-items-center flex-row">
                  <Input
                    name="amount"
                    id="amount"
                    type="number"
                    className={publicKey ? null : "not-allowed"}
                    placeholder="0.0"
                    disabled={publicKey ? false : true}
                    onClick={(e) => handleAmount(e)}
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
              <div className="col-5 d-flex justify-content-end align-items-center">
                <div className="model_btn">
                  <Button active={2} p="0.6rem 1rem" br="10px">
                    <Image
                      src={selected.logoURI}
                      alt={selected.symbol}
                      h="2rem"
                      w="2rem"
                    />
                    <p className="mx-2">{selected.symbol}</p>
                    <i className="zmdi zmdi-chevron-down" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center details mt-4">
          {!publicKey ? (
            <WalletButton br="10px" fw="400" active={1} />
          ) : (
            <div className="btn_section">
              <Button
                active={1}
                p="0.6rem 2rem"
                br="10px"
                className={publicKey ? null : "not-allowed"}
                disabled={publicKey ? false : true}
                onClick={() => handleProgram()}
              >
                {message}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(WithdrawUsdc);
