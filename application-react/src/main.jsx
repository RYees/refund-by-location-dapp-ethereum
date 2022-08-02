import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </BrowserRouter>
);

