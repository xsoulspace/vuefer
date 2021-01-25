import { Key } from "@/abstract";
import { BoxConstraints } from "@/abstract/BoxConstraints";
import { Component, defineComponent, h } from "vue";
export const ConstrainedBox = ({
  child,
  key,
  constraints,
}: {
  child: Component;
  constraints: BoxConstraints;
  key?: Maybe<Key>;
}) => {
  return defineComponent({
    name: "ConstrainedBox",
    render() {
      return h("div", { class: constraints.css }, [h(child)]);
    },
  });
};
