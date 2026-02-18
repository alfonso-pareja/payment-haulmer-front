import { Injectable, signal, computed } from '@angular/core';
import { Transaction, PaginationMeta } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionStateService {
  readonly transactions = signal<Transaction[]>([]);
  readonly isLoading    = signal(false);
  readonly error        = signal<string | null>(null);
  readonly pagination   = signal<PaginationMeta | null>(null);
  readonly lastProcessed = signal<Transaction | null>(null);

  setPage(transactions: Transaction[], meta: PaginationMeta): void {
    this.transactions.set(transactions);
    this.pagination.set(meta);
    this.error.set(null);
    this.isLoading.set(false);
  }

  reset(): void {
    this.transactions.set([]);
    this.pagination.set(null);
    this.error.set(null);
    this.isLoading.set(false);
    this.lastProcessed.set(null);
  }
}
