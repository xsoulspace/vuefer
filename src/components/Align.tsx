import { Alignment } from "@/abstract/Alignment";
import { Key } from "@/abstract/Key";
import { Component, defineComponent, h } from "vue";

export interface AlignI {
  child: Component;
  alignment: Alignment;
  // widthFactor?: EdgeInsetsStep;
  // heightFactor?: EdgeInsetsStep;
  key?: Key;
}

export const Align = ({ child, alignment, key }: AlignI) => {
  return defineComponent({
    name: "Align",
    render() {
      return h("div", { class: alignment.css }, [h(child)]);
    },
  });
};
