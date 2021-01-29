import { Key } from '@/abstract/Key'
import { Component, defineComponent, h, Ref } from 'vue'

interface VisibilityI {
  child: Component
  key?: Maybe<Key>
  visible?: Maybe<Ref<Maybe<boolean>>>
}

export const Visibility = ({ child, key, visible }: VisibilityI) => {
  return defineComponent({
    name: 'Visibility',
    render() {
      return h(visible == null || visible.value == true ? child : <div />)
    },
  })
}
