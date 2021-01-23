import { Key } from "@/abstract/Key";
import { OpacityDecoration } from "@/abstract/OpacityDecoration";
import { Component, defineComponent, h } from "vue";

interface OpacityI {
  child: Component;
  key?: Key;
  opacity: OpacityDecoration;
}

export const Opacity = ({ child, key, opacity }: OpacityI) => {
  return defineComponent({
    name: "Opacity",
    render() {
      return h(
        "div",
        {
          class: opacity.css,
        },
        [h(child)]
      );
    },
  });
};
