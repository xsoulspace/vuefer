import { Alignment } from "@/abstract/Alignment";
import { BorderRadius, BorderRadiusStep } from "@/abstract/BorderRadius";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { BoxShadow } from "@/abstract/BoxShadow";
import { CrossAxisAlignment } from "@/abstract/CrossAxisAlignment";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { Align } from "@/components/Align";
import { Center } from "@/components/Center";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
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
  const decoration = new BoxDecoration({
    boxShadow: BoxShadow.m,
    borderRadius: BorderRadius.all({ radius: BorderRadiusStep.xl }),
  });
  return Scaffold({
    body: Center({
      child: Container({
        padding,
        decoration: new BoxDecoration({
          boxShadow: BoxShadow.xl,
          borderRadius: BorderRadius.all({ radius: BorderRadiusStep.xl }),
        }),
        child: Align({
          alignment: Alignment.top,
          child: Container({
            decoration,
            child: Row({
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [btn, textCard],
            }),
          }),
        }),
      }),
    }),
  });
};
