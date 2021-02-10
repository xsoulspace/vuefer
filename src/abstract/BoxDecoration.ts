import { Border, BorderRadius, BoxShadow, Color, Colors, Maybe } from '..'

interface BoxDecorationI {
  color?: Maybe<Color>
  border?: Maybe<Border>
  borderRadius?: Maybe<BorderRadius>
  boxShadow?: Maybe<BoxShadow>
  // gradient?: Gradient;
  // shape?: BoxShape;
}
export class BoxDecoration {
  color: Color
  border: Border
  borderRadius: BorderRadius
  boxShadow: BoxShadow
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
    this.border = border ?? Border.default
    this.color = color ?? Colors.transparent
    this.borderRadius = borderRadius ?? BorderRadius.default
    this.boxShadow = boxShadow ?? BoxShadow.default
    // this.gradient = gradient;
    // this.shape = shape;
  }

  get css(): string {
    return [
      this.boxShadow?.css ?? '',
      this.borderRadius?.css ?? '',
      this.border?.css ?? '',
    ].join(' ')
  }
}
