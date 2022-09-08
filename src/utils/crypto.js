import axios from "axios";
import api from "api";
import { TokenPriceRegistry, TokenBalRegistry } from "assets/registry";
import { getConnection } from "utils/connection";
import {
  SOLMint,
  mSOLMint,
  stSOLMint,
  UXDMint,
  SRMMint,
  SLNDMint,
  GMTMint,
  SAMOMint,
} from "constants/global";
import * as anchor from "@project-serum/anchor";

export const getTokenPrice = async () => {
  try {
    const PriceList = [];

    for (let i = 0; i < TokenPriceRegistry.length; i++) {
      const response = await axios.get(
        `${api.price}?id=${TokenPriceRegistry[i]}`
      );

      if (response.status === 200) {
        const { price, mintSymbol } = response.data.data;
        PriceList.push({ price, symbol: mintSymbol });
      } else {
        PriceList.push({ price: 0, symbol: TokenPriceRegistry[i] });
      }
    }
    return PriceList;
  } catch (error) {}
};

export const getBalance = (publicKey) => {
  const connection = getConnection();

  const BalList = [];

  TokenBalRegistry.map(async (token) => {
    try {
      if (token === "SOL") {
        if (publicKey) {
          const bal = await connection.getBalance(publicKey);
          BalList.push({ bal: bal, symbol: token });
        } else {
          BalList.push({ bal: 0, symbol: token });
        }
      } else {
        let mintAddress = "";
        if (token === "SOL") {
          mintAddress = SOLMint;
        } else if (token === "mSOL") {
          mintAddress = mSOLMint;
        } else if (token === "stSOL") {
          mintAddress = stSOLMint;
        } else if (token === "UXD") {
          mintAddress = UXDMint;
        } else if (token === "SRM") {
          mintAddress = SRMMint;
        } else if (token === "SLND") {
          mintAddress = SLNDMint;
        } else if (token === "GMT") {
          mintAddress = GMTMint;
        } else if (token === "SAMO") {
          mintAddress = SAMOMint;
        }

        const res = await connection.getTokenAccountsByOwner(publicKey, {
          mint: mintAddress,
        });

        if (res.value.length === 0) {
          BalList.push({
            bal: 0,
            symbol: token,
          });
        } else {
          const balance = await connection.getParsedAccountInfo(
            new anchor.web3.PublicKey(res.value[0].pubkey.toString())
          );
          if (balance && balance.value) {
            BalList.push({
              bal: balance.value.data.parsed.info.tokenAmount.uiAmount,
              symbol: token,
            });
          }
        }
      }
    } catch (error) {
      BalList.push({
        bal: 0,
        symbol: token,
      });
    }
  });

  return BalList;
};
