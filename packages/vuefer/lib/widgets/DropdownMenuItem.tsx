import { Component, defineComponent, h, Ref } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { DropdownMenuItemConstructor } from '../abstract/DropdownMenuItem'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import { Container } from './Container'
import { GestureDetector } from './GestureDetector'
import { MouseRegion } from './MouseRegion'
interface DropdownMenuItemI<I> {
  child: Component
  key: string
  onTap?: Maybe<CallableFunction>
  value: Maybe<I>
  title: Ref<string>
  _debugClasses?: Maybe<string>
}

export const DropdownMenuItem = <I extends unknown>({
  child,
  key,
  value,
  onTap,
  title,
  _debugClasses,
}: DropdownMenuItemI<I>): DropdownMenuItemConstructor<I> => {
  return {
    widget: defineComponent({
      name: 'DropdownMenuItem',
      render() {
        return h(
          MouseRegion({
            child: GestureDetector({
              onTap: () => (onTap ? onTap() : ''),
              child: Container({
                _debugClasses,
                alignment: Alignment.left,
                child,
              }),
            }),
            cursor: SystemMouseCursors.click,
          })
        )
      },
    }),
    value,
    key,
    title,
  }
}
