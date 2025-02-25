import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Create Redux store with middleware and DevTools
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevent Redux Toolkit warnings about non-serializable state
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for easier Redux usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
