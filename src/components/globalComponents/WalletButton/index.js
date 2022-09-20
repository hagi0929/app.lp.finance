import React from "react";
import { WalletMultiButton } from "lib/WalletAdapter";
import WalletButtonWrapper from "./WalletButton.style";

const WalletButton = (props) => {
  return (
    <WalletButtonWrapper {...props}>
      <WalletMultiButton {...props} />
    </WalletButtonWrapper>
  );
};

export default WalletButton;
