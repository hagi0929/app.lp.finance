import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ModeProvider from "./assets/theme";
import store from "Redux/store";
import SnackbarProviderMessage from "components/globalComponents/SnackbarProviderMessage";
import CustomizedSnackbar from "components/globalComponents/CustomizedSnackbar";
import App from "./App";
import { ClusterProvider } from "contexts/ClusterContext";

ReactDOM.render(
  <React.StrictMode>
    <ClusterProvider>
      <ModeProvider>
        <Provider store={store}>
          <SnackbarProviderMessage>
            <CustomizedSnackbar />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProviderMessage>
        </Provider>
      </ModeProvider>
    </ClusterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
