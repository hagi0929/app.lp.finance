import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  getProgram,
  getConnection,
  getNetwork,
  getSwitchboardPrice,
  getTokenValue,
  convert_from_wei_value,
  getATAPublicKey,
  tokenBalance,
  convert_from_wei_value_with_decimal,
} from "../contract";
import {
  SEED_PDA,
  cTokenInfoAccounts,
  switchboardSolAccount,
  zSOL_MINT,
  TYPE_LESS_DISCOUNT_RATE,
  getCollateralTokenSymbol,
  mSOLMint,
  zSOL_DECIMAL,
} from "constants/global";

// Get tokenInfo index for the specific token
const getCTokenInfoIndex = (cTokenInfos, destToken, totalCount) => {
  for (let i = 0; i < totalCount; i++) {
    const cTokenInfo = cTokenInfos[i];
    if (cTokenInfo.tokenMint.equals(destToken)) {
      return i;
    }
  }
  return undefined;
};

/// Get Sum of collateral's Value
const getCollateralsValue = async (
  switchboardProgram,
  configData,
  cTokenInfos,
  totalCount
) => {
  try {
    const deposited_amounts = configData.depositedAmounts;

    let total_deposited_value = Number(0);
    let total_borrowed_value = Number(0);

    let collateral_infos = [];

    for (let i = 0; i < totalCount; i++) {
      const cTokenInfo = cTokenInfos[i];
      const idx = cTokenInfo.infoIndex;
      const is_active = cTokenInfo.isActive;

      if (is_active === false) continue;
      const name = getCollateralTokenSymbol(cTokenInfo.name);

      if (name === undefined) {
        throw new Error("Undefined token");
      }
      const switchboard_acc_pub = cTokenInfo.switchboardAccPub;
      const decimal = cTokenInfo.tokenDecimal;
      const borrow_rate = cTokenInfo.borrowableMaxLtv;

      const deposited_value = await getTokenValue(
        switchboardProgram,
        deposited_amounts[idx],
        decimal,
        switchboard_acc_pub
      );

      const borrowRate = borrow_rate / 100;
      const borrowedValue = deposited_value * Number(borrowRate);

      const amountNumber = Number(deposited_amounts[idx].toString());
      const decimalPow = Math.pow(10, decimal);
      const token_amount = amountNumber / decimalPow;

      let collateral_info = {
        idx,
        name,
        value: deposited_value,
        amount: token_amount,
      };

      collateral_infos.push(collateral_info);
      total_deposited_value = total_deposited_value + deposited_value;
      total_borrowed_value = total_borrowed_value + borrowedValue;
    }

    return {
      total_deposited_value,
      total_borrowed_value,
      collateral_infos,
    };
  } catch (err) {
    console.log(err);
    return {
      total_deposited_value: Number(0),
      total_borrowed_value: Number(0),
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
      switchboardSolAccount
    );
    return getSolPrice;
  } catch (err) {
    console.log(err);
    return Number(0);
  }
};

// Get max deposited amount
const getMaxDepositAmount = (
  userData,
  cTokenInfos,
  cTokenIndex,
  user_token_balance
) => {
  try {
    const cTokenInfo = cTokenInfos[cTokenIndex];
    const userDepositedAmount = convert_from_wei_value(
      cTokenInfo.tokenMint,
      userData.depositedAmounts[cTokenIndex]
    );
    const deposit_cap = cTokenInfo.depositCap;
    let max_amount = convert_from_wei_value(cTokenInfo.tokenMint, deposit_cap);
    if (max_amount === 0) return user_token_balance;
    return Math.min(max_amount - userDepositedAmount, user_token_balance);
  } catch (err) {
    return 0;
  }
};

