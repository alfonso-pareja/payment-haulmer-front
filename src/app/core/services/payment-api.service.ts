import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { API_ENDPOINTS } from '../models/api-endpoints.const';
import { PaymentRequest, PaymentResponse } from '../models/payment.model';
import { PaginatedTransactionResponse, PaginationParams } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  processPayment(request: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.PROCESS}`,
      request
    );
  }

  getTransactionHistory(
    params: PaginationParams = { page: 1 }
  ): Observable<PaginatedTransactionResponse> {
    let httpParams = new HttpParams().set('page', params.page.toString());
    if (params.perPage) {
      httpParams = httpParams.set('per_page', params.perPage.toString());
    }
    return this.http.get<PaginatedTransactionResponse>(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.HISTORY}`,
      { params: httpParams }
    );
  }
}
