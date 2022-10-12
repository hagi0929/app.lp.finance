import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const SEED_PDA = "nlp-staking";
export const DAILY_LPFI_REWARD_AMOUNT = 150;
export const MAX_HISTORY_LEN = 2000;

export const config = new PublicKey(
  "AVs29fMj4SwntEUMCp2era6tukaHjPvbWXKArWUcJhye"
);

export const LPFi_reward_history_pub = new PublicKey(
  "24E6vUYgZwMxMbrtM22GDVYD6y4g8p7xMP1HGUgASciC"
);

export const zSOL_reward_history_pub = new PublicKey(
  "BXjxrrwRFgrUhJo4HyoUZHULaVMntDyq623agF9zNkVH"
);
