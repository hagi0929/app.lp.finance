import * as anchor from "@project-serum/anchor";
import { getProgram, getConnection, getNetwork } from "../contract";
import { convert_from_wei_value, getSwitchboardPrice } from "../contract";
import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  switchboardSolAccount,
  SEED_TRV_PDA,
  switchboardMsolAccount,
  switchboardStsolAccount,
} from "constants/global";

export const fetch_treasury_info = async (wallet) => {
  try {
    const network = getNetwork();
    const connection = getConnection();
    const program = getProgram(wallet, "lpIdl");

    const switchboardProgram = await loadSwitchboardProgram(
      network,
      connection,
      Keypair.fromSeed(new Uint8Array(32).fill(1))
    );

    const TreasuryPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_TRV_PDA)],
      program.programId
    );

    const TreasuryAccountData =
      await program.account.typelessRepaymentVault.fetch(TreasuryPDA[0]);

    const mSOL_amount_wei = TreasuryAccountData.msolAmount;
    const stSOL_amount_wei = TreasuryAccountData.stsolAmount;
    const zSOL_amount_wei = TreasuryAccountData.zsolAmount;

    const mSOL_Price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardMsolAccount
    );

    const stSOL_Price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardStsolAccount
    );
    const zSOL_Price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );

    const mSOL_price_bn = new anchor.BN(mSOL_Price.toNumber());
    const stSOL_price_bn = new anchor.BN(stSOL_Price.toNumber());
    const zSOL_price_bn = new anchor.BN(zSOL_Price.toNumber());

    const mSOL_wei_value = mSOL_amount_wei.mul(mSOL_price_bn);
    const stSOL_wei_value = stSOL_amount_wei.mul(stSOL_price_bn);
    const zSOL_wei_value = zSOL_amount_wei.mul(zSOL_price_bn);

    // Collateral values ---->
    // mSOL total balance
    const mSOL_value = convert_from_wei_value("mSOL", mSOL_wei_value);
    // stSOL total balance
    const stSOL_value = convert_from_wei_value("stSOL", stSOL_wei_value);
    // Borrowed values
    const zSOL_value = convert_from_wei_value("zSOL", zSOL_wei_value);

    // Total supply
    const total_supply = mSOL_value.add(stSOL_value);
    console.log(`Total supply: ${total_supply}`);

    // Total borrowed
    const total_borrowed = zSOL_value;
    console.log(`Total borrowed: ${total_borrowed}`);
  } catch (error) {}
};
