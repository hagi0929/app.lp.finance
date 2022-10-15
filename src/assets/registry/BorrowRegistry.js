import { TokenImgRegistry } from "./index";
import { MintAddress } from "constants/global";

export var DepositTokens = [
  {
    address: MintAddress.SOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SOL,
    name: "Wrapped SOL",
    symbol: "SOL",
  },
  {
    address: MintAddress.mSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.mSOL,
    name: "Marinade staked SOL",
    symbol: "mSOL",
  },
  {
    address: MintAddress.stSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.stSOL,
    name: "Lido Staked SOL",
    symbol: "stSOL",
  },
  {
    address: MintAddress.UXD,
    chainId: 101,
    decimals: 6,
    logoURI: TokenImgRegistry.UXD,
    name: "UXD Stablecoin",
    symbol: "UXD",
  },
  {
    address: MintAddress.SAMO,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SAMO,
    name: "Samoyed Coin",
    symbol: "SAMO",
  },
];

export var BorrowTokens = [
  {
    address: MintAddress.zSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.zSOL,
    name: "zSOL",
    symbol: "zSOL",
  },
];

export var RepayTokens = [
  {
    address: MintAddress.zSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.zSOL,
    name: "zSOL",
    symbol: "zSOL",
  },
  {
    address: MintAddress.mSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.mSOL,
    name: "Marinade staked SOL",
    symbol: "mSOL",
  },
  {
    address: MintAddress.stSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.stSOL,
    name: "Lido Staked SOL",
    symbol: "stSOL",
  },
];

export var WithdrawTokens = [
  {
    address: MintAddress.SOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SOL,
    name: "Wrapped SOL",
    symbol: "SOL",
  },
  {
    address: MintAddress.mSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.mSOL,
    name: "Marinade staked SOL",
    symbol: "mSOL",
  },
  {
    address: MintAddress.stSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.stSOL,
    name: "Lido Staked SOL",
    symbol: "stSOL",
  },
  {
    address: MintAddress.UXD,
    chainId: 101,
    decimals: 6,
    logoURI: TokenImgRegistry.UXD,
    name: "UXD Stablecoin",
    symbol: "UXD",
  },
  {
    address: MintAddress.SAMO,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SAMO,
    name: "Samoyed Coin",
    symbol: "SAMO",
  },
];

export const totalSupplyChartList = [
  {
    id: 1,
    name: "SOL",
    dataKey: "SOL",
    fill: "url(#SOL)",
    stroke: "#00FFA3",
    checked: true,
  },
  {
    id: 2,
    name: "mSOL",
    dataKey: "mSOL",
    fill: "url(#mSOL)",
    stroke: "#b0d9c9",
    checked: true,
  },
  {
    id: 3,
    name: "stSOL",
    dataKey: "stSOL",
    fill: "url(#stSOL)",
    stroke: "#73d6d9",
    checked: true,
  },
  {
    id: 4,
    name: "SAMO",
    dataKey: "SAMO",
    fill: "url(#SAMO)",
    stroke: "#ccb7b7",
    checked: true,
  },
  {
    id: 5,
    name: "UXD",
    dataKey: "UXD",
    fill: "url(#UXD)",
    stroke: "#707070",
    checked: true,
  },
];

export const totalBorrowedChartList = [
  {
    id: 1,
    name: "zSOL",
    dataKey: "zSOL",
    fill: "url(#zSOL)",
    stroke: "#0c0",
    checked: true,
  },
];

export const totalDepositTokenChartList = [
  {
    id: 1,
    name: "SOL",
    dataKey: "SOL",
    fill: "url(#SOL)",
    stroke: "#00FFA3",
    checked: true,
  },
  {
    id: 2,
    name: "mSOL",
    dataKey: "mSOL",
    fill: "url(#mSOL)",
    stroke: "#b0d9c9",
    checked: true,
  },
  {
    id: 3,
    name: "stSOL",
    dataKey: "stSOL",
    fill: "url(#stSOL)",
    stroke: "#73d6d9",
    checked: true,
  },
  {
    id: 4,
    name: "SAMO",
    dataKey: "SAMO",
    fill: "url(#SAMO)",
    stroke: "#ccb7b7",
    checked: true,
  },
  {
    id: 5,
    name: "UXD",
    dataKey: "UXD",
    fill: "url(#UXD)",
    stroke: "#707070",
    checked: true,
  },
];

export const totalBorrowedTokenChartList = [
  {
    id: 1,
    name: "zSOL",
    dataKey: "zSOL",
    fill: "url(#zSOL)",
    stroke: "#0c0",
    checked: true,
  },
];
