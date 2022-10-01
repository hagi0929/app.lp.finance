import { deposit_cbs, borrow_cbs, withdraw_cbs, repay_cbs } from "./borrow";
import { getBalance } from "utils/crypto";
import { getConnection } from "utils/contract";
import { getSymbol } from "constants/global";
import { fetch_cbs_infos } from "utils/lp-protocol/get_cbs_info";
import { fetch_user_infos } from "utils/lp-protocol/get_user_info";
import { numFormatter, calc, CalcFiveDigit } from "helper";
import { burn_zSOL, mint_zSOL } from "./psm";
import { fetch_treasury_info } from "utils/treasury/get_treasury_info";

export const handleCommand = async (
  wallet,
  handleInput,
  OpenCommand,
  PriceHandler,
  BalanceHandler
) => {
  var array = handleInput.split(" ");
  var length = array.length;
  var flag = array[length - 1];

  if (flag === "--deposit") {
    await deposit_cbs(wallet, array, OpenCommand, PriceHandler, BalanceHandler);
  } else if (flag === "--borrow") {
    await borrow_cbs(wallet, array, OpenCommand);
  } else if (flag === "--withdraw") {
    await withdraw_cbs(wallet, array, OpenCommand);
  } else if (flag === "--repay") {
    await repay_cbs(wallet, array, OpenCommand);
  } else if (flag === "balance") {
    await balanceCommand(wallet, array, OpenCommand);
  } else if ("zsol" === array[0] && flag === "overview") {
    await getProtocolOverview(wallet, OpenCommand);
  } else if (
    "zsol" === array[0] &&
    "overview" === array[1] &&
    flag === "--detail"
  ) {
    await getProtocolDetail(wallet, OpenCommand);
  } else if ("zsol" === array[0] && flag === "account-info") {
    await getAccountInfo(wallet, OpenCommand);
  } else if (flag === "--psm") {
    let pay = array[2];
    let receive = array[4];
    if (
      (pay === "msol" && receive === "zsol") ||
      (pay === "stsol" && receive === "zsol")
    ) {
      await mint_zSOL(wallet, array, OpenCommand, BalanceHandler);
    } else if (
      (pay === "zsol" && receive === "msol") ||
      (pay === "zsol" && receive === "stsol")
    ) {
      await burn_zSOL(wallet, array, OpenCommand, BalanceHandler);
    }
  } else if (flag === "overview" && "zsol-treasury" === array[0]) {
    await getTreasuryDetails(wallet, OpenCommand);
  } else if (flag === "--detail" && "zsol-treasury" === array[0]) {
    await getLiquidStakingInfos(wallet, OpenCommand);
  } else {
    OpenCommand(false, "Error", "Command not found!");
  }
};

// Balance: Balance in wallet command
export const balanceCommand = async (wallet, array, OpenCommand) => {
  const user_wallet = wallet.publicKey;

  if (!user_wallet) {
    OpenCommand(false, "Error", "Connect wallet");
    return;
  }
  OpenCommand(true, "Processing", "fetching...");
  const connection = getConnection();
  const token = array[0];
  const symbol = getSymbol(token);
  const balance = await getBalance(symbol, user_wallet, connection);
  if (balance) {
    OpenCommand(false, "Success", balance);
  } else {
    OpenCommand(false, "Success", 0);
  }
};

// Get Protocol Overview command
const getProtocolOverview = async (wallet, OpenCommand) => {
  OpenCommand(true, "Processing", "Processing...");

  const { TotalSupply, TotalBorrowed, NET_LTV, TVL } = await fetch_cbs_infos(
    wallet
  );

  OpenCommand(
    true,
    "Success",
    `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">TotalSupply</th>
            <th scope="col">TotalBorrowed</th>
            <th scope="col">TVL</th>
            <th scope="col">NET_LTV</th>
            <th scope="col">Stability Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>$${numFormatter(TotalSupply)}</th>
            <td>$${numFormatter(TotalBorrowed)}</td>
            <td>$${numFormatter(TVL)}</td>
            <td>${calc(NET_LTV)}%</td>
            <td>1.5%</td>
          </tr>
        </tbody>
      </table>
    `
  );
};

