import { Currency, Transaction } from './transaction.model';

export interface PaymentRequest {
  amount: number;
  currency: Currency;
  cardNumber: string;
  cardHolder: string;
}

export interface PaymentResponse {
  data: Transaction;
  status: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
