import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityDataModule,
  EntityMetadataMap,
} from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseClass } from '../../../shared/models';
import { selectRouterState } from '../router/router.selectors';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3004',
};

const pluralNames = {
  Courses: 'Courses',
  Authors: 'Authors',
};

export const entityMetadata: EntityMetadataMap = {
  Courses: {},
  Authors: {},
};

export const selectEntityCacheState = createFeatureSelector('entityCache');

export const selectCoursesEntities = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.Courses.entities;
  }
);

export const selectAuthorsEntities = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.Authors.entites;
  }
);

export const selectSelectedCourseByUrl = createSelector(
  selectCoursesEntities,
  selectRouterState,
  (courses, router): CourseClass => {
    const courseID = router.state.params['id'];
    if (courseID && courses) {
      return courses[courseID] as CourseClass;
    } else {
      return new CourseClass();
    }
  }
);

@NgModule({
  imports: [
    CommonModule,
    EntityDataModule.forRoot({ entityMetadata, pluralNames }),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
})
export class EntityStoreModule {}
