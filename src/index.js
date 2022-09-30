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
import { CommandProvider } from "contexts/CommandContext";

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <ClusterProvider>
        <SnackbarProvider>
          <ContractSnackbarProvider>
            <CommandProvider>
              <Snackbar />
              <ContractSnackbar />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CommandProvider>
          </ContractSnackbarProvider>
        </SnackbarProvider>
      </ClusterProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
