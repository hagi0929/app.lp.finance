import React, { useEffect, useMemo, useState, memo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
  Coin98WalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "WalletAdapter";
import { useCluster } from "contexts/ClusterContext";

require("assets/css/wallet.css");

const WalletWrapper = ({ children }) => {
  const { Cluster } = useCluster();
  const [network, setNetwork] = useState(null);

  const endpoint = useMemo(() => "https://solana-api.projectserum.com", []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SlopeWalletAdapter(),
      new SolongWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new Coin98WalletAdapter(),
    ],
    [network]
  );

  useEffect(() => {
    if (Cluster?.name === "Mainnet Beta") {
      setNetwork(WalletAdapterNetwork.Mainnet);
    } else if (Cluster?.name === "Testnet") {
      setNetwork(WalletAdapterNetwork.Testnet);
    } else if (Cluster?.name === "Devnet") {
      setNetwork(WalletAdapterNetwork.Devnet);
    }
    return () => {
      setNetwork(null);
    };
  }, [Cluster]);

  return (
    <>
      {/* autoConnect */}
      <ConnectionProvider
        endpoint={Cluster?.endpoint ? Cluster?.endpoint : endpoint}
      >
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default memo(WalletWrapper);
