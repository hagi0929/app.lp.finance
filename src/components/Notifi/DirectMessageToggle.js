import React, { useEffect, useState } from "react";
import {
  directMessageConfiguration,
  useNotifiSubscriptionContext,
} from "@notifi-network/notifi-react-card";

const ALERT_NAME = "Direct Messages To My Wallet";
const ALERT_CONFIGURATION = directMessageConfiguration();

const DirectMessageToggle = ({ disabled }) => {
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
      <span>Sign up for Direct Messages</span>
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

export default DirectMessageToggle;
