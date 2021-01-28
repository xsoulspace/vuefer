import {
  BoxDecoration,
  BoxShadow,
  Colors,
  EdgeInsetsStep,
  MainAxisAlignment,
  MainAxisSize,
  TextEditingController,
} from '@/abstract'
import { DropdownFieldController } from '@/abstract/DropdownFieldController'
import { unifyValue } from '@/functions/unifyValue'
import { Component, computed, defineComponent, h, Ref } from 'vue'
import { Container } from './Container'
import { DropdownMenuItemConstructor } from './DropdownMenuItem'
import { GestureDetector } from './GestureDetector'
import { Icon, Icons } from './Icon'
import { ListItemBuilder } from './ListView'
import ListViewBuilder from './ListViewBuilder.vue'
import { Positioned } from './Positioned'
import { Row } from './Row'
import { SizedBox } from './SizedBox'
import { Stack } from './Stack'
import { TextField } from './TextField'

interface DropdownButtonI<I> {
  items: DropdownMenuItemConstructor<I>[]
  minItemHeight?: Maybe<Ref<number>>
  // onChanged?: Maybe<ValueChanged<I>>
  elevation?: Maybe<BoxShadow>
  icon?: Maybe<Component>
  controller: DropdownFieldController<I>
}

export const DropdownButton = <
  I extends
    | string
    | number
    | boolean
    | { [prop: string]: any }
    | { [prop: number]: any }
>({
  items,
  elevation,
  icon,
  minItemHeight,
  controller,
}: DropdownButtonI<I>) => {
  const resolvedIcon =
    icon ?? Icon(Icons.arrow_drop_down, { size: EdgeInsetsStep.s12 })
  const textFieldController = new TextEditingController({})

  const itemsDropdown = defineComponent({
    name: 'items',
    components: {
      ListViewBuilder,
    },
    setup() {
      const selectedItem = computed(() =>
        items.find((el) => el.key == controller.key.value)
      )
      // init
      textFieldController.text.value = selectedItem.value?.title ?? ''

      const effectiveItems = computed(() =>
        items.filter((el) => {
          const isFound = unifyValue({ str: el?.value }).includes(
            unifyValue({ str: textFieldController.text.value })
          )
          return isFound
        })
      )

      const listItemBuilder: ListItemBuilder = ({ index }) => {
        const item = effectiveItems.value[index]
        if (item) return item.widget
        return Container({})
      }
      return () =>
        h(
          Positioned({
            top: EdgeInsetsStep.s11,
            child: SizedBox({
              child: Container({
                decoration: new BoxDecoration({
                  boxShadow: elevation ?? BoxShadow.md,
                  color: Colors.white,
                }),
                child: h(
                  <list-view-builder
                    itemCount={effectiveItems.value.length}
                    itemBuilder={listItemBuilder}
                    minItemHeight={minItemHeight}
                    onItemClick={(index: number) => {
                      const item = effectiveItems.value[index]
                      if (item == null) return Container({})
                      controller.value.value = item.value
                      controller.key.value = item.key
                      textFieldController.text.value = item.title
                      // if (onChanged && newValue) {
                      //   onChanged(newValue)
                      // }
                    }}
                  />
                ),
              }),
              width: EdgeInsetsStep.s36,
              height: EdgeInsetsStep.s56,
            }),
          })
        )
    },
  })

  const result = Stack({
    children: [
      SizedBox({
        child: Container({
          decoration: new BoxDecoration({ boxShadow: elevation }),
          child: Row({
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField({ controller: textFieldController }),
              resolvedIcon,
            ],
          }),
        }),
        height: EdgeInsetsStep.s5,
      }),
      itemsDropdown,
    ],
  })

  return defineComponent({
    name: 'DropdownButton',
    render() {
      return h(
        GestureDetector({
          child: result,
        })
      )
    },
  })
}
