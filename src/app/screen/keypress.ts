export class KeyPress {
  keyboard: number[];
  timeStamp: Date;
  type: String = 'keyPress';
  id: String;

  constructor(keyboard: number[], id: String) {
    this.keyboard = keyboard;
    this.timeStamp = new Date();
    this.id = id;
  } 
}
