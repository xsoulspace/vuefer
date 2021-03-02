import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'
import {
  OpacityDecoration,
  OpacityDecorationSteps,
} from '../abstract/OpacityDecoration'

interface OpacityI {
  child: Component
  key?: Maybe<Key>
  opacity: OpacityDecorationSteps
}

export const Opacity = ({ child, opacity }: OpacityI) => {
  return defineComponent({
    name: 'Opacity',
    setup() {
      const resolvedOpacity = new OpacityDecoration({
        opacity,
      })
      return () =>
        h(
          'div',
          {
            class: resolvedOpacity.css,
          },
          [h(child)]
        )
    },
  })
}
