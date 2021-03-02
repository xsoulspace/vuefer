import { Component, Ref } from 'vue'
import { Maybe } from './BasicTypes'

// The key must be assigned to let compare items automatically
export type DropdownMenuItemConstructor<I> = {
  widget: Component
  value?: Maybe<I>
  key: string
  title: Ref<string>
}
