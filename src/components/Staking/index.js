import React, { useEffect } from "react";
import Tabs from "./Tabs";
import StakingWrapper from "styles/Staking.style";
import { useWallet } from "@solana/wallet-adapter-react";
import Overview from "./Overview";
import { useCrypto } from "contexts/CryptoContext";
import { useContractSnackbar } from "contexts/ContractSnackbarContext";
import { useGlobal } from "contexts/GlobalContext";

const Staking = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const { lpfi_Info, lpfi_user_Info, handle_lpfi_info, handle_lpfi_user_info } =
    useGlobal();
  const { PriceHandler, BalanceHandler } = useCrypto();
  const { OpenContractSnackbar, ContractSnackbarType } = useContractSnackbar();

  useEffect(() => {
    if (ContractSnackbarType === "Success") {
      handle_lpfi_info();
      handle_lpfi_user_info();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContractSnackbarType]);

  return (
    <>
      <StakingWrapper>
        <div className="container Staking">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-center flex-column">
              <div className="Staking_title text-center">
                <h1>LPFi Staking</h1>
              </div>
              <div className="Staking_subtitle text-center">
                <p>Stake LPFi to earn protocol fees</p>
              </div>
            </div>
          </div>
          <Overview {...{ lpfi_Info }} />
          <Tabs
            {...{
              wallet,
              PriceHandler,
              BalanceHandler,
              publicKey,
              OpenContractSnackbar,
              lpfi_user_Info,
            }}
          />
        </div>
      </StakingWrapper>
    </>
  );
};

export default Staking;
