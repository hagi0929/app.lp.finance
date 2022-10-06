import * as anchor from "@project-serum/anchor";
import axios from "axios";
import api from "api";
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
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// burn_zSOL function for PSM
// ==============================================
export const burn_zSOL = async (
  wallet,
  tokenB,
  amount,
  setMessage,
  setAmount,
  setRequired,
  OpenContractSnackbar,
  price
) => {
  let mess;
  if (tokenB === "mSOL" || tokenB === "stSOL") {
    mess = `get`;
  } else {
    mess = `mint`;
  }
  try {
    OpenContractSnackbar(true, "Processing", `Start ${mess} ${tokenB}...`);

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

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

    await program.methods
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

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully ${mess} ${amount} ${tokenB}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");

    var swapSize = amount * price;

    await axios.post(api.storeSwapSize, {
      size: swapSize,
    });
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `Failed ${mess} ${tokenB}. Please try again.`
    );
  }
};

// mint zSOL function for PSM
// ==============================================
export const mint_zSOL = async (
  wallet,
  tokenA,
  tokenB,
  amount,
  setMessage,
  setAmount,
  setRequired,
  OpenContractSnackbar,
  price
) => {
  try {
    OpenContractSnackbar(true, "Processing", `Start mint ${tokenB}...`);

    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

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

    await program.methods
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

    OpenContractSnackbar(
      true,
      "Success",
      `Successfully Mint ${amount} ${tokenB}.`
    );

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");

    var swapSize = amount * price;

    await axios.post(api.storeSwapSize, {
      size: swapSize,
    });
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `Failed Mint ${tokenB}. Please try again.`
    );
  }
};
