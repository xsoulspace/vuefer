import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BoxConstraints } from '../abstract/BoxConstraints'
import { Key } from '../abstract/Key'
export const ConstrainedBox = ({
  child,
  constraints,
  _debugClasses,
}: {
  child: Component
  constraints: BoxConstraints
  key?: Maybe<Key>
  _debugClasses?: Maybe<string>
}) => {
  return defineComponent({
    name: 'ConstrainedBox',
    render() {
      return h('div', { class: [constraints.css, _debugClasses] }, [h(child)])
    },
  })
}
