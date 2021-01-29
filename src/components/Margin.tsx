import { EdgeInsets } from '@/abstract/EdgeInsets'
import { Key } from '@/abstract/Key'
import { Component, defineComponent, h } from 'vue'

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
