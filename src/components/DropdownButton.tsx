import {
  BoxDecoration,
  BoxShadow,
  EdgeInsetsStep,
  MainAxisAlignment,
  MainAxisSize,
} from '@/abstract'
import { Key } from '@/abstract/Key'
import { Component, computed, defineComponent, h, Ref } from 'vue'
import { Container } from './Container'
import { DropdownMenuItem } from './DropdownMenuItem'
import { GestureDetector } from './GestureDetector'
import { Icon, Icons } from './Icon'
import { ListItemBuilder } from './ListView'
import ListViewBuilder from './ListViewBuilder.vue'
import { Material } from './Material'
import { Positioned } from './Positioned'
import { Row } from './Row'
import { SizedBox } from './SizedBox'
import { Stack } from './Stack'
import { Text } from './Text'
interface DropdownButtonI<I> {
  items?: DropdownMenuItem<I>[]
  minItemHeight?: Maybe<Ref<number>>
  key?: Maybe<Key>
  onChanged?: Maybe<ValueChanged<I>>
  onTap?: Maybe<GestureTapCallback>
  value?: Maybe<Ref<Maybe<I>>>
  elevation?: Maybe<BoxShadow>
  icon?: Maybe<Component>
}

export const DropdownButton = <I extends string | number | boolean>({
  items,
  elevation,
  icon,
  onChanged,
  onTap,
  value,
  key,
  minItemHeight,
}: DropdownButtonI<I>) => {
  const resolvedIcon =
    icon ?? Icon(Icons.arrow_drop_down, { size: EdgeInsetsStep.s12 })
  const resolvedValue = computed(() => {
    if (value == null) return ''
    const refValue = value.value
    if (refValue == null) return ''
    return refValue
  })
  const resolvedItems = items ?? []
  const listItemBuilder: ListItemBuilder = ({ index }) => {
    return resolvedItems[index]
  }
  const itemsDropdown = defineComponent({
    name: 'items',
    components: {
      ListViewBuilder,
    },
    render() {
      return h(
        Positioned({
          top: EdgeInsetsStep.s11,
          child: SizedBox({
            child: Material({
              elevation,
              child: h(
                <list-view-builder
                  itemCount={resolvedItems.length}
                  itemBuilder={listItemBuilder}
                  minItemHeight={minItemHeight}
                  on-item-click={(index: number) => {
                    if (onChanged) {
                      const item = resolvedItems[index]
                      item
                      onChanged()
                    }
                  }}
                />
              ),
            }),
            width: EdgeInsetsStep.s10,
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
            children: [Text({ text: resolvedValue }), resolvedIcon],
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
