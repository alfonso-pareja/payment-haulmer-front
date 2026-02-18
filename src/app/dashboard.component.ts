import {
  Component,
  ViewChild,
} from '@angular/core';

import { PaymentFormComponent } from './features/payment/components/payment-form/payment-form.component';
import { TransactionTableComponent } from './features/transactions/components/transaction-table/transaction-table.component';
import { NotificationToastComponent } from './shared/components/notification/notification-toast.component';
import { PaymentResultModalComponent } from './shared/components/payment-result-modal/payment-result-modal.component';
import { Transaction } from '@core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PaymentFormComponent,
    TransactionTableComponent,
    NotificationToastComponent,
    PaymentResultModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('txTable') private transactionTable?: TransactionTableComponent;

  readonly currentYear = new Date().getFullYear();

  onPaymentProcessed(_transaction: Transaction): void {
    this.transactionTable?.loadData(1);
  }
}
