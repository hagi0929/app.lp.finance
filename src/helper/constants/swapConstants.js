import { PublicKey } from "@solana/web3.js";

export const getInputMintAddress = (network) => {
  let INPUT_MINT_ADDRESS;
  if (network === "Devnet") {
    //SOL
    INPUT_MINT_ADDRESS = new PublicKey(
      "So11111111111111111111111111111111111111112"
    );
  } else {
    // USDC
    INPUT_MINT_ADDRESS = new PublicKey(
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );
  }
  return INPUT_MINT_ADDRESS;
};

export const getOutMintAddress = (network) => {
  let OUTPUT_MINT_ADDRESS;
  if (network === "Devnet") {
    // SRM
    OUTPUT_MINT_ADDRESS = new PublicKey(
      "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"
    );
  } else {
    // MANGO
    OUTPUT_MINT_ADDRESS = new PublicKey(
      "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac"
    );
  }
  return OUTPUT_MINT_ADDRESS;
};
