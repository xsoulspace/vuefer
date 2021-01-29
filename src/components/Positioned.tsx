import { Component, defineComponent, h } from 'vue'
import { EdgeInsets, EdgeInsetsStep } from '../abstract'
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
}

export const Positioned = ({
  child,
  key,
  bottom,
  left,
  right,
  top,
}: PositionedI) => {
  const edgeInsets = new EdgeInsets({ bottom, left, right, top })
  return defineComponent({
    name: 'Positioned',
    render() {
      return h(
        'div',
        {
          class: `absolute z-50 ${edgeInsets.positionedCss}`,
        },
        [h(child)]
      )
    },
  })
}
