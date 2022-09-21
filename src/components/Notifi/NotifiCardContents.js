import React, { useState, useEffect } from "react";
import useNotifiSubscribe from "hooks/useNotifiSubscribe";
import { useNotifi } from "contexts/NotifiContext";
import { directMessageConfiguration } from "utils";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";
import WalletButton from "components/globalComponents/WalletButton";

const ALERT_NAME = "LP_FINANCE_NOTIFI";
const ALERT_CONFIGURATION = directMessageConfiguration({
  type: "LIQUIDATION_ALERT",
});

const NotifiCardContents = ({ OpenSnackbar, publicKey }) => {
  const { loading, subscribe } = useNotifiSubscribe();
  const { email, setEmail, setAlertConfiguration } = useNotifi();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      setAlertConfiguration(ALERT_NAME, ALERT_CONFIGURATION);
    } else {
      setAlertConfiguration(ALERT_NAME, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <div className="row d-flex justify-content-center notifi_section ">
      <div className="col-lg-11 col-12 form_card">
        <div className="row">
          <div className="col-12 form_filed mt-3">
            <i className="zmdi zmdi-email" />
            <Input
              active={2}
              p="0.7rem 0.5rem 0.7rem 2.5rem"
              br="10px"
              size="0.92rem"
              disabled={loading}
              name="notifi-email"
              autoComplete="off"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value ?? "");
              }}
              placeholder="Email address"
            />
          </div>

          <div className="col-12 form_filed d-flex align-items-center">
            <div className="pl-3 d-flex align-items-center">
              <p className="check_title">Notification alerts</p>
              <input
                disabled={loading}
                type="checkbox"
                checked={enabled}
                className="pl-2"
                onChange={(e) => {
                  setEnabled(e.target.checked);
                }}
              />
            </div>
          </div>
          <div className="col-12 mt-4 pt-2">
            {!publicKey ? (
              <WalletButton br="10px" fw="400" active={1} />
            ) : (
              <Button
                active={1}
                p="0.5rem 1rem"
                br="10px"
                disabled={loading}
                type="submit"
                onClick={async () => {
                  if (enabled && publicKey && email) {
                    await subscribe(OpenSnackbar);
                  }
                }}
                className={
                  publicKey ? (loading ? "not-allowed" : null) : "not-allowed"
                }
              >
                {loading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <p
                      style={{
                        color: "#0f0",
                        fontSize: "1.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                        marginTop: "0px",
                      }}
                    >
                      <i className="zmdi zmdi-rotate-left zmdi-hc-spin-reverse"></i>
                    </p>
                  </div>
                ) : (
                  "Subscribe"
                )}
              </Button>
            )}
          </div>

          <div className="col-12 mt-4">
            <div className="row notify_footer pt-2">
              <div className="col-8 d-flex align-items-center">
                <p>Powered by</p>
                <Image
                  src="/images/notifi.png"
                  loading="notifi"
                  className="px-2"
                />
                <p>notifi</p>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-end">
                <span>
                  <a
                    href="https://notifi.network/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifiCardContents;
