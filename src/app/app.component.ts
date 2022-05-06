import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import {
  AppState,
  selectQueryParams,
  selectRouteData,
  selectRouteParams,
  selectUrl,
} from './core/@ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'angular-run';

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    // Router Selector Demo
    // const url$ = this.store.select(selectUrl);
    // const queryParams$ = this.store.select(selectQueryParams);
    // const routeParams$ = this.store.select(selectRouteParams);
    // const routeData$ = this.store.select(selectRouteData);
    // const source$ = merge(url$, queryParams$, routeParams$, routeData$);
    // source$.pipe(tap((val) => console.log(val))).subscribe();
  }
}
