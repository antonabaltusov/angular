import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICourse } from '../../shared/models/course/course.model';

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

  constructor(private http: HttpClient) {}

  getList(
    start?: number,
    textFragment?: string,
    count?: number
  ): Observable<IAnswerGetCourses> {
    console.log(`${textFragment ? `&text_fragment=${textFragment}` : ''}`);

    return this.http
      .get<IAnswerGetCourses>(
        `${this.url}?start=${start || 0}&count=${count || this.coust}${
          textFragment ? `&textFragment=${textFragment.toLowerCase()}` : ''
        }`
      )
      .pipe(tap((data) => (this.courses = data.courses)));
  }
  createCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.url, course);
  }

  getCourseById(id: number): ICourse | undefined {
    return this.courses.find((course) => course.id == id);
  }

  updateCourse(editCourse: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.url}/${editCourse.id}`, editCourse);
  }

  removeCourse(id: number): Observable<object> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
