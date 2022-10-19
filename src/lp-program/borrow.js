import * as anchor from "@project-serum/anchor";
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
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import api from "api";
import axios from "axios";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// deposit function for csb
// ==============================================
export const deposit_cbs = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar,
  price
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Deposit...");

    const connection = getConnection();

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

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

    const [stability_fee, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from("stability_fee")],
      program.programId
    );

    var totalValue = amount * price;

    if (symbol !== "SOL") {
      await program.methods
        .deposit(convert_to_wei_value(tokenMint, amount))
        .accounts({
          userAccount: userAccountPDA[0],
          config,
          switchboardAcc: switchboardAccount,
          token: tokenMint,
          userAta: userAta,
          cbsAta,
          feeAta,
          stabilityFee: stability_fee,
          ctokenInfoAccounts: cTokenInfoAccounts,
          userAuthority: user_wallet,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
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

      await axios.post(api.storeCbsDeposit, {
        symbol: symbol,
        value: totalValue,
      });
    } else {
      await program.methods
        .depositSol(convert_to_wei_value_with_decimal(amount, SOL_DECIMAL))
        .accounts({
          userAuthority: user_wallet,
          solAccount: PDA[0],
          feeAccount,
          ctokenInfoAccounts: cTokenInfoAccounts,
          switchboardSol: switchboardAccount,
          config,
          stabilityFee: stability_fee,
          userAccount: userAccountPDA[0],
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
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

      await axios.post(api.storeCbsDeposit, {
        symbol: symbol,
        value: totalValue,
      });
    }
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Deposit failed. Please try again.`);
  }
};

// borrow function for csb
// ==============================================
export const borrow_cbs = async (
  wallet,
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar,
  price
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Borrow...");

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

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

    const [stability_fee, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from("stability_fee")],
      program.programId
    );

    await program.methods
      .borrow(convert_to_wei_value_with_decimal(amount, zSOL_DECIMAL), is_max)
      .accounts({
        userAuthority: user_wallet,
        userAccount: userAccountPDA[0],
        zsolMintAuthorityPda: zsolMintAuthorityPda[0],
        config,
        stabilityFee: stability_fee,
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

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully borrowed ${amount} ${symbol}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");

    var totalValue = amount * price;

    await axios.post(api.storeCbsBorrow, {
      symbol: symbol,
      value: totalValue,
    });
  } catch (error) {
    OpenContractSnackbar(true, "Error", `Borrow failed. Please try again.`);
  }
};

// withdraw function for csb
// ==============================================
export const withdraw_cbs = async (
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

    const [stability_fee, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from("stability_fee")],
      program.programId
    );

    let switchboardDest;
    let userCollateralAta;
    let cbsCollateralAta;

    if (symbol !== "SOL") {
      switchboardDest = getSwitchboardAccount(symbol);
      userCollateralAta = await getATAPublicKey(tokenMint, user_wallet);
      cbsCollateralAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    if (symbol !== "SOL") {
      await program.methods
        .withdraw(convert_to_wei_value(tokenMint, amount), is_max)
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          programPda: PDA[0],
          config,
          tokenMint: tokenMint,
          userCollateralAta,
          cbsCollateralAta,
          stabilityFee: stability_fee,
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

      OpenContractSnackbar(
        true,
        "Success",
        `Successfully Withdrew ${amount} ${symbol}.`
      );

      setMessage("Enter an amount");
      setRequired(false);
      setAmount("");
    } else {
      await program.methods
        .withdrawSol(
          convert_to_wei_value_with_decimal(amount, SOL_DECIMAL),
          is_max
        )
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          solAccount: PDA[0],
          config,
          stabilityFee: stability_fee,
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

      OpenContractSnackbar(
        true,
        "Success",
        `Successfully Withdrew ${amount} ${symbol}.`
      );

      setMessage("Enter an amount");
      setRequired(false);
      setAmount("");
    }
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Withdraw failed. Please try again.`);
  }
};

// repay function for csb
// ==============================================
export const repay_cbs = async (
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

    const [stability_fee, _bump] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from("stability_fee")],
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
      await program.methods
        .repayWithCtoken(convert_to_wei_value(tokenMint, amount), is_max)
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          config,
          stabilityFee: stability_fee,
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

      OpenContractSnackbar(
        true,
        "Success",
        `Successfully Repayment ${amount} ${symbol}.`
      );

      setMessage("Enter an amount");
      setRequired(false);
      setAmount("");
    } else {
      // repay_zsol
      await program.methods
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
          stabilityFee: stability_fee,
          userZsolAta: userCollateralAta,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
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
    }
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Repayment failed. Please try again.`);
  }
};
