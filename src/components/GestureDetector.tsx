import { Key } from '@/abstract'
import { Component, defineComponent, h } from 'vue'
export interface GestureDetectorI {
  child: Component
  key?: Maybe<Key>
  onTap?: Maybe<GestureTapCallback>
}

export const GestureDetector = ({ child, onTap, key }: GestureDetectorI) => {
  return defineComponent({
    name: 'GestureDetector',
    setup() {
      return { onTap }
    },
    render() {
      return h('div', { onClick: () => (this.onTap ? this.onTap() : '') }, [
        h(child),
      ])
    },
  })
}
