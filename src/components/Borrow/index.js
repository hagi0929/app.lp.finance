import React from "react";
import Overview from "./Overview";
import Tabs from "./Tabs";
import BorrowWrapper from "styles/Borrow.style";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCrypto } from "contexts/CryptoContext";
import Button from "Layout/Button";
import Image from "Layout/Image";

const Borrow = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { PriceList, BalanceList } = useCrypto();
  return (
    <>
      <BorrowWrapper pie={100}>
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
            <div className="col-12 d-flex justify-content-center mt-3">
              <div>
                <Button
                  active={1}
                  br="0.6rem"
                  p="0.5em 2rem"
                  className="not-allowed"
                >
                  <Image src="/images/notifi.png" alt="notifi" h="1.5rem" />
                  <p className="ml-2">notifi</p>
                </Button>
              </div>
            </div>
          </div>
          <Overview publicKey={publicKey} />
          <Tabs
            publicKey={publicKey}
            PriceList={PriceList}
            BalanceList={BalanceList}
          />
        </div>
      </BorrowWrapper>
    </>
  );
};

export default Borrow;
