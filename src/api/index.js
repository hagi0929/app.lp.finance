const BaseUrl = "https://www.mainnet-api.lp.finance/api";

const api = {
  price: "https://price.jup.ag/v1/price",
  getTreasuryData: BaseUrl + "/global/getTreasuryData",
  getCbsOverviewData: BaseUrl + "/global/getCbsOverviewData",
  storeSwapSize: BaseUrl + "/global/storeSwapSize",
  getDaySwapSize: BaseUrl + "/global/getDaySwapSize",
  storeCbsDeposit: BaseUrl + "/global/storeCbsDeposit",
  getCbsDeposited: BaseUrl + "/global/getCbsDeposited",
  storeCbsBorrow: BaseUrl + "/global/storeCbsBorrow",
  getCbsBorrowed: BaseUrl + "/global/getCbsBorrowed",
};

export default api;
