import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StateManagement from "./redux/StateManagement";
import { AuthProvider } from "./context/AuthContext";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StateManagement>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StateManagement>
  </React.StrictMode>
);
