import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgCardDirective } from './directives/bg-card.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';
import { CoreModule } from '../core/core.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [CoreModule],
  exports: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
    NotFoundComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
