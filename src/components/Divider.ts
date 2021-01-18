import { Axis } from "@/abstract/Axis";
import { Color } from "@/abstract/Color";
import { DividerThickness } from "@/abstract/DividerThickness";
import { Key } from "@/abstract/Key";
import { defineComponent, h } from "vue";

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

// FIXME: it is not working because in tail wind
// there is no such class
export const Divider = ({ color, thickness }: DividerI) =>
  defineComponent({
    name: "Divider",
    render() {
      return h("div", {
        class: DividerHelper.getClassNames({
          direction: Axis.horizontal,
          thickness,
          color,
        }),
      });
    },
  });
