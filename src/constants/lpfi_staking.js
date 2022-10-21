import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const config = new PublicKey(
  "8nRf9XuqYTeGFTMb4Mhh1BApFkoZRzf7cWsnrpKzk665"
);

export const ADMIN = new PublicKey(
  "AZzscKGxcnS25oyvcLWoYWAQPE4uv4pycXR8ANq1HkmD"
);

export const PDA_SEED = "lpfi-staking";
export const POOL_AUTH_PDA_SEED = "pool-auth";
export const REWARD_PDA_SEED = "reward-v1";

export const REWARD_MINT = new PublicKey(
  "83112bbsbixNxtWGBn594Rv7gZha1BK2ngcoYc8bHuLp"
);

// Daily LPFi mint amount
export const DAILY_LPFI_REWARD_AMOUNT = 135;
export const DAILY_THIRD_PARTY_REWARD_AMOUNT = 100;
