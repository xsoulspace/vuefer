import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'
import { Align } from './Align'

export interface CenterI {
  child: Component
  key?: Maybe<Key>
}

export const Center = ({ child }: CenterI) => {
  return defineComponent({
    name: 'Center',
    render() {
      return h(
        Align({
          overlay: true,
          alignment: Alignment.center,
          child,
        })
      )
    },
  })
}
