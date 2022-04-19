import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../../services/courses/courses.service';
import { IAuthor } from '../../../shared/models/user/author.model';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AuthorsComponent),
    },
  ],
})
export class AuthorsComponent
  implements OnInit, Validator, ControlValueAccessor
{
  @Input() formArrayName!: string;
  public authors: IAuthor[];
  public onChange = new Subject<Event>();
  public input: string = '';

  form!: FormArray;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {}
  writeValue(obj: any): void {
    //throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    //throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTouched = () => {};

  ngOnInit(): void {
    this.getAuthorsList('');
    this.search();
    this.form = this.rootFormGroup.control.get(this.formArrayName) as FormArray;
  }

  public validate(c: FormControl) {
    return this.form.length > 0 ? null : { valid: false };
  }

  public search(): void {
    this.onChange
      .pipe(
        map((event: any) => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => this.getAuthorsList(data));
  }

  private getAuthorsList(data?: string) {
    console.log(data);
    this.coursesService.getAuthorsList(data).subscribe((data) => {
      this.authors = data;
    });
  }

  initAuthor(author: IAuthor) {
    const name = author.name.split(' ');

    return this.fb.group({
      id: [author.id],
      firstName: [name[0]],
      lastName: [name[1]],
    });
  }

  addAuthor(event: any) {
    const id = event.target.value;
    const author = this.authors.find((author) => author.id == id);
    if (author) {
      this.form.push(this.initAuthor(author));
    }
  }

  removeAuthor(i: number) {
    this.form.removeAt(i);
  }
}
