import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const convert_to_wei = (val) =>
  parseInt(parseFloat(val) * 1e9).toString();

export const convert_to_dy_wei = (val, con) =>
  parseInt(parseFloat(val) * con).toString();

// TypelessRepay
export const TYPE_LESS_DISCOUNT_RATE = 0.9995;
export const TRVC_SWAP_FEE = 0.9995;
export const zSOL_DECIMAL = 9;
export const SOL_DECIMAL = 9;

export const SEED_PDA = "lpfinancev2";
export const SEED_TOKEN = "lpfinance-token";
export const SEED_SOL = "lpfinance-sol";
export const SEED_ZSOL_MINT_AUTHORITY_PDA = "zsol_mint";
export const SEED_TRV_PDA = "typeless_repayment_vault2";
export const SEED_LIQUIDATOR = "lpfinance-liquidator";
export const SEED_LPFi_BUYBACK = "lpfinance-buyback";
export const NLP_SEED_PDA = "nlp-staking";

export const NLP_STAKING_PROGRAM = new PublicKey(
  "EUtcGYBakaqKpvKRon5xrBQVJe7MLVxS3xKkwoN3HKSj"
);

export const ADMIN = new PublicKey(
  "7KDQhb9KX8y9rkrtyAw4arkRVctGhaRhaUMCadfg4bEk"
);

export const TRVC_ADMIN = new PublicKey(
  "AZzscKGxcnS25oyvcLWoYWAQPE4uv4pycXR8ANq1HkmD"
);

export const config = new PublicKey(
  "3JCXdf4Q869N3ntazP7w6ZKg3F37F1QzhKgZQkNmgNkv"
);

export const cTokenInfoAccounts = new PublicKey(
  "HfojroGNETbjwWxVMu3arqBdfEznq9HZYUjRYVEiumHy"
);

export const zSOL_MINT_AUTHORITY = new PublicKey(
  "8qTM9XXTrDG8gQooEUw6EUWhijijew4f1zdYAsMEGo6Z"
);

// Mint config
// =================================
export const MintAddress = {
  SOL: "So11111111111111111111111111111111111111112",
  mSOL: "CGm3Nihs61EVk3iiDg9eCov3PCYDkLtaMRXyHw4dkd91",
  stSOL: "FjNXKDtDWzo9usb6YdWNUxRwKyGWrF2aTLWydYzjtSU4",
  UXD: "EN2CV9nCnH9nBF9GyGYG9B3haNriNBkrPo8jF4c6mzUi",
  SAMO: "5rUhzmWf8pyhJvjYfbQ8xPJJHDJgkeZBUDWN7rd48Hux",
  zSOL: "DQcNmbmCWG5AGwFTKosWJ9N2E7TbWvtLgLCW8XR3GzpT",
  nLP_MINT: "B8gLyBqHKGW1iHqiuq4X64dF4Fk7eFw3auB3aWNq7wN1",
  LPFi: "2vAxp4x5ZFiz9xXYpWScwtjcamWkfPpT6MzbbyNzUPp5",
};

export const SOLMint = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

export const mSOLMint = new PublicKey(
  "CGm3Nihs61EVk3iiDg9eCov3PCYDkLtaMRXyHw4dkd91"
);

export const stSOLMint = new PublicKey(
  "FjNXKDtDWzo9usb6YdWNUxRwKyGWrF2aTLWydYzjtSU4"
);

export const UXDMint = new PublicKey(
  "5AZAa4gj2Z8UKgUKRbQwj1CRk8f8tUyctXvBnbnvEiTk"
);

export const SAMOMint = new PublicKey(
  "5rUhzmWf8pyhJvjYfbQ8xPJJHDJgkeZBUDWN7rd48Hux"
);

export const zSOL_MINT = new PublicKey(
  "DQcNmbmCWG5AGwFTKosWJ9N2E7TbWvtLgLCW8XR3GzpT"
);

export const LPFi_MINT = new PublicKey(
  "2vAxp4x5ZFiz9xXYpWScwtjcamWkfPpT6MzbbyNzUPp5"
);

