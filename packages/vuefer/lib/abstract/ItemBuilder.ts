import { Component } from 'vue'

export interface ItemBuilderContext {
  index: number
}
export type ItemBuilder = ({ index }: ItemBuilderContext) => Component
