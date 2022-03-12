import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';
import { COURSES } from 'src/app/mocks/mock-courses';
import { CoursesService } from '../../services/courses/courses.service';
import { SearchByTitlePipe } from 'src/app/shared/pipes/search-by-title.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  const fakeCoursesService = jasmine.createSpyObj('fakeCourses', [
    'removeCourse',
    'getList',
  ]);

  beforeEach(async () => {
    TestBed.overrideComponent(CoursesComponent, {
      set: {
        providers: [{ provide: CoursesService, useValue: fakeCoursesService }],
      },
    });
    await TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule],
      declarations: [CoursesComponent],
      providers: [SearchByTitlePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fakeCoursesService.getList.and.callFake(() => COURSES);
    fakeCoursesService.removeCourse.and.callFake((id: number) => true);
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call metod 'loadMore', by click button", () => {
    const event = spyOn(component, 'loadMore');
    const button = fixture.debugElement.query(By.css('.load-more'));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });

  it("should call console.log('loadMore')", () => {
    const event = spyOn(console, 'log');
    component.loadMore();
    expect(event).toHaveBeenCalledWith('loadMore');
  });

  it("should call metod 'search', by click button", () => {
    const event = spyOn(component, 'search');
    const button = fixture.debugElement.query(By.css('.search_button'));
    button.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });

  it('should cange courses', () => {
    let coursesBefore = component.courses;
    component.inputValue = 'angular';
    component.search();
    let difference = coursesBefore.length != component.courses.length;
    expect(difference).toBeTrue();
  });

  it("should call metod 'delete', by event onDelete", () => {
    const event = spyOn(component, 'delete');
    const courses_item = fixture.debugElement.query(By.css('app-courses-item'));
    courses_item.triggerEventHandler('onDelete', null);
    expect(event).toHaveBeenCalled();
  });

  it('should call confirm', () => {
    const event = spyOn(window, 'confirm');
    component.delete(1);
    expect(event).toHaveBeenCalledWith(
      'Do you really want to delete this course'
    );
  });

  it('should call coursesService.removeCourse and update list', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    component.delete(1);
    expect(fakeCoursesService.removeCourse).toHaveBeenCalledWith(1);
    expect(fakeCoursesService.getList).toHaveBeenCalled();
  });

  it('should change value of inputValue when change inpue value', () => {
    const input = fixture.debugElement.query(By.css('.search_input'));
    input.nativeElement.value = 'text';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.inputValue).toBe('text');
  });
});
