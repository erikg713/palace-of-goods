export interface PiUser {
  uid: string;
  username: string;
}

export interface PiPayment {
  identifier: string;
  amount: number;
  memo: string;
  metadata: object;
  status: "pending" | "approved" | "completed" | "failed";
}
