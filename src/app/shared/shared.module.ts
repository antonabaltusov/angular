import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgCardDirective } from './directives/bg-card.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    BgCardDirective,
    DurationPipe,
    OrderByPipe,
    SearchByTitlePipe,
  ]
})
export class SharedModule { }
