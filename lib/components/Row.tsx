import { defineComponent, h } from 'vue'
import { Axis } from '../abstract/Axis'
import { FlexHelper, RowI } from './Flex'

export const Row = ({
  children,
  mainAxisAlignment,
  mainAxisSize,
  verticalDirection,
  crossAxisAlignment,
  dividerDecoration,
}: RowI) => {
  return defineComponent({
    name: 'Column',
    render() {
      const classNames = FlexHelper.getClassNames({
        crossAxisAlignment,
        direction: Axis.horizontal,
        mainAxisAlignment,
        mainAxisSize,
        verticalDirection,
        dividerDecoration,
      })
      if (children.length) {
        return h(
          'div',
          { class: classNames },
          children.map((child) => h(child))
        )
      } else {
        return h('div')
      }
    },
  })
}
