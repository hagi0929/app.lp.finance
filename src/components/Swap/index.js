import React, { useState, useEffect } from "react";
import SwapWrapper from "styles/Swap.style";
import Jupiter from "./Jupiter";
import api from "api";
import JupiterWrapper from "utils/JupiterWrapper";
import { useCluster } from "contexts/ClusterContext";
import { useConnection } from "@solana/wallet-adapter-react";
import { TOKEN_LIST_URL } from "@jup-ag/core";
import {
  getInputMintAddress,
  getOutMintAddress,
} from "helper/constants/swapConstants";

const Swap = () => {
  const { Cluster } = useCluster();
  const [tokens, setTokens] = useState([]);
  const { connection } = useConnection();
  const [coinGeckoList, setCoinGeckoList] = useState(null);
  const [slippage, setSlippage] = useState(0.5);
  const [formValue, setFormValue] = useState({
    amount: null,
    inputMint: getInputMintAddress(Cluster?.name),
    outputMint: getOutMintAddress(Cluster?.name),
    slippage,
  });

  useEffect(() => {
    const fetchCoinGeckoList = async () => {
      const response = await fetch(api.coingecko);
      const data = await response.json();
      setCoinGeckoList(data);
    };

    fetchCoinGeckoList();
    return () => {
      setCoinGeckoList(null);
    };
  }, []);

  useEffect(() => {
    fetch(TOKEN_LIST_URL["mainnet-beta"])
      .then((response) => response.json())
      .then((result) => setTokens(result));

    return () => {
      setTokens([]);
    };
  }, []);

  return (
    <JupiterWrapper>
      <SwapWrapper>
        <div className="container  mt-3 mb-5">
          <div className="swap">
            <div className="col-12">
              <div className="swap_section">
                <Jupiter
                  coinGeckoList={coinGeckoList}
                  connection={connection}
                  tokens={tokens}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  slippage={slippage}
                  setSlippage={setSlippage}
                />
              </div>
            </div>
          </div>
        </div>
      </SwapWrapper>
    </JupiterWrapper>
  );
};

export default Swap;
