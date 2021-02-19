import { BorderRadius } from '@/abstract'
import { computed, defineComponent, h, ref } from 'vue'
import { BoxDecoration } from '../abstract/BoxDecoration'
import { BoxShadow } from '../abstract/BoxShadow'
import { Colors } from '../abstract/Colors'
import {
  isMutliDropdownSelectedItem,
  MultiDropdownButtonI,
  MutliDropdownSelectedItemI,
  MutliDropdownSelectedValueI,
} from '../abstract/DropdownFieldController'
import { DropdownMenuItemConstructor } from '../abstract/DropdownMenuItem'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { ItemBuilder } from '../abstract/ItemBuilder'
import { MainAxisAlignment } from '../abstract/MainAxisAlignment'
import { MainAxisSize } from '../abstract/MainAxisSize'
import { TextEditingController } from '../abstract/TextEditingController'
import clickOutside from '../directives/VClickOutside'
import { createKeyedMap, unifyValue } from '../functions'
import { CheckboxListTile } from './CheckboxListTile'
import { Container } from './Container'
import { ElevatedButton } from './ElevatedButton'
import { GestureDetector } from './GestureDetector'
import { Icon, Icons } from './Icon'
import ListViewBuilder from './ListViewBuilder.vue'
import { Material } from './Material'
import { Positioned } from './Positioned'
import { Row } from './Row'
import { SizedBox } from './SizedBox'
import { Stack } from './Stack'
import { Text } from './Text'
import { TextField } from './TextField'
import { Visibility } from './Visibility'
import { Wrap } from './Wrap'

/**
 * Usage:
 *
 * Create controller in setup or anywehere and
 * give generic type to use
 *
 * ```typescript
 * const IndexedText {
 *   id: string
 *   text: string
 * }
 *
 *
 * const multiDropdownController = new MutliDropdownFieldController<IndexedText>(
 *   { keyofValue: 'id' }
 * )
 * ```
 *
 * Then use MultiDropdownButton with DropdownMenuItem in items
 * to make it work
 *
 * ```typescript
 * MultiDropdownButton({
 *   controller: multiDropdownController,
 *   items: dropdownItems.map((el) =>
 *     DropdownMenuItem({
 *       child: Text({
 *         text: ref(el.text),
 *       }),
 *       value: el,
 *       key: el.id,
 *       title: el.text,
 *     })
 *   ),
 * }),
 * ```
 *
 * To get or change selected values use:
 * `controller.value`
 *
 */
export const MultiDropdownButton = <
  TValue extends
    | string
    | number
    | boolean
    | { [prop: string]: any }
    | { [prop: number]: any },
  TKeyValue extends MutliDropdownSelectedItemI<TValue>
>({
  items,
  elevation,
  icon,
  minItemHeight,
  controller,
  onChanged,
  onTapSelected,
}: MultiDropdownButtonI<TValue, TKeyValue>) => {
  const resolvedIcon =
    icon ?? Icon(Icons.arrow_drop_down, { size: EdgeInsetsStep.s12 })

  const textFieldController = new TextEditingController({})
  textFieldController.text.value = ''

  const selectedItems = computed(() =>
    items.filter((el) => controller.valueIndexesByKeyMap.has(el.key))
  )
  const selectedItemsMap = computed(() =>
    createKeyedMap<
      TKeyValue['key'] | string,
      DropdownMenuItemConstructor<TValue>
    >({
      arr: selectedItems.value,
      key: 'key',
      unifyValues: false,
    })
  )
  const isMenuOpened = ref(false)
  const deleteSeletedItem = async ({
    key,
  }: {
    key: TKeyValue['key'] | string
  }) => {
    const index = controller.valueIndexesByKeyMap.get(key)
    if (index != null) {
      const val = controller.keyValue[index]
      controller.keyValue.splice(index, 1)
      if (onChanged) await onChanged(null, val?.value)
      return
    }
    if (onChanged) await onChanged(null, null)
  }
  const selectItem = async ({
    item,
    key,
  }: {
    item: MutliDropdownSelectedValueI<DropdownMenuItemConstructor<TValue>>
    key: TKeyValue['key'] | string
  }) => {
    const val = item.value.value
    if (val != null) {
      const selectedItem: MutliDropdownSelectedItemI<TValue> = {
        key,
        value: val,
      }

      const selectedItemIndex = controller.valueIndexesByKeyMap.get(key)
      if (isMutliDropdownSelectedItem<TValue, TKeyValue>(selectedItem)) {
        if (selectedItemIndex != null && selectedItemIndex >= 0) {
          controller.keyValue.splice(selectedItemIndex, 1, selectedItem)
        } else {
          controller.keyValue.unshift(selectedItem)
        }
        if (onChanged) await onChanged(val, null)
        return
      }
    }
  }
  /**
   * `1. User click on textField -> open dropdown
   *  2. User enter text in textfield -> dropdown filter items
   *  3. When user click on item
   * `3.1 we need to mark item as seleceted in checkbox
   *  3.2 we need to render selected item in selected items
   *  3.3 we need to change values in controller
   *  4. onDropdown Close - clear TextField
   * // TODO: if we have onCreateNew callback, then we can push value to that callback
   *
   */

  const itemsDropdown = defineComponent({
    name: 'items',
    components: {
      ListViewBuilder,
    },
    setup() {
      const effectiveItems = computed<
        MutliDropdownSelectedValueI<DropdownMenuItemConstructor<TValue>>[]
      >(() =>
        items
          .filter((el) => {
            const isFound = unifyValue({ str: el?.value }).includes(
              unifyValue({ str: textFieldController.text.value })
            )
            return isFound
          })
          .map((el) => ({
            selected: selectedItemsMap.value.has(el.key),
            value: el,
          }))
      )

      const itemBuilder: ItemBuilder = ({ index }) => {
        const item = effectiveItems.value[index]
        if (item)
          return CheckboxListTile({
            title: item.value.widget,
            selected: ref(item.selected),
            value: ref(item.selected),
            onTap: async () => {
              const key = item.value['key']
              if (item.selected) {
                // delete item
                await deleteSeletedItem({ key })
              } else {
                await selectItem({ key, item })
              }
            },
          })
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
        textFieldController.text.value = ''
      }
      return () =>
        h(
          <>
            <div v-click-outside={closeMenu}>
              {h(
                Stack({
                  children: [
                    GestureDetector({
                      child: Material({
                        child: Row({
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TextField({ controller: textFieldController }),
                            resolvedIcon,
                          ],
                        }),
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
            {h(
              Material({
                child: Wrap({
                  children: [
                    ...selectedItems.value.map((item) =>
                      GestureDetector({
                        onTap: async () => {
                          if (onTapSelected) await onTapSelected(item.value)
                        },
                        child: Container({
                          child: Row({
                            children: [
                              Text({
                                text: ref(item.title),
                              }),
                              ElevatedButton({
                                child: Text({ text: ref('x') }),
                                onTap: async () => {
                                  await deleteSeletedItem({
                                    key: item.key,
                                  })
                                },
                              }),
                            ],
                          }),
                          decoration: new BoxDecoration({
                            borderRadius: BorderRadius.circular(),
                          }),
                          padding: EdgeInsets.all(EdgeInsetsStep.s3),
                        }),
                      })
                    ),
                  ],
                }),
              })
            )}
          </>
        )
    },
  })
}
