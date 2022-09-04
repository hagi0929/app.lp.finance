import React, { useEffect, useState } from "react";
import SwapSettingsWrapper from "./SwapSettings.style";
import { slippageTabs } from "assets/registry/TabRegistry";
import Button from "Layout/Button";

const slippagePresets = ["0.1", "0.5", "1", "2"];

const SwapSettingsModal = ({ isOpen, onClose, slippage, setSlippage }) => {
  const [tempSlippage, setTempSlippage] = useState(slippage);
  const [showCustomSlippageForm, setShowCustomSlippageForm] = useState(false);
  const [inputValue, setInputValue] = useState(
    tempSlippage ? tempSlippage.toString() : ""
  );
  const handleSetTempSlippage = (s) => {
    setTempSlippage(s);
    setInputValue("");
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleSave = () => {
    setSlippage(inputValue ? parseFloat(inputValue) : tempSlippage);
    onClose?.();
  };

  useEffect(() => {
    if (!slippagePresets.includes(tempSlippage.toString())) {
      setShowCustomSlippageForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SwapSettingsWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid setting_section">
            <div className="row setting_top_Section pb-2">
              <div className="col-12 d-flex justify-content-center align-items-center title_section">
                <p>Slippage Settings</p>
                <i className="zmdi zmdi-close" onClick={CloseModel} />
              </div>
            </div>
            <div className="row setting_custom mt-4">
              <div className="col-6 d-flex align-items-center">
                <p>Slippage</p>
              </div>
              <div className="col-6 d-flex  justify-content-end align-items-center">
                <span
                  onClick={() =>
                    setShowCustomSlippageForm(!showCustomSlippageForm)
                  }
                >
                  {showCustomSlippageForm ? "Preset" : "Custom"}
                </span>
              </div>
            </div>
            <div className="row setting__top_Section mt-2">
              <div className="col-12">
                <div className="slippage_list">
                  {showCustomSlippageForm ? (
                    <div className="input_section">
                      <input
                        type="text"
                        placeholder="0.00"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <p>%</p>
                    </div>
                  ) : (
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {slippageTabs.map((val, ind) => {
                          return (
                            <Button
                              key={ind}
                              className={
                                tempSlippage === val.value
                                  ? `col-3 ${val.class} active`
                                  : `col-3 ${val.class}`
                              }
                              id={val.id}
                              data-toggle="tab"
                              href={val.href}
                              role="tab"
                              aria-controls={val.ariaControls}
                              aria-selected={val.ariaSelected}
                              onClick={() => handleSetTempSlippage(val.value)}
                            >
                              {val.value}%
                            </Button>
                          );
                        })}
                      </div>
                    </nav>
                  )}
                </div>
              </div>
              <div className="col-12 save_section mt-4">
                <Button
                  type="submit"
                  active={1}
                  br="50px"
                  p="0.5rem 1rem"
                  id="btn"
                  size="0.9rem"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwapSettingsWrapper>
  );
};

export default SwapSettingsModal;
