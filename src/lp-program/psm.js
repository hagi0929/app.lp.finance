import * as anchor from "@project-serum/anchor";
import { getProgram, getATAPublicKey } from "utils/contract";
import {
  SEED_TRV_PDA,
  SEED_ZSOL_MINT_AUTHORITY_PDA,
  SOLMint,
  mSOLMint,
  stSOLMint,
  UXDMint,
  SRMMint,
  SLNDMint,
  GMTMint,
  SAMOMint,
  zSOL_MINT,
  config,
  switchboardSolAccount,
  switchboardMsolAccount,
  switchboardSrmAccount,
  switchboardStsolAccount,
  switchboardSamoAccount,
  switchboardUxdAccount,
  cTokenInfoAccounts,
  convert_to_wei,
} from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getMint = (token) => {
  let mint;

  if (token === "SOL") {
    mint = SOLMint;
  } else if (token === "mSOL") {
    mint = mSOLMint;
  } else if (token === "stSOL") {
    mint = stSOLMint;
  } else if (token === "UXD") {
    mint = UXDMint;
  } else if (token === "SRM") {
    mint = SRMMint;
  } else if (token === "SLND") {
    mint = SLNDMint;
  } else if (token === "GMT") {
    mint = GMTMint;
  } else if (token === "SAMO") {
    mint = SAMOMint;
  } else if (token === "zSOL") {
    mint = zSOL_MINT;
  }

  return mint;
};

const getSwitchboardAccount = (token) => {
  let Account;

  if (token === "SOL" || token === "zSOL") {
    Account = switchboardSolAccount;
  } else if (token === "mSOL") {
    Account = switchboardMsolAccount;
  } else if (token === "stSOL") {
    Account = switchboardStsolAccount;
  } else if (token === "UXD") {
    Account = switchboardUxdAccount;
  } else if (token === "SRM") {
    Account = switchboardSrmAccount;
  } else if (token === "SAMO") {
    Account = switchboardSamoAccount;
  }
  return Account;
};

// burn_zSOL function for PSM
// ==============================================
export const burn_zSOL = async (wallet, tokenB, amount) => {
  try {
    const program = getProgram(wallet);

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
    const program = getProgram(wallet);

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
