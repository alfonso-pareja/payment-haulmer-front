export type TransactionStatus = 'approved' | 'rejected' | 'pending';

export type Currency = 'USD' | 'EUR' | 'CLP' | 'ARS' | 'BRL';

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  card_holder: string;
  cardHolder: string;
  card_number_masked: string;
  cardNumberMasked:string;
  status: TransactionStatus;
  created_at: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface PaginatedTransactionResponse {
  success: boolean;
  data: Transaction[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface PaginationParams {
  page: number;
  perPage?: number;
}
