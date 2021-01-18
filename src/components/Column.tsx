import { Component, defineComponent, h } from "vue";

export const Column = ({ children }: { children: Component[] }) => {
  return defineComponent({
    name: "Column",
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
