import { Component, computed, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import {
  SizeBoxStep,
  SizedBoxHeight,
  SizedBoxWidth,
} from '../abstract/SizedBox'
import { Align } from './Align'
import { Column } from './Column'
import { Row } from './Row'
interface AppBarI {
  key?: Maybe<Key>
  leading?: Maybe<Component>
  automaticallyImplyLeading?: Maybe<boolean>
  title?: Maybe<Component>
  actions?: Maybe<Component[]>
  // flexibleSpace
  bottom?: Maybe<Component[]>
  backgroundColor?: Maybe<Color>
  elevation?: Maybe<BoxShadow>
  hideOnScroll?: Maybe<boolean>
  // foregroundColor
  // brightness
  // centerTitle
  // toolbarOpacity?: OpacityDecorationSteps
  // bottomOpacity
  toolbarHeight?: Maybe<EdgeInsetsStep>
  // leadingWidth?: Maybe<EdgeInsetsStep>
  // toolbarTextStyle
  // titleTextStyle
}
export const AppBar = ({
  title,
  actions,
  bottom,
  elevation,
  backgroundColor,
  // brightness,
  // toolbarOpacity,
  // bottomOpacity,
  toolbarHeight,
  // leadingWidth,
  // toolbarTextStyle,
  // titleTextStyle,
  automaticallyImplyLeading,
  leading,
  hideOnScroll,
}: AppBarI) => {
  return defineComponent({
    name: 'AppBar',
    setup() {
      const resolvedAutomaticallyImplyLeading =
        automaticallyImplyLeading ?? true
      // const resolvedBackgroundOpacity = new OpacityDecoration({
      //   opacity: toolbarOpacity ?? OpacityDecorationSteps.s100,
      // })
      // const resolvedBottomOpacity = bottomOpacity ?? OpacityDecorationSteps.s100
      const resolvedLeading =
        leading ?? resolvedAutomaticallyImplyLeading ? <div /> : ''
      const classes = computed((): string[] => {
        return [
          hideOnScroll ? '' : 'fixed',
          (elevation ?? BoxShadow.lg).css,
          (backgroundColor ?? Colors.white).backgroundCss,
          new SizedBoxWidth({
            width: SizeBoxStep.max,
          }).css,
          new SizedBoxHeight({
            height: toolbarHeight ?? EdgeInsetsStep.s14,
          }).css,
          EdgeInsets.only({ bottom: EdgeInsetsStep.s2 }).marginCss,
        ]
      })
      return () =>
        h(
          'nav',
          {
            style: 'z-index: 50',
            class: classes.value,
          },
          [
            h(
              Column({
                children: [
                  Row({
                    children: [
                      resolvedLeading,
                      title ? h(title) : h(''),
                      Align({
                        alignment: Alignment.right,
                        child: Row({
                          children: [
                            h(
                              'ul',
                              {},
                              actions?.map((el) => h('li', {}, [h(el)]))
                            ),
                          ],
                        }),
                      }),
                    ],
                  }),
                  bottom
                    ? Row({
                        children: [...bottom],
                      })
                    : h(''),
                ],
              })
            ),
          ]
        )
    },
  })
}
