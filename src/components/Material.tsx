import { BorderRadius, BoxBorder, BoxShadow, Color } from "@/abstract";
import { TextStyle } from "@/abstract/TextStyle";
import { Component, defineComponent, h } from "vue";
export interface MaterialI {
  child: Component;
  elevation?: Maybe<BoxShadow>;
  textStyle?: Maybe<TextStyle>;
  borderRadius?: Maybe<BorderRadius>;
  color?: Maybe<Color>;
  boxBorder?: Maybe<BoxBorder>;
  // shadowColor?: Color;
  // animationDuration?: Duration
}

export const Material = ({
  child,
  color,
  borderRadius,
  elevation,
  boxBorder,
  // shadowColor,
  textStyle,
}: MaterialI) => {
  return defineComponent({
    name: "Material",
    render() {
      return h(
        "div",
        {
          class: [
            boxBorder?.css ?? "",
            elevation?.css ?? "",
            textStyle?.css ?? "",
            borderRadius?.css ?? "",
            color?.backgroundCss ?? "",
          ].join(" "),
        },
        [h(child)]
      );
    },
  });
};
