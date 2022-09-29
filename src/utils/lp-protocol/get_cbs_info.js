import { loadSwitchboardProgram } from "@switchboard-xyz/switchboard-v2";
import { Keypair } from "@solana/web3.js";
import { collateral_infos_colors } from "assets/registry";
import {
  getProgram,
  getConnection,
  getNetwork,
  getTokenValue,
} from "../contract";
import {
  cTokenInfoAccounts,
  switchboardSolAccount,
  config,
  getCollateralTokenSymbol,
} from "constants/global";

/// Get Total Collateral Supply
const getTotalCollateralSupply = async (
  configData,
  cTokenInfos,
  totalCount,
  network,
  connection
) => {
  try {
    const switchboardProgram = await loadSwitchboardProgram(
      network,
      connection,
      Keypair.fromSeed(new Uint8Array(32).fill(1))
    );

    const deposited_amounts = configData.depositedAmounts;

    let collateral_infos = [];

    let total_value = Number(0);

    for (let i = 0; i < totalCount; i++) {
      const cTokenInfo = cTokenInfos[i];
      const idx = cTokenInfo.infoIndex;
      const is_active = cTokenInfo.isActive;

      if (is_active === false) continue;

      const symbol = getCollateralTokenSymbol(cTokenInfo.name);

      if (symbol === undefined) {
        console.log("Undefined token: ", cTokenInfo);
        throw new Error("Undefined token");
      }
      const switchboard_acc_pub = cTokenInfo.switchboardAccPub;
      const decimal = cTokenInfo.tokenDecimal;

      const token_value = await getTokenValue(
        switchboardProgram,
        deposited_amounts[idx],
        decimal,
        switchboard_acc_pub
      );

      const amountNumber = Number(deposited_amounts[idx].toString());
      const decimalPow = Math.pow(10, decimal);
      const token_amount = amountNumber / decimalPow;

      let collateral_info = {
        idx,
        symbol,
        value: token_value,
        amount: token_amount,
      };

      collateral_infos.push(collateral_info);

      total_value = total_value + token_value;
    }

    return {
      total_value,
      collateral_infos,
    };
  } catch (err) {
    return {
      total_value: Number(0),
      collateral_infos: [],
    };
  }
};

// Get TotalBorrowed Value
const getTotalBorrowedValue = async (configData, network, connection) => {
  try {
    const program = await loadSwitchboardProgram(
      network,
      connection,
      Keypair.fromSeed(new Uint8Array(32).fill(1))
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
    return Number("0");
  }
};

export const fetch_cbs_infos = async (wallet) => {
  try {
    const network = getNetwork();
    const connection = getConnection();
    const program = getProgram(wallet, "lpIdl");
    const configData = await program.account.config.fetch(config);

    // ------------------- TotalSupply ---------------
    const cToken_info_accounts_data =
      await program.account.cTokenInfoAccounts.fetch(cTokenInfoAccounts);
    const cTokenInfos = cToken_info_accounts_data.ctokenInfos;
    const totalCount = cToken_info_accounts_data.totalCount;

    const total_supply_info = await getTotalCollateralSupply(
      configData,
      cTokenInfos,
      totalCount,
      network,
      connection
    );

    const total_supply_value = total_supply_info.total_value;
    const each_collateral_infos = total_supply_info.collateral_infos;

    // ------------------- Total Borrowed ---------------
    const total_borrowed_value = await getTotalBorrowedValue(
      configData,
      network,
      connection
    );

    const zSOLAmount = configData.borrowedZsolAmount;

    let NET_LTV;
    let TVL;

    if (total_supply_value.toString() !== "0") {
      const PercentStandard = Number(100);
      NET_LTV = (total_borrowed_value * PercentStandard) / total_supply_value;
    } else {
      NET_LTV = 0;
    }

    if (total_supply_value.toString() !== "0") {
      TVL = total_supply_value - total_borrowed_value;
    } else {
      TVL = 0;
    }

    const collateral_infos_sort = each_collateral_infos.sort(function (a, b) {
      return b.value - a.value;
    });

    const collateral_infos_list = collateral_infos_sort.map((items) => {
      var collateral;
      for (let i = 0; i < collateral_infos_colors.length; i++) {
        let { color, symbol } = collateral_infos_colors[i];
        if (items.symbol === symbol) {
          collateral = {
            ...items,
            color,
          };
        }
      }
      return collateral;
    });

    const borrowed_collateral_infos = [
      {
        idx: 1,
        symbol: "zSOL",
        amount: zSOLAmount /Math.pow(10,9),
        value: total_borrowed_value,
        color: "#0c0",
      },
    ];

    return {
      TotalSupply: total_supply_value,
      collateral_infos: collateral_infos_list,
      borrowed_collateral_infos,
      TotalBorrowed: total_borrowed_value,
      NET_LTV,
      TVL,
    };
  } catch (error) {
    return {
      TotalSupply: 0,
      collateral_infos: [],
      borrowed_collateral_infos: [],
      TotalBorrowed: 0,
      NET_LTV: 0,
      TVL: 0,
    };
  }
};
