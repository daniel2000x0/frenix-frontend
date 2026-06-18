export interface CreatePaymentDto {
  orderid: number;
  amount: number;
  currency: string;
  provider: string;
  payment_method: string;
}
