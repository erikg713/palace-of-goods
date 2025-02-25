import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { items: [] };
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
      localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
