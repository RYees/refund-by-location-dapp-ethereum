// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

// ReactDOM.render(
//   <TransactionsProvider>
//     <App />
//   </TransactionsProvider>,
//   document.getElementById("root"),
// );

import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

