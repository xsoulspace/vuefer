import {
  computed,
  defineComponent,
  h,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
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
  Dialog,
  DropdownButton,
  DropdownFieldController,
  DropdownMenuItem,
  EdgeInsets,
  EdgeInsetsStep,
  ElevatedButton,
  GridViewDelegate,
  GridViewItem,
  ListView,
  MainAxisAlignment,
  MouseRegion,
  MultiDropdownButton,
  MultiDropdownFieldController,
  MultiProvider,
  NavigationController,
  Padding,
  ReordableListView,
  ReordableListViewDelegate,
  Row,
  showDialog,
  SizedBox,
  SystemMouseCursors,
  Text,
  TextButton,
  TextEditingController,
  TextField,
} from "../../../../vuefer/lib";
import { HeroButton } from "../components/HeroButton";
type IndexedText = {
  id: number;
  text: string;
};

type GenericGridViewItemPosition = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

export const Home = () => {
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

  const obj = reactive<Map<number, string>>(new Map());
  obj.set(0, "test");
  obj.set(1, "test1");
  obj.set(2, "test1");
  obj.set(3, "test1");
  obj.set(4, "test1");
  obj.set(5, "test1");
  obj.set(6, "test1");
  obj.set(7, "test1");
  obj.set(8, "test1");
  obj.set(9, "test1");
  obj.set(10, "test1");
  obj.set(11, "test1");
  obj.set(12, "test1");
  obj.set(13, "test1");
  obj.set(14, "test1");
  obj.set(15, "test1");
  obj.set(16, "test1");
  obj.set(17, "test1");
  obj.set(18, "test1");
  obj.set(19, "test1");
  obj.set(20, "test1");
  const items = computed<string[]>(() => Array.from(obj.values()));
  const itemCount = computed(() => obj.size);
  const dropdownFieldController = new DropdownFieldController<IndexedText>({
    value: { id: 1, text: "Hola!" },
    key: "1",
  });
  const dropdownItems = reactive([
    { id: 1, text: "Hola!" },
    { id: 2, text: "Hola 2!" },
    { id: 3, text: "Hola 3!" },
    { id: 4, text: "maybe 4!" },
    {
      id: 5,
      text: "trello 5!",
    },
    { id: 6, text: "Hola 6!" },
    { id: 7, text: "home 7!" },
  ]);
  const dropdown = DropdownButton({
    items: dropdownItems.map((el) =>
      DropdownMenuItem({
        child: TextButton({
          expand: true,
          child: Text({
            text: ref(el.text),
          }),
          onTap: () => "",
        }),
        value: el,
        key: el.id.toString(),
        title: ref(el.text),
      })
    ),
    controller: dropdownFieldController,
  });
  const dynamicItems = SizedBox({
    child: ListView.builder({
      itemBuilder: ({ index }) => {
        const value = items.value[index];
        return TextButton({
          expand: true,
          child: Text({ text: ref(value) }),
          onTap: async () => {
            // obj.clear()
            alert(`hello tap with index ${index} and value ${value}!`);
            const newItemId = itemCount.value;
            obj.set(newItemId, `new value ${newItemId}`);
            alert(`new value with id ${newItemId} add in the end of list!`);
          },
        });
      },
      itemCount: itemCount,
    }),
    height: EdgeInsetsStep.s60,
    width: EdgeInsetsStep.s96,
  });
  const isEnabled = ref(true);

  return defineComponent({
    name: "App",
    setup() {
      const layoutMatrix = ref([
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
      ]);
      const navigationController = MultiProvider.get<NavigationController>(
        NavigationController
      );
      const gridViewDelegate = GridViewDelegate.use({
        gridViewItems: layoutMatrix.value.map((el) =>
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
      });
      const multiDropdownController = new MultiDropdownFieldController<IndexedText>(
        { keyofValue: "id" }
      );
      watch(
        multiDropdownController.reactive,
        (controllerValues) => {
          console.log({ controllerValues });
        },
        {
          deep: true,
          immediate: true,
        }
      );
      const reordableDelegate = ReordableListViewDelegate.use({
        gridViewItems: [],
      });
      onMounted(() => {
        for (const el of layoutMatrix.value) {
          reordableDelegate.addUpdate(
            GridViewItem({
              child: TextButton({
                child: Text({
                  text: ref(`text key  ljsdl f:${el.index}`),
                }),
                expand: true,
                onTap: () => alert(`Hola ${el.index}!`),
              }),
              position: el,
            })
          );
        }
      });
      const isDraggable = ref<boolean>(true);
      return () =>
        h(
          Align({
            // overlay: true,
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
                            title: ref(el.text),
                          })
                        ),
                      }),
                      ElevatedButton({
                        child: Text({
                          text: ref("Show dialog"),
                        }),
                        onTap: () => {
                          showDialog({
                            dialog: Dialog({
                              child: ElevatedButton({
                                child: Text({
                                  text: ref("Open dialog"),
                                }),
                                onTap: () => {
                                  showDialog({
                                    dialog: Dialog({
                                      child: Column({
                                        children: [
                                          Text({
                                            text: ref("Second Dialog"),
                                          }),
                                          ElevatedButton({
                                            child: Text({
                                              text: ref("close 2 dialogs"),
                                            }),
                                            onTap: () => {
                                              navigationController.pop(2);
                                            },
                                          }),
                                        ],
                                      }),
                                    }),
                                    navigationController,
                                  });
                                },
                              }),
                            }),
                            navigationController,
                          });
                        },
                      }),
                      HeroButton(),
                      MouseRegion({
                        child: textCard,
                        cursor: SystemMouseCursors.progress,
                      }),
                      ElevatedButton({
                        child: Text({ text: ref("") }),
                        onTap: () => {
                          console.log({ dropdownFieldController });
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
                  Column({
                    children: [
                      CheckboxListTile({
                        title: Text({ text: ref("is draggable") }),
                        value: isDraggable,
                      }),
                      ReordableListView<GenericGridViewItemPosition>({
                        delegate: reordableDelegate,
                        isDraggable,
                        onReorder: ({ newIndex, position }) => {
                          console.log({ newIndex, position });
                          const newPosition = position;
                          const i = layoutMatrix.value.findIndex(
                            (el) => el.index == newPosition?.index
                          );
                          if (i && newIndex != null) {
                            if (newPosition) {
                              layoutMatrix.value.splice(i, 1, position);
                              return;
                            }
                          }
                          layoutMatrix.value.splice(i, 1);
                        },
                      }),
                    ],
                  }),
                  // GridView.count({
                  //   isDraggable: ref(true),
                  //   isResizable: ref(true),
                  //   onPositionUpdate: (newPosition) => {
                  //     const i = layoutMatrix.value.findIndex(
                  //       (el) => el.index == newPosition?.index
                  //     );
                  //     // console.log({ i })
                  //     if (i) {
                  //       if (newPosition) {
                  //         layoutMatrix.value.splice(i, 1, newPosition);
                  //         return;
                  //       }
                  //       layoutMatrix.value.splice(i, 1);
                  //     }
                  //   },
                  //   delegate: gridViewDelegate,
                  // }),
                ],
              }),
            }),
          })
        );
    },
  });
};
