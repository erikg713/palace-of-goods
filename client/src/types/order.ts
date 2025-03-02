export interface Order {
  id: number; // Unique order ID
  userId: number; // Follow camelCase for consistency
  items: OrderItem[]; // Array of purchased products
  amount: number; // Total amount paid
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; // Added "Pending" & "Cancelled"
  createdAt: string; // Use camelCase for timestamps
  updatedAt?: string; // Optional field for tracking status updates
}

// OrderItem interface for better structure
export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}
