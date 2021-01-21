import { Alignment } from "@/abstract";
import { BoxConstraints } from "@/abstract/BoxConstraints";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { Color } from "@/abstract/Color";
import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";
interface ContainerI {
  child: Component;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  color?: Color;
  width?: number;
  height?: number;
  decoration?: BoxDecoration;
  // TODO: add ConstrainedBox
  constraints?: BoxConstraints;
  // TODO: add Align
  alignment?: Alignment;
}
export const Container = ({
  child,
  padding,
  margin,
  color,
  height,
  width,
  decoration,
  constraints,
  alignment,
}: ContainerI) => {
  const finalConstraints = constraints ?? new BoxConstraints({});
  const finalAlignment = alignment ?? Alignment.left;
  const component = defineComponent({
    name: "Container",
    render() {
      const decorationColor = decoration?.color;
      if (decorationColor && color)
        throw Error(
          "You cannot choose simultaniously both colors in decorator and in component! Prefer to use only one"
        );
      const containerClass = [
        "relative",
        "container",
        "flex",
        padding?.marginCss,
        padding?.paddingCss,
        finalConstraints.css,
        finalAlignment.css,
        decorationColor?.backgroundCss ?? color?.backgroundCss ?? "",
        decoration?.boxShadow?.css ?? "",
        decoration?.borderRadius?.css ?? "",
        decoration?.border?.css ?? "",
      ].join(" ");
      const params = { class: containerClass };
      const simple = h("div", params, [h(child)]);

      if (padding) {
        return h("div", params, [h(child)]);
      } else {
        return simple;
      }
    },
  });
  return component;
};
