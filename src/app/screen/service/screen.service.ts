import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pixel } from '../pixel';
import { KeyPress } from '../keypress';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private webSocket: WebSocket = null;
  screen: Array<Pixel> = [];

  constructor() { }
  
  startService(id: String) {
    this.webSocket = new WebSocket(`ws:localhost:8080/screen`);
    this.webSocket.addEventListener('message', this.socketCallback);
    this.webSocket.addEventListener('open', () => {
      this.webSocket.send(JSON.stringify({ id, type: 'init' }));
    }); 
  }
  
  socketCallback = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    this.screen = [];
    for(let y = 0; y < data.length; y += 1) {
      for(let x = 0; x < data[y].length; x += 1) {
        this.screen.push(new Pixel(x, y, data[y][x]));
      }
    }
  }
  
  sendMessage(keyPress: KeyPress) {
    this.webSocket.send(JSON.stringify(keyPress));
  }
  
  stopService() {
    this.screen = [];
    this.webSocket.close();
    this.webSocket = null;
  }
}
