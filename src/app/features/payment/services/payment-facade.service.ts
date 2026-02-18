import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PaymentApiService } from '@core/services/payment-api.service';
import { TransactionStateService } from '@core/services/transaction-state.service';
import { PaymentResultService } from '@shared/components/payment-result-modal/payment-result.service';
import { PaymentRequest, PaymentResponse } from '@core/models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentFacadeService {
  private readonly api    = inject(PaymentApiService);
  private readonly state  = inject(TransactionStateService);
  private readonly modal  = inject(PaymentResultService);

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    this.modal.startProcessing();
    this.state.isLoading.set(true);

    try {
      const response = await firstValueFrom(this.api.processPayment(request));
      this.state.isLoading.set(false);
      this.modal.showResult(response.data);

      return response;
    } catch (error) {
      this.state.isLoading.set(false);
      this.modal.close();
      throw error;
    }

  }
}
