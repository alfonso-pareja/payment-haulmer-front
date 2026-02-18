import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PaymentApiService } from '@core/services/payment-api.service';
import { TransactionStateService } from '@core/services/transaction-state.service';
import { PaginationParams } from '@core/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionFacadeService {
  private readonly api   = inject(PaymentApiService);
  private readonly state = inject(TransactionStateService);

  async loadTransactions(params: PaginationParams = { page: 1 }): Promise<void> {
    this.state.isLoading.set(true);
    this.state.error.set(null);
    try {
      const response = await firstValueFrom(this.api.getTransactionHistory(params));
      this.state.setPage(response.data, response.meta);
    } catch {
      this.state.error.set('No se pudo cargar el historial.');
      this.state.isLoading.set(false);
    }
  }
}
