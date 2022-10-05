import React, { useEffect, memo } from "react";
import { useState } from "react";
import TokenWrapper from "./CliModel.style";
import { handleCommand } from "command";

const Input = ({ handleTx }) => {
  const [handleInput, setHandleInput] = useState("");
  // const [disabled, setDisabled] = useState(false);

  return (
    <div className="command">
      <p>app.lp.finance:~$</p>
      <input
        type="text"
        aria-invalid="false"
        className="pl-1"
        value={handleInput}
        // disabled={disabled}
        onChange={(e) => setHandleInput(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleTx(handleInput);
            // setDisabled(true);
          }
        }}
        autoFocus
      />
    </div>
  );
};

const CliModel = ({
  isOpen,
  isClose,
  OpenCommand,
  CommandMess,
  wallet,
  PriceHandler,
  BalanceHandler,
  CommandType,
  closeCommand,
}) => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    setCount([...count, 0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  const handleTx = async (handleInput) => {
    if (handleInput === "clear") {
      const elements = document.getElementsByClassName("terminal_card");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    } else {
      await handleCommand(
        wallet,
        handleInput,
        OpenCommand,
        PriceHandler,
        BalanceHandler
      );
    }
  };

  useEffect(() => {
    if (!CommandMess) return;
    var id = document.querySelector(".terminal_card");
    id.insertAdjacentHTML("beforeend", `<p class="mess">${CommandMess}</p>`);
  }, [CommandMess]);

  useEffect(() => {
    if (CommandType === "Success" || CommandType === "Error") {
      setCount([...count, count.length - 1 + 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CommandType]);

  return (
    <TokenWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid terminal_section">
            <div className="row">
              <div className="col-12">
                <div className="terminal_title">
                  <div className="row">
                    <div className="col-6">
                      <p>Terminal</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center close">
                      <i
                        className="zmdi zmdi-close"
                        onClick={() => {
                          CloseModel();
                          closeCommand();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row terminal_content">
              <div className="col-12">
                <div className="terminal_card" id="terminal_card">
                  {count.map((id) => {
                    return <Input {...{ handleTx }} key={id} id={id} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenWrapper>
  );
};

export default memo(CliModel);
