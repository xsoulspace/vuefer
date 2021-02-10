import { Component, defineComponent, h } from 'vue'
import { EdgeInsets, Key } from '..'

export const Margin = ({
  child,
  margin,
  key,
}: {
  child: Component
  margin: EdgeInsets
  key?: Key
}) =>
  defineComponent({
    name: 'Margin',
    render() {
      return h('div', { class: margin.marginCss }, [h(child)])
    },
  })
