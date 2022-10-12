import * as anchor from "@project-serum/anchor";
import { getProgram, getConnection } from "utils/contract";
import {
  config,
  SEED_PDA,
  zSOL_reward_history_pub,
  LPFi_reward_history_pub,
} from "constants/lpIncentives";

const { PublicKey } = anchor.web3;

// get global LP Incentives info
export const get_config_info = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpIn_Idl");

    const configData = await program.account.config.fetch(config);

    const total_staked_amount = configData.totalStakedAmount.toString();
    return {
      total_staked_amount,
    };
  } catch (error) {
    return {
      total_staked_amount: 0,
    };
  }
};

// get global LP Incentives account info
export const get_staker_account_info = async (wallet) => {
  try {
    const user_wallet = wallet.publicKey;

    if (user_wallet) {
      const connection = getConnection(wallet);

      const program = getProgram(wallet, "lpIn_Idl");

      const stakerAccountPDA = await PublicKey.findProgramAddress(
        [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
        program.programId
      );

      const stakerAccountInfo = await connection.getAccountInfo(
        stakerAccountPDA[0]
      );

      if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
        return {
          staked_amount: 0,
          RewardList: [],
        };
      }

      const stakerData = await program.account.stakerAccount.fetch(
        stakerAccountPDA[0]
      );

      const staked_amount = stakerData.stakedAmount.toString();
      const zSOL_reward_amount = stakerData.zsolRewardAmount.toString();
      const LPFi_reward_amount = stakerData.lpfiRewardAmount.toString();

      const RewardList = [
        {
          id: 1,
          amount: zSOL_reward_amount,
          token: "zSOL",
        },
        {
          id: 2,
          amount: LPFi_reward_amount,
          token: "LPFi",
        },
      ];

      return {
        staked_amount,
        RewardList,
      };
    }
  } catch (error) {
    return {
      staked_amount: 0,
      RewardList: [],
    };
  }
};

// get global all account info
export const get_all_staker_account_info = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpIn_Idl");

    const stakersData = await program.account.stakerAccount.all();

    console.table(stakersData);
  } catch (error) {}
};

export const get_zsol_reward_history = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpIn_Idl");

    const zsolRewardHistoryData = await program.account.zsolRewardHistory.fetch(
      zSOL_reward_history_pub
    );

    const total_count = zsolRewardHistoryData.totalCount.toString();

    console.log(total_count);
    console.table(zsolRewardHistoryData);
  } catch (error) {}
};

export const nLp_staking_program = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpIn_Idl");

    const lpfiRewardHistoryData = await program.account.lpFiRewardHistory.fetch(
      LPFi_reward_history_pub
    );

    console.log(lpfiRewardHistoryData);
    console.table(lpfiRewardHistoryData);
  } catch (error) {}
};
