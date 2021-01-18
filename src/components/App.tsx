import { defineComponent, ref } from "vue";
import { Container } from "./Container";
import { ElevatedButton } from "./ElevatedButton";
import { Text } from "./Text";
export const App = ({ child }: { child: any }) =>
  defineComponent({
    components: {
      child,
    },
    render() {
      return <child />;
    },
  });

export const wrapperApp = () => {
  const text = ref(true);
  return App({
    child: Container({
      child: ElevatedButton({
        child: Text({ text: text }),
        onPressed: () => {
          text.value = !text.value;
          return text;
        },
      }),
    }),
  });
};
