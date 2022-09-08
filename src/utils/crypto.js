import axios from "axios";
import api from "api";
import { TokenPriceRegistry } from "assets/registry";

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
