import { useCallback, useEffect } from "react";
import { useNotifi } from "contexts/NotifiContext";
import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const useNotifiSubscribe = () => {
  const {
    email: inputEmail,
    phoneNumber: inputPhoneNumber,
    telegramId: inputTelegramId,
    params: {
      dappAddress,
      env,
      keepSubscriptionData,
      walletPublicKey,
      signer,
      connection,
      sendTransaction,
    },
    useHardwareWallet,
    getAlertConfigurations,
    setAlerts,
    setEmail,
    setPhoneNumber,
    setTelegramId,
    setTelegramConfirmationUrl,
  } = useNotifi();

  const {
    loading,
    createAlert,
    createSource,
    deleteAlert,
    fetchData,
    isAuthenticated,
    isInitialized,
    logIn: clientLogIn,
    beginLoginViaTransaction,
    completeLoginViaTransaction,
    updateAlert,
    ensureTargetGroup,
  } = useNotifiClient({
    dappAddress,
    env,
    walletPublicKey,
  });

  const render = useCallback(
    (newData) => {
      const configurations = getAlertConfigurations();
      let targetGroup = newData?.targetGroups[0];

      const alerts = {};
      newData?.alerts.forEach((alert) => {
        if (alert.name !== null) {
          alerts[alert.name] = alert;
          if (alert.name in configurations) {
            targetGroup = alert.targetGroup;
          }
        }
      });

      setAlerts(alerts);

      const email = targetGroup?.emailTargets[0]?.emailAddress ?? null;

      setEmail(email ?? "");

      const phoneNumber = targetGroup?.smsTargets[0]?.phoneNumber ?? null;
      setPhoneNumber(phoneNumber ?? "");

      const telegramTarget = targetGroup?.telegramTargets[0];
      setTelegramId(telegramTarget?.telegramId ?? "");
      setTelegramConfirmationUrl(telegramTarget?.confirmationUrl ?? undefined);

      return {
        alerts,
        email,
        phoneNumber,
        telegramId: telegramTarget?.telegramId ?? null,
        telegramConfirmationUrl: telegramTarget?.confirmationUrl ?? null,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAlerts, setEmail, setPhoneNumber]
  );

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
        .then((data) => {
          render(data);
        })
        .catch((_e) => {
          /* Intentionally empty */
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logInViaHardwareWallet = useCallback(async () => {
    const { logValue } = await beginLoginViaTransaction();
    const publicKey = new PublicKey(walletPublicKey);
    const latestBlockHash = await connection.getLatestBlockhash();
    const txn = new Transaction();
    txn.recentBlockhash = latestBlockHash.blockhash;
    txn.feePayer = publicKey;
    txn.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
        data: Buffer.from(logValue, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    );

    // Send transaction and wait for it to confirm
    const blockHashAgain = await connection.getLatestBlockhash();
    const signature = await sendTransaction(txn, connection);
    await connection.confirmTransaction({
      blockhash: blockHashAgain.blockhash,
      lastValidBlockHeight: blockHashAgain.lastValidBlockHeight,
      signature,
    });

    // Inform Notifi of the signature so that we can complete login
    await completeLoginViaTransaction({
      transactionSignature: signature,
    });

    const newData = await fetchData();
    return render(newData);
  }, [
    walletPublicKey,
    beginLoginViaTransaction,
    connection,
    sendTransaction,
    completeLoginViaTransaction,
    fetchData,
    render,
  ]);

  const logIn = useCallback(async () => {
    if (!isAuthenticated) {
      if (useHardwareWallet) {
        await logInViaHardwareWallet();
      } else {
        await clientLogIn(signer);
      }
    }

    const newData = await fetchData();
    return render(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientLogIn, signer, useHardwareWallet]);

  const subscribe = useCallback(
    async (OpenSnackbar) => {
      const configurations = getAlertConfigurations();
      const names = Object.keys(configurations);
      const finalEmail = inputEmail === "" ? null : inputEmail;
      const finalTelegramId = inputTelegramId === "" ? null : inputTelegramId;

      let finalPhoneNumber = null;
      if (inputPhoneNumber !== "") {
        if (inputPhoneNumber.startsWith("+")) {
          finalPhoneNumber = inputPhoneNumber;
        } else {
          finalPhoneNumber = `+1${inputPhoneNumber}`;
        }
      }

      if (!isAuthenticated) {
        await logIn();
      }
      const data = await fetchData();

      const newResults = {};
      for (let i = 0; i < names.length; ++i) {
        const name = names[i];
        const existingAlert = data.alerts.find((alert) => alert.name === name);
        const deleteThisAlert = async () => {
          if (existingAlert !== undefined && existingAlert.id !== null) {
            await deleteAlert({
              alertId: existingAlert.id,
              keepSourceGroup: keepSubscriptionData,
              keepTargetGroup: keepSubscriptionData,
            });
            OpenSnackbar(true, "Info", "Already subscribed.");
          }
        };

        const config = configurations[name];
        if (config === undefined || config === null) {
          await deleteThisAlert();
        } else {
          const {
            filterType,
            filterOptions,
            createSource: createSourceParam,
            sourceType,
          } = config;

          let source;
          let filter;
          if (createSourceParam !== undefined) {
            const existing = data.sources.find(
              (s) =>
                s.type === sourceType &&
                s.blockchainAddress === createSourceParam.address
            );
            if (existing !== undefined) {
              source = existing;
              filter = source.applicableFilters.find(
                (f) => f.filterType === filterType
              );
            } else {
              source = await createSource({
                name: createSourceParam.address,
                blockchainAddress: createSourceParam.address,
                type: sourceType,
              });
              filter = source.applicableFilters.find(
                (f) => f.filterType === filterType
              );
            }
          } else {
            source = data.sources.find((s) => s.type === sourceType);
            filter = source?.applicableFilters.find(
              (f) => f.filterType === filterType
            );
          }

          if (
            source === undefined ||
            source.id === null ||
            filter === undefined ||
            filter.id === null
          ) {
            await deleteThisAlert();
          } else if (existingAlert !== undefined && existingAlert.id !== null) {
            const alert = await updateAlert({
              alertId: existingAlert.id,
              emailAddress: finalEmail,
              phoneNumber: finalPhoneNumber,
              telegramId: finalTelegramId,
            });
            newResults[name] = alert;
          } else {
            await deleteThisAlert();
            const alert = await createAlert({
              name,
              sourceId: source.id,
              filterId: filter.id,
              filterOptions: filterOptions ?? undefined,
              emailAddress: finalEmail,
              phoneNumber: finalPhoneNumber,
              telegramId: finalTelegramId,
              groupName: "managed",
            });

            if (alert) {
              OpenSnackbar(true, "Success", "Please check your email.");
            }

            newResults[name] = alert;
          }
        }
      }

      if (
        Object.getOwnPropertyNames(newResults).length === 0 &&
        keepSubscriptionData
      ) {
        // We didn't create or update any alert, manually update the targets
        await ensureTargetGroup({
          name: "Default",
          emailAddress: finalEmail,
          phoneNumber: finalPhoneNumber,
          telegramId: finalTelegramId,
        });
      }

      const newData = await fetchData();

      return render(newData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      createAlert,
      deleteAlert,
      fetchData,
      getAlertConfigurations,
      inputEmail,
      inputPhoneNumber,
      inputTelegramId,
      isAuthenticated,
      logIn,
    ]
  );

  return {
    loading,
    logIn,
    isAuthenticated,
    isInitialized,
    subscribe,
  };
};

export default useNotifiSubscribe;
