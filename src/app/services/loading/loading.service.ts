import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private show: boolean = false;
  public observ = new Subject<boolean>();
  constructor() {}

  changeShow(boolean: boolean) {
    this.show = boolean;
    this.observ.next(this.show);
  }

  isShow(): Observable<boolean> {
    return this.observ;
  }
}
