import { Alignment } from "@/abstract/Alignment";
import { Key } from "@/abstract/Key";
import { Component, defineComponent, h } from "vue";

export interface AlignI {
  child: Component;
  alignment: Alignment;
  // widthFactor?: EdgeInsetsStep;
  // heightFactor?: EdgeInsetsStep;
  toOverlay?: boolean;
  key?: Key;
}

export const Align = ({ child, toOverlay, alignment, key }: AlignI) => {
  const finalAlignment = alignment;
  finalAlignment.toOverlay = toOverlay ?? false;
  return defineComponent({
    name: "Align",
    render() {
      return h("div", { class: finalAlignment.css }, [h(child)]);
    },
  });
};
