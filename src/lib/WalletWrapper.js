import React, { useEffect, useMemo, useState, memo } from "react";
import { WalletModalProvider } from "lib/WalletAdapter";
import { useCluster } from "contexts/ClusterContext";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
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

require("assets/css/wallet.css");

const WalletWrapper = ({ children }) => {
  const { Cluster } = useCluster();
  const [network, setNetwork] = useState(null);

  const endpoint = useMemo(() => {
    let ClusterEnv;

    if (Cluster === "QuickNode (LP Finance)") {
      ClusterEnv = process.env.REACT_APP_QUICK_NODE_CLUSTER;
    } else if (Cluster === "Mainnet Beta") {
      ClusterEnv = process.env.REACT_APP_PUBLIC_CLUSTER;
    }

    return ClusterEnv;
  }, [Cluster]);

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
    if (Cluster === "QuickNode (LP Finance)" || Cluster === "Mainnet Beta") {
      setNetwork(WalletAdapterNetwork.Mainnet);
    } else if (Cluster === "Testnet") {
      setNetwork(WalletAdapterNetwork.Testnet);
    } else if (Cluster === "Devnet") {
      setNetwork(WalletAdapterNetwork.Devnet);
    }
    return () => {
      setNetwork(null);
    };
  }, [Cluster]);

  return (
    <>
      {endpoint && (
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      )}
    </>
  );
};

export default memo(WalletWrapper);
