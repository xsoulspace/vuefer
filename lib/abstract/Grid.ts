import { Component, h, reactive } from 'vue'
import { Maybe } from './BasicTypes'
import { ItemBuilderContext } from './ItemBuilder'

export class GridViewItemPosition {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public index: number
  ) {}
  static fromPackageGridItemPosition({
    position,
  }: {
    position: PackageGridItemPosition
  }): GridViewItemPosition {
    return {
      x: position.x,
      y: position.y,
      width: position.w,
      height: position.h,
      index: position.i,
    }
  }
}
export interface GridViewItemPreBuidler {
  widget: Component
  position: GridViewItemPosition
}
export class GridViewDelegate {
  private _reactVal: GridViewItemPreBuidler[] = reactive([])
  constructor({ gridViewItems }: { gridViewItems: GridViewItemPreBuidler[] }) {
    this.value.push(...gridViewItems)
  }
  static use(arg: { gridViewItems: GridViewItemPreBuidler[] }) {
    return new GridViewDelegate(arg)
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
  set value(val: GridViewItemPreBuidler[]) {
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
