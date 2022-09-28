import React from "react";
import { LPFarmingItems } from "assets/registry/LPFarmingRegistry";
import Image from "Layout/Image";

const HeadersList = ["Pools", "Total Staked", "Reward APR"];

const Table = () => {
  return (
    <div className="row mt-4 LPFarming_table_section pb-3">
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
              {LPFarmingItems.map((list, ind) => {
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
