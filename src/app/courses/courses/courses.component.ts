import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { COURSES } from 'src/app/mocks/mock-courses';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { ICourse } from 'src/app/shared/models/course/course.model';
import { SearchByTitlePipe } from 'src/app/shared/pipes/search-by-title.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [ SearchByTitlePipe, CoursesService, AuthService ]
})
export class CoursesComponent implements OnInit {
  public coursesData: ICourse[];
  public sortBy: string = 'creation';
  public courses: ICourse[]
  private searchBy: string;


  constructor(
    private searchByTitle: SearchByTitlePipe,
    private coursesService: CoursesService,
    private authService: AuthService,
    ) {}

  async ngOnInit(): Promise<void> {
    this.coursesData =  await this.coursesService.getList();
    this.courses = this.coursesData;
  }

  public changeSearch(value: string): void{
    this.courses = this.searchByTitle.transform(this.coursesData, value)
    this.searchBy = value;
  }
  public  async delete(id: number): Promise<void> {
    if(confirm("Do you really want to delete this course")){
      if(await this.coursesService.removeCourse(id)) {
        this.coursesData =  await this.coursesService.getList();
        console.log(this.coursesData);
        this.courses = this.searchByTitle.transform(this.coursesData, this.searchBy)
      }
    }
  }
  public loadMore(): void {
    console.log('loadMore');
  }

  isAuth():boolean {
    return this.authService.isAuth()
  }
}
