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
