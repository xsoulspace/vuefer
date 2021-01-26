import { Component, defineComponent, h, Ref } from "vue";
import ListViewBuilder from "./ListViewBuilder.vue";

interface ItemBuilderContext {
  index: number;
}
export type ListItemBuilder = ({ index }: ItemBuilderContext) => Component;
interface ListViewBuilderI {
  itemBuilder: ListItemBuilder;
  itemCount: Ref<number>;
  minItemHeight?: Maybe<Ref<number>>;
}

export class ListView {
  static builder({ itemBuilder, itemCount, minItemHeight }: ListViewBuilderI) {
    return defineComponent({
      name: "ListView",
      components: {
        ListViewBuilder,
      },
      setup() {
        return { itemCount, minItemHeight };
      },
      render() {
        return h(
          <list-view-builder
            itemCount={this.itemCount}
            itemBuilder={itemBuilder}
            minItemHeight={this.minItemHeight}
          />
        );
      },
    });
  }
}
