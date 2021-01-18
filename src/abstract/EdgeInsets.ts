export class EdgeInsets {
  static left: number = 0;
  static top: number = 0;
  static right: number = 0;
  static bottom: number = 0;

  static symmetric({
    vertical,
    horizontal,
  }: {
    vertical: number;
    horizontal: number;
  }) {
    this.left = horizontal;
    this.right = horizontal;
    this.top = vertical;
    this.bottom = vertical;
  }
  static only({
    left,
    top,
    right,
    bottom,
  }: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
  static all(value: number) {
    this.left = value;
    this.right = value;
    this.top = value;
    this.bottom = value;
  }
}
