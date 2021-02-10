import { defineComponent, h } from '@vue/runtime-core'
import { Component } from 'vue'
import { GridItem } from 'vue-grid-layout'
import { GridViewItemBuidler, GridViewItemPosition, ValueChanged } from '..'
import { deepCopyObj } from '../utils'

interface GridViewItemI {
  child: Component
  position: GridViewItemPosition
  onPositionUpdate: ValueChanged<GridViewItemPosition>
}
export const GridViewItem = (arg: GridViewItemI): GridViewItemBuidler => {
  return {
    widget: defineComponent({
      name: 'GridViewItem',
      render() {
        return h(
          GridItem,
          {
            w: arg.position.width,
            h: arg.position.height,
            x: arg.position.x,
            y: arg.position.y,
            key: arg.position.key,
            onResized: async (
              key: GridViewItemPosition['key'],
              newHeight: GridViewItemPosition['height'],
              newWidth: GridViewItemPosition['width']
            ) => {
              const newPosition = deepCopyObj(arg.position)
              const oldPosition = deepCopyObj(arg.position)
              newPosition.height = newHeight
              newPosition.width = newWidth
              await arg.onPositionUpdate(newPosition, oldPosition)
            },
            onMoved: async (
              key: GridViewItemPosition['key'],
              newX: GridViewItemPosition['x'],
              newY: GridViewItemPosition['y']
            ) => {
              const newPosition = deepCopyObj(arg.position)
              const oldPosition = deepCopyObj(arg.position)
              newPosition.x = newX
              newPosition.y = newY
              await arg.onPositionUpdate(newPosition, oldPosition)
            },
          },
          [h(arg.child)]
        )
      },
    }),
    position: arg.position,
  }
}
