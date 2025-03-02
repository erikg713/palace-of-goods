export interface Product {
  id: number; // Unique product identifier
  name: string;
  description: string;
  price: number;
  images: string[]; // Changed to an array to support multiple images
  stock: number; // Tracks available stock
  category?: string; // Optional category field
  createdAt?: string; // Optional timestamp for product creation
  updatedAt?: string; // Optional timestamp for last update
}
