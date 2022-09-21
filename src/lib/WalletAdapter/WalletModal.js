import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "./useWalletModal";
import { WalletListItem } from "./WalletListItem";

export const WalletModal = ({ className = "", container = "body" }) => {
  const ref = useRef(null);
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();
  const [fadeIn, setFadeIn] = useState(false);
  const [portal, setPortal] = useState(null);

  const [installedWallets] = useMemo(() => {
    const installed = [];
    const notDetected = [];
    const loadable = [];
    const AllWallet = [];

    for (const wallet of wallets) {
      AllWallet.push(wallet);
      if (wallet.readyState === WalletReadyState.NotDetected) {
        notDetected.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Loadable) {
        loadable.push(wallet);
      } else if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      }
    }
    return [AllWallet, [...loadable, ...notDetected]];
  }, [wallets]);

  const hideModal = useCallback(() => {
    setFadeIn(false);
    setTimeout(() => setVisible(false), 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(
    (event) => {
      event.preventDefault();
      hideModal();
    },
    [hideModal]
  );

  const handleWalletClick = useCallback(
    (event, walletName) => {
      select(walletName);
      handleClose(event);
    },
    [select, handleClose]
  );

  const handleTabKey = useCallback(
    (event) => {
      const node = ref.current;
      if (!node) return;

      const focusableElements = node.querySelectorAll("button");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    },
    [ref]
  );

  useLayoutEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        hideModal();
      } else if (event.key === "Tab") {
        handleTabKey(event);
      }
    };

    const { overflow } = window.getComputedStyle(document.body);
    setTimeout(() => setFadeIn(true), 0);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [hideModal, handleTabKey]);

  useLayoutEffect(
    () => setPortal(document.querySelector(container)),
    [container]
  );

  return (
    portal &&
    createPortal(
      React.createElement(
        "div",
        {
          "aria-labelledby": "wallet-adapter-modal-title",
          "aria-modal": "true",
          className: `wallet-adapter-modal ${
            fadeIn && "wallet-adapter-modal-fade-in"
          } ${className}`,
          ref: ref,
          role: "dialog",
        },
        React.createElement(
          "div",
          { className: "wallet-adapter-modal-container" },
          React.createElement(
            "div",
            { className: "wallet-adapter-modal-wrapper" },
            React.createElement(
              "button",
              {
                onClick: handleClose,
                className: "wallet-adapter-modal-button-close",
              },
              React.createElement(
                "svg",
                { width: "14", height: "14" },
                React.createElement("path", {
                  d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z",
                })
              )
            ),
            installedWallets.length &&
              React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "h1",
                  { className: "wallet-adapter-modal-title" },
                  "Connect to wallet"
                ),
                React.createElement(
                  "ul",
                  { className: "wallet-adapter-modal-list" },
                  installedWallets.map((wallet) =>
                    React.createElement(WalletListItem, {
                      key: wallet.adapter.name,
                      handleClick: (event) =>
                        handleWalletClick(event, wallet.adapter.name),
                      wallet: wallet,
                    })
                  )
                )
              )
          )
        ),
        React.createElement("div", {
          className: "wallet-adapter-modal-overlay",
          onMouseDown: handleClose,
        })
      ),
      portal
    )
  );
};
