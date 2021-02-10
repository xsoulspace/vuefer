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
  Padding,
  Row,
  Scaffold,
  SizedBox,
  SystemMouseCursors,
  Text,
  TextButton,
  TextEditingController,
  TextField,
  Wrap,
} from '@/index'
import { computed, reactive, ref } from 'vue'
type IndexedText = {
  id: number
  text: string
}

export const wrapperApp = () => {
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
  const dropdown = DropdownButton({
    items: [
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
    ].map((el) =>
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
          onTap: () => {
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
        Wrap({
          children: items.value.map((el) =>
            Text({
              text: ref(el),
            })
          ),
        }),
        Column({
          children: [
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
          ],
        }),
        dynamicItems,
      ],
    }),
  })
  return Scaffold({
    body: Align({
      toOverlay: true,
      alignment: Alignment.center,
      child: temp,
    }),
  })
}
