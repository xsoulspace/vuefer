import { Component, defineComponent, h } from 'vue'
import { BorderRadius, BoxBorder, BoxShadow, Color, Maybe, TextStyle } from '..'
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
