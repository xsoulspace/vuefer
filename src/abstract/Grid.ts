import { Component, reactive } from 'vue'
import { Maybe } from './BasicTypes'

export interface GridViewItemPosition {
  x: number
  y: number
  width: number
  height: number
  key: string
}
export interface GridViewItemBuidler {
  widget: Component
  position: GridViewItemPosition
}
export class GridViewController {
  private _reactVal: {
    val: Maybe<GridViewItemBuidler[]>
  } = reactive({
    val: [],
  })

  constructor() {}
  get widgets(): Maybe<Component>[] {
    return this._reactVal.val?.map((el) => el.widget) ?? []
  }
  get layoutMatrix(): Maybe<GridViewItemPosition>[] {
    return this._reactVal.val?.map((el) => el.position) ?? []
  }
  set value(val: Maybe<GridViewItemBuidler[]>) {
    this._reactVal.val = val
  }
  get value() {
    return this._reactVal.val as Maybe<GridViewItemBuidler[]>
  }

  get css(): string {
    return ''
  }
  get reactive() {
    return this._reactVal
  }
}
