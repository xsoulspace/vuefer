import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { BoxConstraints } from '../abstract/BoxConstraints'
import { BoxDecoration } from '../abstract/BoxDecoration'
import { Color } from '../abstract/Color'
import { EdgeInsets, EdgeInsetsStep } from '../abstract/EdgeInsets'
import { Key } from '../abstract/Key'
import { SizedBoxHeight, SizedBoxWidth } from '../abstract/SizedBox'

interface ContainerI {
  child?: Component
  padding?: Maybe<EdgeInsets>
  margin?: Maybe<EdgeInsets>
  color?: Maybe<Color>
  width?: Maybe<EdgeInsetsStep>
  height?: Maybe<EdgeInsetsStep>
  decoration?: Maybe<BoxDecoration>
  // TODO: add ConstrainedBox
  constraints?: Maybe<BoxConstraints>
  // TODO: add Align
  alignment?: Maybe<Alignment>
  _debugClasses?: Maybe<string>
  key?: Maybe<Key>
}
export const Container = ({
  child,
  padding,
  margin,
  color,
  height,
  width,
  decoration,
  constraints,
  alignment,
  _debugClasses,
  key,
}: ContainerI) => {
  const component = defineComponent({
    name: 'Container',
    setup() {
      const finalConstraints = constraints ?? new BoxConstraints({})
      const finalAlignment = alignment ?? Alignment.left
      const sizedBoxHeight = new SizedBoxHeight({ height: height ?? undefined })
      const sizedBoxWidth = new SizedBoxWidth({ width: width ?? undefined })
      const innerWidget = child ?? <div />
      const decorationColor = decoration?.color
      if (decorationColor && color)
        throw Error(
          'You cannot choose simultaniously both colors in decorator and in component! Prefer to use only one'
        )
      const containerClass = [
        'relative',
        'container',
        'flex',
        margin?.marginCss,
        padding?.paddingCss,
        finalConstraints.css,
        finalAlignment.css,
        decorationColor?.backgroundCss ?? color?.backgroundCss ?? '',
        decoration?.css ?? '',
        sizedBoxHeight.css,
        sizedBoxWidth.css,
        _debugClasses,
      ]
      const params = { class: containerClass, key: key?.value }
      return () => h('div', params, [h(innerWidget)])
    },
  })
  return component
}
