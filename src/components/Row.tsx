import { Component, defineComponent, h } from "vue";

export const Row = ({ children }: { children: Component[] }) => {
  return defineComponent({
    name: "Row",
    render() {
      if (children.length) {
        return h(
          "div",
          {},
          children.map((child) => h(child))
        );
      } else {
        return h("div");
      }
    },
  });
};
