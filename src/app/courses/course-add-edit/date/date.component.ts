import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DateComponent),
    },
  ],
})
export class DateComponent implements ControlValueAccessor, Validator {
  public date: string;
  public valid: boolean = false;
  public touched: boolean = false;
  private myRe =
    /^(?:(?:31(\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  constructor() {}

  public validate(c: FormControl) {
    return this.valid ? null : { valid: false };
  }

  onTouched = () => {
    this.touched = true;
  };

  registerOnTouched(fn: any): void {}

  writeValue(date: string): void {
    if (date) {
      if (this.myRe.exec(date) && date.length == 10) {
        this.valid = true;
      }
      this.date = date;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  private addSlesh(txt: string): string {
    const lastIndex = txt.length - 1;
    const lastSymbol = txt[lastIndex];
    txt = txt.replace(/.$/, '/');
    txt += lastSymbol;
    return txt;
  }

  public onChange(newValue: string) {
    let length = newValue.length;
    if (length < 10) {
      this.valid = false;
      if (length == 3 || length == 6) {
        newValue = this.addSlesh(newValue);
      }
    } else if (this.myRe.exec(newValue) && length == 10) {
      this.valid = true;
    } else {
      this.valid = false;
    }
    this.date = newValue;
    this.propagateChange(this.date);
  }
}
