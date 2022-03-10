import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';
import { COURSES } from 'src/app/mocks/mock-courses';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchByTitlePipe } from 'src/app/shared/pipes/search-by-title.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  const fakeCoursesService = jasmine.createSpyObj("fakeCourses", ["removeCourse", "getList"]);

  beforeEach(async () => {
    TestBed.overrideComponent(CoursesComponent, {
      set: {
          providers: [
            { provide: CoursesService, useValue: fakeCoursesService }
          ]
        }
      }
    );
      await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
      ],
      declarations: [ CoursesComponent ],
      providers: [SearchByTitlePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeCoursesService.getList.and.callFake(() => COURSES);
    fakeCoursesService.removeCourse.and.callFake((id: number) => console.log(`удален ${id}`))
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Компонент должен вызвать метод, по клику на кнопку в шаблоне", () => {
    const event = spyOn(component, "loadMore");
    const button = fixture.debugElement.query(By.css(".load-more"));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });

  // it('should emit changeSearch from onSearch', () => {
  //   const teg = fixture.debugElement.query(By.css('app-settings'));
  //   console.log('teg-'+teg);
  //   teg.triggerEventHandler('onSearch', null);
  //   fixture.detectChanges();

  //   expect(spy.calls.any()).toBeTruthy();
  // });
});
