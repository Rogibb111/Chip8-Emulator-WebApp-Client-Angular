export class Game {
  name: String;
  fileName: String;
}

export class Start {  
  filename: String;
  frequency: number;
  constructor (filename: String, frequency: number) {
    this.filename = filename;
    this.frequency = frequency;
  }
}

export class SessionId {
  id: String
}