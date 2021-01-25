import { Component, defineComponent } from "vue";
import ListViewBuilder from "./ListViewBuilder.vue";

interface ItemBuilderContext {
  index: number;
}
export type ListItemBuilder = ({ index }: ItemBuilderContext) => Component;
interface ListViewBuilderI {
  itemBuilder: ListItemBuilder;
  itemCount: number;
  minItemHeight?: Maybe<number>;
}

export class ListView {
  static builder({ itemBuilder, itemCount, minItemHeight }: ListViewBuilderI) {
    const arr: string[] = [];
    arr.length = itemCount;
    arr.fill("");
    return defineComponent({
      name: "ListView",
      components: {
        ListViewBuilder,
      },
      setup() {
        return () => (
          <list-view-builder
            items={arr}
            itemBuilder={itemBuilder}
            minItemHeight={minItemHeight}
          ></list-view-builder>
        );
      },
    });
  }
}
