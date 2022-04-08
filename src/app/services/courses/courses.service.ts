import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICourse } from '../../shared/models/course/course.model';
import { LoadingService } from '../loading/loading.service';

interface IAnswerGetCourses {
  courses: ICourse[];
  length: number;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private url = 'http://localhost:3004/courses';
  private coust = 10;
  private courses: ICourse[];

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getList(
    start?: number,
    textFragment?: string,
    count?: number
  ): Observable<IAnswerGetCourses> {
    this.loadingService.changeShow(true);
    return this.http
      .get<IAnswerGetCourses>(
        `${this.url}?start=${start || 0}&count=${count || this.coust}${
          textFragment ? `&textFragment=${textFragment.toLowerCase()}` : ''
        }`
      )
      .pipe(
        tap((data) => {
          this.courses = data.courses;
          this.loadingService.changeShow(false);
        })
      );
  }
  createCourse(course: ICourse): Observable<ICourse> {
    this.loadingService.changeShow(true);
    return this.http
      .post<ICourse>(this.url, course)
      .pipe(tap(() => this.loadingService.changeShow(false)));
  }

  getCourseById(id: number): ICourse | undefined {
    return this.courses.find((course) => course.id == id);
  }

  updateCourse(editCourse: ICourse): Observable<ICourse> {
    this.loadingService.changeShow(true);
    return this.http
      .put<ICourse>(`${this.url}/${editCourse.id}`, editCourse)
      .pipe(tap(() => this.loadingService.changeShow(false)));
  }

  removeCourse(id: number): Observable<object> {
    this.loadingService.changeShow(true);
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(tap(() => this.loadingService.changeShow(false)));
  }
}
