import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Create Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools in development
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for better Redux usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
