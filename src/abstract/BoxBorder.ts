import { reduceHtmlClasses } from "@/functions/reduceHtmlClasses";
import { BorderSide, BorderSides } from "./BorderSide";
export interface BoxBorderI {
  bottom?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  left?: BorderSide;
}

export class BoxBorder {
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
  static get default() {
    return new BoxBorder({});
  }
  get css() {
    const sides: BoxBorderI = {
      bottom: this.bottom,
      left: this.left,
      right: this.right,
      top: this.top,
    };
    const classes: string[] = [];
    for (const [sideName, side] of Object.entries(sides)) {
      const fixedSideName = <BorderSides>sideName;
      const fixedSide = <BorderSide>side;
      classes.push(
        fixedSide.colorCss,
        fixedSide.styleCss,
        fixedSide.widthCss({ sideName: fixedSideName })
      );
    }

    return reduceHtmlClasses({ classes });
  }
}
