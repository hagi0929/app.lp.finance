import React, { useState, memo } from "react";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import { TokenImgRegistry } from "assets/registry";
// import { LPIncentivesTokenRegistry } from "assets/registry/LPIncentivesRegistry";
// import TokenPairModel from "models/TokenPairModel";
import WalletButton from "components/globalComponents/WalletButton";
import { blockInvalidChar } from "helper";
import { nlp_withdraw } from "lp-program/lpIncentives";

const Withdraw = ({ publicKey, wallet, OpenContractSnackbar, nLPUserInfo }) => {
  // const [isModel, setIsModel] = useState(false);
  const [message, setMessage] = useState("Withdraw");
  const [amount, setAmount] = useState("");
  const [Required, setRequired] = useState(false);
  const [selected] = useState({
    pairOneImg: TokenImgRegistry.zSOL,
    pairTwoImg: TokenImgRegistry.mSOL,
    pairOneName: "zSOL",
    pairTwoName: "mSOL",
    symbol: "zSOL-mSOL",
  });

  const handleAmount = (e) => {
    setAmount(e.target.value);
    if (e.target.value) {
      if (e.target.value <= nLPUserInfo.staked_amount) {
        setMessage("Withdraw");
        setRequired(true);
      } else {
        setMessage("Withdraw amount exceeded");
        setRequired(false);
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  const CalculateMax = async () => {
    setAmount(nLPUserInfo.staked_amount);
    setMessage("Withdraw");
    setRequired(true);
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        await nlp_withdraw(
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
            <div className="row pt-1">
              <div className="col-6 d-flex align-items-center">
                <div className="input_form d-flex align-items-center flex-row">
                  <Input
                    name="amount"
                    id="amount"
                    type="number"
                    className={publicKey ? null : "not-allowed"}
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => handleAmount(e)}
                    onKeyDown={blockInvalidChar}
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
                      className={publicKey ? null : "not-allowed"}
                      disabled={publicKey ? false : true}
                      onClick={CalculateMax}
                    >
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <div className="model_btn">
                  <Button
                    active={2}
                    p="0.6rem 0.3rem"
                    br="10px"
                    // onClick={() => setIsModel(true)}
                  >
                    {selected.pairOneImg && (
                      <Image
                        src={selected.pairOneImg}
                        alt={selected.pairOneName}
                        h="2rem"
                      />
                    )}
                    {selected.pairTwoImg && (
                      <Image
                        src={selected.pairTwoImg}
                        alt={selected.pairTwoName}
                        h="2rem"
                        className="toggle"
                      />
                    )}

                    <p className="pl-4">{selected.symbol}</p>
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
      {/* {isModel && (
        <TokenPairModel
          isOpen={isModel}
          isClose={() => setIsModel(false)}
          List={LPIncentivesTokenRegistry}
          setSelected={setSelected}
        />
      )} */}
    </>
  );
};

export default memo(Withdraw);
