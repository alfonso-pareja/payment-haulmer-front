import {
  Component, OnInit, inject,
  signal,
} from '@angular/core';
import { TransactionFacadeService } from '../../services/transaction-facade.service';
import { TransactionStateService } from '@core/services/transaction-state.service';
import { Transaction, TransactionStatus, PaginationMeta } from '@core/models/transaction.model';
import { AppCurrencyPipe } from '@shared/pipes/app-currency.pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AppCurrencyPipe, SlicePipe],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  private readonly facade = inject(TransactionFacadeService);
  private readonly state  = inject(TransactionStateService);

  readonly transactions = this.state.transactions;
  readonly isLoading    = this.state.isLoading;
  readonly error        = this.state.error;
  readonly pagination   = this.state.pagination;
  readonly currentPage  = signal(1);

  ngOnInit(): void { this.loadData(1); }

  async loadData(page = 1): Promise<void> {
    this.currentPage.set(page);
    await this.facade.loadTransactions({ page });
  }

  goToPage(page: number): void { this.loadData(page); }

  getRowRange(meta: PaginationMeta): { from: number; to: number } {
    const from = (meta.current_page - 1) * meta.per_page + 1;
    return { from, to: Math.min(meta.current_page * meta.per_page, meta.total) };
  }

  getPageNumbers(meta: PaginationMeta): number[] {
    const { current_page: cur, last_page: last } = meta;
    const range: number[] = [];
    const start = Math.max(1, cur - 2);
    const end   = Math.min(last, cur + 2);
    for (let i = start; i <= end; i++) range.push(i);
    if (start > 2)        range.unshift(-1, 1);
    else if (start === 2) range.unshift(1);
    if (end < last - 1)   range.push(-2, last);
    else if (end === last - 1) range.push(last);
    return range;
  }

  statusLabel(s: TransactionStatus): string {
    return { approved: 'Aprobado', rejected: 'Rechazado', pending: 'Pendiente' }[s] ?? s;
  }

  formatDate(d: string): string {
    return new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d));
  }

  trackById(_: number, tx: Transaction): string { return tx.id; }
}
