import { BorderSide, BorderSideWidth, BorderStyle } from "./BorderSide";
import { Colors } from "./Colors";
export interface BoxBorderI {
  bottom?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  left?: BorderSide;
}

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

  get css() {
    const sides: BoxBorderI = {
      bottom: this.bottom,
      left: this.left,
      right: this.right,
      top: this.top,
    };
    const classes = [];
    for (const [sideName, side] of Object.entries(sides)) {
      const fixedSideName = <keyof BoxBorderI>sideName;
      const fixedSide = <BorderSide>side;
      const finalSideClass = (() => {
        switch (fixedSideName) {
          case "bottom":
            return "b";
          case "right":
            return "r";
          case "left":
            return "l";
          case "top":
            return "t";
          default:
            return "";
        }
      })();
      const finalSideClasses = (() => {
        const width = (() => {
          switch (fixedSide.width) {
            case BorderSideWidth.zero:
              return "";
            case BorderSideWidth.s1:
              return "";
            case BorderSideWidth.s2:
              return "2";
            case BorderSideWidth.s4:
              return "4";
            case BorderSideWidth.s8:
              return "8";
            default:
              return "";
          }
        })();
        const color = fixedSide.color.name ?? Colors.black.name!;

        const style = (() => {
          switch (fixedSide.style) {
            case BorderStyle.none:
              return "";
            case BorderStyle.dashed:
              return "dashed";
            case BorderStyle.dotted:
              return "dotted";
            case BorderStyle.double:
              return "double";
            case BorderStyle.solid:
              return "solid";
            default:
              return "";
          }
        })();
        return { width, color, style };
      })();
      if (fixedSide.width != BorderSideWidth.zero) {
        const borderWidthSideClass =
          fixedSide.width == BorderSideWidth.s1
            ? `border-${finalSideClass}`
            : `border-${finalSideClass}-${finalSideClasses.width}`;
        const borderColorClass = `border-${finalSideClasses.color}`;
        const borderStyleClass = `border-${finalSideClasses.style}`;

        classes.push(borderWidthSideClass, borderColorClass, borderStyleClass);
      }
    }
    if (classes.length <= 0) return "";
    return classes.join(" ");
  }
}
