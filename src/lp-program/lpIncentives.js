import * as anchor from "@project-serum/anchor";
import {
  getProgram,
  getATAPublicKey,
  getConnection,
  convert_to_wei_value_with_decimal,
} from "utils/contract";
import { getMint } from "constants/global";
import { SEED_PDA } from "constants/lpIncentives";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const nlp_deposit = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start deposit...");

    const connection = getConnection(wallet);

    const program = getProgram(wallet, "lpIn_Idl");

    const user_wallet = wallet.publicKey;

    const nlp_mint = getMint("nlp");

    const [config, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(nlp_mint.toBuffer())],
      program.programId
    );

    const stakerAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA)],
      program.programId
    );

    const userAta = await getATAPublicKey(nlp_mint, user_wallet);
    const poolAta = await getATAPublicKey(nlp_mint, PDA[0]);

    const stakerAccountInfo = await connection.getAccountInfo(
      stakerAccountPDA[0]
    );

    if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
      await program.methods
        .createStakerAccount()
        .accounts({
          stakerAccount: stakerAccountPDA[0],
          config: config,
          userAuthority: user_wallet,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    }

    const stakerAccountData = await program.account.stakerAccount.fetch(
      stakerAccountPDA[0]
    );
    const stakerNLP = stakerAccountData.nlpMint;

    if (stakerNLP.equals(nlp_mint) === false) {
      OpenContractSnackbar(
        true,
        "Info",
        `You are using old nlp staking. Please withdraw old nlp and renew with new nlp staking.`
      );
      return;
    }

    await program.methods
      .stakeNlp(convert_to_wei_value_with_decimal(amount, 9))
      .accounts({
        stakerAccount: stakerAccountPDA[0],
        config,
        userAuthority: user_wallet,
        userNlpAta: userAta,
        poolNlpAta: poolAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(true, "Success", `Successfully deposited ${amount}.`);
    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Deposit failed. Please try again.`);
  }
};

export const nlp_withdraw = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start withdraw...");

    const connection = getConnection(wallet);

    const program = getProgram(wallet, "lpIn_Idl");

    const user_wallet = wallet.publicKey;

    const nlp_mint = getMint("nlp");

    const [config, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(nlp_mint.toBuffer())],
      program.programId
    );

    const stakerAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA)],
      program.programId
    );

    const userAta = await getATAPublicKey(nlp_mint, user_wallet);
    const poolAta = await getATAPublicKey(nlp_mint, PDA[0]);

    const stakerAccountInfo = await connection.getAccountInfo(
      stakerAccountPDA[0]
    );

    if (stakerAccountInfo === null || stakerAccountInfo.data.length === 0) {
      OpenContractSnackbar(true, "Info", `Your account does not exist.`);
      return;
    }

    await program.methods
      .unstakeNlp(convert_to_wei_value_with_decimal(amount, 9))
      .accounts({
        userAuthority: user_wallet,
        stakerAccount: stakerAccountPDA[0],
        config,
        nlpMint: nlp_mint,
        userNlpAta: userAta,
        poolNlpAta: poolAta,
        poolAuthority: PDA[0],
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    OpenContractSnackbar(true, "Success", `Successfully Withdrew ${amount}.`);
    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Withdraw failed. Please try again.`);
  }
};
