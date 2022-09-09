import React, { useState } from "react";
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

const PSM = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { PriceList, BalanceList } = useCrypto();
  const [isPayModel, setIsPayModel] = useState(false);
  const [isReceiveModel, setIsReceiveModel] = useState(false);

  const [PaySelected, setPaySelected] = useState({
    logoURI: TokenImgRegistry.zSOL,
    symbol: "zSOL",
  });

  const [ReceiveSelect, setReceiveSelect] = useState({
    logoURI: TokenImgRegistry.mSOL,
    symbol: "mSOL",
  });

  const HandleSwitch = () => {
    setPaySelected({
      logoURI: ReceiveSelect.logoURI,
      symbol: ReceiveSelect.symbol,
    });
    setReceiveSelect({
      logoURI: PaySelected.logoURI,
      symbol: PaySelected.symbol,
    });
  };

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

            <div className="col-12 PSM_section mt-4">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-5 col-md-6 col-12">
                  <Card
                    active={1}
                    p="2rem 2rem 1rem 2rem"
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
                            <p>Bal: 0</p>
                          </div>
                          <div className="max_btn ml-2">
                            <Button
                              active={3}
                              br="5px"
                              p="0px 3px"
                              id="btn"
                              size="0.85rem"
                              className="not-allowed"
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
                              p="0.6rem 1rem"
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
                            </Button>
                          </div>
                        </div>
                        <div className="col-7 d-flex justify-content-end align-items-center">
                          <div className="input_form">
                            <Input
                              name="amount"
                              id="amount"
                              type="number"
                              className={publicKey ? null : "not-allowed"}
                              placeholder="0.0"
                              disabled={publicKey ? false : true}
                              active={1}
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
                            <p>Bal: 0</p>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-5 d-flex align-items-center">
                          <div className="model_btn">
                            <Button
                              active={2}
                              br="10px"
                              p="0.6rem 1rem"
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
                              pattern="[0-9]*"
                              disabled
                              active={1}
                              p="0.6rem 1rem"
                              br="10px"
                              size="1.2rem"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="PSM_btn_section mt-4">
                      <div className="row">
                        <div className="col-12">
                          <Button
                            active={1}
                            br="50px"
                            p="0.6rem 1rem"
                            id="btn"
                            size="1.1rem"
                            className="not-allowed"
                          >
                            {!publicKey ? "Connect wallet" : "Mint zSOL"}
                          </Button>
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
