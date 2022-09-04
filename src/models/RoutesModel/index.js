import React, { useEffect } from "react";
import RoutesWrapper from "./Routes.style";

const RoutesModel = ({
  isOpen,
  onClose,
  handleSelectRoute,
  routes,
  selectedRoute,
  inputTokenInfo,
  tokens,
  outputTokenInfo,
}) => {
  const selectedRouteFun = (route) => {
    handleSelectRoute(route);
    document.querySelector(".Routes_Popup").classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".Routes_Popup").classList.add("active");
    }
  }, [isOpen]);

  const CloseModel = () => {
    document.querySelector(".Routes_Popup").classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <RoutesWrapper>
      <div className="Routes_Popup">
        <div className="Routes-container">
          <div className="container-fluid Routes_section">
            <div className="row Token_top_Section pb-2">
              <div className="col-12 d-flex justify-content-center Routes_title">
                <p className="mt-1">{routes?.length} routes found</p>
                <i className="zmdi zmdi-close" onClick={() => CloseModel()} />
              </div>
            </div>
            <div className="row Token_bottom_Section mt-3">
              <div className="col-12">
                <div className="route_list">
                  <div className="row">
                    {routes?.map((route, index) => {
                      const selected = selectedRoute === route;
                      return (
                        <div className="col-12" key={index} id="tokens">
                          <div
                            className={
                              selected
                                ? "routes_card active mt-3"
                                : "routes_card mt-3"
                            }
                            onClick={() => selectedRouteFun(route)}
                          >
                            <div className="row">
                              <div className="col-8 d-flex align-items-center">
                                <div className="routes_details">
                                  <div className="d-flex align-items-center names">
                                    <span className="fullName">
                                      {route.marketInfos.map((info, index) => {
                                        let includeSeparator = false;
                                        if (
                                          route.marketInfos.length > 1 &&
                                          index !== route.marketInfos.length - 1
                                        ) {
                                          includeSeparator = true;
                                        }
                                        return (
                                          <span key={index}>{`${
                                            info.amm.label
                                          } ${
                                            includeSeparator ? "x " : ""
                                          }`}</span>
                                        );
                                      })}
                                    </span>
                                  </div>
                                  <div className="tokens">
                                    <span> {inputTokenInfo?.symbol} → </span>
                                    {selectedRoute?.marketInfos.map(
                                      (r, index) => {
                                        const showArrow =
                                          index !==
                                          selectedRoute?.marketInfos.length - 1
                                            ? true
                                            : false;
                                        return (
                                          <span key={index}>
                                            <span>
                                              {
                                                tokens.find(
                                                  (item) =>
                                                    item?.address ===
                                                    r?.outputMint?.toString()
                                                )?.symbol
                                              }
                                            </span>
                                            {showArrow ? " → " : ""}
                                          </span>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 d-flex justify-content-end align-items-center">
                                <div className="amount_section">
                                  <p>
                                    {route.outAmount[0] ? (
                                      <>
                                        {Intl.NumberFormat("en", {
                                          minimumSignificantDigits: 1,
                                          maximumSignificantDigits: 6,
                                        }).format(
                                          route.outAmount[0] /
                                            10 **
                                              (outputTokenInfo?.decimals || 1)
                                        )}
                                      </>
                                    ) : null}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoutesWrapper>
  );
};

export default RoutesModel;
