const BaseUrl = "https://www.mainnet-api.lp.finance/api";

const api = {
  price: "https://price.jup.ag/v1/price",
  getTreasuryData: BaseUrl + "/global/getTreasuryData",
  getCbsOverviewData: BaseUrl + "/global/getCbsOverviewData",
  storeSwapSize: BaseUrl + "/global/storeSwapSize",
  getDaySwapSize: BaseUrl + "/global/getDaySwapSize",
};

export default api;
