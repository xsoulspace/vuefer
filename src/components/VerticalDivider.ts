import { Axis } from "@/abstract/Axis";
import { defineComponent, h } from "vue";
import { DividerHelper, DividerI } from "./Divider";

// FIXME: it is not working because in tail wind
// there is no such class
export const VerticalDivider = ({ color, thickness }: DividerI) =>
  defineComponent({
    name: "VerticalDivider",
    render() {
      return h("div", {
        class: DividerHelper.getClassNames({
          direction: Axis.vertical,
          thickness,
          color,
        }),
      });
    },
  });
