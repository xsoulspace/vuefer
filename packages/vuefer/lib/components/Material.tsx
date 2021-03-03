import { Component, defineComponent, h } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { BorderRadius } from '../abstract/BorderRadius'
import { BoxBorder } from '../abstract/BoxBorder'
import { BoxShadow } from '../abstract/BoxShadow'
import { Color } from '../abstract/Color'
import { TextStyle } from '../abstract/TextStyle'
export interface MaterialI {
  child: Component
  elevation?: Maybe<BoxShadow>
  textStyle?: Maybe<TextStyle>
  borderRadius?: Maybe<BorderRadius>
  color?: Maybe<Color>
  boxBorder?: Maybe<BoxBorder>
  // shadowColor?: Color;
  // animationDuration?: Duration
}

export const Material = ({
  child,
  color,
  borderRadius,
  elevation,
  boxBorder,
  // shadowColor,
  textStyle,
}: MaterialI) => {
  const resolvedElevation = elevation ?? BoxShadow.m
  return defineComponent({
    name: 'Material',
    render() {
      return h(
        'div',
        {
          class: [
            boxBorder?.css ?? '',
            resolvedElevation?.css ?? '',
            textStyle?.css ?? '',
            borderRadius?.css ?? '',
            color?.backgroundCss ?? '',
          ].join(' '),
        },
        [h(child)]
      )
    },
  })
}
