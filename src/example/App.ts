import { Alignment, MainAxisAlignment } from "@/abstract";
import { BorderRadius, BorderRadiusStep } from "@/abstract/BorderRadius";
import {
  BoxConstraints,
  BoxConstraintsMaxWidth,
} from "@/abstract/BoxConstraints";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { BoxShadow } from "@/abstract/BoxShadow";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { SystemMouseCursor, SystemMouseCursors } from "@/abstract/MouseCursor";
import { TextAlign, TextAligns } from "@/abstract/TextAlign";
import { Align, ConstrainedBox } from "@/components";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { MouseRegion } from "@/components/MouseRegion";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Scaffold } from "@/components/Scaffold";
import { Text } from "@/components/Text";
import { ref } from "vue";

export const wrapperApp = () => {
  const text = ref("Hello world!");
  const text2 = ref(2);
  const padding = EdgeInsets.all(EdgeInsetsStep.s3);

  const textCard = Padding({
    child: Text({
      text,
    }),
    padding,
  });

  const btn = ElevatedButton({
    child: ConstrainedBox({
      child: Text({
        textAlign: new TextAlign({ textAlign: TextAligns.left }),
        text: ref("Hello Button "),
      }),
      constraints: new BoxConstraints({
        maxWidth: BoxConstraintsMaxWidth.min,
      }),
    }),
    onPressed: () => {
      text2.value++;
      text.value = `Hello Wolrd! Counter: ${text2.value}`;
    },
  });

  return Scaffold({
    body: Align({
      toOverlay: true,
      alignment: Alignment.bottom,
      child: Container({
        padding,
        decoration: new BoxDecoration({
          boxShadow: BoxShadow.xl,
          borderRadius: BorderRadius.vertical({ bottom: BorderRadiusStep.xxl }),
        }),
        child: Row({
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.click,
              }),
            }),
            textCard,
          ],
        }),
      }),
    }),
  });
};