export const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

export const nLP_MINT = new PublicKey(
  "B8gLyBqHKGW1iHqiuq4X64dF4Fk7eFw3auB3aWNq7wN1"
);

// MAINNET-BETA PYth price config
// ===================================
export const SOL_Account = new PublicKey(
  "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"
);

export const mSOL_Account = new PublicKey(
  "E4v1BBgoso9s64TQvmyownAVJbhbEPGyzA3qn4n46qj9"
);

export const stSOL_Account = new PublicKey(
  "Bt1hEbY62aMriY1SyQqbeZbm8VmSbQVGBFzSzMuVNWzN"
);

// need this
export const UXD_Account = new PublicKey(
  "Bt1hEbY62aMriY1SyQqbeZbm8VmSbQVGBFzSzMuVNWzN"
);
// need this
export const SAMO_Account = new PublicKey(
  "DZYZkJcFJThN9nZy4nK3hrHra1LaWeiyoZ9SMdLFEFpY"
);

// SWITCHBOARD config
// =======================================================================

export const switchboardSolAccount = new PublicKey(
  "DfZpw4HoKSjJUkDegVQFqFY6fTuHFLbt5SC6SU68BgU2"
); // Right

export const switchboardMsolAccount = new PublicKey(
  "67xNRwcqQMzghgDjTB4Vr7YbBWH1iimeYpTK8ampm5xs"
);

export const switchboardStsolAccount = new PublicKey(
  "HGMXgS2LbzotxsRvmG4wuRWaJ6xn6c6hLfXgo9THVKp8"
);
export const switchboardSamoAccount = new PublicKey(
  "529QhfiesSavTZfMhvKKm5nwrHfdwfjzqC13CE4CfqRE"
);
export const switchboardUxdAccount = new PublicKey(
  "31pmbiYPvVa9ywUwo6UdwSwugTgw1fgCZkJpNz6PSuMA"
); // Right

// Marinade finance config
// =======================================================
export const STATE_PUB = new PublicKey(
  "8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC"
);
export const LIQ_POOL_SOL_LEG_PDA = new PublicKey(
  "UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q"
);
export const LIQ_POOL_MSOL_LEG = new PublicKey(
  "7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE"
);

export const RESERVE_PDA = new PublicKey(
  "Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN"
);

export const MARINADE_PROGRAM = new PublicKey(
  "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
);

export const LIQ_POOL_MSOL_LEG_AUTHORITY = new PublicKey(
  "EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL"
);

export const mSOL_MINT_AUTHORITY = new PublicKey(
  "3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM"
);

export const cTOKEN_INFOS = [
  // 0 SOL
  {
    token: SOLMint,
    decimal: 9,
    borrowable_max_ltv: 90,
    liquidatable_max_ltv: 95,
    is_active: true,
    deposit_cap: new anchor.BN("0"),
    name: '{"sol":{}}',
    switchboard_acc_pub: switchboardSolAccount,
    symbol: "SOL",
  },
  // 1
  {
    token: mSOLMint,
    decimal: 9,
    borrowable_max_ltv: 90,
    liquidatable_max_ltv: 95,
    is_active: true,
    deposit_cap: new anchor.BN("0"),
    name: '{"msol":{}}',
    switchboard_acc_pub: switchboardMsolAccount,
    symbol: "mSOL",
  },
  // 2
  {
    token: stSOLMint,
    decimal: 9,
    borrowable_max_ltv: 90,
    liquidatable_max_ltv: 95,
    is_active: true,
    deposit_cap: new anchor.BN("0"),
    name: '{"stsol":{}}',
    switchboard_acc_pub: switchboardStsolAccount,
    symbol: "stSOL",
  },
  // 3
  {
    token: SAMOMint,
    decimal: 9,
    borrowable_max_ltv: 65,
    liquidatable_max_ltv: 75,
    is_active: true,
    deposit_cap: new anchor.BN("3000000"),
    name: '{"samo":{}}',
    switchboard_acc_pub: switchboardSamoAccount,
    symbol: "SAMO",
  },
  // 4
  {
    token: UXDMint,
    decimal: 9,
    borrowable_max_ltv: 75,
    liquidatable_max_ltv: 85,
    is_active: true,
    deposit_cap: new anchor.BN("800000"),
    name: '{"uxd":{}}',
    switchboard_acc_pub: switchboardUxdAccount,
    symbol: "UXD",
  },
];

