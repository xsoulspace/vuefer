import { Column } from "@/components/Column";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { Row } from "@/components/Row";
import { Text } from "@/components/Text";
import { ref } from "vue";

export const wrapperApp = () => {
  const text = ref(true);
  const text1 = ref(1);
  const text2 = ref(2);

  return Container({
    child: Row({
      children: [
        ElevatedButton({
          child: Text({ text }),
          onPressed: () => {
            text.value = !text.value;
          },
        }),

        Column({
          children: [
            ElevatedButton({
              child: Text({ text: text1 }),
              onPressed: null,
            }),
            ElevatedButton({
              child: Text({ text: text2 }),
              onPressed: null,
            }),
          ],
        }),
      ],
    }),
  });
};
