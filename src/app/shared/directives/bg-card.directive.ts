import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBgCard]',
})
export class BgCardDirective {
  @Input('appBgCard') date: string;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.highlight(this.getColor(new Date(this.date)));
  }

  private getColor(creationDate: Date) {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - creationDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 14 && diffDays >= 0) {
      return 'rgba(0, 255, 0, 0.2)';
    } else if (diffDays < 0) {
      return 'rgba(0, 0, 255, 0.2)';
    } else {
      return 'null';
    }
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
