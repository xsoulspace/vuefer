import {
  Alignment,
  ButtonStyle,
  Colors,
  MainAxisAlignment,
  TextDecoration,
  TextDecorations,
  TextStyle,
} from "@/abstract";
import { BorderRadius, BorderRadiusStep } from "@/abstract/BorderRadius";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { BoxShadow } from "@/abstract/BoxShadow";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { SystemMouseCursor, SystemMouseCursors } from "@/abstract/MouseCursor";
import { Align } from "@/components/Align";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { ListView } from "@/components/ListView";
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
    style: new ButtonStyle({
      backgroundColor: Colors.grey,
      textStyle: new TextStyle({
        color: Colors.white,
        decoration: new TextDecoration({
          decoration: TextDecorations.lineThrough,
        }),
      }),
    }),
    child: Text({
      text: ref("Hello Button "),
    }),
    onTap: () => "",
  });
  const obj = ref<{ [prop: number]: string }>({
    0: "maybe",
    1: "test",
    2: "test",
  });
  const itemCount = Object.keys(obj.value).length;
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
              child: textCard,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.none,
              }),
            }),
            btn,
            ListView.builder({
              itemBuilder: ({ index }) => {
                return ElevatedButton({
                  style: new ButtonStyle({
                    backgroundColor: Colors.grey,
                    textStyle: new TextStyle({
                      color: Colors.white,
                      decoration: new TextDecoration({
                        decoration: TextDecorations.lineThrough,
                      }),
                    }),
                  }),
                  child: Text({
                    text: ref(obj.value[index]),
                  }),
                  onTap: () => alert("hello tap!"),
                });
              },
              itemCount: itemCount,
            }),
          ],
        }),
      }),
    }),
  });
};
