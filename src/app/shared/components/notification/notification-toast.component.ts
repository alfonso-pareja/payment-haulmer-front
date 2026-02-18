import { Component, inject } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      @for (n of ns.notifications(); track n.id) {
        <div class="flex items-start gap-3 bg-white border rounded-xl px-4 py-3 shadow-lg animate-slide-up"
             [class]="borderClass(n.type)" role="alert">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
               [class]="iconBgClass(n.type)">
            <svg class="w-4 h-4" [class]="iconColor(n.type)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              @if (n.type === 'success') {
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              } @else {
                <path stroke-linecap="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              }
            </svg>
          </div>
          <p class="flex-1 text-sm text-slate-700 pt-0.5">{{ n.message }}</p>
          <button class="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
                  (click)="ns.dismiss(n.id)" aria-label="Cerrar">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class NotificationToastComponent {
  readonly ns = inject(NotificationService);

  borderClass(t: string): string {
    return { success: 'border-success-200', error: 'border-danger-200', warning: 'border-amber-200', info: 'border-primary-200' }[t] ?? 'border-slate-200';
  }
  iconBgClass(t: string): string {
    return { success: 'bg-success-50', error: 'bg-danger-50', warning: 'bg-amber-50', info: 'bg-primary-50' }[t] ?? 'bg-slate-50';
  }
  iconColor(t: string): string {
    return { success: 'text-success-600', error: 'text-danger-600', warning: 'text-amber-600', info: 'text-primary-600' }[t] ?? 'text-slate-500';
  }
}
