export interface PiUser {
  uid: string; // Unique user ID
  username: string; // Pi Network username
}

export type PiPaymentStatus = "pending" | "approved" | "completed" | "failed";

export interface PiPayment {
  identifier: string; // Unique payment identifier
  amount: number; // Payment amount
  currency: "PI" | "USD" | "EUR" | string; // Currency used (default to PI)
  memo: string; // Payment memo/description
  metadata: { [key: string]: any }; // Custom metadata for the transaction
  status: PiPaymentStatus; // Payment status
}

export interface PiUser {
  uid: string; // Unique user ID
  username: string; // Pi Network username
}
