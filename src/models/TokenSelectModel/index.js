import React, { useEffect, useState, useMemo } from "react";
import TokenSelectWrapper from "./TokenSelect.style";
import Input from "Layout/Form/Input";
import Image from "Layout/Image";

const generateSearchTerm = (item, searchValue) => {
  const normalizedSearchValue = searchValue.toLowerCase();
  const values = `${item.symbol} ${item.name}`.toLowerCase();

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
  walletTokens,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

  const tokenInfos = useMemo(() => {
    if (sortedTokenMints?.length) {
      const filteredTokens = sortedTokenMints.filter((token) => {
        return !token?.name || !token?.symbol ? false : true;
      });
      if (walletTokens?.length) {
        const walletMints = walletTokens.map((tok) =>
          tok.account.mint.toString()
        );
        return filteredTokens.sort(
          (a, b) =>
            walletMints.indexOf(b.address) - walletMints.indexOf(a.address)
        );
      } else {
        return filteredTokens;
      }
    } else {
      return [];
    }
  }, [sortedTokenMints, walletTokens]);

  const CloseCoinModel = () => {
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
              <div className="col-12 d-flex justify-content-end align-items-center title_section">
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
                    {sortedTokens?.map((token) => {
                      return (
                        <div className="col-12" key={token.address} id="tokens">
                          <div
                            className="details"
                            onClick={() => onTokenSelect(token)}
                          >
                            <div className="row">
                              <div className="col-10 d-flex align-items-center">
                                <Image
                                  src={token?.logoURI}
                                  alt={token?.name}
                                  h="1.9rem"
                                />

                                <div className="ml-3 details_name">
                                  <p>{token?.symbol}</p>
                                  <span>{token?.name}</span>
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
    </TokenSelectWrapper>
  );
};

export default TokenSelectModel;
