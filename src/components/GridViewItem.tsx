import { defineComponent, markRaw } from '@vue/runtime-core'
import { Component, h } from 'vue'
import { GridViewItemPosition, GridViewItemPreBuidler } from '..'

interface GridViewItemI {
  child: Component
  position: GridViewItemPosition
}
export const GridViewItem = ({
  position,
  child,
}: GridViewItemI): GridViewItemPreBuidler => {
  return {
    widget: markRaw(
      defineComponent({
        name: 'GridViewItem',
        render() {
          return h(child)
        },
      })
    ),
    position,
  }
}
