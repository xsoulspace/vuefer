import { defineComponent } from "vue";

export const Container = ({ child }: { child: any }) =>
  defineComponent({
    name: "Container",
    components: {
      child,
    },
    setup() {
      return () => (
        <div>
          <child />
        </div>
      );
    },
  });
