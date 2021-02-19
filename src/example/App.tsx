import {
  Dialog,
  GridView,
  GridViewItem,
  MultiDropdownButton,
  MultiProvider,
  showDialog,
} from '@/components'
import {
  Align,
  Alignment,
  BorderRadius,
  BorderRadiusStep,
  BoxDecoration,
  BoxShadow,
  CheckboxListTile,
  Column,
  Container,
  CrossAxisAlignment,
  DropdownButton,
  DropdownFieldController,
  DropdownMenuItem,
  EdgeInsets,
  EdgeInsetsStep,
  ElevatedButton,
  ListView,
  MainAxisAlignment,
  MouseRegion,
  MutliDropdownFieldController,
  Padding,
  Row,
  Scaffold,
  SizedBox,
  SystemMouseCursors,
  Text,
  TextButton,
  TextEditingController,
  TextField,
} from '@/index'
import { computed, defineComponent, h, reactive, ref, watch } from 'vue'
import { GridViewDelegate, NavigationController } from '../abstract'
import { HeroButton } from './HeroButton'
type IndexedText = {
  id: number
  text: string
}

export const WrapperApp = () => {
  const text = ref('Hello world!')
  const padding = EdgeInsets.all(EdgeInsetsStep.s3)
  const rawText = Text({
    text,
  })
  const textCard = Padding({
    child: rawText,
    padding,
  })

  const controller = TextEditingController.default
  controller.text = text

  const obj = reactive<Map<any, any>>(new Map())
  obj.set(0, 'test')
  obj.set(1, 'test1')
  obj.set(2, 'test1')
  obj.set(3, 'test1')
  obj.set(4, 'test1')
  obj.set(5, 'test1')
  obj.set(6, 'test1')
  obj.set(7, 'test1')
  obj.set(8, 'test1')
  obj.set(9, 'test1')
  obj.set(10, 'test1')
  obj.set(11, 'test1')
  obj.set(12, 'test1')
  obj.set(13, 'test1')
  obj.set(14, 'test1')
  obj.set(15, 'test1')
  obj.set(16, 'test1')
  obj.set(17, 'test1')
  obj.set(18, 'test1')
  obj.set(19, 'test1')
  obj.set(20, 'test1')
  const items = computed<string[]>(() => Array.from(obj.values()))
  const itemCount = computed(() => obj.size)
  const dropdownFieldController = new DropdownFieldController<IndexedText>({
    value: { id: 1, text: 'Hola!' },
    key: '1',
  })
  const dropdownItems = reactive([
    { id: 1, text: 'Hola!' },
    { id: 2, text: 'Hola 2!' },
    { id: 3, text: 'Hola 3!' },
    { id: 4, text: 'maybe 4!' },
    {
      id: 5,
      text: 'trello 5!',
    },
    { id: 6, text: 'Hola 6!' },
    { id: 7, text: 'home 7!' },
  ])
  const dropdown = DropdownButton({
    items: dropdownItems.map((el) =>
      DropdownMenuItem({
        child: TextButton({
          expand: true,
          child: Text({
            text: ref(el.text),
          }),
          onTap: () => '',
        }),
        value: el,
        key: el.id.toString(),
        title: el.text,
      })
    ),
    controller: dropdownFieldController,
  })
  const dynamicItems = SizedBox({
    child: ListView.builder({
      itemBuilder: ({ index }) => {
        const value = items.value[index]
        return TextButton({
          expand: true,
          child: Text({ text: ref(value) }),
          onTap: async () => {
            // obj.clear()
            alert(`hello tap with index ${index} and value ${value}!`)
            const newItemId = itemCount.value
            obj.set(newItemId, `new value ${newItemId}`)
            alert(`new value with id ${newItemId} add in the end of list!`)
          },
        })
      },
      itemCount: itemCount,
    }),
    height: EdgeInsetsStep.s60,
    width: EdgeInsetsStep.s96,
  })
  const isEnabled = ref(true)

  return defineComponent({
    name: 'App',
    setup() {
      const layoutMatrix = reactive([
        { x: 0, y: 0, width: 2, height: 2, index: 0 },
        { x: 2, y: 0, width: 2, height: 4, index: 1 },
        { x: 4, y: 0, width: 6, height: 8, index: 2 },
        { x: 6, y: 0, width: 2, height: 3, index: 3 },
        { x: 8, y: 0, width: 2, height: 3, index: 4 },
        { x: 10, y: 0, width: 2, height: 3, index: 5 },
        { x: 0, y: 5, width: 2, height: 5, index: 6 },
        { x: 2, y: 5, width: 2, height: 5, index: 7 },
        { x: 4, y: 5, width: 2, height: 5, index: 8 },
        { x: 6, y: 3, width: 2, height: 4, index: 9 },
        { x: 8, y: 4, width: 2, height: 4, index: 10 },
        { x: 10, y: 4, width: 2, height: 4, index: 11 },
        { x: 0, y: 10, width: 2, height: 5, index: 12 },
        { x: 2, y: 10, width: 2, height: 5, index: 13 },
        { x: 4, y: 8, width: 2, height: 4, index: 14 },
        { x: 6, y: 8, width: 2, height: 4, index: 15 },
        { x: 8, y: 10, width: 2, height: 5, index: 16 },
        { x: 10, y: 4, width: 2, height: 2, index: 17 },
        { x: 0, y: 9, width: 2, height: 3, index: 18 },
        { x: 2, y: 6, width: 2, height: 2, index: 19 },
      ])
      const navigationController = MultiProvider.get<NavigationController>(
        NavigationController
      )
      const gridViewDelegate = GridViewDelegate.use({
        gridViewItems: layoutMatrix.map((el) =>
          GridViewItem({
            child: TextButton({
              child: Text({
                text: ref(`text key:${el.index}`),
              }),
              expand: true,
              onTap: () => alert(`Hola ${el.index}!`),
            }),
            position: el,
          })
        ),
      })
      const multiDropdownController = new MutliDropdownFieldController<IndexedText>(
        { keyofValue: 'id' }
      )
      watch(
        multiDropdownController.reactive,
        (controllerValues) => {
          console.log({ controllerValues })
        },
        {
          deep: true,
          immediate: true,
        }
      )
      return () =>
        h(
          Scaffold({
            body: Align({
              toOverlay: true,
              alignment: Alignment.center,
              child: Container({
                padding,
                decoration: new BoxDecoration({
                  boxShadow: BoxShadow.xl,
                  borderRadius: BorderRadius.vertical({
                    bottom: BorderRadiusStep.xxl,
                  }),
                }),
                child: Row({
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column({
                      children: [
                        MultiDropdownButton({
                          controller: multiDropdownController,
                          items: dropdownItems.map((el) =>
                            DropdownMenuItem({
                              child: Text({
                                text: ref(el.text),
                              }),
                              value: el,
                              key: el.id.toString(),
                              title: el.text,
                            })
                          ),
                        }),

                        ElevatedButton({
                          child: Text({
                            text: ref('Show dialog'),
                          }),
                          onTap: () => {
                            showDialog({
                              dialog: Dialog({
                                child: ElevatedButton({
                                  child: Text({
                                    text: ref('Open dialog'),
                                  }),
                                  onTap: () => {
                                    showDialog({
                                      dialog: Dialog({
                                        child: Column({
                                          children: [
                                            Text({
                                              text: ref('Second Dialog'),
                                            }),
                                            ElevatedButton({
                                              child: Text({
                                                text: ref('close 2 dialogs'),
                                              }),
                                              onTap: () => {
                                                navigationController.pop(2)
                                              },
                                            }),
                                          ],
                                        }),
                                      }),
                                      navigationController,
                                    })
                                  },
                                }),
                              }),
                              navigationController,
                            })
                          },
                        }),
                        HeroButton(),
                        MouseRegion({
                          child: textCard,
                          cursor: SystemMouseCursors.progress,
                        }),
                        ElevatedButton({
                          child: Text({ text: ref('') }),
                          onTap: () => {
                            console.log({ dropdownFieldController })
                          },
                        }),
                        TextField({
                          controller: controller,
                        }),
                        dropdown,
                        CheckboxListTile({
                          onChanged: () => {
                            // isEnabled.value = !isEnabled.value;
                          },
                          value: isEnabled,
                          title: rawText,
                        }),
                        dynamicItems,
                      ],
                    }),
                    GridView.count({
                      isDraggable: ref(true),
                      isResizable: ref(true),
                      onPositionUpdate: (newPosition) => {
                        const i = layoutMatrix.findIndex(
                          (el) => el.index == newPosition?.index
                        )
                        // console.log({ i })
                        if (i) {
                          if (newPosition) {
                            layoutMatrix.splice(i, 1, newPosition)
                            return
                          }
                          layoutMatrix.splice(i, 1)
                        }
                      },
                      delegate: gridViewDelegate,
                    }),
                  ],
                }),
              }),
            }),
          })
        )
    },
  })
}
