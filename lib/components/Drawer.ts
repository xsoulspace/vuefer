import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BoxShadow } from '../abstract/BoxShadow'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import {
  SizeBoxStep,
  SizedBoxHeight,
  SizedBoxWidth,
} from '../abstract/SizedBox'

interface DrawerI {
  child: Component
  elevation?: Maybe<BoxShadow>
  backgroundColor
}

export const Drawer = ({ backgroundColor, child, elevation }: DrawerI) => {
  return defineComponent({
    name: 'Drawer',
    setup() {
      const heightBox = new SizedBoxHeight({ height: SizeBoxStep.max })
      const widthBox = new SizedBoxWidth({ width: EdgeInsetsStep.s56 })

      return () =>
        h(
          'div',
          {
            class: [
              elevation?.css ?? BoxShadow.lg.css,
              EdgeInsets.all(EdgeInsetsStep.s10).paddingCss,
              heightBox.css,
              widthBox.css,
              backgroundColor?.backgroundCss ?? Colors.white.backgroundCss,
            ],
          },
          [h(child)]
        )
    },
  })
}
