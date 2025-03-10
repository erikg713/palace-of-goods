Here are some suggestions to improve the `Index.tsx` file:

1. **Remove Duplicate Imports**:
   - There are duplicate import statements for React, ReactDOM, and App. Remove the duplicates to clean up the code.
   ```tsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import App from "./App";
   ```

2. **Combine Context Providers**:
   - You have multiple context providers. You can combine them into a single provider component to reduce nesting and improve readability.
   ```tsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import { BrowserRouter } from "react-router-dom";
   import App from "./App";
   import { UserProvider } from "./context/UserContext";
   import { PaymentProvider } from "./context/PaymentContext";
   import AuthProvider from "./context/AuthContext";
   import StateManagement from "./redux/StateManagement";
   import "./styles/global.css";

   const RootProvider = ({ children }) => (
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

   ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
       <BrowserRouter>
         <RootProvider>
           <App />
         </RootProvider>
       </BrowserRouter>
     </React.StrictMode>
   );

   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker
         .register('/service-worker.ts')
         .then((registration) => {
           console.log('Service Worker registered with scope:', registration.scope);
         })
         .catch((error) => {
           console.error('Service Worker registration failed:', error);
         });
     });
   }
   ```

3. **Remove Duplicate Render Calls**:
   - There are two separate render calls to `ReactDOM.createRoot`. Combine them into one to avoid redundancy.
   ```tsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import App from "./App";
   import { UserProvider } from "./context/UserContext";
   import { PaymentProvider } from "./context/PaymentContext";
   import AuthProvider from "./context/AuthContext";
   import StateManagement from "./redux/StateManagement";
   import { BrowserRouter } from "react-router-dom";
   import "./styles/global.css";

   const RootProvider = ({ children }) => (
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

   ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
       <BrowserRouter>
         <RootProvider>
           <App />
         </RootProvider>
       </BrowserRouter>
     </React.StrictMode>
   );

   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker
         .register('/service-worker.ts')
         .then((registration) => {
           console.log('Service Worker registered with scope:', registration.scope);
         })
         .catch((error) => {
           console.error('Service Worker registration failed:', error);
         });
     });
   }
