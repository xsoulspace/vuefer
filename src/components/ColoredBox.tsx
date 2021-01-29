import { Component, defineComponent, h } from 'vue'
import { Color, Colors, Key } from '../abstract'

interface ColoredBoxI {
  child: Component
  key?: Maybe<Key>
  color: Color
}

export const ColoredBox = ({ child, key, color }: ColoredBoxI) => {
  return defineComponent({
    name: 'ColoredBox',
    render() {
      return h(
        'div',
        {
          class: (color ?? Colors.transparent).backgroundCss,
        },
        [h(child)]
      )
    },
  })
}
