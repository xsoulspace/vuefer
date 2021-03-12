import { ref } from "vue";
import {
  AppBar,
  Column,
  Drawer,
  EdgeInsets,
  EdgeInsetsStep,
  ElevatedButton,
  Padding,
  Scaffold,
  Text,
} from "../../../../vuefer/lib";
import { Home } from "./Home";

export const ScaffoldApp = Scaffold.build({
  drawer: Drawer({
    child: Column({
      children: [
        ...(() => {
          const arr: any[] = [];
          arr.length = 100;
          arr.fill(1);
          return arr.map((el) =>
            Text({
              text: ref(el),
            })
          );
        })(),
        Text({
          text: ref("Drawer header"),
        }),
      ],
    }),
  }),
  appBar: AppBar({
    leading: ElevatedButton({
      child: Text({
        text: ref("="),
      }),
      onTap: () => {
        Scaffold.openDrawer();
      },
    }),
    title: Text({
      text: ref("Title"),
    }),
    actions: [
      ElevatedButton({
        child: Text({
          text: ref("a"),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref("b"),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref("c"),
        }),
      }),
    ],
  }),
  body: Padding({
    padding: EdgeInsets.only({ top: EdgeInsetsStep.s24 }),
    child: Home(),
  }),
});
