import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { Key } from '../abstract/Key'

export interface AlignI {
  child: Component
  alignment: Alignment
  // widthFactor?: EdgeInsetsStep;
  // heightFactor?: EdgeInsetsStep;
  overlay?: Maybe<boolean>
  key?: Maybe<Key>
  _debugClasses?: Maybe<string>
}

export const Align = ({ child, overlay, alignment, _debugClasses }: AlignI) => {
  const finalAlignment = alignment
  finalAlignment.overlay = overlay ?? false
  return defineComponent({
    name: 'Align',
    render() {
      return h('div', { class: [finalAlignment.css, _debugClasses] }, [
        h(child),
      ])
    },
  })
}
