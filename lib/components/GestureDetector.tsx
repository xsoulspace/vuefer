import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'
export interface GestureDetectorI {
  child: Component
  key?: Maybe<Key>
  onTap?: Maybe<CallableFunction>
}

export const GestureDetector = ({ child, onTap }: GestureDetectorI) => {
  return defineComponent({
    name: 'GestureDetector',
    setup() {
      return { onTap }
    },
    render() {
      return h(
        'div',
        { onClick: async () => await (this.onTap ? this.onTap() : '') },
        [h(child)]
      )
    },
  })
}
