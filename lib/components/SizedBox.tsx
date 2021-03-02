import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import {
  SizeBoxStep,
  SizedBoxHeight,
  SizedBoxWidth,
} from '../abstract/SizedBox'

interface SizedBoxI {
  child?: Component
  key?: Maybe<Key>
  height?: Maybe<EdgeInsetsStep | SizeBoxStep>
  width?: Maybe<EdgeInsetsStep | SizeBoxStep>
}

export const SizedBox = ({ child, width, height }: SizedBoxI) => {
  return defineComponent({
    name: 'SizedBox',
    setup() {
      const heightBox = new SizedBoxHeight({ height })
      const widthBox = new SizedBoxWidth({ width })

      return () =>
        h(
          'div',
          {
            class: [widthBox?.css ?? '', heightBox?.css ?? ''],
          },
          [h(child ?? <div />)]
        )
    },
  })
}
