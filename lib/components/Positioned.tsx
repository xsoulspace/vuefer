import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'

interface PositionedI {
  child: Component
  key?: Maybe<Key>
  left?: Maybe<EdgeInsetsStep>
  top?: Maybe<EdgeInsetsStep>
  right?: Maybe<EdgeInsetsStep>
  bottom?: Maybe<EdgeInsetsStep>
  // width?:
  // height?:
  _zIndex?: Maybe<number>
}

export const Positioned = ({
  child,
  key,
  bottom,
  left,
  right,
  top,
  _zIndex,
}: PositionedI) => {
  const edgeInsets = new EdgeInsets({ bottom, left, right, top })
  return defineComponent({
    name: 'Positioned',
    render() {
      return h(
        'div',
        {
          style: `z-index: ${_zIndex ?? 50};`,
          class: `absolute ${edgeInsets.positionedCss}`,
        },
        [h(child)]
      )
    },
  })
}
