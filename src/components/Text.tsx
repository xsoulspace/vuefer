import { defineComponent, Ref } from "vue";

export const Text = ({ text }: { text: Ref<string | boolean> }) =>
  defineComponent({
    name: "Text",
    setup() {
      return () => <div>{`${text.value}`}</div>;
    },
  });
