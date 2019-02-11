export class Pixel {
  public x: number;
  public y: number;
  public value: boolean;

  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
  
  getValue() {
    return this.value;
  }
}
