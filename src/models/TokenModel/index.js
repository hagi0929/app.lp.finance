import React, { useEffect, memo } from "react";
import TokenWrapper from "./TokenModel.style";

const TokenModel = ({ isOpen, isClose, List, setSelected }) => {
  const FilterFunction = () => {
    var input, filter, i, li, div, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("token_list");
    li = div.getElementsByTagName("div");
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const CloseModel = () => {
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  const Select = ({ img, name }) => {
    setSelected({
      img: img,
      name: name,
    });
    document.querySelector(".popup").classList.remove("active");
    setTimeout(() => {
      isClose();
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector(".popup").classList.add("active");
    }
  }, [isOpen]);

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
                  <input
                    type="text"
                    name="search"
                    autoComplete="off"
                    id="myInput"
                    placeholder="Search name"
                    onKeyUp={() => FilterFunction()}
                  />
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="token_list">
                  <div className="row" id="token_list">
                    {List?.map((item, ind) => {
                      return (
                        <div className="col-12" key={ind} id="tokens">
                          <div className="details" onClick={() => Select(item)}>
                            <div className="row">
                              <div className="col-7 d-flex align-items-center">
                                <img src={item.img} alt="" loading="lazy" />
                                <div className="ml-3 details_name d-flex flex-column">
                                  <p>{item.name}</p>
                                  <span>{item.fullName}</span>
                                  <span>$ 0</span>
                                </div>
                              </div>
                              <div className="col-5 d-flex align-items-start justify-content-end">
                                <p>0.0</p>
                                <div className="ml-2 details_name d-flex flex-column">
                                  <span>{item.name}</span>
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
