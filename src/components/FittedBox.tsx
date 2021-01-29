import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { BoxFit } from '../abstract/BoxFit'

export const FittedBox = ({
  child,
  fit,
  alignment,
}: {
  child: Component
  fit?: BoxFit
  alignment: Alignment
}) =>
  defineComponent({
    name: 'FittedBox',
    render() {
      return h('div', { class: `${fit?.css} ${alignment?.css}` }, h(child))
    },
  })
