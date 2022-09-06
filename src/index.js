import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import ModeProvider from "./assets/theme";
// import store from "redux/store";
import App from "./App";
import { ClusterProvider } from "contexts/ClusterContext";
import { SnackbarProvider } from "contexts/SnackbarContext";
import Snackbar from "components/globalComponents/Snackbar";

ReactDOM.render(
  <React.StrictMode>
    <ClusterProvider>
      <SnackbarProvider>
        <ModeProvider>
          {/* <Provider store={store}> */}
          <Snackbar />
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </Provider> */}
        </ModeProvider>
      </SnackbarProvider>
    </ClusterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
