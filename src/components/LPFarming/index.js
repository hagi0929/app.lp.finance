import React from "react";
import Tabs from "./Tabs";
import LPFarmingWrapper from "styles/LPFarming.style";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCrypto } from "contexts/CryptoContext";
import Table from "./Table";
import Image from "Layout/Image";

const LPFarming = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { PriceList, BalanceList } = useCrypto();

  return (
    <>
      <LPFarmingWrapper>
        <div className="container LPFarming">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="LPFarming_title text-center">
                <h1>LP Farming</h1>
              </div>
              <div className="LPFarming_subtitle text-center">
                <p>Provide Liquidity to earn rewards</p>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-4">
              <div className="d-flex justify-content-center">
                <a
                  href="https://lifinity.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/Lifinity.png" alt="Lifinity" h="1.9rem" />
                </a>
              </div>
            </div>
          </div>
          <Table />
          <Tabs
            publicKey={publicKey}
            PriceList={PriceList}
            BalanceList={BalanceList}
          />
        </div>
      </LPFarmingWrapper>
    </>
  );
};

export default LPFarming;
