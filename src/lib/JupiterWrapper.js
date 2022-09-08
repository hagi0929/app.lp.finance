import React from "react";
import { JupiterProvider } from "@jup-ag/react-hook";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const JupiterWrapper = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  return (
    <JupiterProvider
      cluster="mainnet-beta"
      connection={connection}
      userPublicKey={wallet?.publicKey || undefined}
    >
      {children}
    </JupiterProvider>
  );
};

export default JupiterWrapper;
