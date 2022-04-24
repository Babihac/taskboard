import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./languageContext/Provider";
ReactDOM.render(
  <Provider store={store}>
    <LanguageProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </LanguageProvider>
  </Provider>,
  document.getElementById("root")
);
