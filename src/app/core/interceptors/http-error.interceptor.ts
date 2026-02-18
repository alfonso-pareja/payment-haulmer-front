import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg = 'Error inesperado. Intenta de nuevo.';
      if (err.status === 0)        msg = 'No se puede conectar al servidor.';
      else if (err.status === 400) msg = err.error?.message ?? 'Datos inválidos.';
      else if (err.status === 422) msg = err.error?.message ?? 'Error de validación.';
      else if (err.status >= 500)  msg = 'Error del servidor. Intenta más tarde.';
      notifications.showError(msg);
      return throwError(() => err);
    })
  );
};
