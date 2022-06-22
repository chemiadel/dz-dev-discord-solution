import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

//redux
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <div className="container max-w-4xl mx-auto px-8 py-10">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
