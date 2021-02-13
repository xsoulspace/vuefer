import { DialogController } from '@/abstract/Dialog'
import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { Border } from '../abstract/Border'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { EdgeInsets } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'

interface DialogI {
  key: Key
  backgroundColor?: Maybe<Color>
  elevation?: Maybe<BoxShadow>
  //  insetAnimationDuration
  //  insetAnimationCurve,
  insetPadding?: Maybe<EdgeInsets>
  border?: Maybe<Border>
  child: Component
  controller: DialogController
}

export const Dialog = ({
  child,
  key,
  backgroundColor,
  border,
  elevation,
  insetPadding,
}: DialogI) => {
  return defineComponent({
    name: 'Dialog',
    setup() {
      return () =>
        h(
          <teleport to="body">
            <div
              class={[
                backgroundColor?.backgroundCss,
                border?.css,
                elevation?.css,
                insetPadding?.paddingCss,
              ].join(' ')}
            >
              {h(child)}
            </div>
          </teleport>
        )
    },
  })
}
