import { Key } from "@/abstract";
import { SystemMouseCursor } from "@/abstract/MouseCursor";
import { Component, defineComponent, h } from "vue";

interface MouseRegionI {
  child: Component;
  key?: Key;
  cursor: SystemMouseCursor;
}

// Defines cursor image
export const MouseRegion = ({ child, key, cursor }: MouseRegionI) => {
  return defineComponent({
    name: "InkWell",
    render() {
      return h("div", { class: cursor.css }, [h(child)]);
    },
  });
};
