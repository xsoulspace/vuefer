import { defineComponent, h } from 'vue'
import { ItemBuilder } from '../abstract/ItemBuilder'

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
  setup(props) {
    const fixedItemBuilder = props.itemBuilder as ItemBuilder

    return () => h(fixedItemBuilder({ index: props.index }) ?? <div />)
  },
})
