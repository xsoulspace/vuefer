import { BorderRadius } from "./BorderRadius";
import { BoxBorder } from "./BoxBorder";
import { BoxShadow } from "./BoxShadow";
import { BoxShape } from "./BoxShape";
import { Color } from "./Color";
import { Gradient } from "./Gradient";

export class BoxDecoration {
  color?: Color;
  border?: BoxBorder;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow[];
  gradient?: Gradient;
  shape?: BoxShape;
}