export const getCTokenInfo = (token) => {
  for (let i = 0; i < cTOKEN_INFOS.length; i++) {
    const ctokenInfo = cTOKEN_INFOS[i];
    if (
      ctokenInfo.token.toString().toLocaleLowerCase() ===
      token.toString().toLocaleLowerCase()
    ) {
      return ctokenInfo;
    }
  }
  return undefined;
};

export const getCollateralTokenSymbol = (name) => {
  const name_str = JSON.stringify(name);
  for (let i = 0; i < cTOKEN_INFOS.length; i++) {
    const cTokenInfo = cTOKEN_INFOS[i];
    if (cTokenInfo.name === name_str) {
      return cTokenInfo.symbol;
    }
  }
  return undefined;
};

export const getOracleAccount = (token) => {
  for (let i = 0; i < cTOKEN_INFOS.length; i++) {
    const cTokenInfo = cTOKEN_INFOS[i];
    if (
      cTokenInfo.token.toString().toLocaleLowerCase() ===
      token.toString().toLocaleLowerCase()
    ) {
      return cTokenInfo.switchboard_acc_pub;
    }
  }
  return undefined;
};

export const getMint = (token) => {
  let mint;

  if (token === "SOL") {
    mint = SOLMint;
  } else if (token === "mSOL") {
    mint = mSOLMint;
  } else if (token === "stSOL") {
    mint = stSOLMint;
  } else if (token === "UXD") {
    mint = UXDMint;
  } else if (token === "SAMO") {
    mint = SAMOMint;
  } else if (token === "zSOL") {
    mint = zSOL_MINT;
  } else if (token === "USDC") {
    mint = USDC_MINT;
  } else if (token === "LPFi") {
    mint = LPFi_MINT;
  } else if (token === "nlp") {
    mint = nLP_MINT;
  }

  return mint;
};

export const getSwitchboardAccount = (token) => {
  let Account;

  if (token === "SOL" || token === "zSOL") {
    Account = switchboardSolAccount;
  } else if (token === "mSOL") {
    Account = switchboardMsolAccount;
  } else if (token === "stSOL") {
    Account = switchboardStsolAccount;
  } else if (token === "UXD") {
    Account = switchboardUxdAccount;
  } else if (token === "SAMO") {
    Account = switchboardSamoAccount;
  }
  return Account;
};

export const getSymbol = (token) => {
  let symbol;

  if (token === "sol") {
    symbol = "SOL";
  } else if (token === "msol") {
    symbol = "mSOL";
  } else if (token === "stsol") {
    symbol = "stSOL";
  } else if (token === "uxd") {
    symbol = "UXD";
  } else if (token === "samo") {
    symbol = "SAMO";
  } else if (token === "zsol") {
    symbol = "zSOL";
  } else if (token === "usdc") {
    symbol = "USDC";
  } else if (token === "lpfi") {
    symbol = "LPFi";
  }
  return symbol;
};

export const CollateralTokenName = {
  SOL: 0,
  MSOL: 1,
  STSOL: 2,
  UXD: 3,
  SAMO: 5,
};

export const getCollateralTokenName = async (idx) => {
  if (CollateralTokenName.SOL === idx) return "SOL";
  else if (CollateralTokenName.MSOL === idx) return "MSOL";
  else if (CollateralTokenName.STSOL === idx) return "STSOL";
  else if (CollateralTokenName.UXD === idx) return "UXD";
  else if (CollateralTokenName.SAMO === idx) return "SAMO";
  return undefined;
};
