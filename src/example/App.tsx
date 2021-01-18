import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { MainAxisAlignment } from "@/abstract/MainAxisAlignment";
import { VerticalDirection } from "@/abstract/VerticalDirection";
import { Column } from "@/components/Column";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { ref } from "vue";

export const wrapperApp = () => {
  const text = ref(true);
  const text1 = ref(1);
  const text2 = ref(2);

  return Container({
    padding: EdgeInsets.all(EdgeInsetsStep.s2),
    margin: EdgeInsets.only({ left: EdgeInsetsStep.s6 }),
    child: Column({
      children: [
        ElevatedButton({
          child: Text({ text }),
          onPressed: () => {
            text.value = !text.value;
          },
        }),
        Flex({
          verticalDirection: VerticalDirection.up,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ElevatedButton({
              child: Text({ text: text1 }),
              onPressed: null,
            }),
            ElevatedButton({
              child: Text({ text: text2 }),
              onPressed: () => {
                text.value = !text.value;
              },
            }),
          ],
        }),
      ],
    }),
  });
};
