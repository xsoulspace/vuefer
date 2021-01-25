import { Alignment } from "@/abstract";
import { BoxConstraints } from "@/abstract/BoxConstraints";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { Color } from "@/abstract/Color";
import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";
interface ContainerI {
  child: Component;
  padding?: Maybe<EdgeInsets>;
  // margin?: Maybe<EdgeInsets>;
  color?: Maybe<Color>;
  // width?: Maybe<number>;
  // height?: Maybe<number>;
  decoration?: Maybe<BoxDecoration>;
  // TODO: add ConstrainedBox
  constraints?: Maybe<BoxConstraints>;
  // TODO: add Align
  alignment?: Maybe<Alignment>;
}
export const Container = ({
  child,
  padding,
  // margin,
  color,
  // height,
  // width,
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
        decoration?.css ?? "",
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
