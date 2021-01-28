import { Alignment } from '@/abstract'
import { Component, defineComponent, h } from 'vue'
import { Container } from './Container'
import { GestureDetector } from './GestureDetector'

interface DropdownMenuItemI<I> {
  child: Component
  key: string
  onTap?: Maybe<GestureTapCallback>
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
          GestureDetector({
            onTap: () => (onTap ? onTap() : ''),
            child: Container({ alignment: Alignment.left, child }),
          })
        )
      },
    }),
    value,
    key,
    title,
  }
}
