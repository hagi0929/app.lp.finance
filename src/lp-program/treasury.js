import * as anchor from "@project-serum/anchor";
import {
  getProgram,
  getATAPublicKey,
  convert_to_wei_value,
  convert_to_wei_value_with_decimal,
} from "utils/contract";
import {
  SEED_TRV_PDA,
  SEED_ZSOL_MINT_AUTHORITY_PDA,
  zSOL_MINT,
  switchboardSolAccount,
  cTokenInfoAccounts,
  getMint,
  zSOL_DECIMAL,
  switchboardMsolAccount,
  switchboardStsolAccount,
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// deposit function for admin treasury
// ==============================================
export const deposit = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Deposit...");

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

    const token_mint = getMint(symbol);

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const userCollateralAta = await getATAPublicKey(token_mint, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_mint, PDA[0]);

    await program.methods
      .depositOnTrvc(convert_to_wei_value(token_mint, amount))
      .accounts({
        userAuthority: user_wallet,
        trvcAccount: PDA[0],
        ctokenInfoAccounts: cTokenInfoAccounts,
        tokenMint: token_mint,
        userAta: userCollateralAta,
        trvcAta: trvcCollateralAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully deposited ${amount} ${symbol}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Deposit failed. Please try again.`);
  }
};

// borrow function for admin treasury
// ==============================================
export const borrow_zSOL = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Borrow...");

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const ZSOL_MINT_PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_ZSOL_MINT_AUTHORITY_PDA)],
      program.programId
    );

    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);

    await program.methods
      .borrowZsolFromTrvc(
        convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL)
      )
      .accounts({
        trvcAccount: PDA[0],
        zsolMintAuthority: ZSOL_MINT_PDA[0],
        ctokenInfoAccounts: cTokenInfoAccounts,
        zsolMint: zSOL_MINT,
        userAta: userZsolAta,
        userAuthority: user_wallet,
        switchboardSol: switchboardSolAccount,
        switchboardMsol: switchboardMsolAccount,
        switchboardStsol: switchboardStsolAccount,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully borrowed ${amount} ${symbol}.`
    );
    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Borrow failed. Please try again.`);
  }
};

// withdraw function for admin treasury
// ==============================================
export const withdraw_collaterals = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Withdraw...");

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

    const token_mint = getMint(symbol);

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const userCollateralAta = await getATAPublicKey(token_mint, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_mint, PDA[0]);

    await program.methods
      .withdrawFromTrvc(convert_to_wei_value(token_mint, amount))
      .accounts({
        userAuthority: user_wallet,
        trvcAccount: PDA[0],
        ctokenInfoAccounts: cTokenInfoAccounts,
        tokenMint: token_mint,
        userAta: userCollateralAta,
        trvcAta: trvcCollateralAta,
        switchboardSol: switchboardSolAccount,
        switchboardMsol: switchboardMsolAccount,
        switchboardStsol: switchboardStsolAccount,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully Withdrew ${amount} ${symbol}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Withdraw failed. Please try again.`);
  }
};

// withdraw function for admin treasury
// ==============================================
export const repay = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Repayment...");

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);

    await program.methods
      .repayZsolFromTrvc(
        convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL)
      )
      .accounts({
        trvcAccount: PDA[0],
        zsolMint: zSOL_MINT,
        userAta: userZsolAta,
        userAuthority: user_wallet,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully Repayment ${amount} ${symbol}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Repayment failed. Please try again.`);
  }
};
