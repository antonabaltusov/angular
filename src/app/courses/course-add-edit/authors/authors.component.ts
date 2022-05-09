import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { IAuthor } from '../../../shared/models/user/author.model';
import { Subscription } from 'rxjs';
import { IUser } from '../../../shared/models/user/user.model';
import { EntityCollectionService, EntityServices } from '@ngrx/data';

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
  @Input() public authors!: IAuthor[] | null;
  public input: string = '';
  public showSearch: boolean;
  public sub: Subscription;
  form!: FormArray;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formArrayName) as FormArray;
    this.showSearch = !this.form.value.length;
  }

  public validate(c: FormControl) {
    return this.form.length > 0 ? null : { valid: false };
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
      const author = this.authors?.find((author) => author.id == id);
      if (author) {
        this.form.push(this.initAuthor(author));
      }
    }
    this.showSearch = false;
  }

  removeAuthor(i: number, event: Event) {
    event.stopPropagation();

    this.form.removeAt(i);
    this.form.value.length
      ? (this.showSearch = false)
      : (this.showSearch = true);
  }

  openSearch(event: Event) {
    this.showSearch = true;
    event.stopPropagation();
  }

  closeSearch() {
    this.form.value.length
      ? (this.showSearch = false)
      : (this.showSearch = true);
  }
}
