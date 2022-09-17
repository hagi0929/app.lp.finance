import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ModeProvider from "./assets/theme";
import App from "./App";
import { ClusterProvider } from "contexts/ClusterContext";
import { SnackbarProvider } from "contexts/SnackbarContext";
import { ContractSnackbarProvider } from "contexts/ContractSnackbarContext";
import Snackbar from "components/globalComponents/Snackbar";
import ContractSnackbar from "components/globalComponents/ContractSnackbar";

ReactDOM.render(
  <React.StrictMode>
    <ClusterProvider>
      <SnackbarProvider>
        <ContractSnackbarProvider>
          <ModeProvider>
            <Snackbar />
            <ContractSnackbar />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModeProvider>
        </ContractSnackbarProvider>
      </SnackbarProvider>
    </ClusterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
