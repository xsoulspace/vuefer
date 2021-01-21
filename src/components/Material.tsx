import { BorderRadius, BoxShadowSize, Color } from "@/abstract";
import { TextStyle } from "@/abstract/TextStyle";
import { Component, defineComponent, h } from "vue";
export interface MaterialI {
  child: Component;
  elevation?: BoxShadowSize;
  textStyle?: TextStyle;
  borderRadius?: BorderRadius;
  color?: Color;
  shadowColor?: Color;
  // animationDuration?: Duration
}

export const Material = ({
  child,
  color,
  borderRadius,
  elevation,
  shadowColor,
  textStyle,
}: MaterialI) => {
  return defineComponent({
    name: "Material",
    render() {
      return h("div", { class: "" }, [h(child)]);
    },
  });
};
