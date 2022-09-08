import * as anchor from "@project-serum/anchor";
const { Connection } = anchor.web3;

export const getConnection = () => {
  const Cluster = localStorage.getItem("web3.endpoint");

  if (!Cluster) return;

  var ClusterEnv;
  if (Cluster === "QuickNode (LP Finance)") {
    ClusterEnv = process.env.REACT_APP_QUICK_NODE_CLUSTER;
  } else if (Cluster === "Mainnet Beta") {
    ClusterEnv = process.env.REACT_APP_PUBLIC_CLUSTER;
  }

  return new Connection(ClusterEnv, "processed");
};
