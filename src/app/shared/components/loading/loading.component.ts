import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
  providers: [LoadingService],
})
export class LoadingComponent implements OnInit {
  public show: boolean;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.isShow().subscribe((data) => {
      console.log(data);
      this.show = data;
    });
  }
}
