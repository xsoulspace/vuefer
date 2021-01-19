import { DividerDecoration, DividerI } from "@/abstract/DividerDecoration";
import { defineComponent, h } from "vue";

// FIXME: it is not working because in tail wind
// there is no such class
export const Divider = (arg: DividerI) =>
  defineComponent({
    name: "Divider",
    render() {
      return h("div", {
        class: DividerDecoration.horizontal(arg),
      });
    },
  });
