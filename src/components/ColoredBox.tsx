import { Color, Colors, Key } from "@/abstract";
import { Component, defineComponent, h } from "vue";

interface ColoredBoxI {
  child: Component;
  key?: Maybe<Key>;
  color: Color;
}

export const ColoredBox = ({ child, key, color }: ColoredBoxI) => {
  return defineComponent({
    name: "ColoredBox",
    render() {
      return h(
        "div",
        {
          style: (color ?? Colors.transparent).backgroundCss,
        },
        [h(child)]
      );
    },
  });
};
