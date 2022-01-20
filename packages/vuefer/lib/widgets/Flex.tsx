import { Component, defineComponent, h } from 'vue'
import { Axis } from '../abstract/Axis'
import { Maybe } from '../abstract/BasicTypes'
import { CrossAxisAlignment } from '../abstract/CrossAxisAlignment'
import { DividerDecoration } from '../abstract/DividerDecoration'
import { MainAxisAlignment } from '../abstract/MainAxisAlignment'
import { MainAxisSize } from '../abstract/MainAxisSize'
import { VerticalDirection } from '../abstract/VerticalDirection'

export interface FlexBaseI {
  mainAxisAlignment?: Maybe<MainAxisAlignment>
  crossAxisAlignment?: Maybe<CrossAxisAlignment>
  mainAxisSize?: Maybe<MainAxisSize>
  verticalDirection?: Maybe<VerticalDirection>
  dividerDecoration?: Maybe<DividerDecoration>
}
export interface ColumnI extends FlexBaseI {
  _debugClasses?: Maybe<string>
  children: Component[]
}
export interface RowI extends FlexBaseI {
  children: Component[]
}
export interface FlexI extends FlexBaseI {
  children: Component[]
  direction?: Axis
  _debugClasses?: Maybe<string>
}
export interface WrapI extends FlexBaseI {
  children: Component[]
  direction?: Axis
}
interface GetFlexClassNames extends FlexBaseI {
  direction?: Axis
}
export class FlexHelper {
  static getClassNames({
    crossAxisAlignment,
    mainAxisAlignment,
    mainAxisSize,
    direction,
    verticalDirection,
    dividerDecoration,
  }: GetFlexClassNames): string[] {
    const finalDirection = direction ?? Axis.horizontal
    const finalAxisSize = mainAxisSize ?? MainAxisSize.min
    const finalMainAxisAlignment = mainAxisAlignment ?? MainAxisAlignment.start
    const finalCrossAxisAlignment =
      crossAxisAlignment ?? CrossAxisAlignment.start
    const finalVerticalDirection = verticalDirection ?? VerticalDirection.down
    return [
      'relative',
      'flex',
      'flex-grow',
      `flex-${finalDirection.css}${finalVerticalDirection.css}`,
      finalAxisSize.css,
      finalMainAxisAlignment.css,
      finalCrossAxisAlignment.css,
      dividerDecoration?.css ?? '',
    ]
  }
}
export const Flex = (arg: FlexI) =>
  defineComponent({
    name: 'Flex',
    render() {
      const classNames = FlexHelper.getClassNames(arg)
      if (arg.children.length) {
        return h(
          'div',
          { class: [classNames, arg._debugClasses] },
          arg.children.map((child) => h(child))
        )
      } else {
        return h('div')
      }
    },
  })
