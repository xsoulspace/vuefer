import { Axis } from "@/abstract/Axis";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { MainAxisAlignment } from "@/abstract/MainAxisAlignment";
import { MainAxisSize } from "@/abstract/MainAxisSize";
import { VerticalDirection } from "@/abstract/VerticalDirection";
import { Component, defineComponent, h } from "vue";

export interface FlexBaseI {
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  verticalDirection?: VerticalDirection;
}
export interface ColumnI extends FlexBaseI {
  children: Component[];
}
export interface RowI extends FlexBaseI {
  children: Component[];
}
export interface FlexI extends FlexBaseI {
  children: Component[];
  direction?: Axis;
}
interface GetFlexClassNames extends FlexBaseI {
  direction?: Axis;
}
export class FlexHelper {
  static getClassNames({
    crossAxisAlignment,
    mainAxisAlignment,
    mainAxisSize,
    direction,
    verticalDirection,
  }: GetFlexClassNames): string {
    const finalDirection = direction ?? Axis.horizontal;
    const finalAxisSize = mainAxisSize ?? MainAxisSize.max;
    const finalMainAxisAlignment = mainAxisAlignment ?? MainAxisAlignment.start;
    const finalCrossAxisAlignment =
      crossAxisAlignment ?? CrossAxisAlignment.start;
    const finalVerticalDirection = verticalDirection ?? VerticalDirection.down;
    return [
      "flex",
      `flex-${finalDirection.css}${finalVerticalDirection.css}`,
      finalAxisSize.css,
      finalMainAxisAlignment.css,
      finalCrossAxisAlignment.css,
    ].join(" ");
  }
}
export const Flex = (arg: FlexI) =>
  defineComponent({
    name: "Flex",
    render() {
      const classNames = FlexHelper.getClassNames(arg);
      if (arg.children.length) {
        return h(
          "div",
          { class: classNames },
          arg.children.map((child) => h(child))
        );
      } else {
        return h("div");
      }
    },
  });
