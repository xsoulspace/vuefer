import { Component, h, reactive } from 'vue'
import { Maybe } from './BasicTypes'
import { ItemBuilderContext } from './ItemBuilder'

export interface GridViewItemPosition {
  x: number
  y: number
  width: number
  height: number
  index: number
}
export const getGridViewItemPositionFromPackageGridItemPosition = ({
  position,
}: {
  position: PackageGridItemPosition
}): GridViewItemPosition => {
  return {
    x: position.x,
    y: position.y,
    width: position.w,
    height: position.h,
    index: position.i,
  }
}

export interface GridViewItemPreBuidler<
  TPosition extends GridViewItemPosition
> {
  widget: Component
  position: TPosition
}
export class GridViewDelegate<TPosition extends GridViewItemPosition> {
  private _reactVal: GridViewItemPreBuidler<TPosition>[] = reactive([])
  constructor({
    gridViewItems,
  }: {
    gridViewItems: GridViewItemPreBuidler<TPosition>[]
  }) {
    this.value.push(...gridViewItems)
  }
  static use<TPosition extends GridViewItemPosition>(arg: {
    gridViewItems: GridViewItemPreBuidler<TPosition>[]
  }) {
    return new GridViewDelegate<TPosition>(arg)
  }
  itemBuilder({ index }: ItemBuilderContext): Maybe<Component> {
    return this._reactVal.find((el) => el.position.index == index)?.widget
  }
  get widgets(): Maybe<Component>[] {
    return this._reactVal.map((el) => h(el.widget)) ?? []
  }
  get layoutMatrix(): GridViewItemPosition[] {
    return this._reactVal.map((el) => el.position) ?? []
  }
  set value(val: GridViewItemPreBuidler<TPosition>[]) {
    this._reactVal = val
  }
  get value() {
    return this._reactVal
  }

  get css(): string {
    return ''
  }
  get reactive() {
    return this._reactVal
  }
}

export interface PackageGridItemPosition {
  x: number
  y: number
  w: number
  h: number
  i: number
}
