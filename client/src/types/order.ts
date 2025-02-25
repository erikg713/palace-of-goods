export interface Order {
  id: number;
  user_id: number;
  amount: number;
  status: "Processing" | "Shipped" | "Delivered";
  created_at: string;
}
