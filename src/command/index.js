import { deposit_cbs } from "./borrow";

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
  }
};
