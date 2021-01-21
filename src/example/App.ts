import { Alignment, MainAxisAlignment } from "@/abstract";
import { BorderRadius, BorderRadiusStep } from "@/abstract/BorderRadius";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { BoxShadow } from "@/abstract/BoxShadow";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { SystemMouseCursor, SystemMouseCursors } from "@/abstract/MouseCursor";
import { Align } from "@/components";
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
  const textRow = ref("And this is a row!");
  const text2 = ref(2);
  const padding = EdgeInsets.all(EdgeInsetsStep.s3);

  const textCard = Padding({
    child: Text({
      text: text2,
    }),
    padding,
  });

  const btn = ElevatedButton({
    child: Text({ text: ref("Hello Button") }),
    onPressed: () => {
      text2.value++;
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
                cursor: SystemMouseCursors.forbidden,
              }),
            }),
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.forbidden,
              }),
            }),
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.forbidden,
              }),
            }),
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.forbidden,
              }),
            }),
            textCard,
          ],
        }),
      }),
    }),
  });
};
