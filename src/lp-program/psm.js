import * as anchor from "@project-serum/anchor";
import { getProgram, getATAPublicKey } from "utils/contract";
import {
  SEED_TRV_PDA,
  SEED_ZSOL_MINT_AUTHORITY_PDA,
  zSOL_MINT,
  config,
  switchboardSolAccount,
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

// burn_zSOL function for PSM
// ==============================================
export const burn_zSOL = async (wallet, tokenB, amount) => {
  try {
    const program = getProgram(wallet, "lpIdl");

    const user_wallet = wallet.publicKey;

    const token_dest = getMint(tokenB);

    const configData = await program.account.config.fetch(config);
    const feeAccount = configData.feeAccount;

    const PDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const switchboardDest = getSwitchboardAccount(token_dest);
    const userCollateralAta = await getATAPublicKey(token_dest, user_wallet);
    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_dest, PDA[0]);

    const burn_zSOL_wei = convert_to_wei(amount);
    const burn_amount = new anchor.BN(burn_zSOL_wei);

    await program.methods
      .burnZsol(burn_amount)
      .accounts({
        userAuthority: user_wallet,
        trvcAccount: PDA[0],
        zsolMint: zSOL_MINT,
        userZsolAta,
        ctokenInfoAccounts: cTokenInfoAccounts,
        collateralToken: token_dest, // variables
        userCollateralAta: userCollateralAta,
        trvcCollateralAta,
        feeAccount,
        switchboardSol: switchboardSolAccount,
        switchboardDest: switchboardDest,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();
  } catch (error) {}
};

// mint zSOL function for PSM
// ==============================================
export const mint_zSOL = async (wallet, tokenA, amount) => {
  try {
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

    const switchboardSrc = getSwitchboardAccount(token_src);
    const userCollateralAta = await getATAPublicKey(token_src, user_wallet);
    const userZsolAta = await getATAPublicKey(zSOL_MINT, user_wallet);
    const trvcCollateralAta = await getATAPublicKey(token_src, PDA[0]);

    const mint_zSOL_wei = convert_to_wei(amount);
    const mint_amount = new anchor.BN(mint_zSOL_wei);

    await program.methods
      .mintZsol(mint_amount)
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
  } catch (error) {}
};
