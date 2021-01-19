import { Border } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";
import { BoxShape } from "./BoxShape";
import { Color } from "./Color";
import { Gradient } from "./Gradient";
interface BoxDecorationI {
  color?: Color;
  border?: Border;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow;
  gradient?: Gradient;
  shape?: BoxShape;
}
export class BoxDecoration {
  color?: Color;
  border?: Border;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow;
  gradient?: Gradient;
  shape?: BoxShape;
  constructor({
    border,
    color,
    borderRadius,
    boxShadow,
    gradient,
    shape,
  }: BoxDecorationI) {
    this.border = border;
    this.color = color;
    this.borderRadius = borderRadius;
    this.boxShadow = boxShadow;
    this.gradient = gradient;
    this.shape = shape;
  }
}
