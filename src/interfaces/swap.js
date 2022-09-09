export const Swapping = async (
  loading,
  selectedRoute,
  connected,
  wallet,
  signAllTransactions,
  signTransaction,
  setSwapping,
  connection,
  exchange,
  fetchWalletTokens,
  inputTokenInfo,
  outputTokenInfo,
  setFormValue,
  OpenSnackbar
) => {
  try {
    if (
      !loading &&
      selectedRoute &&
      connected &&
      wallet &&
      signAllTransactions &&
      signTransaction
    ) {
      setSwapping(true);
      let txCount = 1;
      let errorTxid;

      const swapResult = await exchange({
        wallet: {
          sendTransaction: wallet?.adapter?.sendTransaction,
          publicKey: wallet?.adapter?.publicKey,
          signAllTransactions,
          signTransaction,
        },
        routeInfo: selectedRoute,
        onTransaction: async (txid, totalTxs) => {
          console.log("txid, totalTxs", txid, totalTxs);

          if (txCount === totalTxs) {
            errorTxid = txid;
            console.log("Confirming Transaction");
            OpenSnackbar(true, "Info", "Confirming Transaction");
          }
          await connection.confirmTransaction(txid, "confirmed");

          txCount++;
          return await connection.getTransaction(txid, {
            commitment: "confirmed",
          });
        },
      });

      console.log("swapResult", swapResult);
      setSwapping(false);
      fetchWalletTokens();

      if ("error" in swapResult) {
        console.log("Error:", swapResult.error);
        console.log(
          `${swapResult?.error?.name ? swapResult.error.name : ""} ${
            swapResult?.error?.message
          }`
        );

        OpenSnackbar(true, "Error", swapResult?.error?.message);
      } else if ("txid" in swapResult) {
        const description =
          swapResult?.inputAmount && swapResult.outputAmount
            ? `Swapped ${
                swapResult.inputAmount / 10 ** (inputTokenInfo?.decimals || 1)
              } ${inputTokenInfo?.symbol} to ${
                swapResult.outputAmount / 10 ** (outputTokenInfo?.decimals || 1)
              } ${outputTokenInfo?.symbol}`
            : "";

        OpenSnackbar(
          true,
          "Success",
          `Swap Successful
          ${swapResult.txid}
          ${description}
        `
        );

        setFormValue((val) => ({
          ...val,
          amount: null,
        }));
      }
    }
  } catch (error) {
    console.log(error);
    setSwapping(false);
    OpenSnackbar(true, "Success", "Swap failed!");
  }
};
