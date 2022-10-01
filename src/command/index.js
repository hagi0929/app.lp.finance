import { deposit_cbs, borrow_cbs, withdraw_cbs, repay_cbs } from "./borrow";

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
    borrow_cbs(wallet, array, OpenCommand);
  } else if (flag === "--withdraw") {
    withdraw_cbs(wallet, array, OpenCommand);
  } else if (flag === "--repay") {
    repay_cbs(wallet, array, OpenCommand);
  }
};
