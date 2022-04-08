import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public observ = new BehaviorSubject(false);
  constructor() {}

  changeShow(boolean: boolean) {
    this.observ.next(boolean);
  }

  isShow(): Observable<boolean> {
    return this.observ;
  }
}
