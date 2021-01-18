import { Axis } from "@/abstract/Axis";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { MainAxisAlignment } from "@/abstract/MainAxisAlignment";
import { MainAxisSize } from "@/abstract/MainAxisSize";
import { VerticalDirection } from "@/abstract/VerticalDirection";
import { Component, defineComponent, h } from "vue";

interface FlexI {
  children: Component[];
  direction?: Axis;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  verticalDirection?: VerticalDirection;
}

export const Flex = ({
  children,
  direction,
  mainAxisAlignment,
  crossAxisAlignment,
  mainAxisSize,
  verticalDirection,
}: FlexI) =>
  defineComponent({
    name: "Flex",
    render() {
      const finalDirection = direction ?? Axis.horizontal;
      const finalAxisSize = mainAxisSize ?? MainAxisSize.max;
      const finalMainAxisAlignment =
        mainAxisAlignment ?? MainAxisAlignment.start;
      const finalCrossAxisAlignment =
        crossAxisAlignment ?? CrossAxisAlignment.start;

      return h(
        "div",
        {
          class: [
            "flex",
            `flex-${finalDirection.css}${verticalDirection?.css}`,
            finalAxisSize.css,
            finalMainAxisAlignment.css,
            finalCrossAxisAlignment.css,
          ].join(" "),
        },
        children.map((child) => h(child))
      );
    },
  });
