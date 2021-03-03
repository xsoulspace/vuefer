import {
  AppBar,
  Column,
  Drawer,
  ElevatedButton,
  Scaffold,
  Text,
} from '@xsoulspace/vuefer'
import { ref } from 'vue'
import { Home } from './Home'

export const ScaffoldApp = Scaffold.build({
  drawer: Drawer({
    child: Column({
      children: [
        Text({
          text: ref('Drawer header'),
        }),
      ],
    }),
  }),
  appBar: AppBar({
    leading: ElevatedButton({
      child: Text({
        text: ref('='),
      }),
      onTap: () => {
        Scaffold.openDrawer()
      },
    }),
    title: Text({
      text: ref('Title'),
    }),
    actions: [
      ElevatedButton({
        child: Text({
          text: ref('a'),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref('b'),
        }),
      }),
      ElevatedButton({
        child: Text({
          text: ref('c'),
        }),
      }),
    ],
  }),
  body: Home(),
})
