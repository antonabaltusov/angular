import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgCardDirective } from './directives/bg-card.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';
import { CoreModule } from '../core/core.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
    NotFoundComponent,
    HeaderComponent,
    LoadingComponent,
  ],
  imports: [CoreModule],
  exports: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
    NotFoundComponent,
    HeaderComponent,
    LoadingComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
