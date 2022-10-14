import React, { useEffect } from "react";
import Tabs from "./Tabs";
import LPIncentivesWrapper from "styles/LPIncentives.style";
import { useWallet } from "@solana/wallet-adapter-react";
import Table from "./Table";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";
import { useGlobal } from "contexts/GlobalContext";
import { useCrypto } from "contexts/CryptoContext";
// import { get_config_info } from "utils/lpIncentives";

const LPIncentives = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { OpenContractSnackbar, ContractSnackbarType } = useContractSnackbar();

  const { nLPUserInfo, nLPInfo, handle_nlp_user_info, handle_nlp_Info } =
    useGlobal();
  const { BalanceHandler } = useCrypto();

  useEffect(() => {
    if (ContractSnackbarType === "Success") {
      handle_nlp_user_info();
      handle_nlp_Info();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContractSnackbarType]);

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
              BalanceHandler,
            }}
          />
        </div>
      </LPIncentivesWrapper>
    </>
  );
};

export default LPIncentives;
