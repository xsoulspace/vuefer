import { Component, defineComponent, h } from 'vue'
import { Alignment } from '../abstract/Alignment'
import { Maybe } from '../abstract/BasicTypes'
import { SystemMouseCursors } from '../abstract/MouseCursor'
import { Container } from './Container'
import { GestureDetector } from './GestureDetector'
import { MouseRegion } from './MouseRegion'
interface DropdownMenuItemI<I> {
  child: Component
  key: string
  onTap?: Maybe<CallableFunction>
  value?: Maybe<I>
  title: string
}

// The key must be assigned to let compare items automatically
export type DropdownMenuItemConstructor<I> = {
  widget: Component
  value?: Maybe<I>
  key: string
  title: string
}

export const DropdownMenuItem = <I extends unknown>({
  child,
  key,
  value,
  onTap,
  title,
}: DropdownMenuItemI<I>): DropdownMenuItemConstructor<I> => {
  return {
    widget: defineComponent({
      name: 'DropdownMenuItem',
      render() {
        return h(
          MouseRegion({
            child: GestureDetector({
              onTap: () => (onTap ? onTap() : ''),
              child: Container({ alignment: Alignment.left, child }),
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
