import { Component, forwardRef, Input, OnInit, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { CoursesService } from '../../../services/courses/courses.service';
import { IAuthor } from '../../../shared/models/user/author.model';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { IUser } from '../../../shared/models/user/user.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass'],
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AuthorsComponent),
    },
  ],
})
export class AuthorsComponent implements OnInit, Validator {
  @Input() formArrayName!: string;
  public authors: IAuthor[];
  public onChange = new Subject<Event>();
  public input: string = '';
  public showSearch: boolean;

  form!: FormArray;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getAuthorsList('');
    this.search();
    this.form = this.rootFormGroup.control.get(this.formArrayName) as FormArray;
    this.showSearch = !this.form.value.length;
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
    if (!this.form.value.some((author: IUser) => author.id == id)) {
      const author = this.authors.find((author) => author.id == id);
      if (author) {
        this.form.push(this.initAuthor(author));
      }
    }
    this.showSearch = false;
  }

  removeAuthor(i: number) {
    this.form.removeAt(i);
    this.form.value.length
      ? (this.showSearch = false)
      : (this.showSearch = true);
  }
}
