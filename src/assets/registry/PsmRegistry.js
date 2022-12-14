import { TokenImgRegistry } from "./index";
import { MintAddress } from "constants/global";

export var PSMRegistry = [
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
