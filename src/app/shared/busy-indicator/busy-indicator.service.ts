import {Subject} from 'rxjs';

export class BusyIndicatorService {
  private busySubject = new Subject<boolean>();

  busy$ = this.busySubject.asObservable();

  on(): void {
    this.busySubject.next(true);
  }

  off(): void {
    this.busySubject.next(false);
  }
}
