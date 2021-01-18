import { Color } from "@/abstract/Color";
import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";

export const Container = ({
  child,
  padding,
  margin,
  color,
}: {
  child: Component;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  color?: Color;
}) =>
  defineComponent({
    name: "Container",
    render() {
      return h("div", { class: `container ${color?.backgroundCss}` }, [
        h(child),
      ]);
    },
  });
