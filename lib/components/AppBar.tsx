import { Component, computed, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { Colors } from '../abstract/Colors'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import { MainAxisAlignment } from '../abstract/MainAxisAlignment'
import {
  SizeBoxStep,
  SizedBoxHeight,
  SizedBoxWidth,
} from '../abstract/SizedBox'
import { Column } from './Column'
import { Row } from './Row'
import { SizedBox } from './SizedBox'

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
  leadingWidth?: Maybe<EdgeInsetsStep>
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
  leadingWidth,
  // toolbarTextStyle,
  // titleTextStyle,
  automaticallyImplyLeading,
  leading,
  hideOnScroll,
}: AppBarI) => {
  const resolvedAutomaticallyImplyLeading = automaticallyImplyLeading ?? true
  const resolvedLeading =
    leading ?? (resolvedAutomaticallyImplyLeading ? <div /> : <div />)
  const resolvedLeadingWidth = leadingWidth ?? EdgeInsetsStep.s10

  return defineComponent({
    name: 'AppBar',
    setup() {
      // const resolvedBackgroundOpacity = new OpacityDecoration({
      //   opacity: toolbarOpacity ?? OpacityDecorationSteps.s100,
      // })
      // const resolvedBottomOpacity = bottomOpacity ?? OpacityDecorationSteps.s100
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
                      SizedBox({
                        child: h(resolvedLeading),
                        width: resolvedLeadingWidth,
                      }),
                      Row({
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [title ? h(title) : h(<div />)],
                      }),
                      Row({
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: actions?.map((el) => h(el)) ?? [],
                      }),
                    ],
                  }),
                  bottom
                    ? Row({
                        children: [...bottom],
                      })
                    : h(<div />),
                ],
              })
            ),
          ]
        )
    },
  })
}
