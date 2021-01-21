import { defineComponent, h } from "vue";
import { ButtonStyleButton, ButtonStyleButtonI } from "./ButtonStyleButton";
export const TextButton = ({
  child,
  onPressed,
  style,
  key,
}: ButtonStyleButtonI) => {
  return defineComponent({
    name: "TextButton",
    render() {
      return h("div", { class: "" }, [
        h(
          ButtonStyleButton({
            child,
            onPressed,
            style,
          })
        ),
      ]);
    },
  });
};