// Get Protocol Overview (detailed infos)
const getProtocolDetail = async (wallet, OpenCommand) => {
  OpenCommand(true, "Processing", "Processing...");

  const { collateral_infos, TotalSupply, borrowed_collateral_infos } =
    await fetch_cbs_infos(wallet);

  OpenCommand(
    true,
    "Success",
    `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">symbol</th>
            <th scope="col">value</th>
            <th scope="col">amount</th>
          </tr>
        </thead>
        <tbody>
            ${collateral_infos.map((items) => {
              return `<tr><td>${items.symbol}</td>
              <td>$${numFormatter(items.value)}</td>
              <td>$${CalcFiveDigit(items.amount)} (${calc(
                (items.value / TotalSupply) * 100
              )}%)</td>   
              </tr>
              `;
            })}
            ${borrowed_collateral_infos.map((items) => {
              return `<tr><td>${items.symbol}</td>
              <td>$${numFormatter(items.value)}</td>
              <td>$${CalcFiveDigit(items.amount)} (${calc(
                (items.value / TotalSupply) * 100
              )}%)</td>   
              </tr>
              `;
            })}
        </tbody>
      </table>
    `
  );
};

// Get Your Account
const getAccountInfo = async (wallet, OpenCommand) => {
  const user_wallet = wallet.publicKey;

  if (!user_wallet) {
    OpenCommand(false, "Error", "Connect wallet");
    return;
  }
  OpenCommand(true, "Processing", "fetching...");

  const {
    TotalDeposited,
    CollateralInfos,
    TotalBorrowed,
    BorrowedInfos,
    BorrowLimit,
    LTV,
    LiquidationThreshold,
  } = await fetch_user_infos(wallet);

  OpenCommand(
    true,
    "Processing",
    `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">TotalDeposited</th>
            <th scope="col">TotalBorrowed</th>
            <th scope="col">BorrowLimit</th>
            <th scope="col">LiquidationThreshold</th>
            <th scope="col">LTV</th>
          </tr>
        </thead>
        <tbody>  
          <tr>
            <th>$${numFormatter(TotalDeposited)}</th>
            <td>$${numFormatter(TotalBorrowed)}</td>
            <td>$${numFormatter(BorrowLimit)}</td>
            <td>$${numFormatter(LiquidationThreshold)}</td>
            <td>${calc(LTV)}%</td>
          </tr> 
        </tbody>
      </table>
    `
  );

  OpenCommand(
    true,
    "Success",
    `
    Collateral & Borrowed Infos :
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">symbol</th>
            <th scope="col">value</th>
            <th scope="col">amount</th>
          </tr>
        </thead>
        <tbody>
            ${CollateralInfos.map((items) => {
              return `<tr><td>${items.name}</td>
              <td>$${numFormatter(items.value)}</td>
              <td>${CalcFiveDigit(items.amount)}</td>   
              </tr>
              `;
            })}
            ${BorrowedInfos.map((items) => {
              return `<tr><td>${items.name}</td>
              <td>$${numFormatter(items.value)}</td>
              <td>${CalcFiveDigit(items.amount)}</td>   
              </tr>
              `;
            })}
        </tbody>
      </table>
    `
  );
};

// Treasury Details
const getTreasuryDetails = async (wallet, OpenCommand) => {
  OpenCommand(true, "Processing", "fetching...");

  const { TotalSupply, TotalBorrowed, NetLTV } = await fetch_treasury_info(
    wallet
  );

  OpenCommand(
    true,
    "Success",
    `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">TotalSupply</th>
            <th scope="col">TotalBorrowed</th>
            <th scope="col">NetLTV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>$${numFormatter(TotalSupply)}</th>
            <td>$${numFormatter(TotalBorrowed)}</td>
            <td>${calc(NetLTV)}%</td>
          </tr>
        </tbody>
      </table>
    `
  );
};

// Treasury Details LiquidStakingInfos
const getLiquidStakingInfos = async (wallet, OpenCommand) => {
  OpenCommand(true, "Processing", "fetching...");

  const { LiquidStakingInfos } = await fetch_treasury_info(wallet);

  OpenCommand(
    true,
    "Success",
    `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">symbol</th>
            <th scope="col">balance</th>
            <th scope="col">value</th>
          </tr>
        </thead>
        <tbody>
            ${LiquidStakingInfos.map((items) => {
              return `<tr><td>${items.name}</td>
              <td>${CalcFiveDigit(items.balance)}</td>   
              <td>$${numFormatter(items.value)}</td>
              </tr>
              `;
            })}
        </tbody>
      </table>
    `
  );
};
