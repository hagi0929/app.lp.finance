import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";

const { Connection, PublicKey } = anchor.web3;

export const getConnection = () => {
  const Cluster = localStorage.getItem("web3.endpoint");

  if (!Cluster) return;

  var ClusterEnv;
  if (Cluster === "QuickNode (LP Finance)") {
    ClusterEnv = process.env.REACT_APP_QUICK_NODE_CLUSTER;
  } else if (Cluster === "Mainnet Beta") {
    ClusterEnv = process.env.REACT_APP_PUBLIC_CLUSTER;
  } else if (Cluster === "Devnet") {
    ClusterEnv = process.env.REACT_APP_DEVNET_CLUSTER;
  }

  return new Connection(ClusterEnv, "processed");
};

export const getProvider = (wallet) => {
  const anchorWallet = {
    publicKey: wallet.publicKey,
    signAllTransactions: wallet.signAllTransactions,
    signTransaction: wallet.signTransaction,
  };

  const connection = getConnection();

  const provider = new anchor.AnchorProvider(connection, anchorWallet, {
    preflightCommitment: "processed",
  });

  return provider;
};

export const getProgram = (wallet, address, idl) => {
  const provider = getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(address);
  const program = new anchor.Program(idl, programId);
  return program;
};

export const getATAPublicKey = async (tokenMint, owner) => {
  return await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenMint,
    owner,
    true
  );
};
