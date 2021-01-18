import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Key } from "@/abstract/Key";
import { Component, defineComponent, h } from "vue";

export const Padding = ({
  child,
  padding,
  key,
}: {
  child: Component;
  padding: EdgeInsets;
  key?: Key;
}) =>
  defineComponent({
    name: "Padding",
    render() {
      return h("div", {}, [h(child)]);
    },
  });
