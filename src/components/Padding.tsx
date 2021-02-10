import { Component, defineComponent, h } from 'vue'
import { EdgeInsets, Key, Maybe } from '..'

export const Padding = ({
  child,
  padding,
  key,
}: {
  child: Component
  padding: EdgeInsets
  key?: Maybe<Key>
}) =>
  defineComponent({
    name: 'Padding',
    render() {
      return h('div', { class: padding.paddingCss }, [h(child)])
    },
  })
