import { Alignment } from '@/abstract'
import { Key } from '@/abstract/Key'
import { Component, defineComponent, h } from 'vue'
import { Container } from './Container'

interface DropdownMenuItemI<I> {
  child: Component
  key?: Maybe<Key>
  onTap?: ValueChanged<I>
  value?: I
}

export type DropdownMenuItem<I = any> = (arg: DropdownMenuItemI<I>) => Component

export const DropdownMenuItem: DropdownMenuItem = <I extends any>({
  child,
  key,
}: DropdownMenuItemI<I>) => {
  return defineComponent({
    name: 'DropdownMenuItem',
    render() {
      return h(Container({ alignment: Alignment.center, child }))
    },
  })
}
