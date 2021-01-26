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
import { SizedBoxHeight, SizedBoxWidth } from "@/abstract/SizedBox";
import { TextEditingController } from "@/abstract/TextEditingController";
import { Align } from "@/components/Align";
import { CheckboxListTile } from "@/components/CheckboxListTile";
import { Column } from "@/components/Column";
import { Container } from "@/components/Container";
import { ElevatedButton } from "@/components/ElevatedButton";
import { ListView } from "@/components/ListView";
import { MouseRegion } from "@/components/MouseRegion";
import { Padding } from "@/components/Padding";
import { Row } from "@/components/Row";
import { Scaffold } from "@/components/Scaffold";
import { SizedBox } from "@/components/SizedBox";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { computed, reactive, ref } from "vue";

export const wrapperApp = () => {
  const text = ref("Hello world!");
  const padding = EdgeInsets.all(EdgeInsetsStep.s3);
  const rawText = Text({
    text,
  });
  const textCard = Padding({
    child: rawText,
    padding,
  });

  const controller = TextEditingController.default;
  controller.text = text;

  const obj = reactive<{ [prop: number]: string }>({
    0: "maybe",
    1: "test",
    2: "test",
    3: "test",
    4: "test",
    5: "test",
    6: "test",
    7: "test",
    8: "test",
    9: "test",
    10: "test",
  });
  const itemCount = computed(() => Object.keys(obj).length);

  const dynamicItems = SizedBox({
    child: ListView.builder({
      itemBuilder: ({ index }) => {
        const value = obj[index];
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
            text: ref(value),
          }),
          onTap: () => {
            alert(`hello tap with index ${index} and value ${value}!`);
            const newItemId = itemCount.value;
            obj[newItemId] = `new value ${newItemId}`;
            alert(`new value with id ${newItemId} add in the end of list!`);
          },
        });
      },
      itemCount: itemCount,
    }),
    height: new SizedBoxHeight({
      height: EdgeInsetsStep.s60,
    }),
    width: new SizedBoxWidth({
      width: EdgeInsetsStep.s96,
    }),
  });
  const isEnabled = ref(true);
  const temp = Container({
    padding,
    decoration: new BoxDecoration({
      boxShadow: BoxShadow.xl,
      borderRadius: BorderRadius.vertical({ bottom: BorderRadiusStep.xxl }),
    }),
    child: Row({
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column({
          children: [
            MouseRegion({
              child: textCard,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.progress,
              }),
            }),
            TextField({
              controller: controller,
            }),
            CheckboxListTile({
              onChanged: () => {
                // isEnabled.value = !isEnabled.value;
              },
              value: isEnabled,
              title: rawText,
            }),
          ],
        }),
        dynamicItems,
      ],
    }),
  });
  return Scaffold({
    body: Align({
      toOverlay: true,
      alignment: Alignment.bottom,
      child: temp,
    }),
  });
};
