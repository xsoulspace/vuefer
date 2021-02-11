import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BoxConstraints } from '../abstract/BoxConstraints'
import { Key } from '../abstract/Key'
export const ConstrainedBox = ({
  child,
  key,
  constraints,
}: {
  child: Component
  constraints: BoxConstraints
  key?: Maybe<Key>
}) => {
  return defineComponent({
    name: 'ConstrainedBox',
    render() {
      return h('div', { class: constraints.css }, [h(child)])
    },
  })
}
