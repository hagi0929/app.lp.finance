import React, { useCallback } from "react";
import { Button } from "./Button";
import { useWalletModal } from "./useWalletModal";

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

export const WalletModalButton = (_a) => {
  var { children = "Connect Wallet", onClick } = _a,
    props = __rest(_a, ["children", "onClick"]);
  const { visible, setVisible } = useWalletModal();
  const handleClick = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setVisible(!visible);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClick, visible]
  );
  return React.createElement(
    Button,
    Object.assign(
      { className: "wallet-adapter-button-trigger", onClick: handleClick },
      props
    ),
    children
  );
};
