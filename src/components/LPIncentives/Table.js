import React, { useMemo, useState } from "react";
import { TokenImgRegistry } from "assets/registry";
import Image from "Layout/Image";
import { numFormatter } from "helper";

const HeadersList = ["Pools", "Total Staked", "Reward APR"];

const Table = ({ nLPInfo }) => {
  const [List, setList] = useState([]);

  useMemo(() => {
    const LPIncentivesItems = [
      {
        id: 1,
        website: "https://lifinity.io/pools",
        Img1: TokenImgRegistry.zSOL,
        Img2: TokenImgRegistry.mSOL,
        name1: "zSOL",
        name2: "mSOL",
        TotalStaked: numFormatter(nLPInfo.total_staked_amount),
        RewardAPR: 0,
        Rewards: [],
      },
    ];
    setList(LPIncentivesItems);
  }, [nLPInfo]);

  return (
    <div className="row mt-4 LPIncentives_table_section pb-3">
      <div className="col-12">
        <div className="table_card">
          <table className="table table-hover">
            <thead>
              <tr>
                {HeadersList.map((head, ind) => {
                  return (
                    <th scope="col" key={ind}>
                      <p>{head}</p>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {List.map((list, ind) => {
                return (
                  <tr key={ind}>
                    <td>
                      <div className="details d-flex align-items-center">
                        <Image src={list.Img1} alt={list.name1} h="2rem" />
                        <Image
                          src={list.Img2}
                          alt={list.name2}
                          h="2rem"
                          w="2rem"
                          className="toggle"
                        />
                        <a
                          href={list.website}
                          className="d-flex align-items-center"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="pl-4">
                            {list.name1}-{list.name2}
                          </div>
                        </a>
                      </div>
                    </td>
                    <td>
                      <p>${list.TotalStaked}</p>
                    </td>
                    <td>
                      <p>{list.RewardAPR}%</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
