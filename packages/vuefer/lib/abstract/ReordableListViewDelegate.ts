import { reactive } from 'vue'
import { GridViewItemPosition, GridViewItemPreBuidler } from './Grid'
export class ReordableListViewDelegate {
  reactVal: GridViewItemPreBuidler[] = reactive([])
  constructor({ gridViewItems }: { gridViewItems: GridViewItemPreBuidler[] }) {
    this.reactVal.push(...gridViewItems)
  }
  static use(arg: { gridViewItems: GridViewItemPreBuidler[] }) {
    return new ReordableListViewDelegate(arg)
  }
  /** Returns indexes in array of reactive values */
  get valuesIndexes(): Map<GridViewItemPosition['index'], number> {
    const map: Map<GridViewItemPosition['index'], number> = new Map(
      this.reactVal.map((el, i) => [el.position.index, i])
    )
    return map
  }
  addUpdate(item: GridViewItemPreBuidler) {
    const index = this.valuesIndexes.get(item.position.index)
    if (index == null) {
      this.reactVal.push(item)
    } else {
      this.reactVal.splice(index, 1, item)
    }
  }
  remove(position: GridViewItemPosition) {
    const index = this.valuesIndexes.get(position.index)
    if (index != null) this.reactVal.splice(index, 1)
  }

  get css(): string {
    return ''
  }
}
