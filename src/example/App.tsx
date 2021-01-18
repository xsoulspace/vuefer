import { Alignment } from "@/abstract/Alignment";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { Align } from "@/components/Align";
import { Column } from "@/components/Column";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { Text } from "@/components/Text";
import { ref } from "vue";

export const wrapperApp = () => {
  const text = ref(true);

  return Container({
    padding: EdgeInsets.all(EdgeInsetsStep.s2),
    margin: EdgeInsets.only({ left: EdgeInsetsStep.s6 }),
    child: Column({
      children: [
        ElevatedButton({
          child: Text({ text: text }),
          onPressed: () => {
            text.value = !text.value;
          },
        }),
        Align({
          child: ElevatedButton({
            child: Text({ text: text }),
            onPressed: () => {
              text.value = !text.value;
            },
          }),
          alignment: Alignment.bottomRight,
        }),
        ElevatedButton({
          child: Text({ text: text }),
          onPressed: () => {
            text.value = !text.value;
          },
        }),
      ],
    }),
  });
};
