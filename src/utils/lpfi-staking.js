import * as anchor from "@project-serum/anchor";
import {
  getProgram,
  getConnection,
  convert_from_wei_value_with_decimal,
} from "./contract";
import { config, PDA_SEED } from "constants/lpfi_staking.js";

const { PublicKey } = anchor.web3;

export const get_lpfi_config_info = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpfi_staking_idl");
    const configData = await program.account.config.fetch(config);

    const get_total_staked_amount = configData.totalStakedAmount.toString();

    const total_staked_amount = convert_from_wei_value_with_decimal(
      get_total_staked_amount,
      9
    );

    return {
      total_staked_amount,
    };
  } catch (error) {
    return {
      total_staked_amount: 0,
    };
  }
};

export const get_lpfi_staker_account_info = async (wallet) => {
  try {
    const user_wallet = wallet.publicKey;

    if (user_wallet) {
      const connection = getConnection();

      const program = getProgram(wallet, "lpfi_staking_idl");

      const [stakerAccount, _bump] = await PublicKey.findProgramAddress(
        [Buffer.from(PDA_SEED), Buffer.from(user_wallet.toBuffer())],
        program.programId
      );

      const stakerAccountInfo = await connection.getAccountInfo(stakerAccount);
      if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
        return {
          staked_amount: 0,
        };
      }

      const stakerData = await program.account.stakerAccount.fetch(
        stakerAccount
      );

      const get_staked_amount = stakerData.stakedAmount.toString();

      const staked_amount = convert_from_wei_value_with_decimal(
        get_staked_amount,
        9
      );

      return {
        staked_amount,
      };
    }
  } catch (error) {
    return {
      staked_amount: 0,
    };
  }
};
