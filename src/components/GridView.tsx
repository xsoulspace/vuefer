import { ItemBuilder } from '@/abstract'
import { defineComponent, h, Ref } from 'vue'

interface GridViewBuilderI {
  itemBuilder: ItemBuilder
  itemCount: Ref<number>
}
export class GridView {
  static builder({ itemBuilder, itemCount }: GridViewBuilderI) {
    return defineComponent({
      name: 'GridView',
      components: {},
      setup() {
        return { itemCount }
      },
      render() {
        return h(<div />)
      },
    })
  }
}
