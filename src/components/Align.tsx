import { Component, defineComponent, h } from 'vue'
import { Alignment, Key, Maybe } from '..'

export interface AlignI {
  child: Component
  alignment: Alignment
  // widthFactor?: EdgeInsetsStep;
  // heightFactor?: EdgeInsetsStep;
  toOverlay?: Maybe<boolean>
  key?: Maybe<Key>
}

export const Align = ({ child, toOverlay, alignment, key }: AlignI) => {
  const finalAlignment = alignment
  finalAlignment.toOverlay = toOverlay ?? false
  return defineComponent({
    name: 'Align',
    render() {
      return h('div', { class: finalAlignment.css }, [h(child)])
    },
  })
}
