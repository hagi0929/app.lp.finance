import * as anchor from "@project-serum/anchor";
import { getProgram } from "utils/contract";
import { SEED_LPFi_BUYBACK, USDC_MINT, LPFi_MINT } from "constants/global";

const { PublicKey } = anchor.web3;

export const get_info = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpfiIdl");

    const pool_state_pda = await PublicKey.findProgramAddress(
      [
        Buffer.from(SEED_LPFi_BUYBACK),
        USDC_MINT.toBuffer(),
        LPFi_MINT.toBuffer(),
      ],
      program.programId
    );

    const pool_state = await program.account.poolState.fetch(pool_state_pda[0]);

    var amount_USDC = pool_state.amountUsdc.toNumber() / 1000000;
    var amount_LPFi = pool_state.amountLpfi.toNumber() / 1000000000;
    var price_LPFi = pool_state.priceLpfi / 1000;

    return {
      amount_USDC,
      amount_LPFi,
      price_LPFi,
    };
  } catch (error) {
    return {
      amount_USDC: 0,
      amount_LPFi: 0,
      price_LPFi: 0,
    };
  }
};
