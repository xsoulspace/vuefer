import { Component, defineComponent, h, markRaw } from 'vue'
import { GridViewItemPosition, GridViewItemPreBuidler } from '../abstract/Grid'

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
