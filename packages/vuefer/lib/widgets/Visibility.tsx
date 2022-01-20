import { Component, defineComponent, h, Ref } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'

interface VisibilityI {
  child: Component
  key?: Maybe<Key>
  visible?: Maybe<Ref<Maybe<boolean>>>
}

export const Visibility = ({ child, visible }: VisibilityI) => {
  return defineComponent({
    name: 'Visibility',
    render() {
      return h(visible == null || visible.value == true ? child : <div />)
    },
  })
}
