<template>
  <DynamicScroller
    :items="items"
    :min-item-size="minItemHeight"
    class="scroller"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <ListViewItem :index="index" :itemBuilder="itemBuilder" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
<script lang="ts">
// https://www.npmjs.com/package/vue3-virtual-scroller
import { DynamicScroller, DynamicScrollerItem } from "vue3-virtual-scroller";
// import { ListItemBuilder } from "./ListView";
import { ListViewItem } from "./ListViewItem";
import { computed, ref } from "vue";
export default {
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
      default: 54,
    },
  },
  components: {
    DynamicScroller: DynamicScroller,
    DynamicScrollerItem: DynamicScrollerItem,
    ListViewItem,
  },
  setup(props) {
    const items = computed(() => {
      const arr: string[] = [];
      arr.length = props.itemCount;
      arr.fill(" ");
      return arr;
    });
    return { items };
  },
};
</script>
<style lang="scss" scoped>
.scroller {
  height: 100%;
  width: 100%;
}
</style>
