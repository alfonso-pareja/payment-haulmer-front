import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should add and dismiss a notification', () => {
    service.showSuccess('Done!', 0);
    expect(service.notifications().length).toBe(1);
    const id = service.notifications()[0].id;
    service.dismiss(id);
    expect(service.notifications().length).toBe(0);
  });

  it('should auto-dismiss after duration', fakeAsync(() => {
    service.showSuccess('Auto', 500);
    expect(service.notifications().length).toBe(1);
    tick(500);
    expect(service.notifications().length).toBe(0);
  }));

  it('should handle multiple notifications', () => {
    service.showSuccess('One', 0);
    service.showError('Two', 0);
    expect(service.notifications().length).toBe(2);
  });
});
