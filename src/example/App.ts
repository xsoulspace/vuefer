import {
  Align,
  CheckboxListTile,
  Column,
  Container,
  DropdownButton,
  DropdownMenuItem,
  ElevatedButton,
  ListView,
  MouseRegion,
  Padding,
  Row,
  Scaffold,
  SizedBox,
  Text,
  TextButton,
  TextField,
} from '@/components'
import { computed, reactive, ref } from 'vue'
import {
  Alignment,
  BorderRadius,
  BorderRadiusStep,
  BoxDecoration,
  BoxShadow,
  ButtonStyle,
  Colors,
  CrossAxisAlignment,
  DropdownFieldController,
  EdgeInsets,
  EdgeInsetsStep,
  MainAxisAlignment,
  SystemMouseCursors,
  TextDecoration,
  TextDecorations,
  TextEditingController,
  TextStyle,
} from '../abstract'

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
  const items = computed(() => Array.from(obj.values()))
  const itemCount = computed(() => obj.size)

  const dynamicItems = SizedBox({
    child: ListView.builder({
      itemBuilder: ({ index }) => {
        const value = items.value[index]
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
            obj.clear()
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
  const dropdownFieldController = new DropdownFieldController<IndexedText>({
    value: { id: 1, text: 'Hola!' },
    key: '1',
  })
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
            DropdownButton({
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
            }),
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
