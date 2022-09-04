import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ModeProvider from "./assets/theme";
import store from "Redux/store";
import SnackbarProviderMessage from "components/globalComponents/SnackbarProviderMessage";
import CustomizedSnackbar from "components/globalComponents/CustomizedSnackbar";
import WalletWrapper from "utils/WalletWrapper";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <Provider store={store}>
          <SnackbarProviderMessage>
            <CustomizedSnackbar />
            <WalletWrapper>
              <App />
            </WalletWrapper>
          </SnackbarProviderMessage>
        </Provider>
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
