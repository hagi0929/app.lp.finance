import * as anchor from "@project-serum/anchor";
import { getMint } from "constants/global";
import {
  getProgram,
  getConnection,
  convert_from_wei_value_with_decimal,
} from "utils/contract";
import { SEED_PDA } from "constants/lpIncentives";

const { PublicKey } = anchor.web3;

// get global LP Incentives info
export const get_config_info = async (wallet) => {
  try {
    const program = getProgram(wallet, "lpIn_Idl");

    const nlp_mint = getMint("nlp");

    // eslint-disable-next-line no-unused-vars
    const [config, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(nlp_mint.toBuffer())],
      program.programId
    );

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

      const get_staked_amount = stakerData.stakedAmount.toString();
      const staked_amount = convert_from_wei_value_with_decimal(
        get_staked_amount,
        9
      );
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
