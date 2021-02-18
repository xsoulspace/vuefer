import { computed, defineComponent, h, ref } from 'vue'
import { BoxDecoration } from '../abstract/BoxDecoration'
import { BoxShadow } from '../abstract/BoxShadow'
import { Colors } from '../abstract/Colors'
import { MultiDropdownButtonI } from '../abstract/DropdownFieldController'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { ItemBuilder } from '../abstract/ItemBuilder'
import { MainAxisAlignment } from '../abstract/MainAxisAlignment'
import { MainAxisSize } from '../abstract/MainAxisSize'
import { TextEditingController } from '../abstract/TextEditingController'
import clickOutside from '../directives/VClickOutside'
import { unifyValue } from '../functions'
import { Container } from './Container'
import { GestureDetector } from './GestureDetector'
import { Icon, Icons } from './Icon'
import ListViewBuilder from './ListViewBuilder.vue'
import { Positioned } from './Positioned'
import { Row } from './Row'
import { SizedBox } from './SizedBox'
import { Stack } from './Stack'
import { TextField } from './TextField'
import { Visibility } from './Visibility'

export const MultiDropdownButton = <
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
}: MultiDropdownButtonI<I>) => {
  const resolvedIcon =
    icon ?? Icon(Icons.arrow_drop_down, { size: EdgeInsetsStep.s12 })

  const textFieldController = new TextEditingController({})
  textFieldController.text.value = ''

  const selectedItems = computed(() =>
    // FIXME: check is key selected
    items.filter((el) => el.key == controller.key.value)
  )

  const isMenuOpened = ref(false)

  /**
   * `1. User click on textField -> open dropdown
   *  2. User enter text in textfield -> dropdown filter items
   *  3. When user click on item
   * `3.1 we need to mark item as seleceted in checkbox
   *  3.2 we need to render selected item in selected items
   *  3.3 we need to change values in controller
   *  4. onDropdown Close - clear TextField
   */

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
                      // const oldValue = controller.value
                      // const item = effectiveItems.value[index]
                      // if (item == null) return Container({})
                      // controller.value = item.value
                      // controller.key.value = item.key
                      // textFieldController.text.value = item.title
                      // isMenuOpened.value = false
                      // if (onChanged && item.value) {
                      //   onChanged(item.value, oldValue)
                      // }
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
    directives: {
      clickOutside,
    },
    setup() {
      const closeMenu = () => {
        isMenuOpened.value = false
      }
      return () =>
        h(
          <div v-click-outside={closeMenu}>
            {h(
              Stack({
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
              })
            )}
          </div>
        )
    },
  })
}
