import React, { useEffect, memo, useState, useMemo } from "react";
import TokenWrapper from "./TokenModel.style";
import Input from "Layout/Form/Input";
import Image from "Layout/Image";
import { CalcFiveDigit } from "helper";

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

const TokenModel = ({ isOpen, isClose, List, setSelected, PriceList }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const tokenInfos = useMemo(() => {
    if (List?.length > 0 && PriceList?.length > 0) {
      let newList = [];
      for (var i = 0; i < List?.length; i++) {
        for (var j = 0; j < PriceList?.length; j++) {
          if (List[i].symbol === PriceList[j].symbol) {
            newList.push({
              ...List[i],
              price: PriceList[j].price,
            });
          }
        }
      }

      return newList;
    } else {
      return [];
    }
  }, [List, PriceList]);

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  const Select = ({ logoURI, symbol }) => {
    setSelected({
      logoURI,
      symbol,
    });
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  const sortedTokens = search ? startSearch(tokenInfos, search) : tokenInfos;

  return (
    <TokenWrapper>
      <div className="popup">
        <div className="popup-container">
          <div className="container-fluid Coin_section">
            <div className="row Coin_top_Section pb-2">
              <div className="col-12 d-flex justify-content-center align-items-center title_section">
                <p>Select Token</p>
                <i className="zmdi zmdi-close" onClick={CloseModel} />
              </div>
            </div>
            <div className="row Coin_bottom_Section mt-4">
              <div className="col-12">
                <div className="search_box">
                  <Input
                    type="text"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                    id="myInput"
                    placeholder="Search by token or address"
                    active={3}
                    p="0.8rem 1.5rem"
                    br="15px"
                  />
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="token_list">
                  <div className="row" id="token_list">
                    {sortedTokens?.map((item, ind) => {
                      return (
                        <div className="col-12" key={ind} id="tokens">
                          <div className="details" onClick={() => Select(item)}>
                            <div className="row">
                              <div className="col-7 d-flex align-items-center">
                                <Image
                                  src={item.logoURI}
                                  alt={item.name}
                                  h="1.9rem"
                                />
                                <div className="ml-3 details_name d-flex flex-column">
                                  <p>{item.symbol}</p>
                                  <span>{item.name}</span>
                                  <span>$ {CalcFiveDigit(item.price)}</span>
                                </div>
                              </div>
                              <div className="col-5 d-flex align-items-start justify-content-end">
                                <p>0.0</p>
                                <div className="ml-2 details_name d-flex flex-column">
                                  <span>{item.symbol}</span>
                                  <span>$ 0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenWrapper>
  );
};

export default memo(TokenModel);
