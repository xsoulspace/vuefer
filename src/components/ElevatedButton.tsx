import { defineComponent } from "vue";

export const ElevatedButton = ({
  child,
  onPressed,
}: {
  child: any;
  onPressed: VoidFunction;
}) =>
  defineComponent({
    name: "Text",
    components: {
      child,
    },
    setup() {
      return () => (
        <div onClick={() => console.log(onPressed())}>
          <child />
        </div>
      );
    },
  });
