<template>
  <DynamicScroller
    v-if="isItemsExists"
    :items="items"
    :min-item-size="minItemHeight"
    class="scroller"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <ListViewItem
          :index="index"
          :item-builder="itemBuilder"
          @click="() => $emit('item-click', index)"
        />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
  <div v-else></div>
</template>
<script lang="ts">
  // https://www.npmjs.com/package/vue3-virtual-scroller
  import { DynamicScroller, DynamicScrollerItem } from 'vue3-virtual-scroller'
  // import { ItemBuilder } from "./ListView";
  import { ListViewItem } from './ListViewItem'
  import { computed } from 'vue'
  export default {
    components: {
      DynamicScroller: DynamicScroller,
      DynamicScrollerItem: DynamicScrollerItem,
      ListViewItem,
    },
    props: {
      itemCount: {
        type: Number,
        required: true,
        default: 0,
      },
      itemBuilder: {
        type: Function,
        required: true,
      },
      minItemHeight: {
        type: Number,
        required: false,
        default: 45,
      },
    },
    emits: ['item-click'],
    setup(props) {
      const isItemsExists = computed(() => props.itemCount > 0)
      const items = computed(() => {
        const arr: string[] = []
        arr.length = props.itemCount
        if (isItemsExists.value) {
          arr.fill(' ')
        }
        return arr
      })
      return { items, isItemsExists }
    },
  }
</script>
<style lang="scss" scoped>
  .scroller {
    height: 100%;
    width: 100%;
  }
</style>
