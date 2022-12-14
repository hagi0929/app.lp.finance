import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "Layout/Image";
import { Button } from "./Button";
import { useWalletModal } from "./useWalletModal";
import { WalletConnectButton } from "./WalletConnectButton";
import { WalletIcon } from "./WalletIcon";
import { WalletModalButton } from "./WalletModalButton";

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

export const WalletMultiButton = (_a) => {
  var { children } = _a,
    props = __rest(_a, ["children"]);

  const { publicKey, wallet, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  const base58 = useMemo(
    () =>
      publicKey === null || publicKey === void 0
        ? void 0
        : publicKey.toBase58(),
    [publicKey]
  );
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  const openDropdown = useCallback(() => {
    setActive(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setActive(false);
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
    closeDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeDropdown]);

  useEffect(() => {
    const listener = (event) => {
      const node = ref.current;
      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target)) return;
      closeDropdown();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);

  if (!wallet)
    return React.createElement(
      WalletModalButton,
      Object.assign({}, props),
      children
    );

  if (!base58)
    return React.createElement(
      WalletConnectButton,
      Object.assign({}, props),
      children
    );

  return React.createElement(
    "div",
    { className: "wallet-adapter-dropdown" },
    React.createElement(
      Button,
      Object.assign(
        {
          "aria-expanded": active,
          className: "wallet-adapter-button-trigger",
          style: Object.assign(
            { pointerEvents: active ? "none" : "auto" },
            props.style
          ),
          onClick: openDropdown,
          startIcon: React.createElement(WalletIcon, { wallet: wallet }),
        },
        props
      ),
      content
    ),
    React.createElement(
      "ul",
      {
        "aria-label": "dropdown-list",
        className: `wallet-adapter-dropdown-list ${
          active && "wallet-adapter-dropdown-list-active"
        }`,
        ref: ref,
        role: "menu",
      },
      React.createElement(
        "li",
        {
          onClick: copyAddress,
          className: "wallet-adapter-dropdown-list-item",
          role: "menuitem",
        },
        <table>
          <tbody>
            <tr>
              <td>
                <Image src="/images/icons/copy.png" alt="copy" h="1.4rem" />
              </td>
              <td className="pl-2"> {copied ? "Copied" : "Copy address"}</td>
            </tr>
          </tbody>
        </table>
      ),
      React.createElement(
        "li",
        {
          onClick: openModal,
          className: "wallet-adapter-dropdown-list-item",
          role: "menuitem",
        },
        <table>
          <tbody>
            <tr>
              <td>
                <Image src="/images/icons/switch.png" alt="switch" h="1.2rem" />
              </td>
              <td className="pl-2"> Change wallet</td>
            </tr>
          </tbody>
        </table>
      ),
      React.createElement(
        "li",
        {
          onClick: disconnect,
          className: "wallet-adapter-dropdown-list-item",
          role: "menuitem",
        },
        <table>
          <tbody>
            <tr>
              <td>
                <Image src="/images/icons/logout.png" alt="logout" />
              </td>
              <td className="pl-2"> Disconnect</td>
            </tr>
          </tbody>
        </table>
      )
    )
  );
};
