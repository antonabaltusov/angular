import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseClass } from '../../shared/models/course/course';
import { ICourse } from '../../shared/models/course/course.model';
import { BreadcrumbService } from 'xng-breadcrumb';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/@ngrx';
import * as CoursesActions from '../../core/@ngrx';
import * as RouterActions from '../../core/@ngrx';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { IAuthor } from '../../shared/models';
import { selectSelectedCourseByUrl } from '../../core/@ngrx/data/entity-store.module';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.sass'],
})
export class CourseAddEditComponent implements OnInit, OnDestroy {
  public nameBlock = 'Add Cousre';
  public form: FormGroup;
  public authors: Observable<IAuthor[]> | Store<IAuthor[]>;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  private authorService: EntityCollectionService<IAuthor>;

  constructor(
    private datePipe: DatePipe,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private store: Store<AppState>,
    entityServices: EntityServices
  ) {
    this.authorService = entityServices.getEntityCollectionService('Authors');
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  async ngOnInit() {
    this.authors = this.authorService.entities$;
    const observer: any = {
      next: (course: CourseClass) => {
        this.newForm(course);
        this.breadcrumbService.set('@course', `course №${course.id}`);
      },
      error(err: any) {
        console.log(err);
      },
      complete() {
        console.log('stream is completed');
      },
    };

    this.store
      .select(selectSelectedCourseByUrl)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(observer);
  }

  private newForm(course: CourseClass) {
    if (course.id) {
      this.nameBlock = 'Edit Course';
    }
    this.form = this.fb.group({
      name: [course.name, [Validators.required, Validators.maxLength(50)]],
      description: [
        course.description,
        [Validators.required, Validators.maxLength(500)],
      ],
      date: [
        this.datePipe.transform(course.date, 'dd/MM/yyyy'),
        Validators.required,
      ],
      length: [course.length, [Validators.required]],
      authors: this.fb.array([]),
      id: [course.id],
    });
    if (course.authors.length) {
      const contrlol = <FormArray>this.form.controls['authors'];
      course.authors.forEach((user) => {
        contrlol.push(
          this.fb.group({
            id: [user.id],
            firstName: [user.firstName],
            lastName: [user.lastName],
          })
        );
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  public cancel(): void {
    this.store.dispatch(RouterActions.go({ path: ['courses'] }));
  }

  public save(): void {
    const date = this.form.value.date.split('/') as Array<number>;
    const course: ICourse = {
      ...this.form.value,
      date: new Date(date[2], date[1] - 1, date[0]).toISOString(),
    };
    if (course.id) {
      this.store.dispatch(CoursesActions.updateCourse({ course }));
    } else {
      this.store.dispatch(CoursesActions.createCourse({ course }));
    }
  }
}
