import React, { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import SwapWrapper from "styles/Swap.style";
import JupiterWrapper from "lib/JupiterWrapper";
import { useConnection } from "@solana/wallet-adapter-react";
import Jupiter from "./Jupiter";
import { SwapTokens, coinGeckoList } from "assets/registry/SwapRegistry";

const Swap = () => {
  const { connection } = useConnection();
  const [slippage, setSlippage] = useState(0.5);
  const [formValue, setFormValue] = useState({
    amount: null,
    inputMint: new PublicKey("So11111111111111111111111111111111111111112"),
    outputMint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
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
