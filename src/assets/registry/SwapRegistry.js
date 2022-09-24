import { TokenImgRegistry } from "./index";
import { MintAddress } from "constants/global";

export var SwapTokens = [
  {
    address: MintAddress.SOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SOL,
    name: "Wrapped SOL",
    symbol: "SOL",
    extensions: {
      coingeckoId: "solana",
      serumV3Usdc: "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT",
      serumV3Usdt: "HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1",
      website: "https://solana.com/",
    },
  },
  {
    address: MintAddress.mSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.mSOL,
    name: "Marinade staked SOL",
    symbol: "mSOL",
    extensions: {
      coingeckoId: "msol",
      discord: "https://discord.gg/mGqZA5pjRN",
      github: "https://github.com/marinade-finance",
      medium: "https://medium.com/marinade-finance",
      serumV3Usdc: "6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy",
      serumV3Usdt: "HxkQdUnrPdHwXP5T9kewEXs3ApgvbufuTfdw9v1nApFd",
      twitter: "https://twitter.com/MarinadeFinance",
      website: "https://marinade.finance",
    },
  },
  {
    address: MintAddress.stSOL,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.stSOL,
    name: "Lido Staked SOL",
    symbol: "stSOL",
    extensions: {
      coingeckoId: "lido-staked-sol",
      coinmarketcap: "https://coinmarketcap.com/currencies/lido-for-solana/",
      discord: "https://discord.gg/w9pXXgQPu8",
      github: "https://github.com/ChorusOne/solido",
      serumV3Usdc: "5F7LGsP1LPtaRV7vVKgxwNYX4Vf22xvuzyXjyar7jJqp",
      twitter: "https://twitter.com/LidoFinance",
      website: "https://solana.lido.fi/",
    },
  },
  {
    address: MintAddress.UXD,
    chainId: 101,
    decimals: 6,
    logoURI: TokenImgRegistry.UXD,
    name: "UXD Stablecoin",
    symbol: "UXD",
    tags: ["stablecoin"],
    extensions: {
      coingeckoId: "uxd-stablecoin",
      discord: "https://discord.com/invite/BHfpYmjsBM",
      medium: "https://uxdprotocol.medium.com/",
      twitter: "https://twitter.com/UXDProtocol",
      website: "https://uxd.fi/",
    },
  },
  {
    address: MintAddress.SAMO,
    chainId: 101,
    decimals: 9,
    logoURI: TokenImgRegistry.SAMO,
    name: "Samoyed Coin",
    symbol: "SAMO",
    extensions: {
      coingeckoId: "samoyedcoin",
      serumV3Usdc: "FR3SPJmgfRSKKQ2ysUZBu7vJLpzTixXnjzb84bY3Diif",
      website: "https://samoyedcoin.com/",
    },
  },
];

export const coinGeckoList = [
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
  },
  {
    id: "msol",
    name: "Marinade staked SOL",
    symbol: "msol",
  },
  {
    id: "lido-staked-sol",
    name: "Lido Staked SOL",
    symbol: "stsol",
  },
  {
    id: "uxd-stablecoin",
    name: "UXD Stablecoin",
    symbol: "uxd",
  },
  {
    id: "samoyedcoin",
    name: "Samoyedcoin",
    symbol: "samo",
  },
];
