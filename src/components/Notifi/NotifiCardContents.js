import React, { useState, useEffect } from "react";
import useNotifiSubscribe from "hooks/useNotifiSubscribe";
import { useNotifi } from "contexts/NotifiContext";
import { directMessageConfiguration } from "utils";
import Input from "Layout/Form/Input";
import Button from "Layout/Button";
import Image from "Layout/Image";

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
            <Input
              active={2}
              p="0.5rem 1rem"
              br="8px"
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

          <div className="col-12 mt-2 form_filed d-flex align-items-center">
            <div className="pl-3 d-flex align-items-center">
              <p className="pt-2">Notification alerts</p>
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
          <div className="col-12 mt-4 form_filed">
            <Button
              active={1}
              p="0.5rem 1rem"
              br="50px"
              disabled={loading}
              type="submit"
              onClick={async () => {
                if (enabled && publicKey) {
                  await subscribe(OpenSnackbar);
                }
              }}
              className={
                publicKey ? (loading ? "not-allowed" : null) : "not-allowed"
              }
            >
              {publicKey ? (
                <>
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
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
          <div className="col-12 mt-3 notify_footer">
            <div className="d-flex align-items-center justify-content-center">
              <p>Powered by</p>
              <Image
                src="/images/notifi.png"
                loading="notifi"
                className="pl-2"
              />
              <p className="mx-2">notifi</p>
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
  );
};

export default NotifiCardContents;
