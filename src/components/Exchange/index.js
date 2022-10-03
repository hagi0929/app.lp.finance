import React from "react";
import StakeWrapper from "styles/PSM.style";
import { TokenImgRegistry } from "assets/registry";
import { blockInvalidChar } from "helper";
import WalletButton from "components/globalComponents/WalletButton";
import Card from "Layout/Card";
import Button from "Layout/Button";
import Image from "Layout/Image";
import Input from "Layout/Form/Input";
import { useWallet } from "@solana/wallet-adapter-react";

const Exchange = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  return (
    <>
      <StakeWrapper>
        <div className="container PSM mb-5 mt-lg-4 mt-md-4 mt-2">
          <div className="row">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="PSM_title text-center">
                <h1>LPFi Exchange</h1>
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
                        <div className="col-3 d-flex align-items-center">
                          <div className="title">Pay</div>
                        </div>
                        <div className="col-9 d-flex justify-content-end align-items-center flex-row">
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
                              disabled={true}
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
                              onKeyDown={blockInvalidChar}
                              p="0.8rem 1rem"
                              br="10px"
                              size="1.2rem"
                            />
                          </div>
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
                            <p>Bal: 0</p>
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

                    <div className="details mt-4">
                      <div className="row">
                        <div className="col-12">
                          <table>
                            <tbody>
                              <tr>
                                <td>1 LPFi</td>
                                <td className="text-right">0.05 USDC</td>
                              </tr>
                              <tr>
                                <td>Remaining USDC</td>
                                <td className="text-right">0 USDC</td>
                              </tr>
                            </tbody>
                          </table>
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
                            >
                              Exchange
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
    </>
  );
};

export default Exchange;
