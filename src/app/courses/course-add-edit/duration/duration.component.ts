import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DurationComponent),
    },
  ],
})
export class DurationComponent implements ControlValueAccessor, Validator {
  public data: number;
  public touched: boolean;

  constructor() {}

  public validate() {
    return this.data ? null : { valid: false };
  }

  writeValue(data: number): void {
    if (data) {
      this.data = data;
    }
  }

  registerOnTouched(fn: any): void {}

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  onChange(data: number) {
    this.propagateChange(data);
  }

  onTouched = () => {
    this.touched = true;
  };
}
