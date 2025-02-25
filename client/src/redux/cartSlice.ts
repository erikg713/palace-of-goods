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
export default cartSlice.reducer;
