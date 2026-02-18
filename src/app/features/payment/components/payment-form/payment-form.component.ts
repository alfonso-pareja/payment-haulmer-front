import {
  Component, EventEmitter,
  Output, inject, signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PaymentFacadeService } from '../../services/payment-facade.service';
import { PaymentRequest } from '@core/models/payment.model';
import { Currency, Transaction } from '@core/models/transaction.model';
import { formatCardNumber, detectCardBrand, CardBrand } from '@shared/utils/card.utils';

function cardNumberValidator(c: AbstractControl): ValidationErrors | null {
  const v = (c.value as string)?.replace(/\s/g, '') ?? '';
  return v && !/^\d{13,19}$/.test(v) ? { cardNumber: 'Debe tener entre 13 y 19 dígitos.' } : null;
}

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent {
  @Output() paymentProcessed = new EventEmitter<Transaction>();

  private readonly fb      = inject(FormBuilder);
  private readonly facade  = inject(PaymentFacadeService);

  readonly isLoading = signal(false);
  readonly cardBrand = signal<CardBrand>('unknown');
  readonly currencies: Currency[] = ['USD', 'EUR', 'CLP', 'ARS', 'BRL'];

  readonly form = this.fb.group({
    amount:     [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
    currency:   ['USD' as Currency, Validators.required],
    cardHolder: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
    cardNumber: ['', [Validators.required, cardNumberValidator]],
  });

  get amount()     { return this.form.get('amount')!; }
  get currency()   { return this.form.get('currency')!; }
  get cardHolder() { return this.form.get('cardHolder')!; }
  get cardNumber() { return this.form.get('cardNumber')!; }

  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = formatCardNumber(input.value);
    this.cardNumber.setValue(formatted, { emitEvent: false });
    input.value = formatted;
    this.cardBrand.set(detectCardBrand(formatted));
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isLoading()) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true);

    const request: PaymentRequest = {
      amount:     this.amount.value as number,
      currency:   this.currency.value as Currency,
      cardHolder: this.cardHolder.value as string,
      cardNumber: (this.cardNumber.value as string).replace(/\s/g, ''),
    };

    try {
      const response = await this.facade.processPayment(request);
      this.paymentProcessed.emit(response.data);
      this.form.reset({ currency: 'USD' });
      this.cardBrand.set('unknown');
    } finally {
      this.isLoading.set(false);
    }
  }

  fieldError(control: AbstractControl): string | null {
    if (!control.invalid || !control.touched) return null;
    const e = control.errors!;
    if (e['required'])   return 'Este campo es obligatorio.';
    if (e['min'])        return `El mínimo es ${e['min'].min}.`;
    if (e['max'])        return `El máximo es ${e['max'].max}.`;
    if (e['minlength'])  return `Mínimo ${e['minlength'].requiredLength} caracteres.`;
    if (e['pattern'])    return 'Solo letras, espacios, guiones y apóstrofes.';
    if (e['cardNumber']) return e['cardNumber'];
    return 'Valor inválido.';
  }
}
