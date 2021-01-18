import { defineComponent, h, Ref } from "vue";

export const Text = ({ text }: { text: Ref<string | boolean> }) =>
  defineComponent({
    name: "Text",
    render() {
      return h("div", {}, `${text.value}`);
    },
  });
