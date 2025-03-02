export interface Order {
  id: string;
  userId: string;
  products: Array<{ productId: string; quantity: number }>;
  totalAmount: number;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
}
