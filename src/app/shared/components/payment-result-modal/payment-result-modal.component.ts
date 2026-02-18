import {
  Component, HostListener, inject,
} from '@angular/core';
import { SlicePipe } from '@angular/common';
import { PaymentResultService } from './payment-result.service';
import { AppCurrencyPipe } from '@shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-payment-result-modal',
  standalone: true,
  imports: [AppCurrencyPipe, SlicePipe],
  templateUrl: './payment-result-modal.component.html',
})
export class PaymentResultModalComponent {
  readonly svc = inject(PaymentResultService);

  @HostListener('document:keydown.escape')
  close(): void { this.svc.close(); }

}
