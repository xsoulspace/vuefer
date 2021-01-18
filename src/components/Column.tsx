import { Axis } from "@/abstract/Axis";
import { defineComponent, h } from "vue";
import { ColumnI, FlexHelper } from "./Flex";

export const Column = ({
  children,
  mainAxisAlignment,
  mainAxisSize,
  verticalDirection,
  crossAxisAlignment,
}: ColumnI) => {
  return defineComponent({
    name: "Column",
    render() {
      const classNames = FlexHelper.getClassNames({
        crossAxisAlignment,
        direction: Axis.vertical,
        mainAxisAlignment,
        mainAxisSize,
        verticalDirection,
      });
      if (children.length) {
        return h(
          "div",
          { class: classNames },
          children.map((child) => h(child))
        );
      } else {
        return h("div");
      }
    },
  });
};
