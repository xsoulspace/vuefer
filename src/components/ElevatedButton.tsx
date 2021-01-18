import { Component, defineComponent, h } from "vue";

export const ElevatedButton = ({
  child,
  onPressed,
}: {
  child: Component;
  onPressed?: VoidFunction;
}) =>
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
