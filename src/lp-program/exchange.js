import * as anchor from "@project-serum/anchor";
import {
  getProgram,
  findAssociatedTokenAddress,
  convert_to_wei_value_with_decimal,
} from "utils/contract";
import { SEED_LPFi_BUYBACK, USDC_MINT, LPFi_MINT } from "constants/global";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

// Swap_LPFi function for exchange
// ====================================
export const swap_lpfi = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start swap lpfi...");

    const program = getProgram(wallet, "lpfiIdl");

    const user_wallet = wallet.publicKey;

    const pool_state_pda = await PublicKey.findProgramAddress(
      [
        Buffer.from(SEED_LPFi_BUYBACK),
        USDC_MINT.toBuffer(),
        LPFi_MINT.toBuffer(),
      ],
      program.programId
    );

    const user_ata_usdc = await findAssociatedTokenAddress(
      user_wallet,
      USDC_MINT
    );

    const user_ata_lpfi = await findAssociatedTokenAddress(
      user_wallet,
      LPFi_MINT
    );

    const pool_ata_usdc = await findAssociatedTokenAddress(
      pool_state_pda[0],
      USDC_MINT
    );

    const pool_ata_lpfi = await findAssociatedTokenAddress(
      pool_state_pda[0],
      LPFi_MINT
    );

    await program.rpc.swapLpfi(convert_to_wei_value_with_decimal(amount, 9), {
      accounts: {
        user: user_wallet,
        poolState: pool_state_pda[0],
        tokenUsdc: USDC_MINT,
        tokenLpfi: LPFi_MINT,
        userAtaUsdc: user_ata_usdc,
        userAtaLpfi: user_ata_lpfi,
        poolAtaUsdc: pool_ata_usdc,
        poolAtaLpfi: pool_ata_lpfi,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
    });

    OpenContractSnackbar(true, "Success", `Successfully swapped lpfi.`);

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(true, "Error", `Swap lpfi failed. Please try again.`);
  }
};

// Deposit Usdc function for lpfi exchange admin
// ====================================
export const deposit_usdc = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start deposit usdc...");

    const program = getProgram(wallet, "lpfiIdl");

    const user_wallet = wallet.publicKey;

    const pool_state_pda = await PublicKey.findProgramAddress(
      [
        Buffer.from(SEED_LPFi_BUYBACK),
        USDC_MINT.toBuffer(),
        LPFi_MINT.toBuffer(),
      ],
      program.programId
    );

    const admin_ata_usdc = await findAssociatedTokenAddress(
      user_wallet,
      USDC_MINT
    );

    const pool_ata_usdc = await findAssociatedTokenAddress(
      pool_state_pda[0],
      USDC_MINT
    );

    await program.rpc.depositUsdc(
      convert_to_wei_value_with_decimal(amount, 6),
      {
        accounts: {
          admin: user_wallet,
          poolState: pool_state_pda[0],
          tokenUsdc: USDC_MINT,
          tokenLpfi: LPFi_MINT,
          adminAtaUsdc: admin_ata_usdc,
          poolAtaUsdc: pool_ata_usdc,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      }
    );

    OpenContractSnackbar(true, "Success", `Successfully deposited usdc.`);

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `Deposit usdc failed. Please try again.`
    );
  }
};

// withdraw_usdc function for lpfi exchange admin
// ====================================
export const withdraw_usdc = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start withdraw usdc...");

    const program = getProgram(wallet, "lpfiIdl");

    const user_wallet = wallet.publicKey;

    const pool_state_pda = await PublicKey.findProgramAddress(
      [
        Buffer.from(SEED_LPFi_BUYBACK),
        USDC_MINT.toBuffer(),
        LPFi_MINT.toBuffer(),
      ],
      program.programId
    );

    const admin_ata_usdc = await findAssociatedTokenAddress(
      user_wallet,
      USDC_MINT
    );

    const pool_ata_usdc = await findAssociatedTokenAddress(
      pool_state_pda[0],
      USDC_MINT
    );

    await program.rpc.withdrawUsdc(
      convert_to_wei_value_with_decimal(amount, 6),
      {
        accounts: {
          admin: user_wallet,
          poolState: pool_state_pda[0],
          tokenUsdc: USDC_MINT,
          tokenLpfi: LPFi_MINT,
          adminAtaUsdc: admin_ata_usdc,
          poolAtaUsdc: pool_ata_usdc,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      }
    );

    OpenContractSnackbar(true, "Success", `Successfully withdraw usdc.`);

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `Withdraw usdc failed. Please try again.`
    );
  }
};

// withdraw_lpfi  function for lpfi exchange admin
// ====================================
export const withdraw_lpfi = async (
  wallet,
  amount,
  setMessage,
  setRequired,
  setAmount,
  OpenContractSnackbar
) => {
  try {
    OpenContractSnackbar(true, "Processing", "Start withdraw lpfi...");

    const program = getProgram(wallet, "lpfiIdl");

    const user_wallet = wallet.publicKey;

    const pool_state_pda = await PublicKey.findProgramAddress(
      [
        Buffer.from(SEED_LPFi_BUYBACK),
        USDC_MINT.toBuffer(),
        LPFi_MINT.toBuffer(),
      ],
      program.programId
    );

    const admin_ata_lpfi = await findAssociatedTokenAddress(
      user_wallet,
      LPFi_MINT
    );

    const pool_ata_lpfi = await findAssociatedTokenAddress(
      pool_state_pda[0],
      LPFi_MINT
    );

    await program.rpc.withdrawLpfi(
      convert_to_wei_value_with_decimal(amount, 9),
      {
        accounts: {
          admin: user_wallet,
          poolState: pool_state_pda[0],
          tokenUsdc: USDC_MINT,
          tokenLpfi: LPFi_MINT,
          adminAtaLpfi: admin_ata_lpfi,
          poolAtaLpfi: pool_ata_lpfi,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      }
    );

    OpenContractSnackbar(true, "Success", `Successfully withdraw lpfi.`);

    setMessage("Enter an amount");
    setRequired(false);
    setAmount("");
  } catch (error) {
    console.log(error);
    OpenContractSnackbar(
      true,
      "Error",
      `Withdraw lpfi failed. Please try again.`
    );
  }
};
