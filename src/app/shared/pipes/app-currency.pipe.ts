import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '@core/models/transaction.model';

@Pipe({
  name: 'appCurrency',
  standalone: true,
})
export class AppCurrencyPipe implements PipeTransform {
  private readonly localeMap: Record<Currency, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    CLP: 'es-CL',
    ARS: 'es-AR',
    BRL: 'pt-BR',
  };

  transform(value: number, currency: Currency = 'USD'): string {
    const locale = this.localeMap[currency] ?? 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'CLP' ? 0 : 2,
    }).format(value);
  }
}
