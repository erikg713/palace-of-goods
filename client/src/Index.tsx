import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initializePi } from "./utils/pi";
import { UserProvider } from "./context/UserContext";
import { PaymentProvider } from "./context/PaymentContext";
import AuthProvider from "./context/AuthContext";
import StateManagement from "./redux/StateManagement";
import "./styles/global.css";

// Combine multiple providers into a single RootProvider to reduce nesting
const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    initializePi(); // Initialize Pi Network SDK
  }, []);

  return (
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
};

// Ensure the root element exists
const container = document.getElementById("root");
if (!container) {
  throw new Error("❌ The root element #root was not found in the document.");
}

const root = ReactDOM.createRoot(container);
root.render(
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
      .register("/service-worker.js") // Ensure correct service worker file
      .then((registration) => {
        console.log("✅ Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
});
