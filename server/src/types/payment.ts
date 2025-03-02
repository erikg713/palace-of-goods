export interface PiPaymentRequest {
  amount: number;
  userUid: string;
  metadata?: Record<string, any>;
}

export interface PiPaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}
