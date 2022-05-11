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

  constructor() {}
  ngOnInit(): void {}
}