export const fetch_user_infos = async (wallet) => {
  try {
    const network = getNetwork();
    const connection = getConnection();
    const program = getProgram(wallet, "lpIdl");

    const destToken = mSOLMint;

    const user_wallet = wallet.publicKey;

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

    // ------Collaterals Info -----------------------
    const cToken_info_accounts_data =
      await program.account.cTokenInfoAccounts.fetch(cTokenInfoAccounts);

    const cTokenInfos = cToken_info_accounts_data.ctokenInfos;
    const totalCount = cToken_info_accounts_data.totalCount;

    // ===== get User Account info ======
    const { total_deposited_value, total_borrowed_value, collateral_infos } =
      await getCollateralsValue(
        switchboardProgram,
        userData,
        cTokenInfos,
        totalCount
      );

    // Borrowed Value
    const borrowed_value = await getBorrowedValue(switchboardProgram, userData);
    const PercentStandard = Number(100);

    // LTV
    const LTV = (borrowed_value * PercentStandard) / total_deposited_value;

    // Borrow Threshold
    const LiquidationThreshold =
      (total_borrowed_value * PercentStandard) / total_deposited_value;

    // ------- Fetch MAX AMOUNT -------------------
    // Max Borrowed amount
    const MaxBorrowedValue = total_borrowed_value - borrowed_value;
    const zSOL_price = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );
    const MaxBorrowedAmount = MaxBorrowedValue / zSOL_price;

    // -- Max withdraw amount
    const borrowed_val = total_borrowed_value - borrowed_value;
    const cTokenIndex = getCTokenInfoIndex(cTokenInfos, destToken, totalCount);
    const borrow_rate = cTokenInfos[cTokenIndex].borrowableMaxLtv;
    const withdrawableAmount =
      (borrowed_val * PercentStandard) / Number(borrow_rate);
    const depositedAmountWei = userData.depositedAmounts[cTokenIndex];
    const depositedAmount = convert_from_wei_value(
      destToken,
      depositedAmountWei
    );
    const MaxWithdrawAmount = Math.min(withdrawableAmount, depositedAmount);

    // cal Max Deposited Amount
    const user_ata = await getATAPublicKey(destToken, user_wallet);
    const user_token_balance = await tokenBalance(connection, user_ata);
    const MaxDepositedAmount = await getMaxDepositAmount(
      userData,
      cTokenInfos,
      cTokenIndex,
      user_token_balance
    );

    //Max Repay amount
    const loan_zSOLAmountWei = userData.borrowedZsolAmount;
    const loan_zSOLAmount = convert_from_wei_value_with_decimal(
      loan_zSOLAmountWei,
      zSOL_DECIMAL
    );
    const solPrice = await getSwitchboardPrice(
      switchboardProgram,
      switchboardSolAccount
    );
    const dest_token_switchboard_pub =
      cTokenInfos[cTokenIndex].switchboardAccPub;

    const dest_token_price = await getSwitchboardPrice(
      switchboardProgram,
      dest_token_switchboard_pub
    );

    let MaxRepayAmount;

    if (destToken.equals(zSOL_MINT)) {
      MaxRepayAmount = userData.borrowedZsolAmount;
    } else {
      MaxRepayAmount =
        (loan_zSOLAmount * solPrice * TYPE_LESS_DISCOUNT_RATE) /
        dest_token_price;
    }

    // console.log(
    //   "TotalDeposited",
    //   total_deposited_value,
    //   "CollateralInfos:",
    //   collateral_infos,
    //   "TotalBorrowed:",
    //   borrowed_value,
    //   "BorrowLimit:",
    //   total_borrowed_value,
    //   "LTV",
    //   LTV,
    //   "BorrowThreshold",
    //   BorrowThreshold,
    //   "MaxBorrowedAmount",
    //   MaxBorrowedAmount,
    //   "MaxWithdrawAmount",
    //   MaxWithdrawAmount,
    //   "MaxDepositedAmount",
    //   MaxDepositedAmount,
    //   "MaxRepayAmount",
    //   MaxRepayAmount
    // );

    return {
      TotalDeposited: total_deposited_value,
      CollateralInfos: collateral_infos,
      TotalBorrowed: borrowed_value,
      BorrowLimit: total_borrowed_value,
      LTV,
      LiquidationThreshold,
      MaxBorrowedAmount,
      MaxWithdrawAmount,
      MaxDepositedAmount,
      MaxRepayAmount,
    };
  } catch (error) {
    return {
      TotalDeposited: 0,
      CollateralInfos: [],
      TotalBorrowed: 0,
      BorrowLimit: 0,
      LTV: 0,
      LiquidationThreshold: 0,
      MaxBorrowedAmount: 0,
      MaxWithdrawAmount: 0,
      MaxDepositedAmount: 0,
      MaxRepayAmount: 0,
    };
  }
};
