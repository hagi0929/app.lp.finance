import * as anchor from "@project-serum/anchor";
import axios from "axios";
import api from "api";
import { TokenPriceRegistry } from "assets/registry";
import { getMint } from "constants/global";

export const getTokenPrice = async () => {
  try {
    const PriceList = [];
    let PriceListObj = {};

    for (let i = 0; i < TokenPriceRegistry.length; i++) {
      var symbol = TokenPriceRegistry[i];
      let response;
      if (symbol === "zSOL") {
        response = await axios.get(`${api.price}?id=SOL`);
      } else if (symbol === "LPFi") {
        response = {
          status: 200,
          data: {
            data: {
              price: 0.05,
            },
          },
        };
      } else {
        response = await axios.get(`${api.price}?id=${symbol}`);
      }

      if (response.status === 200) {
        const { price } = response.data.data;
        PriceList.push({ price, symbol });
        PriceListObj = {
          ...PriceListObj,
          [symbol]: price,
        };
      } else {
        PriceList.push({ price: 0, symbol });
        PriceListObj = {
          ...PriceListObj,
          [symbol]: 0,
        };
      }
    }
    return {
      PriceList,
      PriceListObj,
    };
  } catch (error) {}
};

export const getBalance = async (token, publicKey, connection) => {
  try {
    if (token === "SOL") {
      if (publicKey) {
        const bal = await connection.getBalance(publicKey);
        return bal / 1000000000;
      } else {
        return 0.0;
      }
    } else {
      const mintAddress = getMint(token);

      const res = await connection.getTokenAccountsByOwner(publicKey, {
        mint: mintAddress,
      });

      if (res.value.length === 0) {
        return 0.0;
      } else {
        const balance = await connection.getParsedAccountInfo(
          new anchor.web3.PublicKey(res.value[0].pubkey.toString())
        );
        if (balance && balance.value) {
          return balance.value.data.parsed.info.tokenAmount.uiAmount;
        }
      }
    }
  } catch (error) {
    return 0.0;
  }
};
