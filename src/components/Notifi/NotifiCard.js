import React from "react";
import { NotifiProvider } from "contexts/NotifiContext";

const NotifiCard = ({
  children,
  alertConfigurations,
  dappAddress,
  env,
  keepSubscriptionData,
  signer,
  walletPublicKey,
  connection,
  sendTransaction,
}) => {
  return (
    <NotifiProvider
      {...{
        alertConfigurations,
        dappAddress,
        env,
        keepSubscriptionData,
        signer,
        walletPublicKey,
        connection,
        sendTransaction,
      }}
    >
      {children}
    </NotifiProvider>
  );
};

export default NotifiCard;
