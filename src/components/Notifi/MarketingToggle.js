import {
  broadcastMessageConfiguration,
  useNotifiSubscriptionContext,
} from "@notifi-network/notifi-react-card";
import React, { useEffect, useState } from "react";

const ALERT_NAME = "My Marketing Updates";
const ALERT_CONFIGURATION = broadcastMessageConfiguration({
  topicName: `TALK_TO_NOTIFI_TO_GET_THIS_VALUE`,
});

const MarketingToggle = ({ disabled }) => {
  const [enabled, setEnabled] = useState(false);
  const { setAlertConfiguration } = useNotifiSubscriptionContext();

  useEffect(() => {
    if (enabled) {
      setAlertConfiguration(ALERT_NAME, ALERT_CONFIGURATION);
    } else {
      setAlertConfiguration(ALERT_NAME, null);
    }
  }, [enabled]);

  return (
    <div>
      <span>Sign up for Marketing alerts</span>
      <input
        disabled={disabled}
        type="checkbox"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked);
        }}
      />
    </div>
  );
};

export default MarketingToggle;
