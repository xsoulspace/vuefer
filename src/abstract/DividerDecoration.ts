import { Axis } from "./Axis";
import { Color } from "./Color";
import { DividerThickness } from "./DividerThickness";
import { Key } from "./Key";
interface DividerDecorationI {
  divider?: DividerI;
  direction?: Axis;
}
export class DividerDecoration {
  divider?: DividerI;
  direction?: Axis;
  constructor({ divider, direction }: DividerDecorationI) {
    this.divider = divider;
    this.direction = direction;
  }
  static vertical(divider?: DividerI) {
    return new DividerDecoration({ direction: Axis.vertical, divider });
  }
  static horizontal(divider?: DividerI) {
    return new DividerDecoration({ direction: Axis.horizontal, divider });
  }
  get css(): string {
    const direction = this.direction ?? Axis.vertical;
    return DividerHelper.getClassNames({ ...this.divider, direction });
  }
}

export interface DividerI {
  color?: Color;
  // TODO: implement endIndent
  // endIndent?: EdgeInsets;
  // TODO: implement indent
  // indent: ,
  // TODO: implement width
  // width: ,
  thickness?: DividerThickness;
  key?: Key;
}
interface GetClassNames extends DividerI {
  direction: Axis;
}

export class DividerHelper {
  static getClassNames({ color, thickness, direction }: GetClassNames): string {
    const directionClass = (() => {
      if (direction.axis == null) throw Error("direction must exists");
      switch (direction.axis) {
        case Axis.vertical.axis:
          return "x";
        case Axis.horizontal.axis:
        default:
          return "y";
      }
    })();
    const divideClass = `divide-${directionClass}`;
    return [
      thickness ? `${divideClass}${thickness.css}` : divideClass,
      color ? `divide-${color.name}` : "",
    ].join(" ");
  }
}
