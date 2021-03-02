import { defineComponent, h } from 'vue'
import { Axis } from '../abstract/Axis'
import { ColumnI, FlexHelper } from './Flex'

export const Column = ({
  children,
  mainAxisAlignment,
  mainAxisSize,
  verticalDirection,
  crossAxisAlignment,
  dividerDecoration,
}: ColumnI) => {
  return defineComponent({
    name: 'Column',
    render() {
      const classNames = FlexHelper.getClassNames({
        crossAxisAlignment,
        direction: Axis.vertical,
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
