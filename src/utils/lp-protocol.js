import * as anchor from "@project-serum/anchor";
import { getProgram } from "./contract";
import lp_idl from "idls/lpfinance.json";
import {
  SEED_PDA,
  cTokenInfoAccounts,
  getCollateralTokenName,
  switchboardSolAccount,
} from "constants/global";
import {
  AggregatorAccount,
  loadSwitchboardProgram,
} from "@switchboard-xyz/switchboard-v2";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

const { PublicKey } = anchor.web3;

const network = "devnet";

const getSwitchboardPrice = async (program, switchboardFeed) => {
  const aggregator = new AggregatorAccount({
    program,
    publicKey: switchboardFeed,
  });
  const result = await aggregator.getLatestValue();
  console.log(`Switchboard Result: ${result}`);
  return result;
};

const getTokenValue = async (program, amount, decimal, switchboardFeed) => {
  const tokenPrice = await getSwitchboardPrice(program, switchboardFeed);

  const amountBg = new anchor.BN(amount);
  const decimalBg = new anchor.BN("10").pow(new anchor.BN(decimal));
  const priceBg = new anchor.BN(tokenPrice.toString());

  const tokenValue = priceBg.mul(amountBg).div(decimalBg);
  return tokenValue;
};

const getTotalCollateralSupply = async (
  configData,
  ctokenInfos,
  totalCount
) => {
  try {
    const program = await loadSwitchboardProgram(
      network,
      new Connection(clusterApiUrl(network)),
      Keypair.fromSeed(new Uint8Array(32).fill(1))
    );

    const deposited_amounts = configData.depositedAmounts;

    let collateral_infos = [];

    let total_value = new anchor.BN(0);

    for (let i = 0; i < totalCount; i++) {
      const ctokenInfo = ctokenInfos[i];
      const idx = ctokenInfo.infoIndex;
      const is_active = ctokenInfo.isActive;
      // Is active
      if (is_active === false) continue;

      const name = getCollateralTokenName(ctokenInfo.name);

      if (name === undefined) {
        console.log("Undefined token: ", ctokenInfo);
      }

      const switchboard_acc_pub = ctokenInfo.switchboardAccPub;
      const decimal = ctokenInfo.decimal;

      const token_value = await getTokenValue(
        program,
        deposited_amounts[idx],
        decimal,
        switchboard_acc_pub
      );

      const amountBg = new anchor.BN(deposited_amounts[idx]);
      const decimalBg = new anchor.BN("10").pow(new anchor.BN(decimal));
      const token_amount = amountBg.div(decimalBg);

      let collateral_info = {
        idx,
        name,
        value: token_value,
        amount: token_amount,
      };

      collateral_infos.push(collateral_info);

      total_value = total_value.add(token_value);
    }

    return {
      total_value,
      collateral_infos,
    };
  } catch (err) {
    console.log(err);
    return {
      total_value: new anchor.BN(0),
      collateral_infos: [],
    };
  }
};

// Get TotalBorrowed Value
const getTotalBorrowedValue = async (configData) => {
  try {
    // load the switchboard program
    const program = await loadSwitchboardProgram(
      network,
      new Connection(clusterApiUrl(network)),
      Keypair.fromSeed(new Uint8Array(32).fill(1)) // using dummy keypair since we wont be submitting any transactions
    );

    const borrowed_amount = configData.borrowedZsolAmount;
    const getSolPrice = await getTokenValue(
      program,
      borrowed_amount,
      9,
      switchboardSolAccount
    );
    return getSolPrice;
  } catch (err) {
    console.log(err);
    return new anchor.BN("0");
  }
};

export const fetch_cbs_infos = async (wallet) => {
  try {
    const program = getProgram(wallet, lp_idl);

    const configPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA)],
      program.programId
    );

    const configData = await program.account.config.fetch(configPDA[0]);

    console.log(configData);

    const ctoken_info_accounts_data =
      await program.account.cTokenInfoAccounts.fetch(cTokenInfoAccounts);

    const ctokenInfos = ctoken_info_accounts_data.ctokenInfos;
    const totalCount = ctoken_info_accounts_data.totalCount;

    const total_supply_info = await getTotalCollateralSupply(
      configData,
      ctokenInfos,
      totalCount
    );

    const total_supply_value = total_supply_info.total_value;
    const each_collateral_infos = total_supply_info.collateral_infos;

    console.log(`Total Supply Value: ${total_supply_value}`);
    console.log(`Each Supply Value: ${each_collateral_infos}`);
    // ------------------- Total Borrowed ---------------
    const total_borrowed_value = await getTotalBorrowedValue(configData);
    console.log(`Total Borrowed Value: ${total_borrowed_value}`);

    // NET LTV
    if (total_supply_value.toString() !== "0") {
      const PercentStandard = new anchor.BN(100);
      const LTV = total_borrowed_value
        .mul(PercentStandard)
        .div(total_supply_value);
      console.log(`LTV is ${LTV}`);
    } else {
      console.log("Invalid supply");
    }

    // TVL
    if (total_supply_value.toString() !== "0") {
      const TVL = total_supply_value.sub(total_borrowed_value);
      console.log(`TVL is ${TVL}`);
    } else {
      console.log("Invalid supply");
    }
  } catch (error) {
    console.log(error);
  }
};
