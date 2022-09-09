import React from "react";
import NotifiCardContents from "./NotifiCardContents";
import { NotifiCard } from "@notifi-network/notifi-react-card";
import { useWallet } from "@solana/wallet-adapter-react";

const Notifi = () => {
  var _a, _b;
  const { wallet } = useWallet();

  const adapter =
    wallet === null || wallet === void 0 ? void 0 : wallet.adapter;
  const publicKey =
    (_b =
      (_a =
        adapter === null || adapter === void 0 ? void 0 : adapter.publicKey) ===
        null || _a === void 0
        ? void 0
        : _a.toBase58()) !== null && _b !== void 0
      ? _b
      : null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <NotifiCard
            dappAddress="3f39cgs9wPLVv4vGySNecjKtefe5MJYkFEEj3v6bPequ"
            env="Development"
            signer={adapter}
            walletPublicKey={publicKey}
          >
            <NotifiCardContents />
          </NotifiCard>
        </div>
      </div>
    </div>
  );
};

export default Notifi;
