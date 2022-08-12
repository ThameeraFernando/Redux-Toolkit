import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
