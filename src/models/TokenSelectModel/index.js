import React, { useEffect, useState, useMemo } from "react";
import TokenSelectWrapper from "./TokenSelect.style";
import Input from "Layout/Form/Input";
import Image from "Layout/Image";
import { CalcFiveDigit } from "helper";
import DataLoader from "components/globalComponents/Loaders/DataLoader";

const generateSearchTerm = (item, searchValue) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const values = `${item.symbol} ${item.name} ${item.address}`.toLowerCase();

  const isMatchingWithSymbol =
    item.symbol.toLowerCase().indexOf(normalizedSearchValue) >= 0;
  const matchingSymbolPercent = isMatchingWithSymbol
    ? normalizedSearchValue.length / item.symbol.length
    : 0;

  return {
    token: item,
    matchingIdx: values.indexOf(normalizedSearchValue),
    matchingSymbolPercent,
  };
};

const startSearch = (items, searchValue) => {
  return items
    .map((item) => generateSearchTerm(item, searchValue))
    .filter((item) => item.matchingIdx >= 0)
    .sort((i1, i2) => i1.matchingIdx - i2.matchingIdx)
    .sort((i1, i2) => i2.matchingSymbolPercent - i1.matchingSymbolPercent)
    .map((item) => item.token);
};

const TokenSelectModel = ({
  isOpen,
  onClose,
  sortedTokenMints,
  onTokenSelect,
  PriceList,
  BalanceList,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const tokenInfos = useMemo(() => {
    if (
      sortedTokenMints?.length > 0 &&
      PriceList?.length > 0 &&
      BalanceList?.length > 0
    ) {
      const filteredTokens = sortedTokenMints.filter((token) => {
        return !token?.name || !token?.symbol ? false : true;
      });

      let newList = [];
      for (var i = 0; i < filteredTokens?.length; i++) {
        for (var j = 0; j < PriceList?.length; j++) {
          for (let k = 0; k < BalanceList.length; k++) {
            if (
              filteredTokens[i].symbol === PriceList[j].symbol &&
              filteredTokens[i].symbol === BalanceList[k].symbol
            ) {
              newList.push({
                ...filteredTokens[i],
                price: PriceList[j].price,
                bal: BalanceList[k].bal,
              });
            }
          }
        }
      }

      let shortList = newList?.sort((a, b) => b.price - a.price);
      return shortList;
    } else {
      return [];
    }
  }, [BalanceList, PriceList, sortedTokenMints]);

  const CloseCoinModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const Select = (token) => {
    onTokenSelect(token);
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleUpdateSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortedTokens = search ? startSearch(tokenInfos, search) : tokenInfos;

  return (
    <TokenSelectWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid Coin_section">
            <div className="row Coin_top_Section pb-2">
              <div className="col-12 d-flex justify-content-center align-items-center title_section">
                <p>Select Token</p>
                <i className="zmdi zmdi-close" onClick={CloseCoinModel} />
              </div>
            </div>
            <div className="row Coin_bottom_Section mt-4">
              <div className="col-12">
                <div className="search_box">
                  <Input
                    type="text"
                    placeholder="Search by token or address"
                    autoFocus
                    value={search}
                    onChange={handleUpdateSearch}
                    active={3}
                    p="0.8rem 1.5rem"
                    br="15px"
                  />
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="token_list">
                  <div className="row" id="token_list">
                    {sortedTokens?.length > 0 ? (
                      <>
                        {sortedTokens?.map((token) => {
                          return (
                            <div
                              className="col-12"
                              key={token.address}
                              id="tokens"
                            >
                              <div
                                className="details"
                                onClick={() => Select(token)}
                              >
                                <div className="row">
                                  <div className="col-7 d-flex align-items-center">
                                    <Image
                                      src={token?.logoURI}
                                      alt={token?.name}
                                      h="2rem"
                                      w="2rem"
                                    />

                                    <div className="ml-3 details_name d-flex flex-column">
                                      <p>{token?.symbol}</p>
                                      <span>{token?.name}</span>
                                      <span>
                                        ${CalcFiveDigit(token?.price)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-5">
                                    <div className="d-flex align-items-start justify-content-end">
                                      <p>{CalcFiveDigit(token.bal)}</p>
                                      <span className="pl-1">
                                        {token.symbol}
                                      </span>
                                    </div>
                                    <div className="ml-2 details_name d-flex flex-column justify-content-end">
                                      <span className="d-flex justify-content-end">
                                        $
                                        {CalcFiveDigit(token.price * token.bal)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="col-12 d-flex justify-content-center">
                        <DataLoader h="200px" size="2rem" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenSelectWrapper>
  );
};

export default TokenSelectModel;
