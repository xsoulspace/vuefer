import { Component, computed, defineComponent, h } from 'vue'
import {
  Alignment,
  Maybe,
  NavigationController,
  SizeBoxStep,
  SizedBoxHeight,
} from '../abstract'
import { DrawerBuilder } from './Drawer'
import { MultiProvider } from './Provider'
interface ScaffoldI {
  body: Component
  appBar?: Maybe<Component>
  drawer?: Maybe<DrawerBuilder>
}

/**
 * To init Scaffold use `Scaffold.build`
 * 
 * To use Drawer you must first initialize somewhere above `Navigation` with `NavigationContorller` as below:
```typescript
MultiProvider.build({
  models: [NavigationController],
  child: Navigation({
    child: ...,
  }),
})
```

 
 * 
 * To open Drawer use
 * `Scaffold.openDrawer()`
 * To close Drawer use
 * `Scaffold.closeDrawer()`
 * 
 * 
```typescript
Scaffold.build({
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
```
**/
export class Scaffold {
  static _drawer?: Maybe<DrawerBuilder>
  static openDrawer: CallableFunction = () => ''
  static closeDrawer: CallableFunction = () => ''
  static build({ body, appBar, drawer }: ScaffoldI) {
    Scaffold._drawer = drawer
    return defineComponent({
      name: 'Scaffold',
      setup() {
        const isAppBarExists = computed(() => appBar != null)
        const classes = computed((): string[] => {
          return [
            isAppBarExists.value ? 'relative' : '',
            new SizedBoxHeight({ height: SizeBoxStep.screen }).css,
            'overflow-y-auto',
          ]
        })
        const navigationController = MultiProvider.get<NavigationController>(
          NavigationController
        )
        const openDrawer = () => {
          if (Scaffold._drawer == null) {
            console.warn('You forgot to supply Drawer to Scaffold.')
            return
          }
          navigationController.push({
            widget: Scaffold._drawer.widget,
            alignment: Scaffold._drawer.alignment ?? Alignment.left,
            fullscreen: false,
          })
        }
        Scaffold.openDrawer = openDrawer
        Scaffold.closeDrawer = () => navigationController.pop()
        return () =>
          h('div', { class: 'overflow-hidden' }, [
            h(appBar ?? <div />),
            h('div', { class: classes.value }, [h(body)]),
          ])
      },
    })
  }
}
