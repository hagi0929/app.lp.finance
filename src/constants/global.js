import * as anchor from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const convert_to_wei = (val) =>
  parseInt(parseFloat(val) * 1e9).toString();

export const convert_to_dy_wei = (val, con) =>
  parseInt(parseFloat(val) * con).toString();

export const SEED_PDA = "lpfinance";
export const SEED_TOKEN = "lpfinance-token";
export const SEED_SOL = "lpfinance-sol";
export const SEED_ZSOL_MINT_AUTHORITY_PDA = "zsol_mint";
export const SEED_TRV_PDA = "typeless_repayment_vault";
export const SEED_LIQUIDATOR = "typeless_repayment_vault";

export const config = new PublicKey(
  "7FRwzBQ1WV3TANtZdtaHqdTQq2aYWYdENBZ2SHq4p26K"
);

export const cTokenInfoAccounts = new PublicKey(
  "2GrT8rh9UM7p46TLwvbnWfBkgBhNQ8JbDpxff2UnSvep"
);

// Mint config
// =================================
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
  "EN2CV9nCnH9nBF9GyGYG9B3haNriNBkrPo8jF4c6mzUi"
);

export const SRMMint = new PublicKey(
  "3KNSn9AUMUpYzGkN7K8FZaidiBZqVbz8bGtJh8SVFSJq"
);

export const SAMOMint = new PublicKey(
  "5rUhzmWf8pyhJvjYfbQ8xPJJHDJgkeZBUDWN7rd48Hux"
);

export const zSOL_MINT = new PublicKey(
  "5bipQ6XDX2JJEKzZWndVrz7Qbo5wagButEZyr8A8rv6J"
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

export const SRM_Account = new PublicKey(
  "3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym"
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
  "9a6RNx3tCu1TSs6TBSfV2XRXEPEZXQ6WB7jRojZRvyeZ"
);
export const switchboardSrmAccount = new PublicKey(
  "992moaMQKs32GKZ9dxi8keyM2bUmbrwBZpK4p2K6X5Vs"
);
export const switchboardStsolAccount = new PublicKey(
  "2LwhbcswZekofMNRtDRMukZJNSRUiKYMFbqtBwqjDfke"
);
export const switchboardSamoAccount = new PublicKey(
  "2LwhbcswZekofMNRtDRMukZJNSRUiKYMFbqtBwqjDfke"
);
export const switchboardUxdAccount = new PublicKey(
  "BV9mGAy5MJLYWJT5HF74izYKjF9CmL4BqkswfTu9gW2w"
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
export const LIQ_POOL_MSOL_LEG_AUTHORITY = new PublicKey(
  "EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL"
);
export const RESERVE_PDA = new PublicKey(
  "Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN"
);

export const MSOL_MINT_AUTHORITY = new PublicKey(
  "3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM"
);
export const MARINADE_PROGRAM = new PublicKey(
  "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD"
);

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
  } else if (token === "SRM") {
    mint = SRMMint;
  } else if (token === "SAMO") {
    mint = SAMOMint;
  } else if (token === "zSOL") {
    mint = zSOL_MINT;
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
  } else if (token === "SRM") {
    Account = switchboardSrmAccount;
  } else if (token === "SAMO") {
    Account = switchboardSamoAccount;
  }
  return Account;
};

export const CollateralTokenName = {
  SOL: 0,
  MSOL: 1,
  STSOL: 2,
  UXD: 3,
  SRM: 4,
  SAMO: 5,
};

export const getCollateralTokenName = async (idx) => {
  if (CollateralTokenName.SOL === idx) return "SOL";
  else if (CollateralTokenName.MSOL === idx) return "MSOL";
  else if (CollateralTokenName.STSOL === idx) return "STSOL";
  else if (CollateralTokenName.UXD === idx) return "UXD";
  else if (CollateralTokenName.SRM === idx) return "SRM";
  else if (CollateralTokenName.SAMO === idx) return "SAMO";
  return undefined;
};
