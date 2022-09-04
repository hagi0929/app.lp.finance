import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import { useJupiter } from "@jup-ag/react-hook";
import sortBy from "lodash/sortBy";
import { HiSwitchVertical } from "react-icons/hi";
import {
  getTokenAccountsByOwnerWithWrappedSol,
  nativeToUi,
  zeroKey,
} from "@blockworks-foundation/mango-client";
import { PublicKey } from "@solana/web3.js";
import TokenSelectModel from "models/TokenSelectModel";
import RoutesModel from "models/RoutesModel";
import SwapSettingsModal from "models/SwapSettingsModal";
import Button from "Layout/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { setSnackbar } from "Redux/actions";
import { useDispatch } from "react-redux";
import Input from "Layout/Form/Input";
import Chart from "./Chart";

const Jupiter = ({
  coinGeckoList,
  connection,
  tokens,
  formValue,
  setFormValue,
  slippage,
  setSlippage,
}) => {
  const dispatch = useDispatch();
  const { wallet, publicKey, connected, signAllTransactions, signTransaction } =
    useWallet();
  const [walletTokens, setWalletTokens] = useState([]);
  const [tokenPrices, setTokenPrices] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [depositAndFee, setDepositAndFee] = useState(null);
  const [feeValue, setFeeValue] = useState(null);
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [walletTokenPrices, setWalletTokenPrices] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadWalletTokens, setLoadWalletTokens] = useState(false);

  const [showInputTokenSelect, setShowInputTokenSelect] = useState(false);
  const [showOutputTokenSelect, setShowOutputTokenSelect] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [swapRate, setSwapRate] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const fetchWalletTokens = useCallback(async () => {
    if (!publicKey) {
      return;
    }
    const ownedTokens = [];
    const ownedTokenAccounts = await getTokenAccountsByOwnerWithWrappedSol(
      connection,
      publicKey
    );

    ownedTokenAccounts.forEach((account) => {
      const decimals = tokens.find(
        (t) => t?.address === account.mint.toString()
      )?.decimals;

      const uiBalance = nativeToUi(account.amount, decimals || 6);
      ownedTokens.push({ account, uiBalance });
    });
    setWalletTokens(ownedTokens);
  }, [publicKey, connection, tokens]);

  const [inputTokenInfo, outputTokenInfo] = useMemo(() => {
    return [
      tokens.find(
        (item) => item?.address === formValue.inputMint?.toBase58() || ""
      ),
      tokens.find(
        (item) => item?.address === formValue.outputMint?.toBase58() || ""
      ),
    ];
  }, [formValue.inputMint, formValue.outputMint, tokens]);

  useEffect(() => {
    if (connected) {
      fetchWalletTokens();
    }

    return () => {
      setWalletTokens([]);
    };
  }, [connected, fetchWalletTokens]);

  useEffect(() => {
    if (!coinGeckoList?.length) return;
    setTokenPrices(null);
    const fetchTokenPrices = async () => {
      const inputId = coinGeckoList.find((x) =>
        inputTokenInfos?.extensions?.coingeckoId
          ? x?.id === inputTokenInfos.extensions.coingeckoId
          : x?.symbol?.toLowerCase() === inputTokenInfo?.symbol?.toLowerCase()
      )?.id;
      const outputId = coinGeckoList.find((x) =>
        outputTokenInfos?.extensions?.coingeckoId
          ? x?.id === outputTokenInfos.extensions.coingeckoId
          : x?.symbol?.toLowerCase() === outputTokenInfo?.symbol?.toLowerCase()
      )?.id;

      if (inputId && outputId) {
        const results = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${inputId},${outputId}&vs_currencies=usd`
        );
        const json = await results.json();
        if (json[inputId]?.usd && json[outputId]?.usd) {
          setTokenPrices({
            inputTokenPrice: json[inputId].usd,
            outputTokenPrice: json[outputId].usd,
          });
        }
      }
    };

    if (inputTokenInfo && outputTokenInfo) {
      fetchTokenPrices();
    }

    return () => {
      setTokenPrices(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTokenInfo, outputTokenInfo, coinGeckoList]);

  const amountInDecimal = useMemo(() => {
    if (typeof formValue?.amount === "number") {
      return formValue.amount * 10 ** (inputTokenInfo?.decimals || 1);
    }
  }, [inputTokenInfo, formValue.amount]);

  const { routeMap, routes, loading, exchange, error, refresh } = useJupiter({
    ...formValue,
    amount: amountInDecimal ? amountInDecimal : 0,
    slippage,
  });

  useEffect(() => {
    if (routes) {
      setSelectedRoute(routes[0]);
    }
    return () => {
      setSelectedRoute(null);
    };
  }, [routes]);

  useEffect(() => {
    const getDepositAndFee = async () => {
      const fees = await selectedRoute?.getDepositAndFee();
      if (fees) {
        setDepositAndFee(fees);
      }
    };
    if (selectedRoute && connected) {
      getDepositAndFee();
    }
    return () => {
      setDepositAndFee(null);
    };
  }, [connected, selectedRoute]);

  const sortedTokenMints = sortBy(tokens, (token) => {
    return token?.symbol.toLowerCase();
  });

  const outputTokenMints = useMemo(() => {
    if (routeMap.size && formValue.inputMint) {
      const routeOptions = routeMap.get(formValue.inputMint.toString());

      const routeOptionTokens =
        routeOptions?.map((address) => {
          return tokens.find((t) => {
            return t?.address === address;
          });
        }) ?? [];

      return routeOptionTokens;
    } else {
      return sortedTokenMints;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeMap, tokens, formValue.inputMint]);

  const inputWalletBalance = () => {
    if (walletTokens.length) {
      const walletToken = walletTokens.filter((t) => {
        return t.account.mint.toString() === inputTokenInfo?.address;
      });
      const largestTokenAccount = sortBy(walletToken, "uiBalance").reverse()[0];
      return largestTokenAccount?.uiBalance || 0.0;
    }

    return 0.0;
  };
  const outputWalletBalance = () => {
    if (walletTokens.length) {
      const walletToken = walletTokens.filter((t) => {
        return t.account.mint.toString() === outputTokenInfo?.address;
      });
      const largestTokenAccount = sortBy(walletToken, "uiBalance").reverse()[0];
      return largestTokenAccount?.uiBalance || 0.0;
    }
    return 0.0;
  };

  const [walletTokensWithInfos] = useMemo(() => {
    const userTokens = [];
    tokens.map((item) => {
      const found = walletTokens.find(
        (token) => token.account.mint.toBase58() === item?.address
      );
      if (found) {
        userTokens.push({ ...found, item });
      }
    });
    return [userTokens];
  }, [walletTokens, tokens]);

  const getWalletTokenPrices = async () => {
    const ids = walletTokensWithInfos.map(
      (token) => token.item.extensions?.coingeckoId
    );
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.toString()}&vs_currencies=usd`
    );
    const data = await response.json();
    setWalletTokenPrices(data);
  };

  const refreshWallet = async () => {
    setLoadWalletTokens(true);
    await fetchWalletTokens();
    await getWalletTokenPrices();
    setLoadWalletTokens(false);
  };

  const getSwapFeeTokenValue = async () => {
    if (!selectedRoute) return;
    const mints = selectedRoute.marketInfos.map((info) => info.lpFee.mint);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${mints.toString()}&vs_currencies=usd`
    );
    const data = await response.json();

    const feeValue = selectedRoute.marketInfos.reduce((a, c) => {
      const feeToken = tokens.find((item) => item?.address === c.lpFee?.mint);

      const amount = c.lpFee?.amount[0] / Math.pow(10, feeToken.decimals);

      if (data[c.lpFee?.mint]) {
        return a + data[c.lpFee?.mint].usd * amount;
      }
      if (c.lpFee?.mint === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
        return a + 1 * amount;
      }
    }, 0);
    if (feeValue) {
      setFeeValue(feeValue);
    }
  };

  useEffect(() => {
    if (selectedRoute) {
      getSwapFeeTokenValue();
    }
    return () => {
      setFeeValue(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoute]);

  useEffect(() => {
    getWalletTokenPrices();

    return () => {
      setWalletTokenPrices(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletTokensWithInfos]);

  const handleSelectRoute = (route) => {
    setShowRoutesModal(false);
    setSelectedRoute(route);
  };

  const handleSwitchMints = () => {
    setFormValue((val) => ({
      ...val,
      inputMint: formValue.outputMint,
      outputMint: formValue.inputMint,
    }));
  };

  const outAmountUi = selectedRoute
    ? selectedRoute.outAmount[0] / 10 ** (outputTokenInfo?.decimals || 1)
    : null;

  const swapDisabled = loading || !selectedRoute || routes?.length === 0;

  const inputTokenInfos = inputTokenInfo ? inputTokenInfo : null;
  const outputTokenInfos = outputTokenInfo ? outputTokenInfo : null;

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12 col-12">
          <div className="row">
            <div className="col-lg-12 col-md-12  col-12 d-flex justify-content-center mt-3">
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <div className="title d-flex justify-content-start">
                    <h1 className="ml-2">Swap</h1>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-center mt-1">
                  <div className="swap_card">
                    <div className="row swap_form">
                      <div className="col-12">
                        {/* swap pay section  */}
                        <div className="swapPay_section">
                          <div className="row">
                            <div className="col-4 d-flex align-items-center">
                              <div className="title">Pay</div>
                            </div>
                            <div className="col-8 d-flex justify-content-end align-items-center flex-row">
                              <div className="balance">
                                <p>Bal: {inputWalletBalance()}</p>
                              </div>
                              <div className="max_btn ml-2">
                                <Button
                                  active={3}
                                  br="5px"
                                  p="0px 3px"
                                  id="btn"
                                  size="0.85rem"
                                  onClick={() => {
                                    setFormValue((val) => ({
                                      ...val,
                                      amount: inputWalletBalance(),
                                    }));
                                  }}
                                >
                                  Max
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-5 d-flex align-items-center">
                              <div className="model_btn">
                                <Button
                                  active={2}
                                  br="10px"
                                  p="0.5rem 0.5rem"
                                  id="btn"
                                  size="0.8rem"
                                  onClick={() => setShowInputTokenSelect(true)}
                                >
                                  {inputTokenInfo?.logoURI ? (
                                    <img
                                      src={inputTokenInfo?.logoURI}
                                      alt={inputTokenInfo?.symbol}
                                      loading="lazy"
                                    />
                                  ) : null}

                                  <p className="mx-1">
                                    {inputTokenInfo?.symbol}
                                  </p>
                                  <i className="zmdi zmdi-chevron-down pl-1" />
                                </Button>
                              </div>
                            </div>
                            <div className="col-7 d-flex justify-content-end align-items-center">
                              <div className="input_form">
                                <Input
                                  name="amount"
                                  id="amount"
                                  type="number"
                                  className={publicKey ? null : "not-allowed"}
                                  placeholder="0.0"
                                  value={formValue.amount || ""}
                                  onInput={(e) => {
                                    let newValue = e.target?.value || 0;
                                    newValue = Number.isNaN(newValue)
                                      ? 0
                                      : newValue;

                                    setFormValue((val) => ({
                                      ...val,
                                      amount: Number(newValue),
                                    }));
                                  }}
                                  disabled={publicKey ? false : true}
                                  active={1}
                                  p="0.6rem 1rem"
                                  br="10px"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="switch_swap_section mt-4 mb-1">
                          <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                              <div className="switch_icon_section">
                                <HiSwitchVertical
                                  className="switch_icon"
                                  onClick={handleSwitchMints}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* swap receive section  */}
                        <div className="swapReceive_section">
                          <div className="row">
                            <div className="col-4 d-flex align-items-center">
                              <div className="title">Receive</div>
                            </div>
                            <div className="col-8 d-flex justify-content-end align-items-center flex-row">
                              <div className="balance">
                                <p>Bal: {outputWalletBalance()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-5 d-flex align-items-center">
                              <div className="model_btn">
                                <Button
                                  active={2}
                                  br="10px"
                                  p="0.5rem 0.5rem"
                                  id="btn"
                                  size="0.8rem"
                                  onClick={() => setShowOutputTokenSelect(true)}
                                >
                                  {outputTokenInfo?.logoURI ? (
                                    <img
                                      src={outputTokenInfo?.logoURI}
                                      alt={outputTokenInfo?.symbol}
                                      loading="lazy"
                                    />
                                  ) : null}

                                  <p className="mx-1">
                                    {" "}
                                    {outputTokenInfo?.symbol}
                                  </p>
                                  <i className="zmdi zmdi-chevron-down pl-1" />
                                </Button>
                              </div>
                            </div>
                            <div className="col-7 d-flex justify-content-end align-items-center">
                              <div className="input_form">
                                <Input
                                  name="amount"
                                  id="amount"
                                  className="not-allowed"
                                  placeholder="0.0"
                                  type="number"
                                  pattern="[0-9]*"
                                  value={
                                    selectedRoute?.outAmount && formValue.amount
                                      ? Intl.NumberFormat("en", {
                                          minimumSignificantDigits: 1,
                                          maximumSignificantDigits: 6,
                                        }).format(
                                          selectedRoute?.outAmount[0] /
                                            10 **
                                              (outputTokenInfo?.decimals || 1)
                                        )
                                      : ""
                                  }
                                  disabled
                                  active={1}
                                  p="0.6rem 1rem"
                                  br="10px"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              {selectedRoute?.outAmount &&
                              formValue.amount &&
                              tokenPrices?.outputTokenPrice ? (
                                <div className="d-flex justify-content-end mt-1 value">
                                  <span>
                                    ≈ $
                                    {(
                                      (selectedRoute?.outAmount[0] /
                                        10 **
                                          (outputTokenInfo?.decimals || 1)) *
                                      tokenPrices?.outputTokenPrice
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {routes?.length && selectedRoute ? (
                          <>
                            <div className="routes_section my-2">
                              <div className="row">
                                <div className="col-12">
                                  <div
                                    className={
                                      selectedRoute === routes[0]
                                        ? "route_card pt-3 pb-1 px-2"
                                        : "route_card py-1 px-2"
                                    }
                                  >
                                    {selectedRoute === routes[0] && (
                                      <div className="bestSwap">Best Swap</div>
                                    )}
                                    <div className="row">
                                      <div className="col-6">
                                        <div className="routes_details">
                                          <div className="d-flex align-items-center names">
                                            <span className="fullName">
                                              {selectedRoute?.marketInfos.map(
                                                (info, index) => {
                                                  let includeSeparator = false;
                                                  if (
                                                    selectedRoute?.marketInfos
                                                      .length > 1 &&
                                                    index !==
                                                      selectedRoute?.marketInfos
                                                        .length -
                                                        1
                                                  ) {
                                                    includeSeparator = true;
                                                  }
                                                  return (
                                                    <span key={index}>{`${
                                                      info.amm.label
                                                    } ${
                                                      includeSeparator
                                                        ? "x "
                                                        : " "
                                                    }`}</span>
                                                  );
                                                }
                                              )}
                                            </span>
                                          </div>
                                          <div className="tokens">
                                            <span>
                                              {inputTokenInfo?.symbol} →{" "}
                                            </span>
                                            {selectedRoute?.marketInfos.map(
                                              (r, index) => {
                                                const showArrow =
                                                  index !==
                                                  selectedRoute?.marketInfos
                                                    .length -
                                                    1
                                                    ? true
                                                    : false;
                                                return (
                                                  <span key={index}>
                                                    <span>
                                                      {
                                                        tokens.find(
                                                          (item) =>
                                                            item?.address ===
                                                            r?.outputMint?.toString()
                                                        )?.symbol
                                                      }
                                                    </span>
                                                    {showArrow ? " → " : ""}
                                                  </span>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 d-flex align-items-center justify-content-end">
                                        <div className="routes_btn">
                                          <Button
                                            type="submit"
                                            active={1}
                                            br="10px"
                                            p="0.2rem 1rem"
                                            id="btn"
                                            size="0.8rem"
                                            onClick={() =>
                                              setShowRoutesModal(true)
                                            }
                                          >
                                            {routes?.length} routes found
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="swap_details mt-3">
                              <div className="title_section">
                                <div className="row">
                                  <div className="col-4 d-flex align-items-center">
                                    <p className="title">Swap Details</p>
                                  </div>
                                  <div className="col-8 ">
                                    <div className="settings d-flex justify-content-end align-items-center flex-row">
                                      <div
                                        className="refresh"
                                        onClick={() => refresh()}
                                      >
                                        <i
                                          className={
                                            loading
                                              ? "zmdi zmdi-refresh-alt animate"
                                              : "zmdi zmdi-refresh-alt"
                                          }
                                        />
                                      </div>
                                      <div
                                        className="slippage ml-2"
                                        onClick={() => setShowSettings(true)}
                                      >
                                        <i className="zmdi zmdi-settings" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {outAmountUi && formValue?.amount ? (
                                <div className="swap_details_card mt-2">
                                  <div className="row">
                                    <div className="col-4">
                                      <span className="details_title">
                                        Rate
                                      </span>
                                    </div>
                                    <div className="col-8 d-flex justify-content-end flex-column">
                                      <div className="details_subtitle d-flex justify-content-end">
                                        <p>
                                          {swapRate ? (
                                            <>
                                              1 {inputTokenInfo?.symbol} ≈{" "}
                                              {Intl.NumberFormat("en", {
                                                minimumSignificantDigits: 1,
                                                maximumSignificantDigits: 6,
                                              }).format(
                                                outAmountUi / formValue?.amount
                                              )}{" "}
                                              {outputTokenInfo?.symbol}
                                            </>
                                          ) : (
                                            <>
                                              1 {outputTokenInfo?.symbol} ≈{" "}
                                              {Intl.NumberFormat("en", {
                                                minimumSignificantDigits: 1,
                                                maximumSignificantDigits: 6,
                                              }).format(
                                                formValue?.amount / outAmountUi
                                              )}{" "}
                                              {inputTokenInfo?.symbol}
                                            </>
                                          )}
                                          <HiSwitchVertical
                                            className="switch ml-1"
                                            onClick={() =>
                                              setSwapRate(!swapRate)
                                            }
                                          />
                                        </p>
                                      </div>
                                      <div className="pt-1 other_details d-flex justify-content-end">
                                        {tokenPrices?.outputTokenPrice &&
                                        tokenPrices?.inputTokenPrice ? (
                                          <p
                                            className={`text-right ${
                                              ((formValue?.amount /
                                                outAmountUi -
                                                tokenPrices?.outputTokenPrice /
                                                  tokenPrices?.inputTokenPrice) /
                                                (formValue?.amount /
                                                  outAmountUi)) *
                                                100 <=
                                              0
                                                ? "text-green"
                                                : "text-red"
                                            }`}
                                          >
                                            {Math.abs(
                                              ((formValue?.amount /
                                                outAmountUi -
                                                tokenPrices?.outputTokenPrice /
                                                  tokenPrices?.inputTokenPrice) /
                                                (formValue?.amount /
                                                  outAmountUi)) *
                                                100
                                            ).toFixed(1)}
                                            %{" "}
                                            <span>{`${
                                              ((formValue?.amount /
                                                outAmountUi -
                                                tokenPrices?.outputTokenPrice /
                                                  tokenPrices?.inputTokenPrice) /
                                                (formValue?.amount /
                                                  outAmountUi)) *
                                                100 <=
                                              0
                                                ? "swap cheaper"
                                                : "swap more-expensive"
                                            } CoinGecko`}</span>
                                          </p>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-1">
                                    <div className="col-4">
                                      <span className="details_title">
                                        Price Impact
                                      </span>
                                    </div>
                                    <div className="col-8 d-flex justify-content-end flex-column">
                                      <div className="details_subtitle d-flex justify-content-end">
                                        <p>
                                          {selectedRoute?.priceImpactPct * 100 <
                                          0.1
                                            ? "< 0.1%"
                                            : `~ ${(
                                                selectedRoute?.priceImpactPct *
                                                100
                                              ).toFixed(4)}%`}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-1">
                                    <div className="col-6">
                                      <span className="details_title">
                                        Minimum Received
                                      </span>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end flex-column">
                                      <div className="details_subtitle d-flex justify-content-end">
                                        <p>
                                          {outputTokenInfo?.decimals ? (
                                            <>
                                              {Intl.NumberFormat("en", {
                                                minimumSignificantDigits: 1,
                                                maximumSignificantDigits: 6,
                                              }).format(
                                                selectedRoute?.outAmountWithSlippage /
                                                  10 **
                                                    outputTokenInfo.decimals ||
                                                  1
                                              )}
                                              <span>
                                                {" "}
                                                {outputTokenInfo?.symbol}
                                              </span>
                                            </>
                                          ) : null}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-1">
                                    <div className="col-5">
                                      <span className="details_title">
                                        Swap Fee
                                      </span>
                                    </div>
                                    <div className="col-7 d-flex justify-content-end flex-column">
                                      <div className="details_subtitle d-flex justify-content-end">
                                        <p>≈ ${feeValue?.toFixed(2)}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {connected ? (
                                    <div className="row my-1">
                                      <div className="col-5">
                                        <span className="details_title">
                                          Transaction Fee
                                        </span>
                                      </div>
                                      <div className="col-7 d-flex justify-content-end flex-column">
                                        <div className="details_subtitle d-flex justify-content-end">
                                          <p>
                                            {depositAndFee
                                              ? depositAndFee?.signatureFee /
                                                Math.pow(10, 9)
                                              : "-"}{" "}
                                            SOL
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  {error ? (
                                    <div className="row my-1">
                                      <div className="col-12">
                                        <span className="details_title text-red">
                                          {error}
                                        </span>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </>
                        ) : null}

                        {/* swap button to swap */}
                        <div className="swap_button_section mt-5">
                          <div className="row">
                            <div className="col-12">
                              <div className="swap_btn">
                                <Button
                                  active={1}
                                  br="50px"
                                  p="0.5rem 1rem"
                                  id="btn"
                                  size="1rem"
                                  className={
                                    !connected && zeroKey !== publicKey
                                      ? "not-allowed"
                                      : null
                                  }
                                  disabled={swapDisabled}
                                  onClick={async () => {
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
                                          sendTransaction:
                                            wallet?.adapter?.sendTransaction,
                                          publicKey: wallet?.adapter?.publicKey,
                                          signAllTransactions,
                                          signTransaction,
                                        },
                                        routeInfo: selectedRoute,
                                        onTransaction: async (
                                          txid,
                                          totalTxs
                                        ) => {
                                          if (txCount === totalTxs) {
                                            errorTxid = txid;
                                            dispatch(
                                              setSnackbar(
                                                true,
                                                "success",
                                                `Confirming Transaction`
                                              )
                                            );
                                          }
                                          await connection.confirmTransaction(
                                            txid,
                                            "confirmed"
                                          );

                                          txCount++;
                                          return await connection.getTransaction(
                                            txid,
                                            {
                                              commitment: "confirmed",
                                            }
                                          );
                                        },
                                      });
                                      setSwapping(false);
                                      fetchWalletTokens();

                                      if ("error" in swapResult) {
                                        dispatch(
                                          setSnackbar(
                                            true,
                                            "error",
                                            `${
                                              swapResult?.error?.name
                                                ? swapResult.error.name
                                                : ""
                                            } ${swapResult?.error?.message}`
                                          )
                                        );
                                      } else if ("txid" in swapResult) {
                                        const description =
                                          swapResult?.inputAmount &&
                                          swapResult.outputAmount
                                            ? `Swapped ${
                                                swapResult.inputAmount /
                                                10 **
                                                  (inputTokenInfo?.decimals ||
                                                    1)
                                              } ${inputTokenInfo?.symbol} to ${
                                                swapResult.outputAmount /
                                                10 **
                                                  (outputTokenInfo?.decimals ||
                                                    1)
                                              } ${outputTokenInfo?.symbol}`
                                            : "";

                                        dispatch(
                                          setSnackbar(
                                            true,
                                            "Success",
                                            `Swap Successful ${swapResult.txid}
                                 ${description}`
                                          )
                                        );

                                        setFormValue((val) => ({
                                          ...val,
                                          amount: null,
                                        }));
                                      }
                                    }
                                  }}
                                >
                                  {connected ? (
                                    swapping ? (
                                      <div className="d-flex align-items-center justify-content-center">
                                        <p
                                          style={{
                                            color: "snow",
                                            fontSize: "1.2rem",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItem: "center",
                                            marginTop: "0px",
                                          }}
                                        >
                                          <i className="zmdi zmdi-rotate-left zmdi-hc-spin-reverse"></i>
                                        </p>
                                        <span className="pl-2">
                                          {" "}
                                          Swap Swapping
                                        </span>
                                      </div>
                                    ) : (
                                      "Swap"
                                    )
                                  ) : (
                                    "Connect Wallet"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-12 pb-lg-3 my-lg-4 my-md-5 my-4 my-2">
          <div className="row">
            <div className="col-12 TradingView_section">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    <h1>Market Data</h1>
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <Chart
                    inputTokenId={inputTokenInfos?.extensions?.coingeckoId}
                    outputTokenId={outputTokenInfos?.extensions?.coingeckoId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInputTokenSelect ? (
        <TokenSelectModel
          isOpen={showInputTokenSelect}
          onClose={() => setShowInputTokenSelect(false)}
          sortedTokenMints={sortedTokenMints}
          onTokenSelect={(token) => {
            setShowInputTokenSelect(false);
            setFormValue((val) => ({
              ...val,
              inputMint: new PublicKey(token?.address),
            }));
          }}
          walletTokens={walletTokens}
        />
      ) : null}
      {showOutputTokenSelect ? (
        <TokenSelectModel
          isOpen={showOutputTokenSelect}
          onClose={() => setShowOutputTokenSelect(false)}
          sortedTokenMints={outputTokenMints}
          onTokenSelect={(token) => {
            setShowOutputTokenSelect(false);
            setFormValue((val) => ({
              ...val,
              outputMint: new PublicKey(token?.address),
            }));
          }}
        />
      ) : null}
      {showRoutesModal ? (
        <RoutesModel
          isOpen={showRoutesModal}
          onClose={() => setShowRoutesModal(false)}
          handleSelectRoute={handleSelectRoute}
          routes={routes}
          selectedRoute={selectedRoute}
          inputTokenInfo={inputTokenInfo}
          tokens={tokens}
          outputTokenInfo={outputTokenInfo}
        />
      ) : null}

      {showSettings ? (
        <SwapSettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          slippage={slippage}
          setSlippage={setSlippage}
        />
      ) : null}
    </>
  );
};

export default memo(Jupiter);
