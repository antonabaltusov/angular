import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthor } from '../../shared/models/user/author.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
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
        tap(() => {
          this.loadingService.changeShow(false);
        })
      );
  }

  getAuthorsList(textFragment?: string): Observable<IAuthor[]> {
    this.loadingService.changeShow(true);
    return this.http
      .get<IAuthor[]>(
        `http://localhost:3004/authors${
          textFragment ? `?textFragment=${textFragment}` : ''
        }`
      )
      .pipe(tap(() => this.loadingService.changeShow(false)));
  }

  createCourse(course: ICourse): Observable<ICourse> {
    this.loadingService.changeShow(true);

    return this.http
      .post<ICourse>(this.url, course)
      .pipe(tap(() => this.loadingService.changeShow(false)));
  }

  // getCourseById(id: number): Observable<ICourse | undefined> {
  //   let course = this.courses?.find((course) => course.id == id);
  //   if (course) {
  //     return new BehaviorSubject<ICourse>(course).asObservable();
  //   } else {
  //     this.loadingService.changeShow(true);
  //     return this.http
  //       .get<ICourse>(`http://localhost:3004/course?id=${id}`)
  //       .pipe(
  //         tap(() => {
  //           this.loadingService.changeShow(false);
  //         })
  //       );
  //   }
  // }

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
