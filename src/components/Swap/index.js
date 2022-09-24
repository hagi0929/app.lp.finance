import React, { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import SwapWrapper from "styles/Swap.style";
import { useConnection } from "@solana/wallet-adapter-react";
import Jupiter from "./Jupiter";
import { SwapTokens, coinGeckoList } from "assets/registry/SwapRegistry";
import { useSnackbar } from "contexts/SnackbarContext";
import { useCrypto } from "contexts/CryptoContext";
import JupiterWrapper from "lib/JupiterWrapper";
import { MintAddress } from "constants/global";

const Swap = () => {
  const { PriceList, BalanceList } = useCrypto();
  const { OpenSnackbar } = useSnackbar();
  const { connection } = useConnection();
  const [slippage, setSlippage] = useState(0.5);

  const [formValue, setFormValue] = useState({
    amount: null,
    inputMint: new PublicKey(MintAddress.SOL),
    outputMint: new PublicKey(MintAddress.mSOL),
    slippage,
  });

  return (
    <JupiterWrapper>
      <SwapWrapper>
        <div className="container mt-3 mb-5">
          <div className="swap">
            <div className="row">
              <div className="col-12">
                <div className="swap_section">
                  <Jupiter
                    coinGeckoList={coinGeckoList}
                    connection={connection}
                    tokens={SwapTokens}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    slippage={slippage}
                    setSlippage={setSlippage}
                    OpenSnackbar={OpenSnackbar}
                    PriceList={PriceList}
                    BalanceList={BalanceList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwapWrapper>
    </JupiterWrapper>
  );
};

export default Swap;
