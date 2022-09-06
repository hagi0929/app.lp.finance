import React, { useState } from "react";
import { WalletModalContext } from "./useWalletModal";
import { WalletModal } from "./WalletModal";

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, r = Object.getOwnPropertySymbols(s); i < r.length; i++) {
        if (
          e.indexOf(r[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, r[i])
        )
          t[r[i]] = s[r[i]];
      }
    return t;
  };

export const WalletModalProvider = (_a) => {
  var { children } = _a,
    props = __rest(_a, ["children"]);
  const [visible, setVisible] = useState(false);
  return React.createElement(
    WalletModalContext.Provider,
    {
      value: {
        visible,
        setVisible,
      },
    },
    children,
    visible && React.createElement(WalletModal, Object.assign({}, props))
  );
};
