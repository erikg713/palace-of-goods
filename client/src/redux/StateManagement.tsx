import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Ensure correct import of Redux store

interface StateManagementProps {
  children: React.ReactNode;
}

const StateManagement: React.FC<StateManagementProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StateManagement;import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript types for cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define TypeScript type for cart state
interface CartState {
  items: CartItem[];
}

// Load initial cart state from localStorage
const loadCartFromLocalStorage = (): CartState => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return { items: [] };
  }
};

// Save cart state to localStorage
const saveCartToLocalStorage = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state); // Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state); // Save to localStorage
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state); // Save to localStorage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;Here are some suggestions to improve the `store.ts` file:

- **Type Safety**: Ensure that the middleware modification is typed correctly.
- **Error Handling**: Add error handling mechanisms where applicable.
- **Comments**: Improve comments to provide more clarity.

Here's an improved version:

```typescript
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
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
    }) as MiddlewareArray, // Ensure type safety
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development
});

// Define RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for easier Redux usage in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
```

These changes ensure better type safety and make the code easier to understand and maintain.
