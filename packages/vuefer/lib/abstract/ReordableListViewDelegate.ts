import { reactive } from 'vue'
import { GridViewItemPosition, GridViewItemPreBuidler } from './Grid'
export class ReordableListViewDelegate {
  reactVal: GridViewItemPreBuidler[] = reactive([])
  get sortedReactVal() {
    return this.reactVal.sort((a, b) => a.position.y - b.position.y)
  }
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
    const id = item.position.index
    const index = this.valuesIndexes.get(id)
    if (index == null) {
      if (this.reactVal.length != 0) {
        const filteredItems = this.reactVal.filter(
          (el) => item.position.y > el.position.y
        )
        const sortedItems = filteredItems.sort(
          (a, b) => a.position.y - b.position.y
        )
        const maybeItem = sortedItems[0]
        if (maybeItem) {
          const yIndex = this.valuesIndexes.get(maybeItem.position.index)
          if (yIndex != null && yIndex >= 0) {
            this.reactVal.splice(yIndex, 1, maybeItem, item)
            return
          }
        }
      }
      this.reactVal.unshift(item)
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
