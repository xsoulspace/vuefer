import { Border } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";
import { Color } from "./Color";
interface BoxDecorationI {
  color?: Maybe<Color>;
  border?: Maybe<Border>;
  borderRadius?: Maybe<BorderRadius>;
  boxShadow?: Maybe<BoxShadow>;
  // gradient?: Gradient;
  // shape?: BoxShape;
}
export class BoxDecoration {
  color?: Maybe<Color>;
  border?: Maybe<Border>;
  borderRadius?: Maybe<BorderRadius>;
  boxShadow?: Maybe<BoxShadow>;
  // gradient?: Gradient;
  // shape?: BoxShape;
  constructor({
    border,
    color,
    borderRadius,
    boxShadow,
  }: // gradient,
  // shape,
  BoxDecorationI) {
    this.border = border;
    this.color = color;
    this.borderRadius = borderRadius;
    this.boxShadow = boxShadow;
    // this.gradient = gradient;
    // this.shape = shape;
  }

  get css(): string {
    return [
      this.boxShadow?.css ?? "",
      this.borderRadius?.css ?? "",
      this.border?.css ?? "",
    ].join(" ");
  }
}
