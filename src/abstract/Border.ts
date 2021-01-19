import { BorderSide, BorderSideI } from "./BorderSide";
import { BoxBorder, BoxBorderI } from "./BoxBorder";

export class Border extends BoxBorder {
  constructor(arg: BoxBorderI) {
    super(arg);
  }
  static all(arg: BorderSideI) {
    return Border.fromBorderSide(new BorderSide(arg));
  }
  static only(arg: BoxBorderI) {
    return new Border(arg);
  }
  static fromBorderSide(borderSide: BorderSide) {
    return new Border({
      bottom: borderSide,
      left: borderSide,
      right: borderSide,
      top: borderSide,
    });
  }
  static symmetric({
    horizontal,
    vertical,
  }: {
    vertical?: BorderSide;
    horizontal?: BorderSide;
  }) {
    return new Border({
      left: horizontal,
      top: vertical,
      right: horizontal,
      bottom: vertical,
    });
  }
}
