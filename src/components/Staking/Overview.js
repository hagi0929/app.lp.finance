import React, { memo } from "react";
import Card from "Layout/Card";
import { numFormatter } from "helper";

const Overview = ({ lpfi_Info }) => {
  return (
    <>
      <div className="row py-4  d-flex justify-content-center staking_overview">
        <div className="col-lg-11 col-md-11 col-12">
          <div className="row py-2">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="overview_title ">
                <p>Staking Overview</p>
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
              p="2rem 1.5rem"
              className="details_card ml-lg-4 ml-md-4 ml-sm-3 ml-0 pl-lg-0 pl-md-0 pl-4"
            >
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-6 col-md-6 col-12 card_left mt-lg-0 mt-md-0 mt-4">
                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-5 col-md-5 col-12 d-flex justify-content-center">
                      <div className="img_section">
                        <img src="/logo192.png" alt="LPFi" loading="lazy" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-12 pt-lg-0 pt-md-0 pt-3">
                      <div className="list_section p-lg-3 p-md-2">
                        <table>
                          <tbody>
                            <tr>
                              <td>LPFi APY</td>
                              <td className="list_section_right">: 0%</td>
                            </tr>
                            <tr>
                              <td>Fees APY</td>
                              <td className="list_section_right">: 0%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 card_right mt-lg-0 mt-md-0 mt-4 d-flex justify-content-lg-center justify-content-md-center justify-content-start">
                  <div className="list_section p-lg-3 p-md-2">
                    <table>
                      <tbody>
                        <tr>
                          <td>Total Staked</td>
                          <td className="list_section_right">
                            : ${numFormatter(lpfi_Info.total_staked_amount)} LPFi (≈$0)
                          </td>
                        </tr>
                        <tr>
                          <td>Total Fees</td>
                          <td className="list_section_right">: $0</td>
                        </tr>
                      </tbody>
                    </table>
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
