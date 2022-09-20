import * as anchor from "@project-serum/anchor";
import { getProgram, getATAPublicKey } from "utils/contract";
import lpfinance_idl from "idls/lpfinance.json";
import {
  SEED_PDA,
  SEED_SOL,
  SEED_TRV_PDA,
  SEED_ZSOL_MINT_AUTHORITY_PDA,
  config,
  switchboardSolAccount,
  switchboardMsolAccount,
  switchboardSrmAccount,
  switchboardStsolAccount,
  switchboardSamoAccount,
  switchboardUxdAccount,
  cTokenInfoAccounts,
  convert_to_wei,
  getMint,
  getSwitchboardAccount,
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
  symbol,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start Deposit...");

    const program = getProgram(wallet, lpfinance_idl);

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

    let accountData;

    try {
      accountData = await program.account.userAccount.fetch(userAccountPDA);
    } catch (err) {
      await program.methods
        .initUserAccount()
        .accounts({
          userAccount: userAccountPDA[0],
          userAuthority: user_wallet,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      accountData = await program.account.userAccount.fetch(userAccountPDA);
    }

    if (
      accountData &&
      accountData.owner.toBase58() === user_wallet.toBase58()
    ) {
      const deposit_wei = convert_to_wei(amount);
      const deposit_amount = new anchor.BN(deposit_wei);

      if (symbol !== "SOL") {
        await program.methods
          .deposit(deposit_amount)
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

        OpenContractSnackbar(
          true,
          "Success",
          `Successfully deposited ${amount} ${symbol}.`
        );

        setMessage("Enter an amount");
        setRequired(false);
        setAmount("");
      } else {
        // deposit_sol
        await program.methods
          .depositSol(deposit_amount)
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

        OpenContractSnackbar(
          true,
          "Success",
          `Successfully deposited ${amount} ${symbol}.`
        );

        setMessage("Enter an amount");
        setRequired(false);
        setAmount("");
      }
    }
  } catch (error) {
    OpenContractSnackbar(true, "Error", `Deposit failed. Please try again.`);
  }
};

// borrow function for csb
// ==============================================
export const borrow_cbs = async (wallet, token, amount) => {
  try {
    const program = getProgram(wallet, lpfinance_idl);

    const user_wallet = wallet.publicKey;

    const tokenMint = getMint(token);

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA)],
      program.programId
    );

    const zsolMintAuthorityPda = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_ZSOL_MINT_AUTHORITY_PDA)],
      program.programId
    );

    const userZsolAta = await getATAPublicKey(tokenMint, user_wallet);
    const poolZsolAta = await getATAPublicKey(tokenMint, PDA[0]);

    let accountData;

    try {
      accountData = await program.account.userAccount.fetch(userAccountPDA);
    } catch (err) {
      accountData = null;
      console.log(err);
      return;
    }

    if (
      accountData &&
      accountData.owner.toBase58() === user_wallet.toBase58()
    ) {
      const borrow_wei = convert_to_wei(amount);
      const borrow_amount = new anchor.BN(borrow_wei);

      // borrow
      await program.methods
        .borrow(borrow_amount)
        .accounts({
          userAuthority: user_wallet,
          userAccount: userAccountPDA[0],
          zsolMintAuthorityPda: zsolMintAuthorityPda[0],
          config,
          zsolMint: tokenMint,
          userZsolAta,
          poolZsolAta,
          switchboardSrm: switchboardSrmAccount,
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
    }
  } catch (error) {}
};

// withdraw function for csb
// ==============================================
export const withdraw_cbs = async (wallet, token, amount) => {
  try {
    const program = getProgram(wallet, lpfinance_idl);

    const user_wallet = wallet.publicKey;

    const tokenMint = getMint(token);

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    let PDA;

    if (token !== "SOL") {
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

    if (token !== "SOL") {
      switchboardDest = getSwitchboardAccount(tokenMint);
      userCollateralAta = await getATAPublicKey(tokenMint, user_wallet);
      cbsCollateralAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    let accountData;

    try {
      accountData = await program.account.userAccount.fetch(userAccountPDA);
    } catch (err) {
      accountData = null;
      console.log(err);
      return;
    }

    if (
      accountData &&
      accountData.owner.toBase58() === user_wallet.toBase58()
    ) {
      const withdraw_wei = convert_to_wei(amount);
      const withdraw_amount = new anchor.BN(withdraw_wei);

      if (token !== "SOL") {
        await program.methods
          .withdraw(withdraw_amount)
          .accounts({
            userAuthority: user_wallet,
            userAccount: userAccountPDA[0],
            programPda: PDA[0],
            config,
            tokenMint: tokenMint,
            userCollateralAta,
            cbsCollateralAta,
            switchboardSrm: switchboardSrmAccount,
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
      } else {
        await program.methods
          .withdrawSol(withdraw_amount)
          .accounts({
            userAuthority: user_wallet,
            userAccount: userAccountPDA[0],
            solAccount: PDA[0],
            config,
            switchboardSrm: switchboardSrmAccount,
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
      }
    }
  } catch (error) {}
};

// repay function for csb
// ==============================================
export const repay_cbs = async (wallet, token, amount) => {
  try {
    const program = getProgram(wallet, lpfinance_idl);

    const user_wallet = wallet.publicKey;

    const tokenMint = getMint(token);

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

    if (token !== "zSOL") {
      switchboardDest = getSwitchboardAccount(tokenMint);
      trvcCollateralAta = await getATAPublicKey(tokenMint, PDA[0]);
    }

    const userCollateralAta = await getATAPublicKey(tokenMint, user_wallet);

    let accountData;

    try {
      accountData = await program.account.userAccount.fetch(userAccountPDA);
    } catch (err) {
      accountData = null;
      console.log(err);
      return;
    }

    if (
      accountData &&
      accountData.owner.toBase58() === user_wallet.toBase58()
    ) {
      const repay_wei = convert_to_wei(amount);
      const repay_amount = new anchor.BN(repay_wei);

      if (token !== "zSOL") {
        await program.methods
          .repayWithCtoken(repay_amount)
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
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          })
          .rpc();
      } else {
        // repay_zsol
        await program.methods
          .repayZsol(repay_amount)
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
      }
    }
  } catch (error) {}
};
