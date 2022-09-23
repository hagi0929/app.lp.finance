import React from "react";
import TreasuryWrapper from "styles/Treasury.style";
import Card from "Layout/Card";
import Image from "Layout/Image";
import { TokenImgRegistry } from "assets/registry";
import Chart from "./Chart";
import { useCbs } from "contexts/CbsContext";
import { numFormatter, calc } from "helper";

const Treasury = () => {
  const { treasuryInfo, cbsInfo } = useCbs();

  return (
    <TreasuryWrapper pie={cbsInfo.NET_LTV}>
      <div className="container Treasury">
        <div className="row">
          <div className="col-12 mt-lg-5 mt-md-4 mt-2">
            <div className="Treasury_section">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-lg-6 col-12 Treasury_Details mb-lg-5 mb-4 mt-lg-0">
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                      <div className="Liquid_title">
                        <p>Treasury Details</p>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-6 col-12">
                      <div className="overview_img">
                        <hr />
                        <Image
                          src="/images/figma/diamond.png"
                          alt="Loading..."
                          h="0.6rem"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="overview_card d-flex flex-row">
                    <div className="bottom_borrow_img text-center">
                      <hr />
                      <Image
                        src="/images/figma/diamond.png"
                        alt="Loading..."
                        h="0.6rem"
                      />
                    </div>

                    <Card
                      active={1}
                      br="18px"
                      p="1.5rem 1rem"
                      className="mt-3 details_cart_section ml-lg-4 ml-md-4 ml-sm-3 ml-0"
                    >
                      <div className="row d-flex flex-row align-items-center">
                        <div className="col-lg-6 col-md-5 col-12 details_cart_section_left">
                          <div className="cart">
                            <div className="pie animate no-round"></div>
                            <div className="totalSupplyPie">
                              <Image
                                src="/images/figma/ellipse.png"
                                alt="Loading..."
                                h="5.8rem"
                              />
                            </div>
                          </div>

                          <div className="miter1">
                            <p className="ml-5 pl-2">100%</p>
                            <Image
                              src="/images/figma/cartLine1.png"
                              alt="Loading..."
                              w="130px"
                            />
                          </div>
                          <div className="miter2">
                            <p className="ml-5 pl-2">
                              {calc(cbsInfo.NET_LTV)}%
                            </p>
                            <Image
                              src="/images/figma/cartLine2.png"
                              alt="loading..."
                              w="130px"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-7 col-12 details_cart_section_right">
                          <div className="row">
                            <div className="col-lg-12 col-6 cart_details">
                              <p>Total Supply</p>
                              <span>
                                ${numFormatter(treasuryInfo.TotalSupply)}
                              </span>
                            </div>

                            <div className="col-lg-12 col-6 cart_details mt-lg-4 mt-md-0 pt-lg-3 mt-md-3 mt-0">
                              <p>Total Borrowed</p>
                              <span>
                                ${numFormatter(treasuryInfo.TotalBorrowed)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="col-lg-6 col-12 my-lg-0 my-md-0 my-4">
                  <Chart />
                </div>
              </div>
              <div className="row">
                <div className="col-12 Liquid_Staking mb-5">
                  <div className="row">
                    <div className="col-12 Liquid_title mb-3">
                      <p>Liquid Staking</p>
                    </div>
                    <div className="col-12">
                      <Card active={1} br="18px" p="2rem 1.5rem">
                        <div className="row">
                          {treasuryInfo?.LiquidStakingInfos.map((list, ind) => {
                            return (
                              <div
                                className="col-lg-5 col-md-6 col-12 card_section d-flex flex-row pt-4"
                                key={ind}
                              >
                                <div className="img_section">
                                  <Image
                                    src={TokenImgRegistry[list.name]}
                                    alt={list.name}
                                    h="2.3rem"
                                  />
                                </div>
                                <div className="details ml-3">
                                  <div className="balance">
                                    <p>Total Balance</p>
                                    <span>
                                      {list.TotalBalance} {list.name} (≈$0)
                                    </span>
                                  </div>
                                  <div className="Earnings mt-2">
                                    <p>Estimated Treasury Earnings (12M)</p>
                                    <span>0 {list.name} (≈$0)</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TreasuryWrapper>
  );
};

export default Treasury;
