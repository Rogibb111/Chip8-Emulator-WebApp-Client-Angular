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
  keyboard: Array<number> = [];
  id: String;
  soundTimeoutId: number;
  oscillator: OscillatorNode;

  constructor() { }
  
  startService(id: String) {
    console.log("Start Service!")
    this.webSocket = new WebSocket(`ws:localhost:8080/screen`);
    this.webSocket.addEventListener('message', this.socketCallback);
    this.webSocket.addEventListener('open', () => {
      this.webSocket.send(JSON.stringify({ id, type: 'init' }));
    }); 
    this.id = id;
  }
  
  socketCallback = ({ data: jsonData }) => {
    const data = JSON.parse(jsonData);
    if(data.type === 'frame') {
      for(let y = 0; y < data.screen.length; y += 1) {
        for(let x = 0; x < data.screen[y].length; x += 1) {
          const currentPixel = this.screen[y + data.screen.length * x];
          if(!currentPixel || data.screen[y][x] !== currentPixel.value) {
            this.screen[y + data.screen.length * x] = new Pixel(x, y, data.screen[y][x]);
          }
        }
      }
    } else if (data.type === 'Sound') {
      console.log("Making Sound!")
      if(this.soundTimeoutId){
        window.clearTimeout(this.soundTimeoutId);
      }
      else {
        const context = new AudioContext();

        this.oscillator = context.createOscillator();

        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = 440;
        this.oscillator.connect(context.destination);
        console.log("Starting Oscillator");
        this.oscillator.start();
      }
      this.soundTimeoutId = window.setTimeout(() => { 
        console.log('Stopping Oscillator');
        this.oscillator.stop();
        window.clearTimeout(this.soundTimeoutId);
        this.soundTimeoutId = null;
      }, 1);
      
    }
  }
  
  pressKey(pressedKey: number) {
    console.log("Key Pressed!");
    if(!this.keyboard.includes(pressedKey) && this.webSocket) {
      this.keyboard.push(pressedKey);
      this.webSocket.send(JSON.stringify(new KeyPress(this.keyboard, this.id)));
    }
  }
  
  unpressKey(unPressedKey: number) {
    console.log("Key UnPressed!")
    const index = this.keyboard.indexOf(unPressedKey);
    if(index > -1 && this.webSocket) {
      this.keyboard.splice(index, 1);
      this.webSocket.send(JSON.stringify(new KeyPress(this.keyboard, this.id)));
    }
  }
  
  stopService() {
    console.log("Stop Service!");
    this.screen = [];
    this.webSocket.close();
    this.webSocket = null;
  }
}
