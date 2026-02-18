import { Injectable, signal, computed } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notifications = signal<Notification[]>([]);

  showSuccess(message: string, duration = 4000): void { this.add('success', message, duration); }
  showError(message: string, duration = 5000): void   { this.add('error',   message, duration); }
  showInfo(message: string, duration = 4000): void    { this.add('info',    message, duration); }

  dismiss(id: string): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  private add(type: NotificationType, message: string, duration: number): void {
    const id = `n-${Date.now()}`;
    this.notifications.update(list => [...list, { id, type, message }]);
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
  }
}
