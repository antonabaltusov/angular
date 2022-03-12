import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../home/components/header/header.component';

@NgModule({
  declarations: [CoursesComponent, CoursesItemComponent],
  imports: [CoreModule, SharedModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
