import React from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "styles/Borrow.style";
import { useWallet } from "@solana/wallet-adapter-react";

const Borrow = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  return (
    <>
      <BorrowWrapper pie={30}>
        <div className="container borrow">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="borrow_title text-center">
                <h1>LP Finance Protocol</h1>
              </div>
              <div className="borrow_subtitle text-center">
                <p>Mint Synthetics Interest-Free</p>
              </div>
            </div>
          </div>
          <Overview publicKey={publicKey} />
          <Tabs publicKey={publicKey} />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default Borrow;
