import React from "react";
import MarketingToggle from "./MarketingToggle";
import DirectMessageToggle from "./DirectMessageToggle";
import {
  NotifiEmailInput,
  NotifiFooter,
  NotifiSmsInput,
  useNotifiSubscribe,
} from "@notifi-network/notifi-react-card";

const NotifiCardContents = () => {
  const { loading, subscribe } = useNotifiSubscribe();

  return (
    <>
      <NotifiEmailInput disabled={loading} style={{ fontSize: "3rem" }} />
      <NotifiSmsInput disabled={loading} />
      <MarketingToggle disabled={loading} />
      <DirectMessageToggle disabled={loading} />
      <button
        disabled={loading}
        type="submit"
        onClick={async () => {
          await subscribe();
        }}
      >
        Subscribe
      </button>
      <NotifiFooter />
    </>
  );
};

export default NotifiCardContents;
