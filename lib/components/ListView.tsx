import { defineComponent, h, Ref } from 'vue'
import { Maybe } from '../abstract/BasicTypes'
import { ItemBuilder } from '../abstract/ItemBuilder'
import ListViewBuilder from './ListViewBuilder.vue'

interface ListViewBuilderI {
  itemBuilder: ItemBuilder
  itemCount: Ref<number>
  minItemHeight?: Maybe<Ref<number>>
}

export class ListView {
  static builder({ itemBuilder, itemCount, minItemHeight }: ListViewBuilderI) {
    return defineComponent({
      name: 'ListView',
      components: {
        ListViewBuilder,
      },
      setup() {
        return { itemCount, minItemHeight }
      },
      render() {
        return h(
          <list-view-builder
            itemCount={this.itemCount}
            itemBuilder={itemBuilder}
            minItemHeight={this.minItemHeight}
          />
        )
      },
    })
  }
}
