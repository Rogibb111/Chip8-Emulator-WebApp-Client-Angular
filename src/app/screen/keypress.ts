export class KeyPress {
  key: number;
  timeStamp: Date;

  constructor(key) {
    this.key = key;
    this.timeStamp = new Date();
  } 
}
