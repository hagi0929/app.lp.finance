export const TokenImgRegistry = {
  SOL: "https://lptokenbucket.s3.amazonaws.com/df32c49a4f133662fd78dc3449b0946d",
  mSOL: "https://lptokenbucket.s3.amazonaws.com/dff4db9f6e4d5e45c898d810cd6b381b",
  MSOL: "https://lptokenbucket.s3.amazonaws.com/dff4db9f6e4d5e45c898d810cd6b381b",
  stSOL:
    "https://lptokenbucket.s3.amazonaws.com/c8e60e5099ff1a97c766ca39dac5fe71",
  UXD: "https://lptokenbucket.s3.amazonaws.com/8760a253c75f91ce069c1094350092a2",
  SAMO: "https://lptokenbucket.s3.amazonaws.com/c85a303ff798379f58f11fc8841a9fc1",
  zSOL: "https://lptokenbucket.s3.amazonaws.com/30bd9d88075d07b6a14086c63e9ac124",
};

export const RpcRegistry = [
  {
    id: 1,
    network: "Mainnet Beta",
  },
  {
    id: 2,
    network: "QuickNode (LP Finance)",
  },
  {
    id: 3,
    network: "Devnet",
  },
];

export const NavbarRegistry = [
  {
    id: 1,
    name: "Borrow",
    pathName: "/",
    href: "/",
  },
  {
    id: 2,
    name: "PSM",
    pathName: "/psm",
    href: "/psm",
  },
  {
    id: 3,
    name: "LP Farming",
    pathName: "/lp-farming",
    href: "/lp-farming",
  },
  {
    id: 4,
    name: "Treasury",
    pathName: "/treasury",
    href: "/treasury",
  },
  {
    id: 5,
    name: "Swap",
    pathName: "/swap",
    href: "/swap",
  },
];

export const FooterRegistry = [
  {
    id: 1,
    name: "twitter",
    icon: "/images/media/twitter.png",
    url: "https://twitter.com/LPFinance_",
  },
  {
    id: 2,
    name: "telegram",
    icon: "/images/media/telegram.png",
    url: "https://t.me/LP_Defi_Official_group",
  },
  {
    id: 3,
    name: "medium",
    icon: "/images/media/medium.png",
    url: "https://medium.com/@LP_Finance",
  },
  {
    id: 4,
    name: "linkedin",
    icon: "/images/media/linkedin.png",
    url: "https://www.linkedin.com/company/lpdefi/",
  },
  {
    id: 5,
    name: "github",
    icon: "/images/media/github.png",
    url: "https://github.com/LP-Finance-Inc",
  },
  {
    id: 6,
    name: "discord",
    icon: "/images/media/discord.png",
    url: "https://discord.gg/ug7mstrHNW",
  },
];

export const LiquidStaking = [
  {
    id: 1,
    img: TokenImgRegistry.mSOL,
    name: "mSOL",
  },
  {
    id: 2,
    img: TokenImgRegistry.stSOL,
    name: "stSOL",
  },
];

export var TokenPriceRegistry = ["SOL", "zSOL", "mSOL", "stSOL", "UXD", "SAMO"];

export var TokenBalRegistry = ["SOL", "mSOL", "zSOL", "stSOL", "UXD", "SAMO"];
