import React, { useState, useMemo } from "react";
import StakeWrapper from "styles/PSM.style";
import Card from "Layout/Card";
import Button from "Layout/Button";
import Image from "Layout/Image";
import Input from "Layout/Form/Input";
import { TokenImgRegistry } from "assets/registry";
import { useWallet } from "@solana/wallet-adapter-react";
import TokenModel from "models/TokenModel";
import { PSMRegistry } from "assets/registry/PsmRegistry";
import { useCrypto } from "contexts/CryptoContext";
import { useEffect } from "react";
import { burn_zSOL, mint_zSOL } from "lp-program/psm";
import { blockInvalidChar, CalcFiveDigit } from "helper";
import WalletButton from "components/globalComponents/WalletButton";
import { fetch_psm_rate } from "utils/psm/get_psm_rate";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";

const PSM = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { PriceList, BalanceList, BalanceHandler } = useCrypto();
  const { OpenContractSnackbar } = useContractSnackbar();
  const [isPayModel, setIsPayModel] = useState(false);
  const [message, setMessage] = useState("Mint mSOL");
  const [amount, setAmount] = useState("");
  const [PSM_Rate, setPSM_Rate] = useState("");
  const [Required, setRequired] = useState(false);
  const [MaxLoading, setMaxLoading] = useState(false);
  const [isReceiveModel, setIsReceiveModel] = useState(false);

  const [PaySelected, setPaySelected] = useState({
    logoURI: TokenImgRegistry.zSOL,
    symbol: "zSOL",
    balance: 0,
  });

  const [ReceiveSelect, setReceiveSelect] = useState({
    logoURI: TokenImgRegistry.mSOL,
    symbol: "mSOL",
    balance: 0,
  });

  useMemo(() => {
    setPaySelected({ ...PaySelected, balance: BalanceHandler?.zSOL });
    setReceiveSelect({ ...ReceiveSelect, balance: BalanceHandler?.mSOL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BalanceHandler]);

  const handlePsmRate = async () => {
    setMaxLoading(true);
    const PSM_rate = await fetch_psm_rate(
      PaySelected.symbol,
      ReceiveSelect.symbol,
      PaySelected.balance,
      amount
    );
    if (PSM_rate) {
      setPSM_Rate(PSM_rate);
      setMaxLoading(false);
    } else {
      setPSM_Rate("");
      setMaxLoading(false);
    }
  };

  const handleAmount = async (e) => {
    setAmount(e.target.value);

    if (e.target.value) {
      if (e.target.value <= PaySelected.balance) {
        setMessage(`Mint ${ReceiveSelect.symbol}`);
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

  const HandleSwitch = () => {
    setAmount(CalcFiveDigit(PSM_Rate));
    setPSM_Rate(CalcFiveDigit(amount));
    setPaySelected({
      logoURI: ReceiveSelect.logoURI,
      symbol: ReceiveSelect.symbol,
      balance: ReceiveSelect.balance,
    });
    setReceiveSelect({
      logoURI: PaySelected.logoURI,
      symbol: PaySelected.symbol,
      balance: PaySelected.balance,
    });
  };

  const handleProgram = async () => {
    if (amount > 0) {
      if (Required && publicKey) {
        if (
          (PaySelected.symbol === "mSOL" && ReceiveSelect.symbol === "zSOL") ||
          (PaySelected.symbol === "stSOL" && ReceiveSelect.symbol === "zSOL")
        ) {
          await mint_zSOL(
            wallet,
            PaySelected.symbol,
            amount,
            setMessage,
            setAmount,
            setRequired,
            OpenContractSnackbar
          );
        } else if (
          (PaySelected.symbol === "zSOL" && ReceiveSelect.symbol === "mSOL") ||
          (PaySelected.symbol === "zSOL" && ReceiveSelect.symbol === "stSOL")
        ) {
          await burn_zSOL(
            wallet,
            ReceiveSelect.symbol,
            amount,
            setMessage,
            setAmount,
            setRequired,
            OpenContractSnackbar
          );
        }
      }
    } else {
      setMessage("Enter an amount");
      setRequired(false);
    }
  };

  useEffect(() => {
    if (publicKey && amount > 0) {
      handlePsmRate();
    }

    if (PaySelected.symbol === "stSOL" || PaySelected.symbol === "mSOL") {
      setReceiveSelect({
        logoURI: TokenImgRegistry?.zSOL,
        symbol: "zSOL",
        balance: BalanceHandler?.zSOL,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PaySelected]);

  useEffect(() => {
    if (publicKey && amount > 0) {
      handlePsmRate();
    }
    if (ReceiveSelect.symbol === "stSOL" || ReceiveSelect.symbol === "mSOL") {
      setPaySelected({
        logoURI: TokenImgRegistry?.zSOL,
        symbol: "zSOL",
        balance: BalanceHandler?.zSOL,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ReceiveSelect]);

  useEffect(() => {
    if (publicKey && amount > 0) {
      handlePsmRate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  return (
    <>
      <StakeWrapper>
        <div className="container PSM mb-5 mt-lg-4 mt-md-4 mt-2">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="PSM_title text-center">
                <h1>PSM</h1>
              </div>
            </div>

            <div className="col-12 PSM_section mt-2">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-5 col-md-6 col-12">
                  <Card
                    active={1}
                    p="1.5rem 2rem"
                    br="18px"
                    className="PSM_card"
                  >
                    <div className="Pay_section">
                      <div className="row">
                        <div className="col-4 d-flex align-items-center">
                          <div className="title">Pay</div>
                        </div>
                        <div className="col-8 d-flex justify-content-end align-items-center flex-row">
                          <div className="balance">
                            <p>Bal: {PaySelected.balance}</p>
                          </div>
                          <div className="max_btn ml-2">
                            <Button
                              active={3}
                              br="5px"
                              p="0px 3px"
                              id="btn"
                              size="0.85rem"
                              disabled={
                                !publicKey ? true : MaxLoading ? true : false
                              }
                              className={
                                !publicKey
                                  ? "not-allowed"
                                  : MaxLoading
                                  ? "not-allowed"
                                  : null
                              }
                              onClick={() => {
                                setAmount(PaySelected.balance);
                              }}
                            >
                              Max
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-5 d-flex align-items-center">
                          <div className="model_btn">
                            <Button
                              active={2}
                              br="10px"
                              p="0.7rem 1rem"
                              id="btn"
                              className="d-flex align-items-center"
                              onClick={() => setIsPayModel(true)}
                            >
                              <Image
                                src={PaySelected.logoURI}
                                alt={PaySelected.symbol}
                                h="2rem"
                              />
                              <p className="mx-2">{PaySelected.symbol}</p>
                              <i className="zmdi zmdi-chevron-down" />
                            </Button>
                          </div>
                        </div>
                        <div className="col-7 d-flex justify-content-end align-items-center">
                          <div className="input_form">
                            <Input
                              name="amount"
                              id="amount"
                              type="number"
                              placeholder="0.0"
                              active={1}
                              value={amount}
                              onChange={handleAmount}
                              onKeyDown={blockInvalidChar}
                              disabled={!publicKey ? true : false}
                              className={!publicKey ? "not-allowed" : null}
                              p="0.8rem 1rem"
                              br="10px"
                              size="1.2rem"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="switch_section mt-4">
                      <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                          <div
                            className="switch_icon_section"
                            onClick={() => HandleSwitch()}
                          >
                            <Image src="/images/icons/swap.png" alt="swap" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PSM receive section  */}
                    <div className="Receive_section mt-3">
                      <div className="row">
                        <div className="col-4 d-flex align-items-center">
                          <div className="title">Receive</div>
                        </div>
                        <div className="col-8 d-flex justify-content-end align-items-center flex-row">
                          <div className="balance">
                            <p>Bal: {ReceiveSelect.balance}</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-5 d-flex align-items-center">
                          <div className="model_btn">
                            <Button
                              active={2}
                              br="10px"
                              p="0.7rem 1rem"
                              id="btn"
                              className="d-flex align-items-center"
                              onClick={() => setIsReceiveModel(true)}
                            >
                              <Image
                                src={ReceiveSelect.logoURI}
                                alt={ReceiveSelect.symbol}
                                h="2rem"
                              />
                              <p className="mx-2">{ReceiveSelect.symbol}</p>
                              <i className="zmdi zmdi-chevron-down" />
                            </Button>
                          </div>
                        </div>
                        <div className="col-7 d-flex justify-content-end align-items-center">
                          <div className="input_form">
                            <Input
                              name="amount"
                              id="amount"
                              className="not-allowed"
                              placeholder="0.0"
                              type="number"
                              value={CalcFiveDigit(PSM_Rate)}
                              pattern="[0-9]*"
                              active={1}
                              p="0.6rem 1rem"
                              disabled={true}
                              br="10px"
                              size="1.2rem"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="PSM_btn_section mt-5">
                      <div className="row">
                        <div className="col-12">
                          {!publicKey ? (
                            <WalletButton br="50px" fw="400" active={1} />
                          ) : (
                            <Button
                              active={1}
                              br="50px"
                              p="0.6rem 1rem"
                              id="btn"
                              size="1.1rem"
                              disabled={
                                !publicKey ? true : MaxLoading ? true : false
                              }
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
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StakeWrapper>
      {isPayModel && (
        <TokenModel
          isOpen={isPayModel}
          isClose={() => setIsPayModel(false)}
          List={PSMRegistry.filter((items) => {
            return items.symbol !== ReceiveSelect.symbol;
          })}
          setSelected={setPaySelected}
          PriceList={PriceList}
          BalanceList={BalanceList}
        />
      )}
      {isReceiveModel && (
        <TokenModel
          isOpen={setIsReceiveModel}
          isClose={() => setIsReceiveModel(false)}
          List={PSMRegistry.filter((items) => {
            return items.symbol !== PaySelected.symbol;
          })}
          setSelected={setReceiveSelect}
          PriceList={PriceList}
          BalanceList={BalanceList}
        />
      )}
    </>
  );
};

export default PSM;
