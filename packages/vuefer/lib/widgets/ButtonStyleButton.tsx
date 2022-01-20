// ABSTRACT WIDGET! DO NOT USE IT

import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BoxConstraints } from '../abstract/BoxConstraints'
import { ButtonStyle } from '../abstract/ButtonStyle'
import { Key } from '../abstract/Key'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import { OpacityDecorationSteps } from '../abstract/OpacityDecoration'
import { ConstrainedBox } from './ConstrainedBox'
import { InkWell } from './InkWell'
import { Material } from './Material'
import { Opacity } from './Opacity'
import { Padding } from './Padding'

export interface ButtonStyleButtonI {
  child: Component
  key?: Maybe<Key>
  style?: Maybe<ButtonStyle>
  onTap?: Maybe<CallableFunction>
  expand?: boolean
  _debugClasses?: Maybe<string>
}
export const ButtonStyleButton = ({
  child,
  onTap,
  style,
  expand,
  _debugClasses,
  key,
}: ButtonStyleButtonI) => {
  const isDisabled = onTap == null
  const constraints = new BoxConstraints({})
  const finalStyle = style ?? ButtonStyle.default
  const {
    padding,
    backgroundColor,
    elevation,
    mouseCursor,
    borderRadius,
    boxBorder,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
  } = finalStyle

  const materialWidget = Material({
    borderRadius,
    color: backgroundColor,
    elevation: elevation,
    textStyle,
    boxBorder,
    child: InkWell({
      focusColor,
      highlightColor,
      hoverColor,
      mouseCursor: isDisabled ? SystemMouseCursors.basic : mouseCursor.cursor,
      onTap,
      child: Padding({
        padding,
        child: child,
      }),
    }),
  })

  const result = ConstrainedBox({
    constraints,
    child: isDisabled
      ? Opacity({
          child: materialWidget,
          opacity: OpacityDecorationSteps.s50,
        })
      : materialWidget,
  })
  return defineComponent({
    name: 'ButtonStyleButton',
    render() {
      return h(
        'div',
        {
          class: [
            'relative select-none',
            expand ? 'w-full' : '',
            _debugClasses,
          ],
          key: key?.value,
        },
        [h(result)]
      )
    },
  })
}
