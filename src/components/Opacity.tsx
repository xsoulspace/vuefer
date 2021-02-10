import { Component, defineComponent, h } from 'vue'
import { Key, Maybe, OpacityDecoration } from '..'

interface OpacityI {
  child: Component
  key?: Maybe<Key>
  opacity: OpacityDecoration
}

export const Opacity = ({ child, key, opacity }: OpacityI) => {
  return defineComponent({
    name: 'Opacity',
    render() {
      return h(
        'div',
        {
          class: opacity.css,
        },
        [h(child)]
      )
    },
  })
}
