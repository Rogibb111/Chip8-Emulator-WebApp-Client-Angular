import { Component, OnInit, HostListener } from '@angular/core';
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
  
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.screenService.pressKey(event.keyCode);
  }
  
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.screenService.unpressKey(event.keyCode);
  }
}
