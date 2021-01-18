import { Color } from "@/abstract/Color";
import { EdgeInsets } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";
import { Padding } from "./Padding";

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
      const containerClass = `container ${color?.backgroundCss}`;
      if (padding) {
        return h("div", { class: containerClass }, [
          h(
            Padding({
              child,
              padding,
            })
          ),
        ]);
      } else {
        return h("div", { class: containerClass }, [h(child)]);
      }
    },
  });
