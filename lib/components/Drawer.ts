import { Component, computed, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import {
  SizeBoxStep,
  SizedBoxHeight,
  SizedBoxWidth,
} from '../abstract/SizedBox'

interface DrawerI {
  child: Component
  backgroundColor?: Maybe<Color>
  elevation?: Maybe<BoxShadow>
  alignment?: Maybe<Alignment>
}

export interface DrawerBuilder {
  widget: Component
  alignment?: Maybe<Alignment>
}

export const Drawer = ({
  backgroundColor,
  child,
  elevation,
  alignment,
}: DrawerI): DrawerBuilder => {
  return {
    alignment,
    widget: defineComponent({
      name: 'Drawer',
      setup() {
        const heightBox = new SizedBoxHeight({ height: SizeBoxStep.max })
        const widthBox = new SizedBoxWidth({ width: EdgeInsetsStep.s56 })
        const classes = computed((): string[] => {
          return [
            (elevation ?? BoxShadow.lg).css,
            EdgeInsets.all(EdgeInsetsStep.s10).paddingCss,
            heightBox.css,
            widthBox.css,
            (backgroundColor ?? Colors.white).backgroundCss,
          ]
        })
        return () =>
          h(
            'div',
            {
              class: classes.value,
            },
            [h(child)]
          )
      },
    }),
  }
}
