import React, { memo } from "react";
import Card from "Layout/Card";
import Button from "Layout/Button";
import { numFormatter, calc } from "helper";

const Overview = ({ TotalSupply, TotalBorrowed, NET_LTV, TVL }) => {
  return (
    <>
      <div className="row py-4  d-flex justify-content-center borrow_overview">
        <div className="col-lg-11 col-md-11 col-12">
          <div className="row py-2">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="overview_title ">
                <p>Protocol Overview</p>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6 col-12">
              <div className="overview_img">
                <hr />
                <img src="/images/figma/diamond.png" alt="Loading..." />
              </div>
            </div>
          </div>

          <div className="overview_card d-flex flex-row">
            <div className="bottom_borrow_img text-center">
              <hr />
              <img src="/images/figma/diamond.png" alt="Loading..." />
            </div>

            <Card
              active={1}
              br="20px"
              p="1rem 1.5rem"
              className="borrow_card py-4 ml-lg-4 ml-md-4 ml-sm-3 ml-0"
            >
              <div className="row d-flex align-items-center">
                <div className="col-lg-6 col-md-8 col-12 borrow_card_left mt-2">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                      <div className="borrow_cart">
                        <div className="pie animate no-round"></div>
                        <div className="totalSupplyPie">
                          <img
                            src="/images/figma/ellipse.png"
                            alt="Loading..."
                          />
                        </div>
                      </div>

                      <div className="miter1">
                        <p className="ml-5 pl-2">100%</p>
                        <img
                          src="/images/figma/cartLine1.png"
                          alt="Loading..."
                        />
                      </div>
                      <div className="miter2">
                        <p className="ml-4 pl-2">{calc(NET_LTV)}%</p>
                        <img
                          src="/images/figma/cartLine2.png"
                          alt="loading..."
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-center">
                      <div className="row py-lg-0 py-md-0 py-3 ">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-6 mt-lg-3 mt-md-3 mt-0">
                          <div className="cart_details">
                            <p>Total Supply</p>
                            <span>${numFormatter(TotalSupply)}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-6">
                          <div className="cart_details mt-lg-4 mt-md-0 pt-lg-3 mt-md-3 mt-0">
                            <p>Total Borrowed</p>
                            <span>${numFormatter(TotalBorrowed)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8 col-12 borrow_card_right mt-lg-0 mt-md-0 mt-4">
                  <div className="list_section p-lg-3 p-md-2">
                    <table>
                      <tbody>
                        <tr>
                          <td>TVL</td>
                          <td className="list_section_right">
                            : ${numFormatter(TVL)}
                          </td>
                        </tr>
                        <tr>
                          <td> Net LTV</td>
                          <td className="list_section_right">
                            : {calc(NET_LTV)}%
                          </td>
                        </tr>
                        <tr>
                          <td> Stability Fee</td>
                          <td className="list_section_right">: 1.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-2 col-md-8 col-12 mt-lg-0 mt-md-0 mt-4">
                  <div className="mr-2">
                    <Button
                      active={1}
                      br="10px"
                      p="0.6rem 1rem"
                      className="not-allowed"
                    >
                      Data
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Overview);
