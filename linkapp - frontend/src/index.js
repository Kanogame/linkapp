import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render( //вызов render
  <App />
)