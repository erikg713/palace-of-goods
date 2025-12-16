export interface Order {
  id: string; // Unique order ID (UUID for better scalability)
  userId: string; // Unique user ID (UUID instead of number)
  items: OrderItem[]; // Array of purchased products
  amount: number; // Total order amount
  currency: string; // Currency code (e.g., "USD", "EUR", "PI")
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; // Order status
  createdAt: Date; // Order creation timestamp
  updatedAt?: Date; // Optional field for tracking last status update
}

// OrderItem interface for better structure
export interface OrderItem {
  productId: string; // UUID for product ID
  name: string; // Product name
  quantity: number; // Number of items purchased
  price: number; // Price per unit
  image?: string; // Optional product image URL
}

export interface Order {
  id: string; // Unique order ID (UUID for better scalability)
  userId: string; // Unique user ID (UUID instead of number)
  items: OrderItem[]; // Array of purchased products
  amount: number; // Total order amount
  currency: string; // Currency code (e.g., "USD", "EUR", "PI")
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; // Order status
  createdAt: Date; // Order creation timestamp
  updatedAt?: Date; // Optional field for tracking last status update
}

// OrderItem interface for better structure
export interface OrderItem {
  productId: string; // UUID for product ID
  name: string; // Product name
  quantity: number; // Number of items purchased
  price: number; // Price per unit
  image?: string; // Optional product image URL
}
