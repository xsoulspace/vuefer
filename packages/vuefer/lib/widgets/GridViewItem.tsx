import { Component, defineComponent, h, markRaw } from 'vue'
import { GridViewItemPosition, GridViewItemPreBuidler } from '../abstract/Grid'

interface GridViewItemI<TPosition extends GridViewItemPosition> {
  child: Component
  position: TPosition
}
export const GridViewItem = <TPosition extends GridViewItemPosition>({
  position,
  child,
}: GridViewItemI<TPosition>): GridViewItemPreBuidler<TPosition> => {
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
