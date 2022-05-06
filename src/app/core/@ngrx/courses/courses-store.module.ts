import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('courses', coursesReducer), EffectsModule.forFeature([CoursesEffects])],
})
export class CoursesStoreModule {}
