import * as anchor from "@project-serum/anchor";
import { getProgram, getConnection, getNetwork } from "../contract";
import {
  AggregatorAccount,
  loadSwitchboardProgram,
} from "@switchboard-xyz/switchboard-v2";
import {
  SEED_PDA,
  cTokenInfoAccounts,
  getCollateralTokenName,
  switchboardSolAccount,
  SRMMint,
  zSOL_MINT,
  TYPE_LESS_DISCOUNT_RATE,
} from "constants/global";

import { Keypair, PublicKey } from "@solana/web3.js";

export const tokenBalance = async (connection, tokenMint) => {
  const accountInfo = await connection.getTokenAccountBalance(tokenMint);
  return accountInfo.value.uiAmount;
};

const getSwitchboardPrice = async (program, switchboardFeed) => {
  const aggregator = new AggregatorAccount({
    program,
    publicKey: switchboardFeed,
  });
  const result = await aggregator.getLatestValue();
  console.log(`Switchboard Result: ${result}`);
  return result;
};

// Get given token's info
const getTokenValue = async (
  program,
  amount,
  decimal,
  switchboardFeed,
  maxBorrowRate
) => {
  const tokenPrice = await getSwitchboardPrice(program, switchboardFeed);
  const amountBg = new anchor.BN(amount);
  const decimalBg = new anchor.BN("10").pow(new anchor.BN(decimal));
  const priceBg = new anchor.BN(tokenPrice.toString());
  const borrowRate = new anchor.BN(maxBorrowRate).div(new anchor.BN(100.0));
  const tokenValue = priceBg.mul(amountBg).div(decimalBg);
  const borrowableValue = tokenValue.mul(borrowRate);
  return [tokenValue, borrowableValue];
};

// Get tokenInfo index for the specific token
const getCtokenInfoIndex = (ctokenInfos, destToken, totalCount) => {
  for (let i = 0; i < totalCount; i++) {
    const ctokenInfo = ctokenInfos[i];
    if (ctokenInfo.tokenMint === destToken) {
      return i;
    }
  }
  return undefined;
};

/// Get Sum of collateral's Value
const getCollateralsValue = async (
  switchboardProgram,
  configData,
  ctokenInfos,
  totalCount
) => {
  try {
    const deposited_amounts = configData.depositedAmounts;
    let total_deposited_value = new anchor.BN(0);
    let total_borrowable_value = new anchor.BN(0);

    let collateral_infos = [];

    for (let i = 0; i < totalCount; i++) {
      const ctokenInfo = ctokenInfos[i];
      const idx = ctokenInfo.infoIndex;
      const is_active = ctokenInfo.isActive;

      if (is_active === false) continue;
      const name = getCollateralTokenName(ctokenInfo.name);
      if (name === undefined) {
        console.log("Undefined token: ", ctokenInfo);
        throw new Error("Undefined token");
      }

      const switchboard_acc_pub = ctokenInfo.switchboardAccPub;
      const decimal = ctokenInfo.decimal;
      const borrow_rate = ctokenInfo.borrowableMaxLtv;

      const [deposited_value, borrowable_value] = await getTokenValue(
        switchboardProgram,
        deposited_amounts[idx],
        decimal,
        switchboard_acc_pub,
        borrow_rate
      );

      const amountBg = new anchor.BN(deposited_amounts[idx]);
      const decimalBg = new anchor.BN("10").pow(new anchor.BN(decimal));
      const token_amount = amountBg.div(decimalBg);

      let collateral_info = {
        idx,
        name,
        value: deposited_value,
        amount: token_amount,
      };

      collateral_infos.push(collateral_info);
      total_deposited_value = total_deposited_value.add(deposited_value);
      total_borrowable_value = total_borrowable_value.add(borrowable_value);
    }

    return {
      total_deposited_value,
      total_borrowable_value,
      collateral_infos,
    };
  } catch (err) {
    console.log(err);
    return {
      total_deposited_value: new anchor.BN(0),
      total_borrowable_value: new anchor.BN(0),
      collateral_infos: [],
    };
  }
};

// Get Borrowed Value
const getBorrowedValue = async (switchboardProgram, configData) => {
  try {
    const borrowed_amount = configData.borrowedZsolAmount;
    const getSolPrice = await getTokenValue(
      switchboardProgram,
      borrowed_amount,
      9,
      switchboardSolAccount,
      100
    );
    return getSolPrice[0];
  } catch (err) {
    console.log(err);
    return new anchor.BN("0");
  }
};

// Get max depositable amount for the specific token
const getMaxDepositAmount = (
  userData,
  ctokenInfos,
  ctokenIndex,
  user_token_balance
) => {
  try {
    const ctokenInfo = ctokenInfos[ctokenIndex];
    const userDepositedAmount = userData.deposited_amounts[ctokenIndex];

    const deposit_cap = ctokenInfo.depositCap;
    let max_amount = new anchor.BN(0);

    if (
      new anchor.BN(deposit_cap).eq(max_amount) ||
      new anchor.BN(deposit_cap).gt(new anchor.BN(user_token_balance))
    ) {
      max_amount = user_token_balance;
    } else {
      max_amount = deposit_cap;
    }

    return new anchor.BN(max_amount).sub(userDepositedAmount);
  } catch (err) {
    return undefined;
  }
};

