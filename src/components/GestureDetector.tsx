import { Key } from "@/abstract";
import { Component, defineComponent, h } from "vue";
export interface GestureDetectorI {
  child: Component;
  key?: Maybe<Key>;
  onTap?: Maybe<GestureTapCallback>;
}

export const GestureDetector = ({ child, onTap, key }: GestureDetectorI) => {
  return defineComponent({
    name: "GestureDetector",
    setup() {
      const onClick = onTap ? async () => await onTap() : undefined;
      return { onClick };
    },
    render() {
      return h("div", { onClick: this.onClick }, [h(child)]);
    },
  });
};
