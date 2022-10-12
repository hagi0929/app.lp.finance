import React from "react";
import Tabs from "./Tabs";
import LPIncentivesWrapper from "styles/LPIncentives.style";
import { useWallet } from "@solana/wallet-adapter-react";
import Table from "./Table";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";
import { useGlobal } from "contexts/GlobalContext";
// import { get_config_info } from "utils/lpIncentives";

const LPIncentives = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { OpenContractSnackbar } = useContractSnackbar();
  const { nLPUserInfo, nLPInfo } = useGlobal();

  // useEffect(() => {
  //   get_config_info(wallet);
  // }, []);

  return (
    <>
      <LPIncentivesWrapper>
        <div className="container LPIncentives">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="LPIncentives_title text-center">
                <h1>LP Incentives</h1>
              </div>
              <div className="LPIncentives_subtitle text-center">
                <p>Provide Liquidity to earn rewards</p>
              </div>
            </div>
          </div>
          <Table {...{ nLPInfo }} />
          <Tabs
            {...{
              publicKey,
              wallet,
              OpenContractSnackbar,
              nLPUserInfo,
            }}
          />
        </div>
      </LPIncentivesWrapper>
    </>
  );
};

export default LPIncentives;
