import * as anchor from "@project-serum/anchor";
import lp_idl from "idls/lpfinance.json";
import { getCTokenInfo } from "constants/global";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { AggregatorAccount } from "@switchboard-xyz/switchboard-v2";

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

export const getNetwork = () => {
  const Cluster = localStorage.getItem("web3.endpoint");

  if (!Cluster) return "mainnet-beta";

  var networkEnv;
  if (Cluster === "QuickNode (LP Finance)") {
    networkEnv = "mainnet-beta";
  } else if (Cluster === "Mainnet Beta") {
    networkEnv = "mainnet-beta";
  } else if (Cluster === "Devnet") {
    networkEnv = "devnet";
  }

  return networkEnv;
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

export const getProgram = (wallet, idl_name) => {
  let idl;
  if (idl_name === "lpIdl") {
    idl = lp_idl;
  }
  const provider = getProvider(wallet);
  anchor.setProvider(provider);
  const programId = new PublicKey(idl.metadata.address);
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

export const convert_to_wei_value_with_decimal = (val, decimal) => {
  const decimalBN = Math.pow(10, decimal);
  const wei_value = Number(val) * Number(decimalBN);
  return new anchor.BN(wei_value.toString());
};

// Convert token amount to wei value: Important
export const convert_to_wei_value = (token_mint, amount) => {
  const cToken_info = getCTokenInfo(token_mint);
  const decimal = cToken_info.decimal;
  const decimalBN = Math.pow(10, decimal);
  const wei_value = Number(amount) * Number(decimalBN);
  return new anchor.BN(wei_value.toString());
};

// Convert token amount to wei value: Important
export const convert_from_wei_value = (token_mint, wei_value) => {
  const cToken_info = getCTokenInfo(token_mint);
  const decimal = cToken_info.decimal;
  const decimalBN = new anchor.BN("10").pow(new anchor.BN(decimal));
  console.log(wei_value.toString());
  return wei_value.div(decimalBN);
};

export const getSwitchboardPrice = async (program, switchboardFeed) => {
  const aggregator = new AggregatorAccount({
    program,
    publicKey: switchboardFeed,
  });
  const result = await aggregator.getLatestValue();
  return result;
};

export const getTokenValue = async (
  switchboardProgram,
  amount,
  decimal,
  switchboardFeed
) => {
  const tokenPrice = await getSwitchboardPrice(
    switchboardProgram,
    switchboardFeed
  );
  const decimalPow = Math.pow(10, decimal);
  const tokenValue = (tokenPrice * Number(amount)) / Number(decimalPow);

  return Number(tokenValue);
};
