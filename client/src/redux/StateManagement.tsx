import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Ensure correct import of Redux store

interface StateManagementProps {
  children: React.ReactNode;
}

const StateManagement: React.FC<StateManagementProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StateManagement;
