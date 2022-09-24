import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  getProgram,
  getConnection,
  getNetwork,
  getSwitchboardPrice,
} from "../contract";
import {
  switchboardSolAccount,
  zSOL_MINT,
  TRVC_SWAP_FEE,
  getOracleAccount,
  getMint,
  mSOLMint,
  SEED_TRV_PDA,
} from "constants/global";

const getMaxInputAmount = async (
  input_token,
  output_token,
  token_balance,
  Treasury_data,
  switchboardProgram
) => {
  const sol_price = await getSwitchboardPrice(
    switchboardProgram,
    switchboardSolAccount
  );

  const mSOL_amount = Treasury_data.msolAmount;
  const stSOL_amount = Treasury_data.stsolAmount;

  if (input_token.equals(zSOL_MINT)) {
    const switchboard_dest = getOracleAccount(output_token);
    const dest_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboard_dest
    );

    const max_output_amount = output_token.equals(mSOLMint)
      ? mSOL_amount
      : stSOL_amount;

    const max_input_amount =
      (Number(max_output_amount) * dest_price) / sol_price / TRVC_SWAP_FEE;

    return Math.min(token_balance, max_input_amount);
  } else {
    return token_balance;
  }
};

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
    if (!amount) {
      return 0;
    } else {
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
    }
  } catch (error) {
    return 0;
  }
};

export const getMxAmount = async (wallet, symbolA, symbolB, balance) => {
  try {
    if (balance > 0) {
      const input_token = getMint(symbolA);
      const output_token = getMint(symbolB);

      const program = getProgram(wallet, "lpIdl");

      const network = getNetwork();
      const connection = getConnection();

      const switchboardProgram = await loadSwitchboardProgram(
        network,
        connection,
        Keypair.fromSeed(new Uint8Array(32).fill(1))
      );

      const TreasuryPDA = await PublicKey.findProgramAddress(
        [Buffer.from(SEED_TRV_PDA)],
        program.programId
      );

      const TreasuryAccountData =
        await program.account.typelessRepaymentVault.fetch(TreasuryPDA[0]);

      const max_input_amount = await getMaxInputAmount(
        input_token,
        output_token,
        balance,
        TreasuryAccountData,
        switchboardProgram
      );

      return max_input_amount;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};
