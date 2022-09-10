import { TokenImgRegistry } from "./index";

export const LPFarmingItems = [
  {
    id: 1,
    website: "https://lifinity.io/pools",
    Img1: TokenImgRegistry.zSOL,
    Img2: TokenImgRegistry.SOL,
    name1: "zSOL",
    name2: "SOL",
    TotalStaked: 0,
    RewardAPR: 0,
    Rewards: [],
  },
  {
    id: 2,
    website: "https://lifinity.io/pools",
    Img1: TokenImgRegistry.zSOL,
    Img2: TokenImgRegistry.stSOL,
    name1: "zSOL",
    name2: "stSOL",
    TotalStaked: 0,
    RewardAPR: 0,
    Rewards: [],
  },
];

export const LPFarmingTokenRegistry = [
  {
    id: 1,
    pairOneImg: TokenImgRegistry.zSOL,
    pairTwoImg: TokenImgRegistry.SOL,
    pairOneName: "zSOL",
    pairTwoName: "SOL",
    symbol: "zSOL-SOL",
    price: 0,
    bal: 0,
  },
  {
    id: 2,
    pairOneImg: TokenImgRegistry.zSOL,
    pairTwoImg: TokenImgRegistry.stSOL,
    pairOneName: "zSOL",
    pairTwoName: "stSOL",
    symbol: "zSOL-stSOL",
    price: 0,
    bal: 0,
  },
];
