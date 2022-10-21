import * as anchor from "@project-serum/anchor";
import {
  getProgram,
  getATAPublicKey,
  getConnection,
  convert_to_wei_value_with_decimal,
} from "utils/contract";
import { LPFi_MINT } from "constants/global";
import {
  config,
  PDA_SEED,
  REWARD_MINT,
  POOL_AUTH_PDA_SEED,
  REWARD_PDA_SEED,
} from "constants/lpfi_staking";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const stake_lpfi = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start lpfi staking...");

    const connection = getConnection();

    const program = getProgram(wallet, "lpfi_staking_idl");

    const user_wallet = wallet.publicKey;

    // eslint-disable-next-line no-unused-vars
    const [stakerAccount, _user_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(PDA_SEED), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const stakerAccountInfo = await connection.getAccountInfo(stakerAccount);

    if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
      await program.methods
        .createStakerAccount()
        .accounts({
          userAuthority: user_wallet,
          stakerAccount: stakerAccount,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    }

    // eslint-disable-next-line no-unused-vars
    const [reward, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(REWARD_PDA_SEED), Buffer.from(REWARD_MINT.toBuffer())],
      program.programId
    );

    // eslint-disable-next-line no-unused-vars
    const [pool_authority, _bool_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(POOL_AUTH_PDA_SEED)],
      program.programId
    );

    const userLPFI = await getATAPublicKey(LPFi_MINT, user_wallet);
    const poolLPFI = await getATAPublicKey(LPFi_MINT, pool_authority);
    const poolReward = await getATAPublicKey(REWARD_MINT, pool_authority);

    await program.methods
      .stake(convert_to_wei_value_with_decimal(amount, 9))
      .accounts({
        userAuthority: user_wallet,
        config: config,
        stakerAccount: stakerAccount,
        lpfiMint: LPFi_MINT,
        userLpfiAta: userLPFI,
        poolLpfiAta: poolLPFI,
        rewardMint: REWARD_MINT,
        poolRewardAta: poolReward,
        reward: reward,
        poolAuthority: pool_authority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully lpfi staked ${amount}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `lpfi staking failed. Please try again.`
    );
  }
};

export const unstake_lpfi = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start lpfi unstake...");

    const connection = getConnection();

    const program = getProgram(wallet, "lpfi_staking_idl");

    const user_wallet = wallet.publicKey;

    // eslint-disable-next-line no-unused-vars
    const [stakerAccount, _user_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(PDA_SEED), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const stakerAccountInfo = await connection.getAccountInfo(stakerAccount);
    if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
      OpenContractSnackbar(true, "Error", `Staker account does not exist.`);
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const [reward, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(REWARD_PDA_SEED), Buffer.from(REWARD_MINT.toBuffer())],
      program.programId
    );

    // eslint-disable-next-line no-unused-vars
    const [pool_authority, _bool_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(POOL_AUTH_PDA_SEED)],
      program.programId
    );

    const userLPFI = await getATAPublicKey(LPFi_MINT, user_wallet);
    const poolLPFI = await getATAPublicKey(LPFi_MINT, pool_authority);

    await program.methods
      .unstake(convert_to_wei_value_with_decimal(amount, 9))
      .accounts({
        userAuthority: user_wallet,
        config: config,
        stakerAccount: stakerAccount,
        lpfiMint: LPFi_MINT,
        userLpfiAta: userLPFI,
        poolLpfiAta: poolLPFI,
        rewardMint: REWARD_MINT,
        reward: reward,
        poolAuthority: pool_authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully lpfi unstake ${amount}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `lpfi unstake failed. Please try again.`
    );
  }
};

export const claim_reward = async (wallet, OpenContractSnackbar) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start claim reward...");

    const connection = getConnection();

    const program = getProgram(wallet, "lpfi_staking_idl");

    const user_wallet = wallet.publicKey;

    // eslint-disable-next-line no-unused-vars
    const [stakerAccount, _user_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(PDA_SEED), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const stakerAccountInfo = await connection.getAccountInfo(stakerAccount);

    if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
      await program.methods
        .createStakerAccount()
        .accounts({
          userAuthority: user_wallet,
          stakerAccount: stakerAccount,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    }
    // eslint-disable-next-line no-unused-vars
    const [reward, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(REWARD_PDA_SEED), Buffer.from(REWARD_MINT.toBuffer())],
      program.programId
    );

    // eslint-disable-next-line no-unused-vars
    const [pool_authority, _bool_bump] = await PublicKey.findProgramAddress(
      [Buffer.from(POOL_AUTH_PDA_SEED)],
      program.programId
    );

    const userReward = await getATAPublicKey(REWARD_MINT, user_wallet);
    const poolReward = await getATAPublicKey(REWARD_MINT, pool_authority);

    await program.methods
      .claimReward()
      .accounts({
        userAuthority: user_wallet,
        stakerAccount: stakerAccount,
        rewardMint: REWARD_MINT,
        config: config,
        userRewardAta: userReward,
        poolRewardAta: poolReward,
        reward: reward,
        poolAuthority: pool_authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(true, "Success", `Successfully claim reward.`);
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `claim reward failed. Please try again.`
    );
  }
};
