import { defineComponent, h } from 'vue'
import { ItemBuilder } from '..'

export const GridViewItemBuilder = defineComponent({
  name: 'GridViewItemBuilder',
  props: {
    itemBuilder: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  render() {
    const fixedItemBuilder = this.itemBuilder as ItemBuilder
    return h(fixedItemBuilder({ index: this.index }))
  },
})
