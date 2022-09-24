import { getProgram, getConnection, getNetwork } from "../contract";
import {
  convert_from_wei_value,
  getSwitchboardPrice,
  convert_from_wei_value_with_decimal,
} from "../contract";
import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  switchboardSolAccount,
  SEED_TRV_PDA,
  switchboardMsolAccount,
  switchboardStsolAccount,
  mSOLMint,
  stSOLMint,
  zSOL_DECIMAL,
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

    const mSOL_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardMsolAccount
    );
    const stSOL_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardStsolAccount
    );
    const zSOL_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );

    //mSOL
    const mSOL_amount = parseFloat(
      convert_from_wei_value(mSOLMint, mSOL_amount_wei).toString()
    );
    const mSOL_value = mSOL_amount * mSOL_price;

    console.log("Msol: ", mSOL_price.toString(), mSOL_amount_wei.toString(), mSOL_value);

    //stSOL
    const stSOL_amount = parseFloat(
      convert_from_wei_value(stSOLMint, stSOL_amount_wei).toString()
    );
    const stSOL_value = stSOL_amount * stSOL_price;
    console.log("stsol: ", stSOL_amount, stSOL_value);

    //zSOL
    const zSOL_amount = convert_from_wei_value_with_decimal(
      zSOL_amount_wei,
      zSOL_DECIMAL
    );
    const zSOL_value = zSOL_amount * zSOL_price;

    // calculate infos
    const TotalSupply = mSOL_value + stSOL_value;
    const TotalBorrowed = zSOL_value;

    const LiquidStakingInfos = [
      {
        name: "mSOL",
        TotalBalance: mSOL_amount,
      },
      {
        name: "stSOL",
        TotalBalance: stSOL_amount,
      },
    ];

    return {
      TotalSupply,
      TotalBorrowed,
      LiquidStakingInfos,
    };
  } catch (error) {
    return {
      TotalSupply: 0,
      TotalBorrowed: 0,
      LiquidStakingInfos: [
        {
          name: "mSOL",
          TotalBalance: 0,
        },
        {
          name: "stSOL",
          TotalBalance: 0,
        },
      ],
    };
  }
};
