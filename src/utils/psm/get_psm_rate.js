import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair } from "@solana/web3.js";
import { getConnection, getNetwork, getSwitchboardPrice } from "../contract";
import {
  switchboardSolAccount,
  zSOL_MINT,
  TRVC_SWAP_FEE,
  getOracleAccount,
  getMint,
} from "constants/global";

const getSwapRate = async (
  input_token,
  input_amount,
  output_token,
  switchboardProgram
) => {
  try {
    const sol_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );

    if (input_token.equals(zSOL_MINT)) {
      const switchboard_dest = getOracleAccount(output_token);
      const dest_price = await getSwitchboardPrice(
        switchboardProgram,
        switchboard_dest
      );

      const output_amount =
        (Number(sol_price) / Number(dest_price)) *
        Number(input_amount) *
        Number(TRVC_SWAP_FEE);

      return output_amount;
    } else {
      const switchboard_src = getOracleAccount(input_token);
      const src_price = await getSwitchboardPrice(
        switchboardProgram,
        switchboard_src
      );
      const zSOL_amount =
        (Number(src_price) / Number(sol_price)) * input_amount;
      return zSOL_amount;
    }
  } catch (error) {
    return 0;
  }
};

export const fetch_psm_rate = async (symbolA, symbolB, amount) => {
  try {
    const input_token = getMint(symbolA);
    const output_token = getMint(symbolB);

    const network = getNetwork();
    const connection = getConnection();

    const switchboardProgram = await loadSwitchboardProgram(
      network,
      connection,
      Keypair.fromSeed(new Uint8Array(32).fill(1))
    );

    const output_amount = await getSwapRate(
      input_token,
      amount,
      output_token,
      switchboardProgram
    );

    return output_amount;
  } catch (error) {
    return 0;
  }
};
