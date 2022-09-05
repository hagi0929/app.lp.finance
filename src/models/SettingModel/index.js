import React, { useEffect, memo, useState } from "react";
import SettingModelWrapper from "./SettingModel.style";
import { ThemeTabsRegistry } from "assets/registry/TabRegistry";
import Button from "Layout/Button";

const SettingTabs = ["Theme setting", "RPC setting"];

const SettingModel = ({ isOpen, isClose }) => {
  const [HandleSwitch, setHandleSwitch] = useState(false);
  const [SelectSetting, setSelectSetting] = useState(null);
  const [tempTheme] = useState("Light");

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  return (
    <SettingModelWrapper>
      <div className="popup">
        <div className="popup-container">
          {HandleSwitch ? (
            <>
              <div className="container-fluid setting_section">
                <div className="row theme_Section pb-2">
                  <div className="col-12 d-flex justify-content-center align-items-center title_section">
                    <p>{SelectSetting}</p>
                    <i
                      className="zmdi zmdi-arrow-left"
                      onClick={() => setHandleSwitch(false)}
                    />
                  </div>
                </div>
                <div className="row bottom_Section">
                  {SelectSetting === "Theme setting" && (
                    <>
                      <div className="col-12 mt-4">
                        <div className="tabs_list">
                          <nav>
                            <div
                              className="nav nav-tabs"
                              id="nav-tab"
                              role="tablist"
                            >
                              {ThemeTabsRegistry.map((val, ind) => {
                                return (
                                  <Button
                                    key={ind}
                                    className={
                                      tempTheme === val.theme
                                        ? `col-6 ${val.class} active`
                                        : `col-6 ${val.class}`
                                    }
                                    id={val.id}
                                    data-toggle="tab"
                                    href={val.href}
                                    role="tab"
                                    aria-controls={val.ariaControls}
                                    aria-selected={val.ariaSelected}
                                  >
                                    {val.theme}
                                  </Button>
                                );
                              })}
                            </div>
                          </nav>
                        </div>
                      </div>
                      <div className="col-12 save_section mt-4">
                        <Button
                          type="submit"
                          active={1}
                          br="50px"
                          p="0.7rem 1rem"
                          id="btn"
                          size="1rem"
                        >
                          Save
                        </Button>
                      </div>
                    </>
                  )}

                  {SelectSetting === "RPC setting" && ""}
                </div>
              </div>
            </>
          ) : (
            <div className="container-fluid setting_section">
              <div className="row top_Section pb-2">
                <div className="col-12 d-flex justify-content-center align-items-center title_section">
                  <p>Setting</p>
                  <i className="zmdi zmdi-close" onClick={CloseModel} />
                </div>
              </div>
              <div className="row bottom_Section">
                {SettingTabs.map((list) => {
                  return (
                    <div className="col-12 mt-3">
                      <div
                        className="setting_card"
                        onClick={() => {
                          setHandleSwitch(true);
                          setSelectSetting(list);
                        }}
                      >
                        <p>{list}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </SettingModelWrapper>
  );
};

export default memo(SettingModel);
