import { Component, defineComponent, h } from 'vue'
import { BorderRadius } from '../abstract/BorderRadius'
import { Color } from '../abstract/Color'
import { Key } from '../abstract/Key'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import { GestureDetector, GestureDetectorI } from './GestureDetector'
import { MouseRegion } from './MouseRegion'
export interface InkWellI extends GestureDetectorI {
  child: Component
  key?: Maybe<Key>
  mouseCursor?: Maybe<SystemMouseCursors>
  focusColor?: Maybe<Color>
  borderRadius?: Maybe<BorderRadius>
  hoverColor?: Maybe<Color>
  highlightColor?: Maybe<Color>
  // overlayColor?: Color;
  // onHighlightChanged?: ValueChanged<bool>
  // onHover?: ValueChanged<bool>
  // TODO: add ripple effect
  // splashFactory: InkRipple.splashFactory
  // splashColor:
  // autofocus: boolean
  // customBorder: ShapeBorder
}
export const InkWell = ({
  child,
  mouseCursor,
  onTap,
  key,
  borderRadius,
  focusColor,
  highlightColor,
  hoverColor,
}: InkWellI) => {
  const result = MouseRegion({
    child: GestureDetector({
      onTap,
      child,
    }),
    cursor: mouseCursor ?? SystemMouseCursors.none,
  })
  return defineComponent({
    name: 'InkWell',
    render() {
      return h(
        'div',
        {
          class: [
            focusColor?.focusCss ?? '',
            borderRadius?.css ?? '',
            hoverColor?.hoverBackgroundCss ?? '',
            highlightColor?.highlightCss ?? '',
          ].join(' '),
        },
        [h(result)]
      )
    },
  })
}
