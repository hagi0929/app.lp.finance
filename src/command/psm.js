import * as anchor from "@project-serum/anchor";
import { fetch_psm_rate, getMxAmount } from "utils/psm/get_psm_rate";
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
  config,
  switchboardSolAccount,
  cTokenInfoAccounts,
  getMint,
  zSOL_DECIMAL,
  getSwitchboardAccount,
  getSymbol,
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// burn_zSOL function for PSM
// ==============================================
export const burn_zSOL = async (wallet, array, OpenCommand, BalanceHandler) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    OpenCommand(true, "Processing", "Processing...");

    let tokenA = getSymbol(array[2]);
    let tokenB = getSymbol(array[4]);
    const amount = parseFloat(array[5]);

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    } else if (amount > BalanceHandler[tokenA]) {
      OpenCommand(false, "Error", "Insufficient Balance");
      return;
    }

    const max = await getMxAmount(
      wallet,
      tokenA,
      tokenB,
      BalanceHandler[tokenA]
    );

    if (amount > max) {
      OpenCommand(false, "Error", "Exceed max input amount");
      return;
    }

    const { output_amount } = await fetch_psm_rate(
      tokenA,
      tokenB,
      amount,
      BalanceHandler[tokenA]
    );

    const program = getProgram(wallet, "lpIdl");

    const token_dest = getMint(tokenB);

    const configData = await program.account.config.fetch(config);
    const getFeeAccount = configData.feeAccount;

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const switchboardDest = getSwitchboardAccount(tokenB);
    const userCollateralAta = await getATAPublicKey(token_dest, user_wallet);
    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_dest, PDA[0]);
    const feeAta = await getATAPublicKey(token_dest, getFeeAccount);

    const txHash = await program.methods
      .burnZsol(convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL))
      .accounts({
        userAuthority: user_wallet,
        trvcAccount: PDA[0],
        zsolMint: zSOL_MINT,
        userZsolAta,
        ctokenInfoAccounts: cTokenInfoAccounts,
        collateralToken: token_dest, // variables
        userCollateralAta: userCollateralAta,
        trvcCollateralAta,
        feeAccount: feeAta,
        switchboardSol: switchboardSolAccount,
        switchboardDest: switchboardDest,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    if (txHash) {
      OpenCommand(
        true,
        "Processing",
        `${amount} ${tokenA} swapped to ${output_amount} ${tokenB}`
      );
      OpenCommand(false, "Success", txHash);
    } else {
      OpenCommand(false, "Error", "Transaction Failed");
    }
  } catch (error) {
    OpenCommand(false, "Error", "Transaction Failed");
  }
};

// mint zSOL function for PSM
// ==============================================
export const mint_zSOL = async (wallet, array, OpenCommand, BalanceHandler) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    OpenCommand(true, "Processing", "Processing...");

    let tokenA = getSymbol(array[2]);
    let tokenB = getSymbol(array[4]);
    const amount = parseFloat(array[5]);

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    } else if (amount > BalanceHandler[tokenA]) {
      OpenCommand(false, "Error", "Insufficient Balance");
      return;
    }

    const max = await getMxAmount(
      wallet,
      tokenA,
      tokenB,
      BalanceHandler[tokenA]
    );

    if (amount > max) {
      OpenCommand(false, "Error", "Exceed max input amount");
      return;
    }

    const { output_amount } = await fetch_psm_rate(
      tokenA,
      tokenB,
      amount,
      BalanceHandler[tokenA]
    );

    const program = getProgram(wallet, "lpIdl");

    const token_src = getMint(tokenA);

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const zSOL_MINT_PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_ZSOL_MINT_AUTHORITY_PDA)],
      program.programId
    );

    const switchboardSrc = getSwitchboardAccount(tokenA);
    const userCollateralAta = await getATAPublicKey(token_src, user_wallet);
    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_src, PDA[0]);

    const txHash = await program.methods
      .mintZsol(convert_to_wei_value(token_src, amount))
      .accounts({
        trvcAccount: PDA[0],
        zsolMintAuthority: zSOL_MINT_PDA[0],
        ctokenInfoAccounts: cTokenInfoAccounts,
        collateralToken: token_src,
        userCollateralAta: userCollateralAta,
        zsolMint: zSOL_MINT,
        userZsolAta,
        trvcCollateralAta,
        userAuthority: user_wallet,
        switchboardSol: switchboardSolAccount,
        switchboardSrc: switchboardSrc,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    if (txHash) {
      OpenCommand(
        true,
        "Processing",
        `${amount} ${tokenA} swapped to ${output_amount} ${tokenB}`
      );
      OpenCommand(false, "Success", txHash);
    } else {
      OpenCommand(false, "Error", "Transaction Failed");
    }
  } catch (error) {
    OpenCommand(false, "Error", "Transaction Failed");
  }
};
