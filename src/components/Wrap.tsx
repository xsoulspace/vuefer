import { defineComponent, h } from 'vue'
import { FlexHelper, WrapI } from './Flex'

export const Wrap = ({
  children,
  mainAxisAlignment,
  mainAxisSize,
  crossAxisAlignment,
  direction,
  dividerDecoration,
  verticalDirection,
}: WrapI) => {
  return defineComponent({
    name: 'Wrap',
    render() {
      const classNames = FlexHelper.getClassNames({
        crossAxisAlignment,
        direction,
        mainAxisAlignment,
        mainAxisSize,
        verticalDirection,
        dividerDecoration,
      })
      if (children.length) {
        return h(
          'div',
          { class: [classNames, 'flex-wrap'].join(' ') },
          children.map((child) => h(child))
        )
      } else {
        return h('div')
      }
    },
  })
}
