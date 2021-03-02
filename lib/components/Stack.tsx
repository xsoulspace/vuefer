import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'

interface StackI {
  children: Component[]
  key?: Maybe<Key>
}

export const Stack = ({ children, key }: StackI) => {
  return defineComponent({
    name: 'Stack',
    render() {
      return h(
        'div',
        {
          class: 'relative',
        },
        [...children.map((el) => h(el))]
      )
    },
  })
}
