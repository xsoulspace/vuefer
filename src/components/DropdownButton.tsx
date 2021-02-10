import { unifyValue } from '@/utils'
import { onClickOutside } from '@vueuse/core'
import { Component, computed, defineComponent, h, ref, Ref } from 'vue'
import {
  Container,
  DropdownMenuItemConstructor,
  GestureDetector,
  Icon,
  Icons,
  Positioned,
  Row,
  SizedBox,
  Stack,
  TextField,
  Visibility,
} from '.'
import {
  BoxDecoration,
  BoxShadow,
  Colors,
  DropdownFieldController,
  EdgeInsets,
  EdgeInsetsStep,
  ItemBuilder,
  MainAxisAlignment,
  MainAxisSize,
  Maybe,
  TextEditingController,
  ValueChanged,
} from '..'
import ListViewBuilder from './ListViewBuilder.vue'

interface DropdownButtonI<I> {
  items: DropdownMenuItemConstructor<I>[]
  minItemHeight?: Maybe<Ref<number>>
  onChanged?: Maybe<ValueChanged<I>>
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
  onChanged,
}: DropdownButtonI<I>) => {
  const resolvedIcon =
    icon ?? Icon(Icons.arrow_drop_down, { size: EdgeInsetsStep.s12 })
  const textFieldController = new TextEditingController({})
  const selectedItem = computed(() =>
    items.find((el) => el.key == controller.key.value)
  )
  // init
  textFieldController.text.value = selectedItem.value?.title ?? ''
  const isMenuOpened = ref(false)

  const itemsDropdown = defineComponent({
    name: 'items',
    components: {
      ListViewBuilder,
    },
    setup() {
      const effectiveItems = computed(() =>
        items.filter((el) => {
          const isFound = unifyValue({ str: el?.value }).includes(
            unifyValue({ str: textFieldController.text.value })
          )
          return isFound
        })
      )

      const itemBuilder: ItemBuilder = ({ index }) => {
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
                padding: EdgeInsets.only({
                  left: EdgeInsetsStep.s2,
                  top: EdgeInsetsStep.s2,
                }),
                decoration: new BoxDecoration({
                  boxShadow: elevation ?? BoxShadow.md,
                  color: Colors.white,
                }),
                child: h(
                  <list-view-builder
                    itemCount={effectiveItems.value.length}
                    itemBuilder={itemBuilder}
                    minItemHeight={minItemHeight}
                    onItemClick={(index: number) => {
                      const oldValue = controller.value
                      const item = effectiveItems.value[index]
                      if (item == null) return Container({})
                      controller.value = item.value
                      controller.key.value = item.key
                      textFieldController.text.value = item.title
                      isMenuOpened.value = false
                      if (onChanged && item.value) {
                        onChanged(item.value, oldValue)
                      }
                    }}
                  />
                ),
              }),
              width: EdgeInsetsStep.s44,
              height: EdgeInsetsStep.s56,
            }),
          })
        )
    },
  })

  return defineComponent({
    name: 'DropdownButton',
    setup() {
      const target = ref(null)
      onClickOutside(target, (event) => (isMenuOpened.value = false))
      return () =>
        h(
          <div ref={target}>
            {h(
              GestureDetector({
                child: Stack({
                  children: [
                    GestureDetector({
                      child: SizedBox({
                        child: Container({
                          decoration: new BoxDecoration({
                            boxShadow: elevation,
                          }),
                          child: Row({
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              TextField({ controller: textFieldController }),
                              resolvedIcon,
                            ],
                          }),
                        }),
                        height: EdgeInsetsStep.s10,
                      }),
                      onTap: () => {
                        if (!isMenuOpened.value) {
                          isMenuOpened.value = true
                        }
                      },
                    }),
                    Visibility({
                      child: itemsDropdown,
                      visible: isMenuOpened,
                    }),
                  ],
                }),
              })
            )}
          </div>
        )
    },
  })
}
