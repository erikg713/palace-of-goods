import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { PaymentProvider } from "./context/PaymentContext";
import StateManagement from "./redux/StateManagement";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StateManagement>
      <UserProvider>
        <PaymentProvider>
          <App />
        </PaymentProvider>
      </UserProvider>
    </StateManagement>
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
