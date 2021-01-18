import { Component, defineComponent, h } from "vue";

export const Align = ({ child }: { child: Component }) =>
  defineComponent({
    name: "Align",
    render() {
      return h("div", {}, [h(child)]);
    },
  });
