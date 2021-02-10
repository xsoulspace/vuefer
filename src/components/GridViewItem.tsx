import { defineComponent } from '@vue/runtime-core'
import { GridItem } from 'vue-grid-layout'

export const GridViewItem = () => {
  return defineComponent({
    name: 'GridViewItem',
    components: { GridItem },
  })
}
