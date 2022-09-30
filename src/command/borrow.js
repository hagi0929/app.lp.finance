import * as anchor from "@project-serum/anchor";
import { CalcFiveDigit } from "helper";
import {
  getProgram,
  getATAPublicKey,
  getConnection,
  convert_to_wei_value,
  convert_to_wei_value_with_decimal,
} from "utils/contract";
import {
  SEED_PDA,
  SEED_SOL,
  // SEED_TRV_PDA,
  // SEED_ZSOL_MINT_AUTHORITY_PDA,
  config,
  // switchboardSolAccount,
  // switchboardMsolAccount,
  // switchboardStsolAccount,
  // switchboardSamoAccount,
  // switchboardUxdAccount,
  cTokenInfoAccounts,
  getMint,
  getSwitchboardAccount,
  // zSOL_DECIMAL,
  SOL_DECIMAL,
  getSymbol,
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  // ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// deposit function for csb
// ==============================================
export const deposit_cbs = async (
  wallet,
  array,
  OpenCommand,
  PriceHandler,
  BalanceHandler
) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(true, "Error", "Connect wallet");
      return;
    }

    const amount = parseFloat(array[1]);
    const token = array[2];
    const symbol = getSymbol(token);

    OpenCommand(true, "Processing", "Processing...");

    if (amount === 0) {
      OpenCommand(true, "Error", "Enter an amount");
      return;
    } else if (amount >= BalanceHandler[symbol]) {
      OpenCommand(true, "Error", "Insufficient Balance");
      return;
    } else if (amount <= CalcFiveDigit(10 / PriceHandler[symbol])) {
      OpenCommand(
        true,
        "Error",
        `Required minimum amount - ${CalcFiveDigit(10 / PriceHandler[symbol])} `
      );
      return;
    }

    const connection = getConnection();

    const program = getProgram(wallet, "lpIdl");

    const tokenMint = getMint(symbol);
    const switchboardAccount = getSwitchboardAccount(symbol);

    const configData = await program.account.config.fetch(config);
    const feeAccount = configData.feeAccount;

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    let PDA;

    if (symbol !== "SOL") {
      PDA = await PublicKey.findProgramAddress(
        [Buffer.from(SEED_PDA)],
        program.programId
      );
    } else {
      PDA = await PublicKey.findProgramAddress(
        [Buffer.from(SEED_SOL)],
        program.programId
      );
    }

    let userAta;
    let feeAta;
    let cbsAta;
    if (symbol !== "SOL") {
      userAta = await getATAPublicKey(tokenMint, user_wallet);
      feeAta = await getATAPublicKey(tokenMint, feeAccount);
      cbsAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    const userAccountInfo = await connection.getAccountInfo(userAccountPDA[0]);

    if (userAccountInfo === null || userAccountInfo.data.length === 0) {
      await program.methods
        .initUserAccount()
        .accounts({
          userAccount: userAccountPDA[0],
          userAuthority: user_wallet,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    }

    if (symbol !== "SOL") {
      const txHash = await program.methods
        .deposit(convert_to_wei_value(tokenMint, amount))
        .accounts({
          userAccount: userAccountPDA[0],
          config,
          switchboardAcc: switchboardAccount,
          token: tokenMint,
          userAta: userAta,
          cbsAta,
          feeAta,
          ctokenInfoAccounts: cTokenInfoAccounts,
          userAuthority: user_wallet,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} deposited`);
        OpenCommand(true, "Success", txHash);
      } else {
        OpenCommand(true, "Error", "Transaction Failed");
      }
    } else {
      const txHash = await program.methods
        .depositSol(convert_to_wei_value_with_decimal(amount, SOL_DECIMAL))
        .accounts({
          userAuthority: user_wallet,
          solAccount: PDA[0],
          feeAccount,
          ctokenInfoAccounts: cTokenInfoAccounts,
          switchboardSol: switchboardAccount,
          config,
          userAccount: userAccountPDA[0],
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} deposited`);
        OpenCommand(true, "Success", txHash);
      } else {
        OpenCommand(true, "Error", "Transaction Failed");
      }
    }
  } catch (error) {
    OpenCommand(true, "Error", "Transaction Failed");
  }
};
