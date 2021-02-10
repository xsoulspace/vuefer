import { Component, defineComponent, h } from 'vue'
import { Align } from '.'
import { Alignment, Key, Maybe } from '..'

export interface CenterI {
  child: Component
  key?: Maybe<Key>
}

export const Center = ({ child, key }: CenterI) => {
  return defineComponent({
    name: 'Center',
    render() {
      return h(
        Align({
          toOverlay: true,
          alignment: Alignment.center,
          child,
        })
      )
    },
  })
}
