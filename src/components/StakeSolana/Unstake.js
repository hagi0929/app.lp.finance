import React from "react";
import Button from "Layout/Button";
import Image from "Layout/Image";
import Input from "Layout/Form/Input";
import { TokenRegistry } from "assets/registry";

const Unstake = ({ publicKey }) => {
  return (
    <>
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
              <Button active={3} br="5px" p="0px 3px" id="btn" size="0.85rem">
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
              >
                <Image src={TokenRegistry.SOL} alt="SOL" h="2rem" />
                <p className="mx-2">SOL</p>
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

      <div className="stake_btn_section mt-4">
        <div className="row">
          <div className="col-12">
            <Button
              active={1}
              br="50px"
              p="0.6rem 1rem"
              id="btn"
              size="1.2rem"
              className="d-flex align-items-center"
            >
              Unstake
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unstake;
