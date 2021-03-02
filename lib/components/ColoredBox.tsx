import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { Key } from '../abstract/Key'

interface ColoredBoxI {
  child: Component
  key?: Maybe<Key>
  color: Color
}

export const ColoredBox = ({ child, color }: ColoredBoxI) => {
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
