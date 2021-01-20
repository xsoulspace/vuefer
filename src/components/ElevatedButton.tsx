import { Component, defineComponent, h } from "vue";
interface ElevatedButtonI {
  child: Component;
  onPressed?: Maybe<VoidFunction>;
}
export const ElevatedButton = ({ child, onPressed }: ElevatedButtonI) =>
  defineComponent({
    name: "ElevatedButton",
    render() {
      return h(
        "div",
        { onClick: onPressed ? async () => await onPressed() : undefined },
        [h(child)]
      );
    },
  });
