export interface Payment {
  paymentId: number;
  orderid: number;
  amount: number;
  currency: string;
  provider: string;
  status: string;
  transaction_id: string;
  payment_method: string;
}
