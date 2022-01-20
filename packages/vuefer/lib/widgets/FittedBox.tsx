import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { BoxFit } from '../abstract/BoxFit'

export const FittedBox = ({
  child,
  fit,
  alignment,
  _debugClasses,
}: {
  child: Component
  fit?: BoxFit
  alignment: Alignment
  _debugClasses?: Maybe<string>
}) =>
  defineComponent({
    name: 'FittedBox',
    render() {
      return h(
        'div',
        { class: [`${fit?.css} ${alignment?.css}`, _debugClasses] },
        h(child)
      )
    },
  })
