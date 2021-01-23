import { Key } from "@/abstract/Key";
import { SizedBoxHeight, SizedBoxWidth } from "@/abstract/SizedBox";
import { Component, defineComponent, h } from "vue";

interface SizedBoxI {
  child: Component;
  key?: Key;
  height: SizedBoxHeight;
  width: SizedBoxWidth;
}

export const SizedBox = ({ child, key, width, height }: SizedBoxI) => {
  return defineComponent({
    name: "SizedBox",
    render() {
      return h(
        "div",
        {
          class: [width.css, height.css].join(" "),
        },
        [h(child)]
      );
    },
  });
};
