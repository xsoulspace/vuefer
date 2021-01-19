enum BorderSide {
  top,
  bottom,
  left,
  right,
  none,
}
type BoxBorderI = {
  top?: BorderSide;
  bottom?: BorderSide;
  left?: BorderSide;
  right?: BorderSide;
};

export abstract class BoxBorder {
  top: BorderSide;
  bottom: BorderSide;
  left: BorderSide;
  right: BorderSide;
  constructor({ bottom, top, right, left }: BoxBorderI) {
    this.top = top ?? BorderSide.none;
    this.bottom = bottom ?? BorderSide.none;
    this.right = right ?? BorderSide.none;
    this.left = left ?? BorderSide.none;
  }
}
