import { Component, OnInit } from '@angular/core';
import { ScreenService } from './service/screen.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css'],
  host: {
    class: "screen-container"
  }
})
export class ScreenComponent implements OnInit {
  
  constructor(public screenService: ScreenService) {}
  
  ngOnInit() {
  }

}
