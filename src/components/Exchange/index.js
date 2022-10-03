import React, { useMemo, useState } from "react";
import StakeWrapper from "styles/PSM.style";
import { TokenImgRegistry } from "assets/registry";
import { blockInvalidChar } from "helper";
import WalletButton from "components/globalComponents/WalletButton";
import Card from "Layout/Card";
import Button from "Layout/Button";
import Image from "Layout/Image";
import Input from "Layout/Form/Input";
import { useWallet } from "@solana/wallet-adapter-react";
import Tabs from "./Tabs";
import { useCrypto } from "contexts/CryptoContext";
import { swap_lpfi } from "lp-program/exchange";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";
import { CalcFiveDigit } from "helper";
import { useEffect } from "react";

const Exchange = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const { BalanceHandler, PriceHandler } = useCrypto();
  const { OpenContractSnackbar } = useContractSnackbar();

  const [isAdmin, setIsAdmin] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Exchange");
  const [Required, setRequired] = useState(false);
  const [exchangeRate, setExchangeRate] = useState("");

  useMemo(() => {
    if (
      publicKey &&
      publicKey?.toBase58() === "BTu6x99R9Tay73YJ5h2p4iWtEfw2DhovHkiuL94Kafqw"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [publicKey]);

  const handleMax = () => {
    setAmount(BalanceHandler.LPFi);
  };

  const handleInput = (e) => {
    setAmount(e.target.value);

    if (e.target.value) {
      if (e.target.value <= BalanceHandler.LPFi) {
        setMessage("Exchange");
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
        await swap_lpfi(
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

  useEffect(() => {
    setExchangeRate(CalcFiveDigit(amount * 0.05));
  }, [amount]);

  return (
    <>
      <StakeWrapper>
        <div className="container PSM mb-5 mt-lg-4 mt-md-4 mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="PSM_title text-center">
                <h1>LPFi Exchange</h1>
              </div>
            </div>
          </div>
          <div
            className={`row d-flex justify-content-center ${
              isAdmin ? "mt-lg-5 mt-md-5 mt-4" : "mt-3"
            }`}
          >
            <div className="col-lg-5 col-md-5 col-12 PSM_section">
              <Card active={1} p="1.5rem 2rem" br="18px" className="PSM_card">
                <div className="Pay_section">
                  <div className="row">
                    <div className="col-3 d-flex align-items-center">
                      <div className="title">Pay</div>
                    </div>
                    <div className="col-9 d-flex justify-content-end align-items-center flex-row">
                      <div className="balance">
                        <p>Bal: {BalanceHandler.LPFi}</p>
                      </div>
                      <div className="max_btn ml-2">
                        <Button
                          active={3}
                          br="5px"
                          p="0px 3px"
                          id="btn"
                          size="0.85rem"
                          disabled={!publicKey ? true : false}
                          className={!publicKey ? "not-allowed" : null}
                          onClick={handleMax}
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
                          active={4}
                          br="10px"
                          id="btn"
                          className="d-flex align-items-center"
                        >
                          <Image
                            src={TokenImgRegistry.LPFi}
                            alt="LPFi"
                            h="2rem"
                            w="2rem"
                          />
                          <p className="mx-2">LPFi</p>
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
                          onChange={handleInput}
                          onKeyDown={blockInvalidChar}
                          p="0.8rem 1rem"
                          br="10px"
                          size="1.2rem"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-12 d-flex justify-content-end">
                    <div className="feeRate">
                      <p>1 LPFi = 0.05 USDC</p>
                    </div>
                  </div>
                </div>

                {/* PSM receive section  */}
                <div className="Receive_section mt-3">
                  <div className="row">
                    <div className="col-3 d-flex align-items-center">
                      <div className="title">Receive</div>
                    </div>
                    <div className="col-9 d-flex justify-content-end align-items-center flex-row">
                      <div className="balance">
                        <p>Bal: {BalanceHandler.USDC}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-5 d-flex align-items-center">
                      <div className="model_btn">
                        <Button
                          active={4}
                          br="10px"
                          id="btn"
                          className="d-flex align-items-center"
                        >
                          <Image
                            src={TokenImgRegistry.USDC}
                            alt="USDC"
                            h="2rem"
                            w="2rem"
                          />
                          <p className="mx-2">USDC</p>
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
                          value={exchangeRate}
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

                <div className="row mt-2">
                  <div className="col-12 d-flex justify-content-end">
                    <div className="feeRate">
                      <p>Remaining USDC: 0 USDC</p>
                    </div>
                  </div>
                </div>

                <div className="PSM_btn_section mt-4">
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
                          disabled={!publicKey ? true : false}
                          className={!publicKey ? "not-allowed" : null}
                          onClick={handleProgram}
                        >
                          {message}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {isAdmin && (
              <div className="col-lg-7 col-md-7 col-12 mt-lg-0  mt-md-0 mt-5">
                <Tabs
                  {...{
                    wallet,
                    publicKey,
                    BalanceHandler,
                    PriceHandler,
                    OpenContractSnackbar,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </StakeWrapper>
    </>
  );
};

export default Exchange;
