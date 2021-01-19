import { Color } from "./Color";
import { Colors } from "./Colors";

export enum BorderSideWidth {
  zero,
  s1,
  s2,
  s4,
  s8,
}

export enum BorderStyle {
  none,
  solid,
  dashed,
  dotted,
  double,
}

export interface BorderSideI {
  color?: Color;
  width?: BorderSideWidth;
  style?: BorderStyle;
}

export class BorderSide {
  color: Color;
  width: BorderSideWidth;
  style: BorderStyle;

  constructor({ color, style, width }: BorderSideI) {
    this.color = color ?? Colors.black;
    this.style = style ?? BorderStyle.solid;
    this.width = width ?? BorderSideWidth.s1;
  }

  static get none() {
    return new BorderSide({
      style: BorderStyle.none,
      width: BorderSideWidth.zero,
    });
  }
}
