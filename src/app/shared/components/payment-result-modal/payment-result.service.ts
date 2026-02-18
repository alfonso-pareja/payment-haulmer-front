import { Injectable, signal } from '@angular/core';
import { Transaction } from '@core/models/transaction.model';

export interface PaymentResultState {
  isOpen: boolean;
  transaction: Transaction | null;
  isProcessing: boolean;
}

@Injectable({ providedIn: 'root' })
export class PaymentResultService {
  readonly state = signal<PaymentResultState>({
    isOpen: false,
    transaction: null,
    isProcessing: false,
  });

  startProcessing(): void {
    this.state.set({ isOpen: true, transaction: null, isProcessing: true });
  }

  showResult(transaction: Transaction): void {
    this.state.set({ isOpen: true, transaction, isProcessing: false });
  }

  close(): void {
    this.state.set({ isOpen: false, transaction: null, isProcessing: false });
  }
}
