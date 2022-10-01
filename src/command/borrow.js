import * as anchor from "@project-serum/anchor";
import { CalcFiveDigit } from "helper";
import { calculateMaxAmount } from "utils/lp-protocol/get_user_info";
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
  SEED_TRV_PDA,
  SEED_ZSOL_MINT_AUTHORITY_PDA,
  config,
  switchboardSolAccount,
  switchboardMsolAccount,
  switchboardStsolAccount,
  switchboardSamoAccount,
  switchboardUxdAccount,
  cTokenInfoAccounts,
  getMint,
  getSwitchboardAccount,
  zSOL_DECIMAL,
  SOL_DECIMAL,
  getSymbol,
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
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
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    const amount = parseFloat(array[1]);
    const token = array[2];
    const symbol = getSymbol(token);

    OpenCommand(true, "Processing", "Processing...");

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    } else if (amount >= BalanceHandler[symbol]) {
      OpenCommand(false, "Error", "Insufficient Balance");
      return;
    } else if (amount <= CalcFiveDigit(10 / PriceHandler[symbol])) {
      OpenCommand(
        false,
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
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
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
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
      }
    }
  } catch (error) {
    OpenCommand(false, "Error", "Transaction Failed");
  }
};

// borrow function for csb
// ==============================================
export const borrow_cbs = async (wallet, array, OpenCommand) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    OpenCommand(true, "Processing", "Processing...");

    const token = array[0];
    const amount = parseFloat(array[1]);
    const symbol = getSymbol(token);

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    } else if (amount > 100) {
      OpenCommand(false, "Error", "Amount should be less then 100");
      return;
    }

    var getMaxAmount = await calculateMaxAmount(wallet, symbol, "Borrow");

    if (amount > getMaxAmount) {
      OpenCommand(false, "Error", "Borrow amount exceeded");
      return;
    }

    const program = getProgram(wallet, "lpIdl");

    const tokenMint = getMint(symbol);

    const is_max = false;

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const zsolMintAuthorityPda = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_ZSOL_MINT_AUTHORITY_PDA)],
      program.programId
    );

    const userZsolAta = await getATAPublicKey(tokenMint, user_wallet);

    const txHash = await program.methods
      .borrow(convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL), is_max)
      .accounts({
        userAuthority: user_wallet,
        userAccount: userAccountPDA[0],
        zsolMintAuthorityPda: zsolMintAuthorityPda[0],
        config,
        zsolMint: tokenMint,
        userZsolAta,
        switchboardSol: switchboardSolAccount,
        switchboardMsol: switchboardMsolAccount,
        switchboardStsol: switchboardStsolAccount,
        switchboardUxd: switchboardUxdAccount,
        switchboardSamo: switchboardSamoAccount,
        ctokenInfoAccounts: cTokenInfoAccounts,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();

    if (txHash) {
      OpenCommand(true, "Processing", `${amount} ${symbol} borrowed`);
      OpenCommand(false, "Success", txHash);
    } else {
      OpenCommand(false, "Error", "Transaction Failed");
    }
  } catch (error) {
    console.log(error);
    OpenCommand(false, "Error", "Transaction Failed");
  }
};

// withdraw function for csb
// ==============================================
export const withdraw_cbs = async (wallet, array, OpenCommand) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    OpenCommand(true, "Processing", "Processing...");

    const token = array[2];
    const amount = parseFloat(array[1]);
    const symbol = getSymbol(token);

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    }

    var getMaxAmount = await calculateMaxAmount(wallet, symbol, "Withdraw");

    if (amount > getMaxAmount) {
      OpenCommand(false, "Error", "Withdraw amount exceeded");
      return;
    }

    const program = getProgram(wallet, "lpIdl");

    const tokenMint = getMint(symbol);

    const is_max = false;

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

    let switchboardDest;
    let userCollateralAta;
    let cbsCollateralAta;

    if (symbol !== "SOL") {
      switchboardDest = getSwitchboardAccount(symbol);
      userCollateralAta = await getATAPublicKey(tokenMint, user_wallet);
      cbsCollateralAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    if (symbol !== "SOL") {
      const txHash = await program.methods
        .withdraw(convert_to_wei_value(tokenMint, amount), is_max)
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          programPda: PDA[0],
          config,
          tokenMint: tokenMint,
          userCollateralAta,
          cbsCollateralAta,
          switchboardSol: switchboardSolAccount,
          switchboardMsol: switchboardMsolAccount,
          switchboardStsol: switchboardStsolAccount,
          switchboardUxd: switchboardUxdAccount,
          switchboardSamo: switchboardSamoAccount,
          switchboardDest: switchboardDest,
          ctokenInfoAccounts: cTokenInfoAccounts,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} withdrawn`);
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
      }
    } else {
      const txHash = await program.methods
        .withdrawSol(
          convert_to_wei_value_with_decimal(amount, SOL_DECIMAL),
          is_max
        )
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          solAccount: PDA[0],
          config,
          switchboardSol: switchboardSolAccount,
          switchboardMsol: switchboardMsolAccount,
          switchboardStsol: switchboardStsolAccount,
          switchboardUxd: switchboardUxdAccount,
          switchboardSamo: switchboardSamoAccount,
          ctokenInfoAccounts: cTokenInfoAccounts,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} withdrawn`);
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
      }
    }
  } catch (error) {
    OpenCommand(false, "Error", "Transaction Failed");
  }
};

// repay function for csb
// ==============================================
export const repay_cbs = async (wallet, array, OpenCommand) => {
  try {
    const user_wallet = wallet.publicKey;

    if (!user_wallet) {
      OpenCommand(false, "Error", "Connect wallet");
      return;
    }

    OpenCommand(true, "Processing", "Processing...");

    const amount = parseFloat(array[1]);
    const token = array[2];
    const symbol = getSymbol(token);

    if (amount === 0) {
      OpenCommand(false, "Error", "Enter an amount");
      return;
    }

    var getMaxAmount = await calculateMaxAmount(wallet, symbol, "Repay");

    if (amount > getMaxAmount) {
      OpenCommand(false, "Error", "Repay amount exceeded");
      return;
    }

    const program = getProgram(wallet, "lpIdl");

    const tokenMint = getMint(symbol);

    const is_max = false;

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    let switchboardDest;
    let trvcCollateralAta;

    if (symbol !== "zSOL") {
      switchboardDest = getSwitchboardAccount(symbol);
      trvcCollateralAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    const userCollateralAta = await getATAPublicKey(tokenMint, user_wallet);

    if (symbol !== "zSOL") {
      const txHash = await program.methods
        .repayWithCtoken(convert_to_wei_value(tokenMint, amount), is_max)
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          config,
          trvcAccount: PDA[0],
          ctokenInfoAccounts: cTokenInfoAccounts,
          collateralToken: tokenMint,
          userCollateralAta,
          trvcCollateralAta,
          switchboardSol: switchboardSolAccount,
          switchboardDest: switchboardDest,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} repaid`);
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
      }
    } else {
      const txHash = await program.methods
        .repayZsol(
          convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL),
          is_max
        )
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          config,
          trvcAccount: PDA[0],
          zsolMint: tokenMint,
          userZsolAta: userCollateralAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      if (txHash) {
        OpenCommand(true, "Processing", `${amount} ${symbol} repaid`);
        OpenCommand(false, "Success", txHash);
      } else {
        OpenCommand(false, "Error", "Transaction Failed");
      }
    }
  } catch (error) {
    console.log(error);
    OpenCommand(false, "Error", "Transaction Failed");
  }
};
