import { BoxDecoration } from "@/abstract/BoxDecoration";
import { Color } from "@/abstract/Color";
import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";
import { Margin } from "./Margin";
import { Padding } from "./Padding";
interface ContainerI {
  child: Component;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  color?: Color;
  width?: number;
  height?: number;
  decoration?: BoxDecoration;
}
export const Container = ({
  child,
  padding,
  margin,
  color,
  height,
  width,
  decoration,
}: ContainerI) => {
  const component = defineComponent({
    name: "Container",
    render() {
      const containerClass = [
        "relative",
        "container",
        "min-h-full",
        color?.backgroundCss ?? "",
        decoration?.boxShadow?.css ?? "",
      ].join(" ");
      const params = { class: containerClass };
      const simple = h("div", params, [h(child)]);

      if (padding) {
        return h("div", params, [
          h(
            Padding({
              child,
              padding,
            })
          ),
        ]);
      } else {
        return simple;
      }
    },
  });
  if (margin) {
    return Margin({ child: component, margin });
  } else {
    return component;
  }
};
