import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const NotifiContext = createContext();

export const NotifiProvider = ({ children, ...params }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramId, setTelegramId] = useState("");
  const [telegramConfirmationUrl, setTelegramConfirmationUrl] =
    useState(undefined);
  const [alerts, setAlerts] = useState({});
  const [useHardwareWallet, setUseHardwareWallet] = useState(false);

  const alertConfigurations = useRef(params.alertConfigurations ?? {});
  const getAlertConfigurations = useCallback(() => {
    return alertConfigurations.current;
  }, []);

  const getAlertConfiguration = useCallback((name) => {
    return alertConfigurations.current[name] ?? null;
  }, []);

  const setAlertConfiguration = useCallback((name, config) => {
    if (config === null) {
      alertConfigurations.current[name] = null;
    } else {
      alertConfigurations.current[name] = config;
    }
  }, []);

  return (
    <NotifiContext.Provider
      value={{
        alerts,
        email,
        params,
        phoneNumber,
        telegramId,
        telegramConfirmationUrl,
        useHardwareWallet,
        getAlertConfiguration,
        getAlertConfigurations,
        setAlerts,
        setAlertConfiguration,
        setEmail,
        setPhoneNumber,
        setTelegramId,
        setTelegramConfirmationUrl,
        setUseHardwareWallet,
      }}
    >
      {children}
    </NotifiContext.Provider>
  );
};

export const useNotifi = () => {
  const data = useContext(NotifiContext);
  return data;
};
