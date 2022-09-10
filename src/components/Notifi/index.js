import React from "react";
import NotifiCard from "./NotifiCard";
import { useWallet } from "@solana/wallet-adapter-react";
import NotifiCardContents from "./NotifiCardContents";
import { useSnackbar } from "contexts/SnackbarContext";
import NotifiWrapper from "./Notify.style";

const Notifi = () => {
  const { wallet } = useWallet();
  const { OpenSnackbar } = useSnackbar();

  var _a, _b;

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
    <NotifiWrapper>
      <div className="notifi">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <NotifiCard
              dappAddress="3f39cgs9wPLVv4vGySNecjKtefe5MJYkFEEj3v6bPequ"
              env="Development"
              signer={adapter}
              walletPublicKey={publicKey}
            >
              <NotifiCardContents
                OpenSnackbar={OpenSnackbar}
                publicKey={publicKey}
              />
            </NotifiCard>
          </div>
        </div>
      </div>
    </NotifiWrapper>
  );
};

export default Notifi;
