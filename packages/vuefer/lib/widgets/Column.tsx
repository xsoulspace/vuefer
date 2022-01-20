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
  _debugClasses,
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
          { class: [classNames, _debugClasses] },
          children.map((child) => h(child))
        )
      } else {
        return h('div')
      }
    },
  })
}
