import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { PaymentProvider } from "./context/PaymentContext";
import AuthProvider from "./context/AuthContext";
import StateManagement from "./redux/StateManagement";
import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializePi } from "./utils/pi";

initializePi(); // Initialize Pi Network SDK

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
// Combine multiple providers into a single RootProvider to reduce nesting
const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StateManagement>
    <UserProvider>
      <PaymentProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PaymentProvider>
    </UserProvider>
  </StateManagement>
);

const container = document.getElementById("root");
if (!container) {
  throw new Error("The root element was not found in the document.");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootProvider>
        <App />
      </RootProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Service Worker Registration for offline capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.ts")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
