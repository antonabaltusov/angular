import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ICourse } from '../../shared/models/course/course.model';
import { SearchByTitlePipe } from '../../shared/pipes/search-by-title.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [SearchByTitlePipe, CoursesService],
})
export class CoursesComponent implements OnInit {
  public coursesData: ICourse[] = this.coursesService.getList();
  public sortBy: string = 'creation';
  public courses: ICourse[] = this.coursesData;
  public inputValue: string = '';
  public editCourse: ICourse | null;
  public openEdit: boolean = true;

  constructor(
    private searchByTitle: SearchByTitlePipe,
    private coursesService: CoursesService
  ) {}

  async ngOnInit(): Promise<void> {}

  public search(): void {
    this.courses = this.searchByTitle.transform(
      this.coursesData,
      this.inputValue
    );
  }

  public createCourse(): void {
    this.openEdit = true;
  }

  public edit(id: number): void {
    const course = this.coursesData.find((item) => item.id == id);
    if (course) {
      this.editCourse = course;
      this.openEdit = true;
    }
  }

  public closeEdit(boolean: boolean): void {
    this.openEdit = false;
    this.editCourse = null;
  }

  public async delete(id: number): Promise<void> {
    if (confirm('Do you really want to delete this course')) {
      if (await this.coursesService.removeCourse(id)) {
        this.coursesData = await this.coursesService.getList();
        this.search();
      }
    }
  }

  public loadMore(): void {
    console.log('loadMore');
  }
}