export const fetch_user_infos = async (wallet) => {
  try {
    const user_wallet = wallet.publicKey;
    const destToken = SRMMint;
    const connection = getConnection();
    const program = getProgram(wallet, "lpIdl");
    const network = getNetwork();

    const switchboardProgram = await loadSwitchboardProgram(
      network,
      connection,
      Keypair.fromSeed(new Uint8Array(32).fill(1))
    );

    const userAccountPDA = await PublicKey.findProgramAddress(
      [Buffer.from(SEED_PDA), Buffer.from(user_wallet.toBuffer())],
      program.programId
    );

    const userData = await program.account.userAccount.fetch(userAccountPDA[0]);

    // ------------------- Collaterals Info ---------------
    // -- Token Infos
    const ctoken_info_accounts_data =
      await program.account.cTokenInfoAccounts.fetch(cTokenInfoAccounts);

    const ctokenInfos = ctoken_info_accounts_data.ctokenInfos;
    const totalCount = ctoken_info_accounts_data.totalCount;

    const { total_deposited_value, total_borrowable_value, collateral_infos } =
      await getCollateralsValue(
        switchboardProgram,
        userData,
        ctokenInfos,
        totalCount
      );

    // ================ User Account info =================>
    // Total deposited collateral value
    console.log(`Total deposited collateral Value: ${total_deposited_value}`);

    // Each collateral deposited info
    console.log(
      `Each Collateral's value array: ${collateral_infos.toString()}`
    );

    // BorrowLimit
    console.log(`Total borrowable Value: ${total_borrowable_value}`);

    // Borrowed Value
    const borrowed_value = await getBorrowedValue(switchboardProgram, userData);
    console.log(`Borrowed Value: ${borrowed_value}`);

    const PercentStandard = new anchor.BN(100);

    // LTV
    const LTV = borrowed_value.mul(PercentStandard).div(total_deposited_value);
    console.log(`LTV is; ${LTV}`);

    // Borrow Threshold Value
    const BorrowThreshold = total_borrowable_value
      .mul(PercentStandard)
      .div(total_deposited_value);
    console.log(`Liquidation Threshold: ${BorrowThreshold}`);

    // =============== Fetch MAX AMOUNT =============>

    // -- Max Borrowable amount
    const MaxBorrowableValue = total_borrowable_value.sub(borrowed_value);

    const zSOL_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );
    const zsolPriceBN = new anchor.BN(zSOL_price.toString());
    const MaxBorrowableAmount = MaxBorrowableValue.div(zsolPriceBN);
    console.log(`Max borrowable zSOL amount ${MaxBorrowableAmount}`);

    // -- Max withdraw amount
    const borrowable_value = total_borrowable_value.sub(borrowed_value);
    const ctokenIndex = getCtokenInfoIndex(ctokenInfos, destToken, totalCount);
    const borrow_rate = ctokenInfos[ctokenIndex].borrowableMaxLtv;
    const borrowRateBN = new anchor.BN(borrow_rate.toString());
    const withdrawableAmount = borrowable_value
      .mul(PercentStandard)
      .div(borrowRateBN);
    const depositedAmount = userData.depositedAmounts[ctokenIndex];

    const MaxWithdrawableAmount = anchor.BN.min(
      withdrawableAmount,
      depositedAmount
    );
    console.log(`Max withdrawable amount: ${MaxWithdrawableAmount}`);

    //---- Max Depositable Amount
    const user_token_balance = tokenBalance(connection, destToken);

    const max_depositable_amount = await getMaxDepositAmount(
      userData,
      ctokenInfos,
      ctokenIndex,
      user_token_balance
    );
    console.log(`Max depositable amount is ${max_depositable_amount}`);

    //--- Max Repay amount
    // - mSOL: Amount = ((loanAmount * solPrice) / mSolPrice) * 0.999
    // - stSOL: Amount = ((loanAmount * solPrice) / stSolPrice) * 0.999
    const loanZSOLAmount = userData.borrowedZsolAmount;

    const solPrice = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );

    const sol_price_BN = new anchor.BN(solPrice.toString());

    const dest_token_switchboard_pub =
      ctokenInfos[ctokenIndex].switchboardAccPub;

    const dest_token_price = await getSwitchboardPrice(
      switchboardProgram,
      dest_token_switchboard_pub
    );

    const dest_token_price_BN = new anchor.BN(dest_token_price.toString());
    const TYPE_LESS_DISCOUNT_RATE_BN = new anchor.BN(TYPE_LESS_DISCOUNT_RATE);

    if (destToken.equals(zSOL_MINT)) {
      const max_repay_amount = userData.borrowedZsolAmount;
      console.log(`Max Repay amount: ${max_repay_amount}`);
    } else {
      const max_repay_amount = loanZSOLAmount
        .mul(sol_price_BN)
        .mul(TYPE_LESS_DISCOUNT_RATE_BN)
        .div(dest_token_price_BN);
      console.log(`Max Repay amount: ${max_repay_amount}`);
    }
  } catch (error) {}
};
